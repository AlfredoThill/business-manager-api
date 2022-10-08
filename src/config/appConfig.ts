const AppConfig = {
    app: {
        name: process.env.APP_NAME,
        server: process.env.SERVER,
        isDevelopment: ['development', 'dev', 'local'].includes(<string>process.env.SERVER),
        port: parseInt(<string>process.env.PORT, 10) || 8081,
        apiVersion: process.env.API_VERSION || 'v1',
        secret: process.env.SECRET || 'j!89nKO5as&Js'
    },
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(<string>process.env.DB_PORT, 10) || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        isLogging: process.env.DB_LOG === 'true'
    }
};

export default Object.freeze(AppConfig);
