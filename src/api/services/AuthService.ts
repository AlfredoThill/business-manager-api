import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import { UserInput } from '../models/User';
import JWT from '../../utils/jwt';

async function login(payload: UserInput): Promise<string> {
    const user = await UserRepository.getUserByEmail(payload.email);

    if (!user) {
        const err = new Error('User not found');
        err.status = 400;
        throw err;
    }

    const isValid = bcrypt.compareSync(payload.password, user.password);

    if (!isValid) {
        const err = new Error('Email and Password is not match');
        err.status = 400;
        throw err;
    }

    const token = await JWT.signToken(user.id);

    if (!token) {
        const err = new Error('Invalid token');
        err.status = 401;
        throw err;
    }

    return token;
}

export default {
    login
};
