# Institute Management System

A full-stack institute administration and learning platform built with Spring Boot and Angular. It provides a public course experience, separate admin and student authentication, course and student management, enrollments, learning progress, reports, and contact-message handling.

![Institute Management System desktop interface](./ui-blue-purple-desktop.png)

## Features

### Public experience

- Responsive home, courses, course details, about, and contact pages
- Course search and public course catalog
- Student enrollment and contact inquiry forms
- Dedicated SEO-focused public website

### Student experience

- Student login and protected dashboard
- Enrolled-course overview
- Token-based access to learning content
- Course progress tracking

### Admin experience

- Secure admin login and protected routes
- Dashboard with institute statistics
- Course creation, editing, viewing, and deletion
- Student creation, editing, status management, and deletion
- Enrollment and learning-progress administration
- Contact-message management
- Reports and operational summaries

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Backend | Java 17, Spring Boot 3.5, Spring Web, Spring Data JPA, Maven |
| Management UI | Angular 17, Angular Material, TypeScript, RxJS, SCSS |
| Public website | Angular 20, TypeScript, RxJS, SCSS, Angular Service Worker |
| Local database | MySQL 8 |
| Production database | PostgreSQL |
| Testing | JUnit, Spring Boot Test, Jasmine, Karma |

## Project Structure

```text
Institute-Management-System-main/
|-- backend/backend/       Spring Boot REST API
|-- frontend/              Angular management and learning application
|-- public-website/        Angular public marketing website
|-- docker-compose.yml     Local service definitions
|-- setup.bat              Installs management frontend dependencies
|-- start-system.bat       Starts the backend and management frontend
|-- PROJECT_DOCUMENTATION.md
|-- DEPLOYMENT_GUIDE.md
`-- TROUBLESHOOTING.md
```

## Prerequisites

Install the following software before starting the project:

- Java Development Kit 17 or newer
- Node.js 18 or newer with npm
- MySQL 8
- Git

The repository includes Maven Wrapper scripts, so a separate Maven installation is not required.

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/virendrasonar/Institute-Management-System.git
cd Institute-Management-System
```

### 2. Create and configure the database

Start MySQL and create the local database:

```sql
CREATE DATABASE ims;
```

Set the local database connection variables before starting the backend:

```powershell
$env:MYSQL_URL = "jdbc:mysql://localhost:3306/ims?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata"
$env:MYSQL_USERNAME = "your_mysql_username"
$env:MYSQL_PASSWORD = "your_mysql_password"
```

Never commit real database credentials or production secrets.

### 3. Configure the development admin

```powershell
$env:ADMIN_EMAIL = "admin@example.com"
$env:ADMIN_PASSWORD = "choose_a_strong_password"
$env:ADMIN_NAME = "Administrator"
```

Student accounts are created and managed through the admin interface.

### 4. Start the backend

From the repository root:

```powershell
cd backend\backend
.\mvnw.cmd spring-boot:run
```

The API starts at `http://localhost:8080`.

### 5. Start the management frontend

Open another terminal from the repository root:

```powershell
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

### 6. Start the public website (optional)

The public website is a separate Angular application. Run it on port `4300` to avoid a port conflict with the management frontend:

```powershell
cd public-website
npm install
npm start -- --port 4300
```

Open `http://localhost:4300`.

## Windows Quick Start

After MySQL is running, the `ims` database exists, and your environment variables are configured, use the included scripts:

```powershell
.\setup.bat
.\start-system.bat
```

`start-system.bat` launches the Spring Boot backend and Angular management frontend in separate windows. It does not start MySQL or the optional public website.

## Application URLs

| Service | URL |
| --- | --- |
| Management frontend | `http://localhost:4200` |
| Public website | `http://localhost:4300` |
| Backend API | `http://localhost:8080` |
| Public API health check | `http://localhost:8080/api/public/health` |
| MySQL | `localhost:3306` |

## Main API Routes

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/admin/auth/login` | Admin login |
| `POST` | `/admin/auth/logout` | Admin logout |
| `POST` | `/api/student/auth/login` | Student login |
| `POST` | `/api/student/auth/logout` | Student logout |
| `GET` | `/api/student/dashboard` | Authenticated student dashboard |

### Admin resources

| Resource | Endpoints |
| --- | --- |
| Courses | `GET/POST /admin/courses`, `GET/PUT/DELETE /admin/courses/{id}` |
| Students | `GET/POST /admin/students`, `GET/PUT/DELETE /admin/students/{id}` |
| Messages | `GET/POST /admin/messages`, `GET/DELETE /admin/messages/{id}` |
| Enrollments | `GET /admin/enrollments` |

### Public resources

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/public/courses` | List public courses |
| `GET` | `/api/public/courses/{id}` | View a course |
| `POST` | `/api/public/courses/{id}/enroll` | Enroll in a course |
| `GET` | `/api/public/learning/{accessToken}` | Load learning content |
| `PUT` | `/api/public/learning/{accessToken}/progress` | Update course progress |
| `POST` | `/api/public/contact` | Submit a contact message |
| `GET` | `/api/public/institute-info` | Get public institute details |
| `GET` | `/api/public/health` | Check API health |

Admin and student protected endpoints require the authentication token returned by their respective login endpoint.

## Configuration

Common backend environment variables:

| Variable | Purpose |
| --- | --- |
| `MYSQL_URL` | Local MySQL JDBC connection URL |
| `MYSQL_USERNAME` | Local database username |
| `MYSQL_PASSWORD` | Local database password |
| `ADMIN_EMAIL` | Initial admin email |
| `ADMIN_PASSWORD` | Initial admin password |
| `ADMIN_NAME` | Initial admin display name |
| `ADMIN_SESSION_HOURS` | Admin session lifetime |
| `STUDENT_SESSION_HOURS` | Student session lifetime |
| `SPRING_DATASOURCE_URL` | Production PostgreSQL JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | Production database username |
| `SPRING_DATASOURCE_PASSWORD` | Production database password |
| `PORT` | Production backend port |

Frontend API URLs are configured in each application's `src/environments/` directory.

## Build and Test

### Backend

```powershell
cd backend\backend
.\mvnw.cmd test
.\mvnw.cmd clean package
```

### Management frontend

```powershell
cd frontend
npm test
npm run build
```

### Public website

```powershell
cd public-website
npm test
npm run build:prod
```

## Additional Documentation

- [Project documentation](./PROJECT_DOCUMENTATION.md)
- [Deployment guide](./DEPLOYMENT_GUIDE.md)
- [Maintenance guide](./MAINTENANCE.md)
- [Troubleshooting guide](./TROUBLESHOOTING.md)
- [Public website content management](./public-website/CONTENT-MANAGEMENT.md)

## Author

Virendra Sonar

## License

No license file is currently included. Add a `LICENSE` file before distributing or reusing the project outside its intended context.
