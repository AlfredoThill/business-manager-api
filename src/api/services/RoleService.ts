import RoleRepository from '../repositories/RoleRepository';
import { RoleInput, RoleInputUpdate, RoleOutput } from '../models/Role';
import Privilege from '../models/Privilege';
import { slugify } from '../../utils/helpers';

async function createRole(payload: RoleInput): Promise<RoleOutput> {
    const slug = slugify(payload.name);
    const role = await RoleRepository.getRoleBySlug(slug);

    if (role) {
        const err = new Error('Role already exists');
        err.status = 422;
        throw err;
    }

    return RoleRepository.createRole({
        ...payload,
        slug
    });
}

function getRoles(): Promise<RoleOutput[]> {
    return RoleRepository.getRoles();
}

function updateRole(roleId: number, payload: RoleInputUpdate): Promise<boolean> {
    return RoleRepository.updateRole(roleId, payload);
}

function deleteRole(roleId: number): Promise<boolean> {
    return RoleRepository.deleteRole(roleId);
}

async function getRolePrivileges(roleId: number): Promise<Privilege[]> {
    const role = await RoleRepository.getRoleById(roleId);

    if (!role) {
        const err = new Error('Role not found');
        err.status = 404;
        throw err;
    }

    return RoleRepository.getRolePrivileges(role);
}

async function setRolePrivileges(roleId: number, privilegesArr: Privilege[] | number[]): Promise<boolean> {
    const role = await RoleRepository.getRoleById(roleId);

    if (!role) {
        const err = new Error('Role not found');
        err.status = 404;
        throw err;
    }

    await RoleRepository.setRolePrivileges(role, privilegesArr);

    return true;
}

async function addRolePrivileges(roleId: number, privilegesArr: Privilege[] | number[]): Promise<boolean> {
    const role = await RoleRepository.getRoleById(roleId);

    if (!role) {
        const err = new Error('Role not found');
        err.status = 404;
        throw err;
    }

    await RoleRepository.addRolePrivileges(role, privilegesArr);

    return true;
}

async function removeRolePrivileges(roleId: number, privilegesArr: Privilege[] | number[]): Promise<boolean> {
    const role = await RoleRepository.getRoleById(roleId);

    if (!role) {
        const err = new Error('Role not found');
        err.status = 404;
        throw err;
    }

    await RoleRepository.removeRolePrivileges(role, privilegesArr);

    return true;
}

export default {
    createRole,
    getRoles,
    updateRole,
    deleteRole,
    getRolePrivileges,
    setRolePrivileges,
    addRolePrivileges,
    removeRolePrivileges
};
