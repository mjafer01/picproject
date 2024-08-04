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
- [Commands](#commands)
- [Dependencies](#dependencies)
- [Contact](#contact)

## Project Overview
This project is a full-stack web application with a backend API and a frontend application. The backend is built with Node.js, while the frontend is built with a modern JavaScript framework. This README will guide you through the setup and running of these services using Docker.

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

### Storybook Service (commented out)
- **Directory**: `./frontend`
- **Build Context**: `frontend`
- **Ports**: Exposes port `6006` on the host to port `6006` in the container.
- **Volumes**:
    - Mounts `./frontend` directory to `/app` in the container.
    - Mounts `/app/node_modules` as a volume to handle dependencies.
- **Depends On**: Depends on the `app` service to be running.

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine.
- Yarn package manager installed globally.

### Running the Services
To start the services, use Docker Compose:
```sh
docker-compose up
