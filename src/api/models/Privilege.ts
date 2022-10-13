import { Model, DataTypes } from 'sequelize';
import { db } from '../../database/config';

interface PrivilegeAttributes {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type PrivilegeInput = PrivilegeAttributes;
export type PrivilegeOutput = Required<PrivilegeAttributes>;

class Privilege extends Model<PrivilegeAttributes, PrivilegeInput> implements PrivilegeAttributes {
    public id!: number;
    public name!: string;
    public slug!: string;
    public description!: string;

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

export default Privilege;
