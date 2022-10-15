import {
    Model,
    DataTypes,
    Optional,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin
} from 'sequelize';
import { db } from '../../database/config';
import Privilege from './Privilege';
import RolePrivilege from './RolePrivileges';

interface RoleAttributes {
    id: number;
    name: string;
    slug: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type RoleInput = Optional<RoleAttributes, 'id' | 'slug'>;
export type RoleInputUpdate = Optional<RoleAttributes, 'id' | 'name' | 'slug'>;
export type RoleOutput = Required<RoleAttributes>;

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;

    public getPrivileges!: BelongsToManyGetAssociationsMixin<Privilege>;
    public setPrivileges!: BelongsToManySetAssociationsMixin<Privilege | number, { through: RolePrivilege }>;
    public addPrivilege!: BelongsToManyAddAssociationMixin<Privilege | number, { through: RolePrivilege }>;
    public addPrivileges!: BelongsToManyAddAssociationsMixin<Privilege | number, { through: RolePrivilege }>;
    public removePrivilege!: BelongsToManyRemoveAssociationMixin<Privilege | number, { through: RolePrivilege }>;
    public removePrivileges!: BelongsToManyRemoveAssociationsMixin<Privilege | number, { through: RolePrivilege }>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Role.init(
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
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'roles',
        freezeTableName: true,
        timestamps: true,
        // paranoid: true,
        sequelize: db
    }
);

Role.belongsToMany(Privilege, {
    through: RolePrivilege,
    foreignKey: {
        name: 'role_id'
    },
    otherKey: {
        name: 'privilege_id'
    }
});

export default Role;
