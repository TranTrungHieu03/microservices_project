import {BaseRepositorySequelize} from "../../../../share/repository/base-repo-sequelize";
import {Brand} from "../../model/brand";
import {BrandCondDTO, BrandUpdateDTO} from "../../model/dto";
import {Sequelize} from "sequelize";
import {modelName} from "./dto";

export class MySqlBrandRepository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelName);
    }
}