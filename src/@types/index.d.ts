import 'express';
import { UserOutput } from '../api/models/User';

declare global {
    interface Error {
        status?: number;
    }
    namespace Express {
        interface Request {
            userdata: UserOutput;
        }
    }
}
