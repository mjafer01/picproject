# Project README

## Version: 3.8

This README provides detailed instructions and information about the services configured for this project version 3.8.

### Table of Contents
- [Project Overview](#project-overview)
- [Services](#services)
  - [API Service](#api-service)
  - [App Service](#app-service)
  - [Storybook Service](#storybook-service-commented-out)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Services](#running-the-services)
- [Environment Variables](#environment-variables)
- [Volumes](#volumes)
- [Ports](#ports)
- [Dependencies](#dependencies)

## Project Overview
This project is a full-stack web application with a backend API and a frontend application. The backend is built with Node.js, while the frontend is built with a modern JavaScript framework. This README will guide you through the setup and running of these services using Docker.

**Note:** This project is designed to be run using Docker. Running the services outside of Docker may not be supported and could lead to issues.

## Services

### API Service
- **Directory**: `./api`
- **Build Context**: `api`
- **Ports**: Exposes port `3005` on the host to port `3005` in the container.
- **Volumes**:
  - Mounts `./api` directory to `/app` in the container.
  - Mounts `/app/node_modules` as a volume to handle dependencies.
- **Environment**: Sets `NODE_ENV` to `development`.
- **Command**: Runs `yarn start:dev` to start the development server.
- **Documentation**: API documentation can be found at [http://localhost:3005/api-docs](http://localhost:3005/api-docs).

### App Service
- **Directory**: `./frontend`
- **Build Context**: `frontend`
- **Ports**: Exposes port `3001` and `3000` on the host to ports `3001` and `3000` in the container.
- **Volumes**:
  - Mounts `./frontend` directory to `/app` in the container.
  - Mounts `/app/node_modules` as a volume to handle dependencies.
- **Environment**: Sets `NODE_ENV` to `development`.
- **Command**: Runs `yarn start` to start the frontend development server.
- **Depends On**: Depends on the `api` service to be running.
- **Documentation**: Frontend documentation (including Storybook if enabled) can be found at [http://localhost:6006/](http://localhost:6006/).

### Storybook Service (commented out)
- **Directory**: `./frontend`
- **Build Context**: `frontend`
- **Ports**: Exposes port `6006` on the host to port `6006` in the container.
- **Volumes**:
  - Mounts `./frontend` directory to `/app` in the container.
  - Mounts `/app/node_modules` as a volume to handle dependencies.
- **Depends On**: Depends on the `app` service to be running.
- **Documentation**: Storybook documentation can be found at [http://localhost:6006/](http://localhost:6006/).

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine.
- Yarn package manager installed globally.

### Running the Services
To start the services, use Docker Compose:

1. **Navigate to the project directory** where the `docker-compose.yml` file is located:
    ```sh
    cd /path/to/your/project
    ```

2. **Start the services**:
    ```sh
    docker-compose up
    ```

   This command will build and start all the services defined in the `docker-compose.yml` file. Docker Compose will pull the necessary images (if they are not already available locally), build the images, and start the containers.

3. **Access the services**:
  - **API Service**: [http://localhost:3005](http://localhost:3005)
  - **Frontend Service**: [http://localhost:3000](http://localhost:3000)
  - **Storybook Service** (if enabled): [http://localhost:6006](http://localhost:6006)

   **Note:** Ensure that the `api` service is running before starting the `app` service, and that the `app` service is running before starting the `storybook` service if you choose to enable it.

4. **Stop the services**:
   To stop the running services, press `Ctrl+C` in the terminal where `docker-compose up` is running. You can also run:
    ```sh
    docker-compose down
    ```
   This command will stop and remove the containers created by `docker-compose up`.

**Note:** This project must be run using Docker. Running the services outside of Docker may not be supported and could lead to issues.

## Environment Variables
Detailed information on required environment variables can be added here if needed.

## Volumes
- **API Service**: Mounts `./api` and `/app/node_modules` volumes.
- **App Service**: Mounts `./frontend` and `/app/node_modules` volumes.

## Ports
- **API Service**: Exposes port `3005`.
- **App Service**: Exposes ports `3000` and `3001`.
- **Storybook Service**: Exposes port `6006`.


## Dependencies
