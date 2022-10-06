import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput, UserInputUpdate, UserOutput } from '../models/User';

async function createUser(payload: UserInput): Promise<UserOutput> {
    const user = await UserRepository.getUserByEmail(payload.email);

    if (user) {
        throw new Error('Email must be unique');
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
        throw new Error('User not found');
    }

    return user;
}

async function updateUser(userId: number, payload: UserInputUpdate): Promise<boolean> {
    const user = await UserRepository.getUserDetail(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return UserRepository.updateUser(userId, payload);
}

async function deleteUser(userId: number): Promise<boolean> {
    const user = await UserRepository.getUserDetail(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return UserRepository.deleteUser(userId);
}

export default {
    createUser,
    getUsers,
    getUserDetail,
    updateUser,
    deleteUser
};
