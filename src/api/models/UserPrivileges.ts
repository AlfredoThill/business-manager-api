import { Model, DataTypes } from 'sequelize';
import { db } from '../../database/config';

interface UserPrivilegeAttributes {
    id: number;
    user_id: number;
    privilege_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type UserPrivilegeInput = UserPrivilegeAttributes;
export type UserPrivilegeOutput = Required<UserPrivilegeAttributes>;

class UserPrivilege extends Model<UserPrivilegeAttributes, UserPrivilegeInput> implements UserPrivilegeAttributes {
    public id!: number;
    public user_id!: number;
    public privilege_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

UserPrivilege.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        privilege_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'user_privilege',
        freezeTableName: true,
        timestamps: true,
        // paranoid: true,
        sequelize: db
    }
);

export default UserPrivilege;
