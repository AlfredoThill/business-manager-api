import Privilege, { PrivilegeInput, PrivilegeInputUpdate, PrivilegeOutput } from '../models/Privilege';

interface IPrivilegeRepository {
    createPrivilege(payload: PrivilegeInput): Promise<PrivilegeOutput>;
    getPrivilegeByName(name: string): Promise<PrivilegeOutput | null>;
    getPrivilegeById(privilegeId: number): Promise<PrivilegeOutput | null>;
    getPrivileges(): Promise<PrivilegeOutput[]>;
    updatePrivilege(privilegeId: number, payload: PrivilegeInputUpdate): Promise<boolean>;
    deletePrivilege(privilegeId: number): Promise<boolean>;
}

class PrivilegeRepository implements IPrivilegeRepository {
    createPrivilege(payload: PrivilegeInput): Promise<PrivilegeOutput> {
        return Privilege.create(payload);
    }

    getPrivilegeByName(name: string): Promise<PrivilegeOutput | null> {
        return Privilege.findOne({
            where: {
                name
            }
        });
    }

    getPrivilegeById(privilegeId: number): Promise<PrivilegeOutput | null> {
        return Privilege.findByPk(privilegeId);
    }

    getPrivileges(): Promise<PrivilegeOutput[]> {
        return Privilege.findAll({
            attributes: ['id', 'name', 'description', 'category']
        });
    }

    async updatePrivilege(privilegeId: number, payload: PrivilegeInputUpdate): Promise<Required<boolean>> {
        const [updatedPrivilegeCount] = await Privilege.update(payload, {
            where: {
                id: privilegeId
            }
        });
        return !!updatedPrivilegeCount;
    }

    async deletePrivilege(privilegeId: number): Promise<boolean> {
        const deletedPrivilegeCount = await Privilege.destroy({
            where: {
                id: privilegeId
            }
        });
        return !!deletedPrivilegeCount;
    }
}

export default new PrivilegeRepository();
