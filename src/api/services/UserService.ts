import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import User, { UserInput, UserInputUpdate, UserOutput } from '../models/User';
import Privilege from '../models/Privilege';

async function createUser(payload: UserInput): Promise<UserOutput> {
    const user = await UserRepository.getUserByEmail(payload.email);

    if (user) {
        const err = new Error('Email must be unique');
        err.status = 422;
        throw err;
    }

    const hashedPassword = bcrypt.hashSync(payload.password, 5);

    return UserRepository.createUser({
        ...payload,
        password: hashedPassword
    });
}

function getUsers(): Promise<UserOutput[]> {
    return UserRepository.getUsers();
}

async function getUserDetail(userId: number): Promise<UserOutput> {
    const user = await UserRepository.getUserDetail(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 400;
        throw err;
    }

    return user;
}

async function updateUser(userId: number, payload: UserInputUpdate): Promise<boolean> {
    const user = await UserRepository.getUserById(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    return UserRepository.updateUser(userId, payload);
}

async function deleteUser(userId: number): Promise<boolean> {
    const user = await UserRepository.getUserById(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    return UserRepository.deleteUser(userId);
}

async function getUserPrivileges(userId: number): Promise<Privilege[]> {
    const user = await UserRepository.getUserById(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    return UserRepository.getUserPrivileges(user);
}

async function setUserPrivileges(userId: number, privilegesArr: Privilege[] | number[]): Promise<boolean> {
    const user = await UserRepository.getUserById(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    await UserRepository.setUserPrivileges(user, privilegesArr);

    return true;
}

async function addUserPrivileges(userId: number, privilegesArr: Privilege[] | number[]): Promise<boolean> {
    const user = await UserRepository.getUserById(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    await UserRepository.addUserPrivileges(user, privilegesArr);

    return true;
}

async function removeUserPrivileges(userId: number, privilegesArr: Privilege[] | number[]): Promise<boolean> {
    const user = await UserRepository.getUserById(userId);

    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    await UserRepository.removeUserPrivileges(user, privilegesArr);

    return true;
}

export default {
    createUser,
    getUsers,
    getUserDetail,
    updateUser,
    deleteUser,
    getUserPrivileges,
    setUserPrivileges,
    addUserPrivileges,
    removeUserPrivileges
};
