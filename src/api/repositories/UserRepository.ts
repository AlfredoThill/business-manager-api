import User, { UserInput, UserInputUpdate, UserOutput } from '../models/User';
import Role from '../models/Role';
import Privilege from '../models/Privilege';
import Logger from '../../utils/logger/index';

interface IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput>;
    getUsers(): Promise<UserOutput[]>;
    getUserDetail(userId: number): Promise<UserOutput | null>;
    getUserById(userId: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<UserOutput | null>;
    updateUser(userId: number, payload: UserInputUpdate): Promise<boolean>;
    deleteUser(userId: number): Promise<boolean>;
    getUserPrivileges(user: User): Promise<Privilege[]>;
    setUserPrivileges(user: User, privilegesArr: Privilege[] | number[]): Promise<void>;
    addUserPrivileges(user: User, privilegesArr: Privilege[] | number[]): Promise<void>;
    removeUserPrivileges(user: User, privilegesArr: Privilege[] | number[]): Promise<void>;
}

class UserRepository implements IUserRepository {
    createUser(payload: UserInput): Promise<UserOutput> {
        return User.create(payload);
    }

    getUsers(): Promise<UserOutput[]> {
        return User.findAll({
            attributes: ['id', 'roleId', 'firstName', 'lastName', 'email']
        });
    }

    getUserDetail(userId: number): Promise<UserOutput | null> {
        return User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'email'],
            include: [
                {
                    model: Role,
                    as: 'role',
                    required: false,
                    include: [
                        {
                            model: Privilege,
                            as: 'role_privileges'
                        }
                    ]
                },
                {
                    model: Privilege,
                    as: 'user_custom_privileges'
                }
            ]
        });
    }

    getUserById(userId: number): Promise<User | null> {
        return User.findByPk(userId);
    }

    getUserByEmail(email: string): Promise<UserOutput | null> {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    async updateUser(userId: number, payload: UserInputUpdate): Promise<boolean> {
        const [updatedUserCount] = await User.update(payload, {
            where: {
                id: userId
            }
        });
        return !!updatedUserCount;
    }

    async deleteUser(userId: number): Promise<boolean> {
        const deletedUserCount = await User.destroy({
            where: {
                id: userId
            }
        });
        return !!deletedUserCount;
    }

    async getUserPrivileges(user: User): Promise<Privilege[]> {
        return user.getPrivileges();
    }

    async setUserPrivileges(user: User, privilegesArr: Privilege[] | number[]): Promise<void> {
        return user.setPrivileges(privilegesArr);
    }

    async addUserPrivileges(user: User, privilegesArr: Privilege[] | number[]): Promise<void> {
        return user.addPrivileges(privilegesArr);
    }

    async removeUserPrivileges(user: User, privilegesArr: Privilege[] | number[]): Promise<void> {
        return await user.removePrivileges(privilegesArr);
    }
}

export default new UserRepository();
