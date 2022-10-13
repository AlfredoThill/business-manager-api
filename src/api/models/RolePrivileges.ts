import { Model, DataTypes } from 'sequelize';
import { db } from '../../database/config';

interface RolePrivilegeAttributes {
    id: number;
    role_id: number;
    privilege_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type RolePrivilegeInput = RolePrivilegeAttributes;
export type RolePrivilegeOutput = Required<RolePrivilegeAttributes>;

class RolePrivilege extends Model<RolePrivilegeAttributes, RolePrivilegeInput> implements RolePrivilegeAttributes {
    public id!: number;
    public role_id!: number;
    public privilege_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

RolePrivilege.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        privilege_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'role_privileges',
        freezeTableName: true,
        timestamps: true,
        // paranoid: true,
        sequelize: db
    }
);

export default RolePrivilege;
