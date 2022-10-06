import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { CreateUserType, UpdateUserType } from '../types/user';

async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payload: CreateUserType = req.body;
        const user = await UserService.createUser(payload);
        res.status(200).send({
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = await UserService.getUsers();
        res.status(200).send({
            message: 'Users fetched successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function getUserDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const user = await UserService.getUserDetail(userId);
        res.status(200).send({
            message: 'User details fetched successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = Number(req.params.id);
        const payload: UpdateUserType = req.body;
        await UserService.updateUser(userId, payload);
        res.status(200).send({
            message: 'User updated successfully'
        });
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = Number(req.params.id);
        await UserService.deleteUser(userId);
        res.status(200).send({
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default {
    createUser,
    getUsers,
    getUserDetail,
    updateUser,
    deleteUser
};
