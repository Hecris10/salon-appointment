# Salon Appointment Management

## Overview
This is a **Fullstack Salon Appointment Management** application built for the **code challenge**. It provides a seamless experience for scheduling and managing salon appointments using a **GraphQL API** with a **PostgreSQL database** and a **React frontend** powered by **Apollo Client**.

## Requirements
Before running this project, ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **pnpm** (Package manager) - Install via:
  ```sh
  npm install -g pnpm
  ```
- **Docker** (For database containerization)

## Tech Stack
### Backend
- **Node.js** with **Express.js** as the server framework
- **GraphQL** for API interactions
- **PostgreSQL** as the database
- **Prisma ORM** for database management
- **Docker** for containerized database setup
- **Nodemon** for development hot-reloading

### Frontend
- **React 19** for UI development
- **Apollo Client** for GraphQL API interactions
- **TypeScript** for type safety
- **TailwindCSS 4** for styling
- **Vite** as the build tool
- **Framer Motion** for animations
- **Lucide Icons** for UI elements

## Features
### Backend
- **GraphQL API** with queries and mutations for managing appointments
- **Database schema** with salons, services, and appointments
- **Prisma ORM** for database migrations and queries
- **Dockerized PostgreSQL setup** for easy local development

### Frontend
- **Appointment List**: View all scheduled appointments
- **Add Appointment**: Form to create new appointments
- **Update & Delete Appointments**: Modify or remove appointments
- **Smooth UI Animations** with Framer Motion
- **Fully responsive design** using TailwindCSS

## Project Structure
```
📦 salon-appointment-app
├── 📂 backend
│   ├── 📂 src
│   │   ├── 📂 graphql (Resolvers & Schema)
│   │   ├── 📂 database (Prisma Models)
│   │   ├── 📄 index.ts (Express & Apollo Server)
│   ├── 📄 package.json
│   ├── 📄 prisma/schema.prisma
│   ├── 📄 docker-compose.yml
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 components (Reusable UI components)
│   │   ├── 📂 pages (Main pages for the app)
│   │   ├── 📄 App.tsx
│   ├── 📄 package.json
├── 📄 README.md
```

## Database Setup with Docker
Ensure you have **Docker** installed before proceeding.

1. Navigate to the backend project root.
2. Run the following command to start PostgreSQL:
   ```sh
   docker-compose up -d
   ```

2. Apply database migrations:
   ```sh
   cd backend
   pnpm prisma:migrate
   ```

## Running the Project
### Backend
1. Install dependencies:
   ```sh
   cd backend
   pnpm install
   ```
2. Start the GraphQL server:
   ```sh
   pnpm dev
   ```
3. Access **GraphQL Playground** at `http://localhost:4000/graphql`

### Frontend
1. Install dependencies:
   ```sh
   cd frontend
   pnpm install
   ```
2. Start the React app:
   ```sh
   pnpm dev
   ```
3. Open `http://localhost:3000` in your browser.

### Initial Setup
1. Create a salon:
   - Navigate to the application in your browser.
   -Add a new salon.

2. Add services:
   - After creating a salon, go to the "Services" page.
   - Add services that your salon offers.

## Approach & Explanation
This project follows a **modern full-stack development approach** combining **GraphQL, PostgreSQL, React, and TypeScript** for a seamless user experience.

1. **GraphQL API for Flexibility**
   - Instead of REST, **GraphQL** allows fetching only required data, reducing unnecessary payloads and over-fetching.
   - With **Apollo Server**, queries and mutations are efficiently managed in the backend.

2. **PostgreSQL & Prisma for Database Management**
   - **PostgreSQL** is chosen for its **scalability** and **reliability** in handling structured data.
   - **Prisma ORM** simplifies database interactions with an intuitive API, reducing boilerplate code.

3. **React 19 & Apollo Client for Frontend**
   - **React 19** ensures optimal performance and modern UI development practices.
   - **Apollo Client** enhances **state management** with caching, real-time updates, and seamless GraphQL integration.

4. **Containerized Development with Docker**
   - Ensures database consistency across environments.
   - Easy to replicate across different machines.

5. **Efficient Styling & Animation**
   - **TailwindCSS 4** provides utility-first styling with flexibility.
   - **Framer Motion** adds smooth animations and interactions, enhancing user experience.

6. **Vite for Optimized Frontend Build**
   - **Vite** offers **fast HMR (Hot Module Replacement)**, improving development speed.
   - Faster builds and optimized bundling for production deployment.

## Deployment Considerations
For production deployment:
- Use **PostgreSQL on a managed service** (e.g., AWS RDS)
- Deploy backend to **Vercel, AWS, or DigitalOcean**
- Deploy frontend to **Vercel or Netlify**
- Use **PM2 for process management** in backend

## Contribution Guidelines
- Fork the repository
- Create a feature branch
- Commit changes with meaningful messages
- Submit a PR for review

## License
MIT License

