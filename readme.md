### About

{toDo}

### Installation

1. Install NPM packages
    ```sh
    npm install
    ```
2. Create `.env` file in main directory, from `.env.example`
3. Test and build the project
    ```sh
    npm run build
    ```
4. Sync database tables, if necessary
    ```sh
    npm run sync-db
    ```
5. Run the server
    ```sh
    npm run start:dev
    ```
6. Access swagger docs from `localhost:8081/docs/v1`

### Docker Development

1. Create `.env` file in main directory, from `.env.example`
2. Create local image, `docker build . -t business-manager-api:dev`
3. Run container with bind mount `docker run -d -p 8081:8081 --env-file ./.env --rm --name business-manager-api -v "$(pwd):/app" -v /app/node_modules business-manager-api:dev`
4. Access swagger docs from `localhost:8081/docs/v1`
