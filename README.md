# DistroKid

Full-stack web application built with .NET 10 backend and Next.js frontend. Demonstrates REST API development, database management, JWT authentication, and client-side development.

[![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/) [![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-10-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/) [![Next.js](https://img.shields.io/badge/Next.js-React-000?style=flat-square&logo=nextdotjs)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://react.dev/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/) [![JWT](https://img.shields.io/badge/JWT-Authentication-000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)

## Tech Stack

- Backend: .NET 10, ASP.NET Core
- Frontend: Next.js, React
- Database: PostgreSQL
- Authentication: JWT

## Setup

### Prerequisites

- .NET 10 SDK
- Docker and Docker Compose
- Node.js 18+ and npm

### Quick Start

1. Install Entity Framework tools:
```powershell
dotnet tool install --global dotnet-ef --version 10.*
```

2. Start PostgreSQL database:
```powershell
cd .\DistroKid.Deployment
docker-compose -f .\docker-compose.yml -p distrokid-db up -d
```

3. Create and apply migrations:
```powershell
cd .\DistroKid.Database
.\migrate.ps1 -name InitialMigration -update
```

4. Start the backend:
```powershell
cd ..\DistroKid.Api
dotnet run
```

5. Start the frontend (optional):
```powershell
cd ..\DistroKid.Client
npm install
npm run dev
```

## Access

- Frontend: http://localhost:5000/
- API: http://localhost:5000/api/
- Swagger: http://localhost:5000/swagger

## Architecture

This project demonstrates Next.js Static Site Generation (SSG) with static file serving through a .NET package. The Next.js frontend is pre-built into static files and served directly by the ASP.NET Core backend using the `NextjsStaticHosting` package. This approach:

- Builds the Next.js application once into static HTML, CSS, and JavaScript files
- Serves frontend and backend from the same localhost:5000 endpoint
- Eliminates the need for a separate frontend server in production
- Shows how to integrate modern frontend frameworks with .NET backends

## Default Credentials

- Email: admin@default.com
- Password: default

## Database Migrations

Create a new migration:
```powershell
cd .\DistroKid.Database
.\migrate.ps1 -name <MigrationName> -update
```

## License

Educational material. See [LICENSE.md](LICENSE.md).