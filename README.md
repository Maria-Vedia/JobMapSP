# JOBMAP SP

Plataforma web que conecta aspirantes con oportunidades laborales y ayuda a las empresas a encontrar talento. Esta es la **versión inicial**: página de inicio, navegación, buscador conectado a una API Express y estructura lista para crecer.

> La API incluye integración con **MySQL**. El proyecto no trae datos: no se inventan ofertas, aspirantes ni empresas. Si MySQL no está configurado, la API sigue funcionando y responde con listas vacías.

## Tecnologías y versiones

| Área | Tecnología | Versión |
|---|---|---|
| Frontend | React / React DOM | 18.3.1 |
| Frontend | Vite + @vitejs/plugin-react | 5.4.11 / 4.3.4 |
| Frontend | Tailwind CSS (v3, vía PostCSS) + autoprefixer | 3.4.17 / 10.4.20 |
| Frontend | React Router DOM | 6.28.0 |
| Frontend | lucide-react (iconos) | 0.468.0 |
| Backend | Node.js (requerido) | >= 18.18 |
| Backend | Express / cors / dotenv | 4.21.2 / 2.8.5 / 16.4.7 |
| Backend | nodemon (desarrollo) | 3.1.9 |
| Base de datos | MySQL / mysql2 | 8.x / 3.11.5 |

## Requisitos previos (Windows + Visual Studio Code)

1. Node.js LTS (18.18 o superior): https://nodejs.org
2. Visual Studio Code: https://code.visualstudio.com
3. Git (opcional): https://git-scm.com

Verificá en una terminal: `node -v` y `npm -v`.

## Estructura

```text
jobmap-sp/
├── frontend/
│   ├── index.html, package.json, vite.config.js
│   ├── tailwind.config.js, postcss.config.js, .env.example
│   └── src/
│       ├── main.jsx, App.jsx, index.css
│       ├── components/  Header, Footer, SearchBar, ProfileCard,
│       │                HowItWorks, JobCard, Loading, ProvisionalPage
│       ├── layouts/     MainLayout
│       ├── pages/       Home, Aspirantes, Empresas, Profesiones, Contacto,
│       │                Login, Register, Jobs, NotFound
│       ├── services/    api.js
│       └── assets/icons/
├── backend/
│   ├── package.json, server.js, .env.example
│   ├── config/ (db.js), database/ (schema.sql), scripts/ (init-db.js)
│   ├── routes/ controllers/ services/ repositories/ middleware/
├── .gitignore
└── README.md
```

## Instalación

Abrí la carpeta `jobmap-sp` en VS Code y usá **dos terminales** (Terminal > Nueva terminal).

Backend:

```bash
cd backend
copy .env.example .env
npm install
```

Base de datos MySQL (opcional, ver sección siguiente), luego:

```bash
npm run db:init
npm run dev
```

Frontend:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

(`copy` es el comando de CMD; en PowerShell también funciona `Copy-Item .env.example .env`.)

## Base de datos MySQL

1. Instalá MySQL Server 8.x (https://dev.mysql.com/downloads/installer/) y dejalo en ejecución.
2. Creá un usuario dedicado desde MySQL Workbench o la consola `mysql -u root -p`:

   ```sql
   CREATE USER 'jobmap'@'localhost' IDENTIFIED BY 'elegí_una_contraseña';
   GRANT ALL PRIVILEGES ON jobmap_sp.* TO 'jobmap'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Completá `backend/.env` con `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME`.
4. Ejecutá `npm run db:init` dentro de `backend/`: crea la base y las tablas (`empresas`, `profesiones`, `aspirantes`, `ofertas`) a partir de `backend/database/schema.sql`. Es seguro repetirlo (`IF NOT EXISTS`).
5. Iniciá el backend y comprobá `http://localhost:4000/api/health`: el campo `database` indica `conectada`, `no disponible` o `no configurada`.

Las tablas se crean **vacías**. Mientras no cargues ofertas, la búsqueda devuelve «sin resultados». Podés insertar tus propios registros con MySQL Workbench o sentencias `INSERT`.

Las consultas están en `backend/repositories/` y son parametrizadas (`pool.execute` con `?`); los comodines de `LIKE` se escapan. Si la base cae, la API responde `503` sin exponer detalles internos.

## Variables de entorno

**backend/.env**

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto de Express | `4000` |
| `CORS_ORIGIN` | Origen permitido por CORS | `http://localhost:5173` |
| `DB_HOST` | Servidor MySQL | `localhost` |
| `DB_PORT` | Puerto MySQL | `3306` |
| `DB_USER` | Usuario MySQL | (vacío) |
| `DB_PASSWORD` | Contraseña MySQL | (vacío) |
| `DB_NAME` | Nombre de la base | `jobmap_sp` |

**frontend/.env**

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | Base de la API | `/api` (Vite la redirige a Express) |

## URLs locales

- Frontend: http://localhost:5173
- API base: http://localhost:4000/api

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado del servidor y de la base de datos |
| GET | `/api/jobs?keyword=&location=` | Oportunidades (parámetros opcionales, máx. 100 caracteres) |
| GET | `/api/aspirantes` | Aspirantes (desde MySQL) |
| GET | `/api/empresas` | Empresas (desde MySQL) |
| GET | `/api/profesiones` | Profesiones (desde MySQL) |

Ejemplos:

```bash
curl http://localhost:4000/api/health
curl "http://localhost:4000/api/jobs?keyword=desarrollador&location=Jujuy"
```

Respuesta de `/api/jobs` (`source` es `mysql` con base configurada, o `sin-base-de-datos`):

```json
{
  "data": [],
  "total": 0,
  "filters": { "keyword": "desarrollador", "location": "Jujuy" },
  "source": "mysql"
}
```

Errores: `400` (parámetros inválidos), `404` (ruta inexistente), `503` (base de datos no disponible), `500` (error interno), siempre como `{ "error": { "status", "message" } }`.

## Rutas del frontend

`/`, `/aspirantes`, `/empresas`, `/profesiones`, `/login`, `/register`, `/jobs`, `*` (404). Se agregó además `/contacto` porque el pie de página incluye ese enlace.

## Funcionalidades implementadas

- Página de inicio según el wireframe: header, hero, buscador, «Explorá por perfil», «Cómo funciona» y footer.
- Diseño responsive y menú móvil accesible (teclado, Escape, `aria-expanded`).
- Enlace activo en la navegación (NavLink).
- Buscador controlado con validación, bloqueo durante la carga y navegación a `/jobs`.
- `/jobs` con estados de carga, error, sin resultados y con resultados; cancela solicitudes obsoletas.
- API Express modular con validación, errores consistentes y CORS.
- Integración MySQL: pool de conexiones, esquema SQL, script `db:init`, repositorios con consultas parametrizadas y manejo de errores de base de datos.

## Pendientes

- Escritura de datos (alta de ofertas, empresas y aspirantes) y su validación.
- Registro, inicio de sesión y autenticación (hoy son páginas provisionales).
- Contenido de Aspirantes, Empresas, Profesiones y Contacto en el frontend.
- Migraciones versionadas de la base de datos (hoy se usa un único `schema.sql`).
- Pruebas automatizadas.
