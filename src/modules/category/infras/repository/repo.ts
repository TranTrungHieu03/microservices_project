import {Category} from "../../model/model";
import {CategoryCondDTO, CategoryUpdateDTO} from "../../model/dto";
import {BaseRepositorySequelize} from "../../../../share/repository/base-repo-sequelize";
import {Sequelize} from "sequelize";
import {modelName} from "./dto";

export class MySqlCategoryRepository extends BaseRepositorySequelize<Category, CategoryCondDTO, CategoryUpdateDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelName);
        
    }
    
}