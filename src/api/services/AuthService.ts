import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput } from '../models/User';
import JWT from '../../utils/jwt';

async function login(payload: UserInput): Promise<string> {
    const user = await UserRepository.getUserByEmail(payload.email);

    if (!user) {
        throw new Error('User not found');
    }

    const isValid = bcrypt.compareSync(payload.password, user.password);

    if (!isValid) {
        throw new Error('Email and Password is not match');
    }

    const token = await JWT.signToken(user.id);

    if (!token) {
        throw new Error('Invalid token');
    }

    return token;
}

export default {
    login
};
