import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from 'net';
import { createServer } from './server';
import Logger from './utils/logger';
import AppConfig from './config/appConfig';
import { db } from './database/config';

const PORT = AppConfig.app.port;

const myArgs = process.argv.slice(2);

async function start(): Promise<Server> {
    const app = createServer();

    if (myArgs[0] === '--migrate') {
        await db.sync({ force: true });
        process.exit();
    }

    return app.listen(PORT, () => {
        Logger.debug(`App ${AppConfig.app.name} with api version ${AppConfig.app.apiVersion} is starting`);
        Logger.debug(`App is listening on port ${PORT}`);
    });
}

start();
