# Angular Workshop
Workshop on understanding Angular framework for building efficient, scalable and sophisticated single-page apps. Angular provides a standard structure for developers to work with.
-  **Info:** You can refer Angular [doc](https://angular.io/docs) to learn more about the framework.

> ## **Note:** If the Prerequisite are not complete, please do not attend the workshop

## Prerequisite

### Prerequisite from **Workshop1** are required
   1. Ubuntu 22.04 LTS Linux machine
   2. Git and GitHub account configured with SSH key
   3. Docker and Docker Compose.
   4. If anything is missing please check the Prerequisite of Workshop1. [click here](https://github.com/UniCourt/WebApp-Workshop1/blob/main/README.md)

### GitHub
   1. Fork the [current](https://github.com/UniCourt/WebApp-Workshop3) repository.
   2. Clone your forked repository inside the `WORKSHOP` directory which was created during Workshop1.

### Docker
   1. Download the follwing docker images to your local machine
      -  ```
         docker pull node:18.16.0-alpine3.17
         ```
         -  Verify the image is pulled into your local machine
            ``` 
            docker run --rm -ti node:18.16.0-alpine3.17 node -v
            ```
            Output: **v18.16.0**
   2. Build all the docker images mentioned in `docker-compose` file. Follow the below steps.
      -  Go to `WebApp-Workshop3/`
         ```
         cd WebApp-Workshop3/
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
         Congratulations! Angular set up is complete.
         You are ready to begin the workshop3.
         ```

### Required VS Code Extensions
   -  [Install](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) `Angular Essentials` extension on your VS Code.
   -  [Install](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) `Prettier - Code formatter` extension on your VS Code.

## What will you learn by the end of this workshop?
- In this workshop you will understand and learn about Angular framework which is a component based framework used for building scalable single-page apps.
- You will know the concepts Components, Services, Guards, Interceptors etc.
- Build an User application UI using Angular.

## **Schedule**
| Time                    |   Topics
| --                      |   --
| 09:00 - 10:15           |  Angular Basics
| 10:15 - 10:30           |  [ `Tea Break` ]
| 10:30 - 01:00           |  Angular Basics
| 1:00  - 2:00            |  [ `Break` ]
| 2:00  - 5:00            |  Angular Service Concepts