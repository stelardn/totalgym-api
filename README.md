# TotalGym API

This repository contains a TypeScript-based API using Fastify for managing gym check-ins. It includes basic PostgreSQL integration and can be easily set up using Docker Compose.

## Features

- RESTful API endpoints for gym check-ins.
- User authentication control with JWT and refresh token.
- User authorization with two access levels: ADMIN or MEMBER.
- PostgreSQL database integration for storing check-in records.
- Dockerized setup for easy deployment.

## Prerequisites

Before running the API, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- Docker
- Docker Compose

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/stelardn/totalgym-api.git
   cd totalgym-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory based on `.env.example`. Add your PostgreSQL database credentials.

4. **Start the PostgreSQL database using Docker Compose:**

   ```bash
   docker-compose up -d
   ```

5. **Run database migrations:**

   ```bash
   npm run migrate
   ```

6. **Start the Fastify server:**

   ```bash
   npm start
   ```

   The API server should now be running locally at the port specified on your .env file.

## API Endpoints
### User Endpoints

- `POST /users`: Create a new user account providing name, email and password.
- `POST /sessions'`: Create a session (authenticate).
- `PATCH /token/refresh`: Generate a new token based if a refresh token is available on Cookies.
- `GET /me`: Get user info (if the user has an ongoing valid session).

### Gym Endpoints

- `POST /gyms`: Create a new gym record. Only available for ADMIN roles.
- `GET /gyms/search?q=`: Get a paginated list of the gyms with names that match a query specified by the user.
- `GET /gyms/nearby`: Get a list of the gyms within 10 km of distance from the authenticated user location (using latitude and longitude).

### Checkin Endpoints

- `POST /gyms/:gymId/check-in`: Create a new check-in record.
- `GET /check-ins/history`: Get a history of the check-ins of the user with active session.
- `GET /check-ins/metrics`: Get a count of the check-ins of the user with active session.
- `PATCH /check-ins/:checkInId/validate`: Validate a check-in within 20 minutes from its creation. Only available for ADMIN roles. 

## Development

For development purposes, you can use the following npm scripts:

- `npm run start:dev`: Start the server in development mode with TypeScript watch mode using `tsx`.

  ```bash
  npm run start:dev
  ```

- `npm start`: Start the server in production mode after building TypeScript files.

  ```bash
  npm start
  ```

- `npm run build`: Build TypeScript files to the `build` directory.

  ```bash
  npm run build
  ```

- `npm test`: Run unit tests for the use cases located in `src/use-cases`.

  ```bash
  npm test
  ```

- `npm run test:watch`: Run unit tests in watch mode for use cases.

  ```bash
  npm run test:watch
  ```

### End-to-End Testing

Before running end-to-end tests (`test:e2e`), ensure you have set up the Prisma environment:

- `npm run test:create-prisma-environment`: Create the Prisma environment for testing.

  ```bash
  npm run test:create-prisma-environment
  ```

- `npm run test:install-prisma-environment`: Install the Prisma environment for testing.

  ```bash
  npm run test:install-prisma-environment
  ```

- `npm run pretest:e2e`: Prepare for end-to-end testing by setting up the Prisma environment.

  ```bash
  npm run pretest:e2e
  ```

- `npm run test:e2e`: Run end-to-end tests located in `src/http`.

  ```bash
  npm run test:e2e
  ```

- `npm run test:coverage`: Run unit tests with coverage reporting.

  ```bash
  npm run test:coverage
  ```

```
