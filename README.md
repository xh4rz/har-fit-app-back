<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🏋️ HarFit API

Backend principal de HarFit para la aplicación web y mobile.

La API está construida con **NestJS** siguiendo una arquitectura modular basada en dominios, encargándose de:

- Autenticación de usuarios
- Gestión de rutinas
- Gestión de ejercicios
- Upload de archivos y videos
- Relaciones musculares
- Persistencia de datos
- Exposición de endpoints REST

---

# 🚀 Stack Principal

| Tecnología | Uso                |
| ---------- | ------------------ |
| NestJS     | Framework backend  |
| TypeScript | Tipado estático    |
| PostgreSQL | Base de datos      |
| TypeORM    | ORM                |
| JWT        | Autenticación      |
| Passport   | Estrategias auth   |
| Cloudinary | Upload de archivos |
| Docker     | Contenedores       |
| Swagger    | Documentación API  |

---

# 📐 Arquitectura

La API sigue la arquitectura modular recomendada por NestJS.

La aplicación organiza cada feature en módulos independientes compuestos por:

- Controllers
- Services
- DTOs
- Entities
- Guards
- Pipes
- Decorators
- Strategies
- Interfaces

La arquitectura implementa:

- Modular Architecture
- Layered Architecture
- Dependency Injection
- Feature-based organization

Objetivos principales:

- Escalabilidad
- Bajo acoplamiento
- Alta cohesión
- Separación de responsabilidades
- Mantenibilidad

---

# 📂 Estructura del Proyecto

```bash
src/
│
├── auth/                    # Autenticación y autorización
│   ├── decorators/
│   ├── dto/
│   ├── entities/
│   ├── guards/
│   ├── interfaces/
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── cloudinary/              # Configuración Cloudinary
│   ├── interfaces/
│   ├── cloudinary.controller.ts
│   ├── cloudinary.module.ts
│   ├── cloudinary.provider.ts
│   └── cloudinary.service.ts
│
├── common/                  # Recursos compartidos
│   ├── decorators/
│   ├── dtos/
│   ├── helpers/
│   ├── services/
│   └── common.module.ts
│
├── equipments/              # Equipamientos
│   ├── dto/
│   ├── entities/
│   ├── equipments.controller.ts
│   ├── equipments.module.ts
│   └── equipments.service.ts
│
├── exercises/               # Ejercicios
│   ├── dto/
│   ├── entities/
│   ├── pipes/
│   ├── exercises.controller.ts
│   ├── exercises.module.ts
│   └── exercises.service.ts
│
├── files/                   # Upload de archivos
│
├── muscles/                 # Músculos
│
├── routines/                # Rutinas
│
├── seed/                    # Seed de base de datos
│
├── app.module.ts
└── main.ts
```

---

# 🧩 Arquitectura Modular

Cada dominio se encapsula dentro de su propio módulo.

Ejemplo:

```txt
Exercises Module
 ├── DTOs
 ├── Entities
 ├── Pipes
 ├── Controller
 ├── Service
 └── Module
```

Cada módulo mantiene:

- Responsabilidad única
- Encapsulación del dominio
- Separación de lógica
- Independencia entre features

---

# 🔄 Flujo General

```txt
Request
   ↓
Controller
   ↓
DTO Validation
   ↓
Guard / Pipe
   ↓
Service
   ↓
Repository / TypeORM
   ↓
Database
   ↓
Response
```

---

# 🧠 Responsabilidades

## Controllers

Responsables de:

- Manejo de requests HTTP
- Exposición de endpoints REST
- Validación inicial
- Manejo de respuestas

No deben contener:

- Lógica de negocio compleja

---

## Services

Responsables de:

- Casos de uso
- Reglas de negocio
- Comunicación con base de datos
- Orquestación de lógica

---

## DTOs

Responsables de:

- Validación de datos
- Contratos de entrada y salida
- Tipado

La aplicación utiliza:

- `class-validator`
- `class-transformer`

---

## Entities

Responsables de:

- Representación ORM
- Relaciones entre tablas
- Persistencia de datos

Implementadas con:

- TypeORM

---

## Guards

Responsables de:

- Protección de rutas
- Validación de autenticación
- Roles y permisos

---

## Pipes

Responsables de:

- Transformación de datos
- Validaciones custom

---

## Decorators

Responsables de:

- Reutilización de metadata
- Abstracción de lógica repetitiva
- Integración con Guards y Auth

---

## Strategies

Responsables de:

- Estrategias Passport
- JWT Authentication
- Integración auth

---

# 🗄️ Base de Datos

La aplicación utiliza PostgreSQL junto con TypeORM.

---

# 📊 Modelo Relacional

## users

Usuarios del sistema.

```txt
id
email
password
fullName
isActive
roles
refreshToken
```

---

## routines

Rutinas creadas por usuarios.

```txt
id
title
userId
```

