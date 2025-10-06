-- Migration: Unify users and students tables
-- This script merges students into users table

BEGIN;

-- Step 1: Add new columns to users table if they don't exist
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Step 2: Update existing users to have email and name based on username
UPDATE users 
SET email = COALESCE(email, username || '@temp.com'),
    name = COALESCE(name, username)
WHERE email IS NULL OR name IS NULL;

-- Step 3: Make username nullable (since we'll use email for login)
ALTER TABLE users 
  ALTER COLUMN username DROP NOT NULL;

-- Step 4: Make email NOT NULL and UNIQUE
ALTER TABLE users 
  ALTER COLUMN email SET NOT NULL;

-- Step 3: Add unique constraint on email if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_email_key'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END $$;

-- Step 4: Migrate students to users (if students table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'students') THEN
    -- Insert students as users with role 'student' and a default password
    INSERT INTO users (name, email, phone, password_hash, role, created_at)
    SELECT 
      s.name,
      COALESCE(s.email, 'student' || s.id || '@temp.com'), -- Generate email if missing
      s.phone,
      '$2b$10$defaulthash', -- Placeholder password (users will need to reset)
      'student',
      now()
    FROM students s
    WHERE NOT EXISTS (
      SELECT 1 FROM users u WHERE u.email = s.email
    )
    ON CONFLICT (email) DO NOTHING;
  END IF;
END $$;

-- Step 5: Update bookings to reference users instead of students
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'bookings' AND column_name = 'student_id') THEN
    
    -- Add user_id column if it doesn't exist
    ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id int;
    
    -- Migrate student_id to user_id by matching emails
    UPDATE bookings b
    SET user_id = u.id
    FROM students s
    JOIN users u ON u.email = s.email
    WHERE b.student_id = s.id AND b.user_id IS NULL;
    
    -- Drop the old foreign key constraint
    ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_student_id_fkey;
    
    -- Drop the old unique constraint
    ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_session_id_student_id_key;
    
    -- Drop student_id column
    ALTER TABLE bookings DROP COLUMN IF EXISTS student_id;
    
    -- Add foreign key for user_id
    ALTER TABLE bookings 
      ADD CONSTRAINT bookings_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    
    -- Add unique constraint for session + user
    ALTER TABLE bookings 
      ADD CONSTRAINT bookings_session_id_user_id_key 
      UNIQUE (session_id, user_id);
  END IF;
END $$;

-- Step 6: Drop students table (optional - comment out if you want to keep it)
DROP TABLE IF EXISTS students CASCADE;

COMMIT;
