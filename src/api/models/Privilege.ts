import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
import User from './User';
import UserPrivilege from './UserPrivileges';
import Role from './Role';
import RolePrivilege from './RolePrivileges';

const privilegesCategories = ['general', 'user', 'role', 'privileges'] as const;
type TprivilegesCategories = typeof privilegesCategories[number];

interface PrivilegeAttributes {
    id: number;
    name: string;
    description: string;
    category: TprivilegesCategories;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type PrivilegeInput = Optional<PrivilegeAttributes, 'id'>;
export type PrivilegeInputUpdate = Optional<PrivilegeAttributes, 'id' | 'name' | 'description' | 'category'>;
export type PrivilegeOutput = Required<PrivilegeAttributes>;

class Privilege extends Model<PrivilegeAttributes, PrivilegeInput> implements PrivilegeAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public category!: TprivilegesCategories;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Privilege.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM(...privilegesCategories),
            allowNull: false
        }
    },
    {
        tableName: 'privileges',
        freezeTableName: true,
        timestamps: true,
        // paranoid: true,
        sequelize: db
    }
);

Privilege.belongsToMany(User, {
    through: UserPrivilege,
    foreignKey: {
        name: 'privilege_id'
    },
    otherKey: {
        name: 'user_id'
    }
});

Privilege.belongsToMany(Role, {
    through: RolePrivilege,
    foreignKey: {
        name: 'privilege_id'
    },
    otherKey: {
        name: 'role_id'
    }
});

export default Privilege;
