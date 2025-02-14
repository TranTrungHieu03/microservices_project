import {DataTypes, Model, Sequelize} from "sequelize";
import {ModelStatus} from "../../../../share/model/base-model";

export class BrandPersistence extends Model {
    declare id: string;
    declare status: string
    
}

export const modelName = "Brand";

export function init(sequelize: Sequelize) {
    BrandPersistence.init({
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
        
        status: {
            type: DataTypes.ENUM(...Object.values(ModelStatus)),
            defaultValue: ModelStatus.ACTIVE,
            allowNull: false
        },
        tagLine: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "tag_line"
        }
        
    }, {
        sequelize,
        modelName: modelName,
        tableName: "brands",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    })
}