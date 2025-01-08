import {DataTypes, Model, Sequelize} from "sequelize";
import {ModelStatus} from "../../../../share/model/base-model";

export class CategoryPersistence extends Model {
    declare id: string;
    declare status: string
    
}

export const modelName = "Category";

export function init(sequelize: Sequelize) {
    CategoryPersistence.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {}
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        parentId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "parent_id",
            
        },
        status: {
            type: DataTypes.ENUM(...Object.values(ModelStatus)),
            defaultValue: ModelStatus.ACTIVE,
            allowNull: false
        },
        
    }, {
        sequelize,
        modelName: modelName,
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    })
}