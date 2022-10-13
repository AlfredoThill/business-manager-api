import PrivilegeRepository from '../repositories/PrivilegeRepository';
import { PrivilegeInput, PrivilegeInputUpdate, PrivilegeOutput } from '../models/Privilege';

async function createPrivilege(payload: PrivilegeInput): Promise<PrivilegeOutput> {
    const privilege = await PrivilegeRepository.getPrivilegeByName(payload.name);

    if (privilege) {
        const err = new Error('privilege already exists');
        err.status = 422;
        throw err;
    }

    return PrivilegeRepository.createPrivilege({
        ...payload
    });
}

function getPrivileges(): Promise<PrivilegeOutput[]> {
    return PrivilegeRepository.getPrivileges();
}

function updatePrivilege(privilegeId: number, payload: PrivilegeInputUpdate): Promise<boolean> {
    return PrivilegeRepository.updatePrivilege(privilegeId, payload);
}

function deletePrivilege(privilegeId: number): Promise<boolean> {
    return PrivilegeRepository.deletePrivilege(privilegeId);
}

export default {
    createPrivilege,
    getPrivileges,
    updatePrivilege,
    deletePrivilege
};
