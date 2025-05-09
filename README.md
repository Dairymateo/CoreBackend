<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



# F1 API - Backend

Este proyecto es el backend de una aplicación para la gestión de datos de la Fórmula 1, específicamente para pilotos, vehículos y usuarios. Está construido con NestJS y utiliza MongoDB.

## Tecnologías Utilizadas

- NestJS  
- Mongoose (para la interacción con MongoDB)  
- Passport (para la autenticación)  
- JWT (JSON Web Tokens)  
- bcrypt (para el manejo de contraseñas)  
- class-validator y class-transformer  
- TypeScript  

## Dependencias

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/config": "^4.0.2",
  "@nestjs/core": "^11.0.1",
  "@nestjs/jwt": "^11.0.0",
  "@nestjs/mapped-types": "*",
  "@nestjs/mongoose": "^11.0.3",
  "@nestjs/platform-express": "^11.0.1",
  "@types/bcrypt": "^5.0.2",
  "bcrypt": "^5.1.1",
  "class-transformer": "^0.5.1",
  "class-validator": "^0.14.2",
  "dotenv": "^16.5.0",
  "mongoose": "^8.14.2",
  "passport-jwt": "^4.0.1",
  "passport-local": "^1.0.0",
  "reflect-metadata": "^0.2.2",
  "rxjs": "^7.8.1",
  "uuid": "^11.1.0"
}
```

## Instalación

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

### Instalar dependencias

```bash
npm install
```

### Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias. Ejemplo:

```env
MONGODB_URI=mongodb://usuario:contraseña@servidor:puerto/basededatos
JWT_SECRET=tu_secreto_jwt
```

### Ejecutar la aplicación

```bash
npm run start:dev
```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── guards/
│   │   ├── schemas/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   ├── config/
│   ├── pilots/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── schemas/
│   │   ├── pilots.controller.ts
│   │   ├── pilots.module.ts
│   │   ├── pilots.service.ts
│   ├── vehicles/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── schemas/
│   │   ├── vehicles.controller.ts
│   │   ├── vehicles.module.ts
│   │   ├── vehicles.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
└── README.md
```

## Endpoints

La API proporciona endpoints CRUD para las siguientes entidades:

- **Pilots** (`/pilots`)
- **Vehicles** (`/vehicles`)
- **Users** (`/users`)

### Endpoints por entidad

- `GET /` - Obtiene todos los registros  
- `GET /:id` - Obtiene un registro por su ID  
- `POST /` - Crea un nuevo registro  
- `PATCH /:id` - Actualiza un registro existente  
- `DELETE /:id` - Elimina un registro  

### Autenticación (`/auth`)

- `POST /auth/register` - Registra un nuevo usuario  
- `POST /auth/login` - Inicia sesión de un usuario y devuelve un token JWT  

## Autenticación

La API utiliza JWT para proteger los endpoints. El acceso a rutas privadas está protegido mediante el `AuthGuard`.
