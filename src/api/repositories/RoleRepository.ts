import Role, { RoleInput, RoleInputUpdate, RoleOutput } from '../models/Role';
import Privilege from '../models/Privilege';
import Logger from '../../utils/logger/index';

interface IRoleRepository {
    createRole(payload: RoleInput): Promise<RoleOutput>;
    getRoles(): Promise<RoleOutput[]>;
    updateRole(roleId: number, payload: RoleInputUpdate): Promise<boolean>;
    getRoleBySlug(slug: string): Promise<RoleOutput | null>;
    getRoleById(roleId: number): Promise<Role | null>;
    getRoleDetails(roleId: number): Promise<RoleOutput | null>;
    deleteRole(roleId: number): Promise<boolean>;
    getRolePrivileges(role: Role): Promise<Privilege[]>;
    setRolePrivileges(role: Role, privilegesArr: Privilege[] | number[]): Promise<void>;
    addRolePrivileges(role: Role, privilegesArr: Privilege[] | number[]): Promise<void>;
    removeRolePrivileges(role: Role, privilegesArr: Privilege[] | number[]): Promise<void>;
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

    getRoleById(roleId: number): Promise<Role | null> {
        return Role.findByPk(roleId);
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

    async getRolePrivileges(role: Role): Promise<Privilege[]> {
        return role.getPrivileges();
    }

    async setRolePrivileges(role: Role, privilegesArr: Privilege[] | number[]): Promise<void> {
        return role.setPrivileges(privilegesArr);
    }

    async addRolePrivileges(role: Role, privilegesArr: Privilege[] | number[]): Promise<void> {
        return await role.addPrivileges(privilegesArr);
    }

    async removeRolePrivileges(role: Role, privilegesArr: Privilege[] | number[]): Promise<void> {
        return await role.removePrivileges(privilegesArr);
    }
}

export default new RoleRepository();