Relaciones:

- Un usuario puede tener muchas rutinas

---

## exercises

Ejercicios disponibles.

```txt
id
title
instruction
equipmentId
primaryMuscleId
```

Relaciones:

- Un ejercicio pertenece a un músculo principal
- Un ejercicio pertenece a un equipamiento
- Un ejercicio puede tener múltiples músculos secundarios
- Un ejercicio puede tener múltiples videos

---

## muscles

Músculos del cuerpo.

```txt
id
name
imageUrl
```

---

## equipments

Equipamientos de gimnasio.

```txt
id
name
imageUrl
```

---

## exercises_videos

Videos asociados a ejercicios.

```txt
id
url
publicId
exerciseId
```

---

## exercise_secondary_muscles

Relación many-to-many entre ejercicios y músculos secundarios.

```txt
exerciseId
muscleId
```

---

## routines_exercises

Relación entre rutinas y ejercicios.

```txt
id
set
reps
kg
routineId
exerciseId
```

---

# 🔐 Autenticación

El módulo `auth/` maneja:

- Registro de usuarios
- Login
- JWT Access Token
- Refresh Token
- Protección de rutas
- Roles y permisos
- Estrategias Passport

Tecnologías utilizadas:

- JWT
- Passport
- bcrypt

---

# ☁️ Upload de Archivos

La aplicación utiliza Cloudinary para:

- Videos de ejercicios
- Imágenes
- Gestión de media

Módulos involucrados:

```txt
cloudinary/
files/
```

---

# ⚙️ Instalación

## 1. Clonar repositorio

```bash
git clone
```

---

## 2. Instalar dependencias

```bash
pnpm install
```

---

## 3. Instalar Nest CLI

```bash
pnpm install -g @nestjs/cli
```

---

## 4. Configurar variables de entorno

Duplicar:

```txt
.env.template
```

Renombrar a:

```txt
.env.development
```

---

## 5. Ejecutar aplicación

```bash
pnpm start:dev
```

Servidor:

```txt
http://localhost:3001
```

---

# 🌱 Seed

Reconstruir la base de datos:

```txt
http://localhost:3001/api/seed
```

---

# 🧪 Scripts Disponibles

## Desarrollo

```bash
pnpm start:dev
```

## Build

```bash
pnpm build
```

## Producción

```bash
pnpm start:prod
```

## Lint

```bash
pnpm lint
```

## Tests

```bash
pnpm test
```

## Coverage

```bash
pnpm test:cov
```

---

# 🐳 Docker

## Desarrollo

Levantar contenedores:

```bash
pnpm docker:up
```

Detener contenedores:

```bash
pnpm docker:down
```

---

## Producción

Levantar contenedores:

```bash
pnpm docker:prod
```

Detener contenedores:

```bash
pnpm docker:prod:down
```

---

# 📦 Variables de Entorno

```txt
.env.template     # Template
.env.development  # Desarrollo local
.env.docker       # Docker
.env.production   # Producción (Render / Neon)
```

---

# 📏 Convenciones

| Elemento    | Convención |
| ----------- | ---------- |
| Modules     | kebab-case |
| DTOs        | PascalCase |
| Services    | PascalCase |
| Controllers | PascalCase |
| Entities    | PascalCase |
| Variables   | camelCase  |

---

# 🔒 Seguridad

La API implementa:

- Hash de contraseñas con bcrypt
- JWT Authentication
- Guards
- DTO Validation
- Protección de rutas privadas
- Refresh Tokens

---

# 📜 Principios de Arquitectura

La aplicación sigue los siguientes principios:

- Arquitectura modular
- Separación de responsabilidades
- Dependency Injection
- Bajo acoplamiento
- Alta cohesión
- Escalabilidad
- Mantenibilidad
- Reutilización
- Encapsulación por dominio

---

# 📈 Escalabilidad

La arquitectura está preparada para:

- Nuevos módulos
- Nuevos dominios
- Integración mobile/web
- Escalabilidad horizontal
- Testing modular
- Nuevos servicios externos
- Futuras integraciones

---

# 📱 Integración

La API es consumida por:

- HarFit Web
- HarFit Mobile

Ambas aplicaciones comparten:

- Sistema de autenticación
- Rutinas
- Ejercicios
- Progreso
- Persistencia centralizada

---

# 🚀 Objetivo

Mantener una API limpia, modular y escalable que permita evolucionar HarFit de forma mantenible y desacoplada.

Cada módulo encapsula su dominio y la lógica permanece separada de la infraestructura y presentación.

---

# 📜 Filosofía

HarFit busca mantener una arquitectura orientada a:

- Escalabilidad
- Modularidad
- Separación clara de responsabilidades
- Mantenibilidad
- Reutilización

Cada módulo encapsula su dominio y la lógica de negocio permanece desacoplada de la capa HTTP y de la infraestructura.
