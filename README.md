# TaskList

Este proyecto se generó utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.0.6.
consiste en una aplicación de gestión de tareas  que incluye un frontend desarrollado en Angular versión 19.0.6.  A continuación se presenta una guía para ejecutar el proyectos y cómo correr las pruebas.

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

Una vez que el servidor esté en funcionamiento, abra su navegador y navegue hasta `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifique alguno de los archivos de origen.


## Ejecución de pruebas unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io) utilice el siguiente comando:

```bash
ng test
```


Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
