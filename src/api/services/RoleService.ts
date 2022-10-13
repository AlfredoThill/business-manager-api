import RoleRepository from '../repositories/RoleRepository';
import { RoleInput, RoleInputUpdate, RoleOutput } from '../models/Role';
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

export default {
    createRole,
    getRoles,
    updateRole,
    deleteRole
};
