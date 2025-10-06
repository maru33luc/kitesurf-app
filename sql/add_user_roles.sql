-- add_user_roles.sql
-- Agrega la columna role a la tabla users

BEGIN;

-- Agregar columna role si no existe
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student';

-- Actualizar roles existentes
UPDATE users 
SET role = 'admin' 
WHERE username = 'admin' OR email LIKE '%@admin.com';

-- Verificar los cambios
SELECT id, username, email, role FROM users;

COMMIT;