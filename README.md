# Fullstack Application Workshop
In this intensive Fullstack Application Workshop, you will learn how to build a modern web application from scratch using latest technologies. The workshop focuses on creating a feature-rich application that includes user authentication, CRUD operations, and containerization using Docker.

> ## **Note:** If the Prerequisite are not complete, please do not attend the workshop

## Prerequisite

### Prerequisite from **Workshop1** are required
   1. Ubuntu 22.04 LTS Linux machine
   2. Git and GitHub account configured with SSH key
   3. Docker and Docker Compose.
   4. If anything is missing please check the Prerequisite of Workshop1. [click here](https://github.com/UniCourt/WebApp-Workshop1/blob/main/README.md)

### GitHub
   1. Fork the [current](https://github.com/UniCourt/WebApp-Workshop4) repository.
   2. Clone your forked repository inside the `WORKSHOP` directory (the directory which was created during Workshop1).

### Docker
   1. Build all the docker images mentioned in `docker-compose` file. Follow the below steps.
      -  Go to `WebApp-Workshop4/`
         ```
         cd WebApp-Workshop4/
         ```
      -  Build all the docker images by running the below command.
         ```
         docker-compose build
         ```
      -  Verify if all the containers start after the build is completed by running the below command.
         ```
         docker-compose up
         ```
      -  Go to http://localhost:4200/ and verify the output  
         ```
         You are logged into dashboard
         ```

### Required VS Code Extensions
   -  [Install](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) `Angular Essentials` extension on your VS Code.
   -  [Install](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) `Prettier - Code formatter` extension on your VS Code.

## What will you learn by the end of this workshop?
#### Key Technologies Covered:

- ##### Frontend Development with Angular:
    How to create a responsive and interactive user interface using Angular, a popular frontend framework.
    Topics include component development, routing, gaurds, interceptor, form handling, integration with Nestjs backend.
    
- ##### Backend Development with NestJS:
    Server-side development using NestJS, a progressive Node.js framework.
    Concepts covered include RESTful API design, middleware, gaurds, interceptor, connecting to database using ORM & integration with Angular Frontend.
    
- ##### PostgreSQL Database Management with Prisma:
    How to set up and configure a PostgreSQL database, a powerful open-source relational database system.
    Prisma, a modern and efficient Object-Relational Mapping (ORM) tool.
    This section will cover database schema design, data modeling, and querying using Prisma.
    
- ##### Containerization with Docker:
    Understand how to containerize the fullstack application for easy deployment and scalability using Docker.

- ##### User Authentication with JWT:
    Implement secure user authentication using JSON Web Tokens (JWT).
    Includes user registration, login, token generation, and validation.

#### Project overview:
- Name: `Address Book`
- Brief: Build CRUD (Create, Read, Update, Delete) functionality for user contacts.
Features include creating new contacts, viewing a list of contacts, and deleting contacts.
By the end of this workshop, you will have the skills and knowledge needed to create a fully functional web application that incorporates frontend and backend development, database management, user authentication, and containerization, with hands-on experience and a comprehensive understanding of how to develop and deploy modern web applications using Angular, NestJS, Prisma, PostgreSQL, and Docker.

-  **Info:** Feel free to reffer the official documentaion to learn more about the framework.
    -   [Angular](https://angular.io/docs).
    -   [Nestjs](https://docs.nestjs.com/).
    -   [Prisma](https://www.prisma.io/docs).
    -   [PostgreSQL](https://www.postgresql.org/docs/).
    -   [Docker](https://docs.docker.com/)

## **Schedule**
| Time                    |   Topics
| --                      |   --
| 09:00 - 10:15           |  Database Structure & Prisma Basics
| 10:15 - 10:30           |  [ `Tea Break` ]
| 10:30 - 01:00           |  Apllication Authentication
| 1:00  - 2:00            |  [ `Break` ]
| 2:00  - 5:00            |  App CRUD operation implementation