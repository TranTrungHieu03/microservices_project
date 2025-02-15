import {DataTypes, Model, Sequelize} from "sequelize";
import {Role, Status} from "../../../model";

export class UserPersistence extends Model {
}

export const modelName = "User"

export function init(sequelize: Sequelize) {
    UserPersistence.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "first_name"
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "last_name"
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            birthDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "birth_date"
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: Role.USER
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: Status.ACTIVE
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: modelName,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            tableName: "users"
        });
}