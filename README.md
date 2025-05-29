<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# F1 Performance API - Backend

Este proyecto es el backend de un sistema diseñado para estimar el **rendimiento esperado de un piloto de Fórmula 1 en una próxima carrera**, combinando datos históricos, características técnicas del vehículo y condiciones de la pista.

El sistema busca proporcionar una herramienta de análisis avanzada para **equipos, analistas y aficionados**, permitiéndoles anticipar el desempeño de los pilotos y tomar decisiones estratégicas con base en datos cuantificables.

---

## Tecnologías Utilizadas

* **NestJS** - Framework de desarrollo backend con TypeScript.
* **MongoDB** + **Mongoose** - Base de datos NoSQL y ODM.
* **Passport + JWT** - Módulo de autenticación y autorización con tokens.
* **bcrypt** - Encriptación segura de contraseñas.
* **class-validator** y **class-transformer** - Validación y transformación de datos.
* **TypeScript** - Tipado estático para mayor seguridad y mantenibilidad.

---

## Lógica del Sistema

El sistema calcula un **índice de rendimiento total** a partir de tres componentes principales:

### Evaluación del Piloto

A partir del historial del piloto en una pista:

```
RendimientoP = (1 / PromedioPosición) * 0.6 + (1 - PorcentajeAbandono) * 0.4
```

Refleja consistencia y confiabilidad en contextos similares.

---

### Evaluación del Vehículo

Con base en:

* Velocidad punta
* Fiabilidad del motor
* Peso del monoplaza (normalizado)

```
RendimientoV = (VelPuntaNorm * 0.4) + (Fiabilidad * 0.4) + ((1 - PesoNorm) * 0.2)
```

---

### Evaluación de la Pista

* Tipo de circuito: urbano, tradicional, híbrido
* Nivel de exigencia técnica (1–10)

Estas variables modifican el peso relativo del piloto y el vehículo en el rendimiento final.

---

### Cálculo Final

```
RendimientoEsperado = (RendimientoP * PesoP) + (RendimientoV * PesoV)
```

Los pesos (`PesoP`, `PesoV`) se ajustan según el tipo de pista. Ejemplo:

| Tipo de pista | PesoP | PesoV |
| ------------- | ----- | ----- |
| Técnica       | 0.75  | 0.25  |
| Rápida        | 0.40  | 0.60  |

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crear un archivo `.env` en la raíz con el siguiente contenido:

```
MONGODB_URI=mongodb://usuario:contraseña@servidor:puerto/basededatos
JWT_SECRET=tu_secreto_jwt
PORT=3000
```

### 4. Ejecutar la aplicación

```bash
npm run start:dev
```

---

## Estructura del Proyecto

```
backend/
├── src/
│   ├── auth/        # Módulo de autenticación y seguridad
│   ├── pilots/      # CRUD de pilotos
│   ├── vehicles/    # CRUD de vehículos
│   ├── circuits/    # CRUD de circuitos
│   └── config/      # Configuración del entorno
├── test/
├── .env
├── package.json
└── README.md
```

---

## Endpoints Principales

### 🔹 Pilots `/pilots`

* `GET /` - Obtener todos los pilotos
* `GET /:id` - Obtener piloto por ID
* `POST /` - Crear piloto
* `PATCH /:id` - Actualizar piloto
* `DELETE /:id` - Eliminar piloto

### 🔹 Vehicles `/vehicles`

* `GET /` - Obtener todos los vehículos
* `GET /:id` - Obtener vehículo por ID
* `POST /` - Crear vehículo
* `PATCH /:id` - Actualizar vehículo
* `DELETE /:id` - Eliminar vehículo

### 🔹 Circuits `/circuits`

* `GET /` - Obtener todos los circuitos
* `GET /:id` - Obtener circuito por ID
* `POST /` - Crear circuito
* `PATCH /:id` - Actualizar circuito
* `DELETE /:id` - Eliminar circuito

### 🔹 Autenticación `/auth`

* `POST /auth/register` - Registrar usuario
* `POST /auth/login` - Login y token JWT

---

## Despliegue

El backend está desplegado en Render y disponible en:

🔗 **[https://coreweb.onrender.com](https://coreweb.onrender.com)**

---

## Alcance

Este sistema está enfocado en el análisis comparativo entre pilotos y vehículos bajo condiciones ideales. No considera:

* Estrategias de boxes o cambios de neumáticos
* Accidentes o condiciones climáticas en carrera
* Datos en tiempo real o IA
* Conexión con APIs externas

Los datos son ingresados manualmente por el usuario y el enfoque es **cuantitativo y predictivo** bajo un entorno controlado.

---

## Limitaciones

* No se consideran **paradas en pits**, cambios de neumáticos, ni **estrategias de equipo**.
* No se utilizan **condiciones climáticas dinámicas**.
* No se aplica inteligencia artificial ni machine learning.
* Los resultados representan una **estimación teórica**, no un pronóstico en tiempo real.
