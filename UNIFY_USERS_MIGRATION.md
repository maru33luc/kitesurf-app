# 🔄 Migración: Unificación de Users y Students

## 📋 Resumen

Se unificaron las tablas `users` y `students` en una sola tabla `users` que contiene toda la información necesaria para autenticación y reservas.

---

## 🗄️ Cambios en Base de Datos

### **Nuevo Esquema de `users`**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  created_at timestamptz NOT NULL DEFAULT now()
);
```

### **Cambios en `bookings`**
- ❌ Eliminado: `student_id`
- ✅ Agregado: `user_id` (referencia a `users.id`)
- ✅ Nueva constraint: `UNIQUE(session_id, user_id)`

### **Tabla `students` eliminada**
Ya no es necesaria, todos los datos están en `users`.

---

## 🚀 Pasos para Migrar la Base de Datos

### **Opción 1: Migración Automática (Recomendado)**
```bash
# Ejecutar el script de migración en Render
psql $DATABASE_URL -f sql/migration_unify_users.sql
```

Este script:
1. Agrega columnas `name`, `phone`, `created_at` a `users`
2. Migra datos de `students` a `users`
3. Actualiza `bookings` para usar `user_id`
4. Elimina referencias a `student_id`

### **Opción 2: Recrear desde Cero**
```bash
# ADVERTENCIA: Esto borra todos los datos
psql $DATABASE_URL -f sql/schema.sql
```

---

## 🔧 Cambios en Backend

### **`src/routes/auth.js`**
#### Register
- **Antes**: `username`, `password`, `role`
- **Ahora**: `name`, `email`, `phone`, `password`, `role`
- **Login por**: `email` (en lugar de `username`)

#### Login
- **Antes**: `username`, `password`
- **Ahora**: `email`, `password`
- **Token incluye**: `id`, `name`, `email`, `role`

### **`src/controllers/bookings.js`**
- ❌ **Eliminado**: `createStudent()`
- ✅ **Actualizado**: `createBooking()` usa `user_id` del token JWT
- ✅ **Actualizado**: `sendConfirmationEmail()` busca en `users`

### **`src/routes/bookings.js`**
- ❌ **Eliminado**: `POST /api/bookings/students`
- ✅ **Mantenido**: `GET /api/bookings/sessions` (público)
- ✅ **Mantenido**: `GET /api/bookings/instructors` (público)
- ✅ **Mantenido**: `POST /api/bookings` (requiere auth)

### **`src/routes/admin.js`**
- ✅ **Actualizado**: Query de bookings usa `users` en lugar de `students`
- ✅ **Columnas**: `user_name`, `user_email` en lugar de `student_name`

---

## 💻 Cambios en Frontend

### **`auth.service.ts`**
#### Interfaces Actualizadas
```typescript
export interface AuthUser {
  id: number;
  name: string;      // antes: username
  email: string;     // nuevo
  role: 'student' | 'staff' | 'admin';
}
```

#### Métodos Actualizados
- **`login(email, password)`**: Usa email en lugar de username
- **`register(name, email, phone, password, role)`**: Campos completos
- **`decodeToken()`**: Decodifica `name` y `email` del JWT

### **`auth.interceptor.ts`** (NUEVO)
- Agrega automáticamente el token JWT a todas las peticiones HTTP
- Header: `Authorization: Bearer <token>`

### **`login.component.ts`**
- **Campo**: `email` (en lugar de `username`)
- **Validación**: Email válido requerido
- **Login**: Usa `email` y `password`

### **`register.component.ts`**
- **Campos**: `name`, `email`, `phone` (opcional), `password`
- **Validaciones**: Email válido, nombre requerido, contraseña mínimo 6 caracteres
- **Rol por defecto**: `student`
- **Redirección**: A `/booking` después de registro exitoso

### **`booking.component.ts`**
- ❌ **Eliminado**: Llamada a `createStudent()`
- ✅ **Actualizado**: Llama directamente a `createBooking()`
- ✅ **Autenticación**: Requiere estar logueado
- ✅ **Redirección**: A `/auth/login` si no está autenticado

### **`booking.service.ts`**
- ❌ **Eliminado**: `createStudent()`
- ✅ **Actualizado**: Interface `Booking` usa `user_id` (opcional, viene del token)
- ✅ **Actualizado**: Interface `Instructor` sin campo `level`

### **`app.config.ts`**
- ✅ **Agregado**: `authInterceptor` para enviar token automáticamente

---

## 🔐 Flujo de Autenticación Actualizado

### **1. Registro**
```
Usuario → Formulario (name, email, phone, password)
       → POST /api/auth/register
       → Se crea en tabla `users` con role='student'
       → Auto-login
       → Redirección a /booking
```

### **2. Login**
```
Usuario → Formulario (email, password)
       → POST /api/auth/login
       → Valida contra tabla `users`
       → Retorna JWT con {id, name, email, role}
       → Token guardado en localStorage
       → Redirección a /admin
```

### **3. Crear Reserva**
```
Usuario logueado → Formulario de reserva
                → POST /api/bookings (con token en header)
                → Backend extrae user_id del token
                → Se crea booking con user_id
                → Email de confirmación enviado
```

---

## 🎯 Ventajas de la Unificación

✅ **Menos redundancia**: Un solo lugar para datos de usuario  
✅ **Más simple**: No hay que sincronizar users y students  
✅ **Más seguro**: Login por email (único) en lugar de username  
✅ **Más completo**: Registro captura todos los datos necesarios  
✅ **Mejor UX**: Usuario se registra una vez y puede reservar inmediatamente  

---

## 📝 Notas Importantes

### **Roles**
- `student`: Usuario normal que hace reservas (por defecto)
- `staff`: Personal de la escuela
- `admin`: Administrador con acceso completo

### **Autenticación Requerida**
- ✅ **Crear reserva**: Requiere estar logueado
- ❌ **Ver sesiones**: Público
- ❌ **Ver instructores**: Público

### **Email Único**
- El email es la clave única para login
- No se permiten emails duplicados
- Validación en frontend y backend

---

## 🧪 Testing

### **1. Probar Registro**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+1234567890",
    "password": "password123"
  }'
```

### **2. Probar Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### **3. Probar Reserva (con token)**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "session_id": 1,
    "equipment_id": 1
  }'
```

---

## ⚠️ Migración en Producción

1. **Backup de la base de datos**
   ```bash
   pg_dump $DATABASE_URL > backup.sql
   ```

2. **Ejecutar migración**
   ```bash
   psql $DATABASE_URL -f sql/migration_unify_users.sql
   ```

3. **Verificar datos**
   ```sql
   SELECT COUNT(*) FROM users;
   SELECT COUNT(*) FROM bookings WHERE user_id IS NOT NULL;
   ```

4. **Desplegar nuevo código**
   - Backend: Reiniciar servidor
   - Frontend: Rebuild y deploy

5. **Notificar usuarios**
   - Los usuarios existentes necesitarán resetear contraseña si solo tenían cuenta de student

---

## 🎉 Resultado Final

Ahora tienes un sistema unificado donde:
- Los usuarios se registran con **email** y **contraseña**
- El registro captura **nombre**, **email**, **teléfono**
- Los usuarios pueden **hacer reservas** inmediatamente después de registrarse
- No hay duplicación de datos entre `users` y `students`
- El sistema es más simple y mantenible

¡La migración está completa! 🚀
