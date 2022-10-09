import { Request, Response, NextFunction } from 'express';
import AppConfig from '../../../config/appConfig';
import Logger from '../../../utils/logger';

type ResponseType = {
    message?: string;
};

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    const response: ResponseType = {};
    if (err.message) {
        const logs = {
            type: err.name,
            message: err.message,
            method: req.method,
            path: req.path,
            params: req.route.path,
            body: req.body,
            query: req.query,
            stack: err.stack
        };
        Logger.error(JSON.stringify(logs));
        response.message = AppConfig.app.isDevelopment ? err.message : 'Something wrong!';
    }

    res.status(err.status || 500).send(response);
}

export default errorHandler;
