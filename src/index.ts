import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from 'net';
import { createServer } from './server';
import Logger from './utils/logger';
import AppConfig from './config/appConfig';
import { db } from './database/config';

const PORT = AppConfig.app.port;

function startServer(): Server {
    const app = createServer();

    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    });

    return app.listen(PORT, () => {
        Logger.debug(`App ${AppConfig.app.name} with api version ${AppConfig.app.apiVersion} is starting`);
        Logger.debug(`App is listening on port ${PORT}`);
    });
}

startServer();
