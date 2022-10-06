import RoleRepository from '../repositories/RoleRepository';
import { RoleInput, RoleOutput } from '../models/Role';
import { slugify } from '../../utils/helpers';

async function createRole(payload: RoleInput): Promise<RoleOutput> {
    const slug = slugify(payload.name);
    const role = await RoleRepository.getRoleBySlug(slug);

    if (role) {
        throw new Error('Role is exist');
    }

    return RoleRepository.createRole({
        ...payload,
        slug
    });
}

function getRoles(): Promise<RoleOutput[]> {
    return RoleRepository.getRoles();
}

export default {
    createRole,
    getRoles
};
