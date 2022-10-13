import Role, { RoleInput, RoleInputUpdate, RoleOutput } from '../models/Role';
import Privilege from '../models/Privilege';

interface IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput>;
    getRoles(): Promise<RoleOutput[]>;
    updateRole(roleId: number, payload: RoleInputUpdate): Promise<boolean>;
    getRoleBySlug(slug: string): Promise<RoleOutput | null>;
    getRoleDetails(roleId: number): Promise<RoleOutput | null>;
    deleteRole(roleId: number): Promise<boolean>;
}

class RoleRepository implements IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput> {
        return Role.create(payload);
    }

    getRoles(): Promise<RoleOutput[]> {
        return Role.findAll();
    }

    async updateRole(roleId: number, payload: RoleInputUpdate): Promise<boolean> {
        const [updatedRoleCount] = await Role.update(payload, {
            where: {
                id: roleId
            }
        });
        return !!updatedRoleCount;
    }

    getRoleBySlug(slug: string): Promise<RoleOutput | null> {
        return Role.findOne({
            where: {
                slug: slug
            }
        });
    }

    getRoleDetails(roleId: number): Promise<RoleOutput | null> {
        return Role.findByPk(roleId, {
            attributes: ['id', 'name', 'slug', 'description'],
            include: [
                {
                    model: Privilege,
                    as: 'privileges'
                }
            ]
        });
    }

    async deleteRole(roleId: number): Promise<boolean> {
        const deletedRoleCount = await Role.destroy({
            where: {
                id: roleId
            }
        });
        return !!deletedRoleCount;
    }
}

export default new RoleRepository();
