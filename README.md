## Electron + Express/Sequelize/Sqlite + React + Typescript app

After clone repository run: `yarn`

## Available Scripts

In the project directory, you can run:

### `yarn server:dev`

Runs the app server in the development mode on http://localhost:5000.
The page will reload when you make changes.

### `yarn electron:dev`

Runs the electron + react app in development mode.
The page will reload when you make changes.

### `yarn build-win`

To build a ready-made application for Windows (under Windows system)

## Application for Linux (under Windows)

### `docker pull electronuserland/builder`

Downloading the Docker repository

### `docker run --rm -ti -v C:\MyApp:/project -w /project electronuserland/builder`

Launching the application in a Docker container

### `yarn`

Pulls dependencies into a container

### `electron-builder`

Create an electron + react application for Linux in production mode.
