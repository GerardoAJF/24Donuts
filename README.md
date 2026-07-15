# 🍩 24Donuts

Tienda en línea para una cafetería 24/7, construida como proyecto formativo del módulo **Proyecto Innovador de Desarrollo de Software**. Incluye una tienda pública para clientes (catálogo, carrito, checkout, reseñas, perfil) y un panel administrativo privado (productos, promociones, inventario, personas y ventas).

![banner](docs/banner.png)

## Índice

- [Equipo de desarrollo](#-equipo-de-desarrollo)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Variables de entorno](#-variables-de-entorno)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [Rutas de la API](#-rutas-de-la-api)
- [Capturas de pantalla](#-capturas-de-pantalla)

---

## 👥 Equipo de desarrollo

- Anthony Tyler Hui Guevara
- Adrián Moises Escobar Domínguez
- Gerardo Andrés Jovel Franco
- Jared Moshe Sáez Cruz

---

## 🛠 Tecnologías utilizadas

### Backend (`/backend`)

| Librería | Uso |
|---|---|
| [Express](https://expressjs.com/) | Framework del servidor HTTP y enrutamiento de la API REST. |
| [Mongoose](https://mongoosejs.com/) | ODM para modelar y consultar MongoDB (schemas, validaciones, populate). |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Generación y verificación de JWT para sesión (`Authorization: Bearer`) y para los flujos de verificación de correo / recuperación de contraseña (cookies de corta duración). |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Hash y comparación de contraseñas — nunca se guardan en texto plano. |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Lee las cookies `httpOnly` usadas en registro y recuperación de contraseña. |
| [cors](https://github.com/expressjs/cors) | Habilita peticiones cross-origin desde el frontend (`localhost:5173`) con credenciales. |
| [express-validator](https://express-validator.github.io/) | Validación de formularios de registro/verificación en el backend. |
| [nodemailer](https://nodemailer.com/) | Envío de correos reales (verificación de cuenta, código OTP de recuperación) vía SMTP de Gmail. |
| [dotenv](https://github.com/motdotla/dotenv) | Carga variables de entorno desde `.env`. |
| [nodemon](https://nodemon.io/) *(dev)* | Reinicia el servidor automáticamente en desarrollo. |

### Frontend (`/frontend`)

| Librería | Uso |
|---|---|
| [React 19](https://react.dev/) | Librería de UI basada en componentes funcionales y hooks. |
| [Vite](https://vitejs.dev/) | Servidor de desarrollo y bundler. |
| [React Router DOM v7](https://reactrouter.com/) | Enrutamiento SPA (rutas públicas, privadas por rol, y anidadas). |
| [Axios](https://axios-http.com/) | Cliente HTTP con interceptores (adjunta el JWT automáticamente y maneja sesiones expiradas). |
| [React Icons](https://react-icons.github.io/react-icons/) | Íconos (carrito, estrellas de reseña, toasts, navegación). |
| [ESLint](https://eslint.org/) *(dev)* | Linting de calidad de código. |

**Estilos:** CSS plano por componente (un archivo `.css` junto a cada `.jsx`), sin frameworks de utilidades — se mantiene el patrón ya definido en el proyecto.

---

## 📁 Estructura del proyecto

```
24Donuts/
├── backend/
│   ├── app.js                  # Configuración de Express (cors, json, cookies, rutas)
│   ├── index.js                # Punto de entrada: conecta DB y levanta el servidor
│   ├── config.js                # Variables de entorno + opciones de cookies
│   ├── database.js              # Conexión a MongoDB (Mongoose)
│   └── src/
│       ├── controllers/         # Lógica de cada recurso (auth, product, cart, order, review, ...)
│       ├── models/               # Schemas de Mongoose (Customer, Product, Order, Review, ...)
│       ├── routes/                # Un router por recurso + índice central
│       ├── middlewares/           # validateAuth (JWT + rol) que protege rutas privadas
│       ├── validators/            # Reglas de express-validator (registro, verificación)
│       ├── services/              # auth.service.js (login), email.service.js (nodemailer)
│       └── utils/                 # jwt.js, bcrypt.js, responses.js (formato de respuesta uniforme)
│
└── frontend/
    └── src/
        ├── App.jsx               # Enrutador raíz (público / admin / login)
        ├── context/               # AuthContext (sesión) y ToastContext (notificaciones)
        ├── hooks/                 # useCart.js (hook personalizado del carrito)
        ├── router/                # PublicRouter, AdminRouter, LoginRouter, PrivateRouter (guard por rol)
        ├── services/api.js        # Instancia de axios + normalizadores de datos del backend
        ├── components/
        │   ├── public/             # Componentes de la tienda (Navbar, MenuCard, CartItem, ReviewSection...)
        │   ├── private/            # Componentes del panel admin (tablas, formularios...)
        │   └── shared/              # Reutilizables en ambos lados (Boton, InputCustom, Toast...)
        └── pages/
            ├── public/              # Home, Menu, ProductDetail, ShoppingCart, Checkout, Profile...
            └── private/             # Sales, Inventory, Personas, LoginForms (admin)...
```

---

## ✨ Funcionalidades

### Tienda pública (cliente)

- Catálogo de productos con búsqueda y navegación a detalle (`GET /products`)
- Registro de cuenta con **confirmación por correo electrónico** (código de 6 dígitos, en 2 pasos: los datos no se guardan hasta confirmar)
- Login con bloqueo si la cuenta no ha sido verificada
- Recuperación de contraseña por correo (código OTP numérico, vía cookie `httpOnly` de 15 minutos)
- Carrito de compras persistente en base de datos (agregar, actualizar cantidad, eliminar)
- Checkout completo: revisión del pedido, método de pago (Efectivo/Tarjeta), entrega a domicilio o recoger en tienda
- **La compra solo puede completarse con sesión iniciada** (protegido en frontend y backend)
- Perfil del cliente con historial de pedidos y su estado (Pendiente / Aceptado / Rechazado / Completado)
- Reseñas y valoración por estrellas — **solo de productos ya comprados**
- Notificaciones tipo *toast* para confirmaciones y errores en toda la app

### Panel administrativo (admin / empleado)

- Login separado, protegido por rol (`admin` / `employee`)
- CRUD de productos, promociones, ingredientes (inventario) y etiquetas
- Registro de gastos/compras de insumos
- Gestión de personas: administradores, empleados y clientes
- Gestión de órdenes: ver detalle y cambiar su estado
- Configuración inicial del primer administrador del sistema

---

## 🔐 Variables de entorno

### Backend (`backend/.env`, ver `backend/.env.example`)

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor Express (por defecto `4000`). |
| `MONGODB_URI` | Cadena de conexión a MongoDB (local o Atlas). |
| `JWT_Secret_key` | Secreto usado para firmar todos los JWT (sesión, verificación de correo, recuperación). |
| `SENDER_EMAIL` | Correo Gmail emisor de las notificaciones. |
| `SENDER_PASSWORD` | **Contraseña de aplicación** de Gmail (no la contraseña normal de la cuenta). |
| `FRONTEND_URL` | URL del frontend, usada en CORS. |

### Frontend (`frontend/.env`, ver `frontend/.env.example`)

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API del backend (incluye `/api`). Por defecto `http://localhost:4000/api`. |

> 💡 Para `SENDER_PASSWORD`: en tu cuenta de Gmail activa la verificación en 2 pasos y genera una **contraseña de aplicación** en [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) — la contraseña normal de la cuenta no funciona con SMTP.

---

## ▶️ Cómo ejecutar el proyecto

1. **Clonar el repositorio** y ubicarse en la carpeta raíz.

2. **Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env   # completa MONGODB_URI, JWT_Secret_key, SENDER_EMAIL, SENDER_PASSWORD
   npm run dev
   ```
   El servidor queda escuchando en `http://localhost:4000`.

3. **Frontend** (en otra terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   La app queda disponible en `http://localhost:5173`.

4. **Requisitos previos:**
   - Node.js 18+
   - Una instancia de MongoDB accesible (local con `mongod`, o un clúster de [MongoDB Atlas](https://www.mongodb.com/atlas))
   - Una cuenta de Gmail con contraseña de aplicación (para el envío real de correos)

5. **Primer uso:** el primer administrador se crea desde `/auth/registro-inicial` (solo funciona si todavía no existe ningún admin en la base de datos).

---

## 🌐 Rutas de la API

Todas las rutas están bajo el prefijo `/api`. La columna **Protección** indica qué roles pueden acceder (vía middleware `validateAuth`); "Pública" significa que no requiere sesión.

### Autenticación (`/auth`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| POST | `/auth/registro-inicial` | Crea el primer administrador del sistema | Pública (solo si no existe ningún admin) |
| POST | `/auth/login` | Inicia sesión (admin, empleado o cliente) | Pública |
| POST | `/auth/register` | Registro de cliente — paso 1: genera código y lo envía por correo | Pública |
| POST | `/auth/verificar-cuenta` | Registro de cliente — paso 2: valida el código y crea la cuenta | Pública |
| POST | `/auth/recuperar-correo` | Solicita código de recuperación de contraseña | Pública |
| POST | `/auth/validar-pin` | Valida el código OTP recibido por correo | Pública |
| POST | `/auth/nueva-contrasena` | Define la nueva contraseña tras validar el código | Pública |

### Productos (`/products`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/products` | Lista productos (filtros: `search`, `tag`, `maxPrice`) | Pública |
| GET | `/products/:id` | Detalle de un producto | Pública |
| POST | `/products` | Crea un producto | admin, employee |
| PUT | `/products/:id` | Edita un producto | admin, employee |
| DELETE | `/products/:id` | Elimina un producto | admin, employee |

### Etiquetas (`/tags`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/tags` | Lista etiquetas | Pública |
| POST | `/tags` | Crea una etiqueta | admin, employee |
| PUT | `/tags/:id` | Edita una etiqueta | admin, employee |
| DELETE | `/tags/:id` | Elimina una etiqueta | admin, employee |

### Carrito (`/cart`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/cart` | Carrito activo del cliente autenticado | customer |
| POST | `/cart/add` | Agrega un producto al carrito | customer |
| PUT | `/cart/update` | Actualiza la cantidad de un producto | customer |
| DELETE | `/cart/remove/:productId` | Elimina un producto del carrito | customer |

### Órdenes (`/orders`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/orders` | Lista todas las órdenes (filtros: `status`, `delivery`, `date`) | admin, employee |
| POST | `/orders` | Crea una orden a partir del carrito activo (checkout) | customer |
| GET | `/orders/my` | Historial de pedidos del cliente autenticado | customer |
| GET | `/orders/:id` | Detalle de una orden | admin, employee |
| PATCH | `/orders/:id/status` | Cambia el estado de una orden | admin, employee |

### Promociones (`/promotions`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/promotions` | Lista promociones | Pública |
| GET | `/promotions/:id` | Detalle de una promoción | Pública |
| POST | `/promotions` | Crea una promoción | admin, employee |
| PUT | `/promotions/:id` | Edita una promoción | admin, employee |
| DELETE | `/promotions/:id` | Elimina una promoción | admin, employee |

### Ingredientes (`/ingredients`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/ingredients` | Lista ingredientes / inventario | admin, employee |
| POST | `/ingredients` | Crea un ingrediente | admin, employee |
| PUT | `/ingredients/:id` | Edita un ingrediente | admin, employee |
| DELETE | `/ingredients/:id` | Elimina un ingrediente | admin, employee |

### Gastos / compras (`/bills`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/bills` | Lista gastos registrados | admin, employee |
| POST | `/bills` | Registra un gasto | admin, employee |
| GET | `/bills/:id` | Detalle de un gasto | admin, employee |
| PUT | `/bills/:id` | Edita un gasto | admin, employee |
| DELETE | `/bills/:id` | Elimina un gasto | admin, employee |

### Personas (`/users`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/users/admins` | Lista administradores | admin |
| POST | `/users/admins` | Crea un administrador | admin |
| GET | `/users/employees` | Lista empleados | admin |
| POST | `/users/employees` | Crea un empleado | admin |
| PUT | `/users/employees/:id` | Edita un empleado | admin |
| DELETE | `/users/employees/:id` | Elimina un empleado | admin |
| GET | `/users/customers` | Lista clientes | admin |
| PATCH | `/users/:role/:id/reset-password` | Restablece la contraseña de una persona | admin |

### Reseñas (`/reviews`)

| Método | Endpoint | Descripción | Protección |
|---|---|---|---|
| GET | `/reviews/product/:productId` | Reseñas de un producto + promedio y conteo | Pública |
| POST | `/reviews` | Publica una reseña (solo si el cliente compró ese producto) | customer |

---

## 📸 Capturas de pantalla

> Reemplaza estos placeholders con capturas reales antes de la entrega.

| Pantalla | Captura |
|---|---|
| Home / tienda pública | ![captura](docs/home.png) |
| Menú y filtros | ![captura](docs/menu.png) |
| Detalle de producto + reseñas | ![captura](docs/producto.png) |
| Registro y verificación de cuenta | ![captura](docs/registro.png) |
| Carrito de compras | ![captura](docs/carrito.png) |
| Checkout | ![captura](docs/checkout.png) |
| Perfil e historial de pedidos | ![captura](docs/perfil.png) |
| Panel administrativo | ![captura](docs/admin.png) |
