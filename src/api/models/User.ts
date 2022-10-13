import { Model, DataTypes, Optional, BelongsToManyAddAssociationMixin } from 'sequelize';
import { db } from '../../database/config';
import Role, { RoleOutput } from './Role';
import Privilege from './Privilege';
import UserPrivileges from './UserPrivileges';

interface UserAttributes {
    id: number;
    roleId?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    role?: RoleOutput | null;
}

export type UserInput = Optional<UserAttributes, 'id' | 'role'>;
export type UserInputUpdate = Optional<UserAttributes, 'id' | 'email' | 'password'>;
export type UserOutput = Optional<UserAttributes, 'role'>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public roleId!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;

    // public addPrivilege!: BelongsToManyAddAssociationMixin;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        freezeTableName: true,
        timestamps: true,
        // paranoid: true,
        sequelize: db
    }
);

User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});

User.belongsToMany(Privilege, {
    through: UserPrivileges,
    foreignKey: {
        name: 'user_id'
    },
    otherKey: {
        name: 'privilege_id'
    }
});

export default User;
