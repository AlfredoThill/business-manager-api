### About

{toDo}

### Local Setup

Before installation, make sure you have the following prerequisites

-   NPM
    ```sh
    npm install npm@latest -g
    ```
-   MySQL server

### Installation

1. Clone the repo or simply select [use this template](https://github.com/arifintahu/project-structure-api/generate)
    ```sh
    git clone https://github.com/arifintahu/project-structure-api.git
    ```
2. Install NPM packages
    ```sh
    npm ci
    ```
3. Create `.env` file in main directory, from `.env.example`
4. Test and build the project
    ```sh
    npm run build
    ```
5. Sync database tables, if necessary 
    ```sh
    npm run sync-db
    ```
6. Run the server
    ```sh
    npm run start
    ```
8. Access swagger docs from `localhost:8081/docs/v1`
