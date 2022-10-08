import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginType } from '../types/auth';

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payload: LoginType = req.body;
        const token = await AuthService.login(payload);
        res.status(200).send({
            message: 'Logged in successfully',
            data: token
        });
    } catch (error) {
        next(error);
    }
}

export default {
    login
};
