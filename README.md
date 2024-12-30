# TaskList

Este proyecto se generó utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.0.6.
Este proyecto consiste en una aplicación de gestión de tareas  que incluye un frontend desarrollado en Angular versión 19.0.6.  A continuación se presenta una guía para ejecutar el proyectos y cómo correr las pruebas.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 22.12.0)
- [Angular CLI](https://github.com/angular/angular-cli) (versión 19.0.6)


## Ejecutar el Proyecto

Para iniciar el proyecto primero es necesario descargar los archivos de node_modules , ejecute:


```bash
npm install
```
Para iniciar un servidor de desarrollo local, ejecute:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
