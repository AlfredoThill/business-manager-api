import { NextFunction, Request, Response } from 'express';
import RoleService from '../services/RoleService';
import { CreateRoleType } from '../types/role';

async function createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const payload: CreateRoleType = req.body;
        const role = await RoleService.createRole(payload);
        res.status(200).send({
            message: 'Role created successfully',
            data: role
        });
    } catch (error) {
        next(error);
    }
}

async function getRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const roles = await RoleService.getRoles();
        res.status(200).send({
            message: 'Roles fetched successfully',
            data: roles
        });
    } catch (error) {
        next(error);
    }
}

export default {
    createRole,
    getRoles
};
