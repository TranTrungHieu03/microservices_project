import {Category} from "../../model/model";
import {CategoryCondDTO, CategoryUpdateDTO} from "../../model/dto";
import {
    BaseCommandRepositorySequelize,
    BaseQueryRepositorySequelize,
    BaseRepositorySequelize
} from "../../../../share/repository/base-repo-sequelize";
import {Sequelize} from "sequelize";

// export class MySqlCategoryRepository extends BaseRepositorySequelize<Category, CategoryCondDTO, CategoryUpdateDTO> {
//     constructor(sequelize: Sequelize) {
//         super(sequelize, modelName);
//
//     }
//
// }

export class MySqlCategoryRepository extends BaseRepositorySequelize<Category, CategoryCondDTO, CategoryUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(
            new MySqlCategoryCommandRepository(sequelize, modelName),
            new MySqlCategoryQueryRepository(sequelize, modelName)
        );
    }
}

export class MySqlCategoryCommandRepository extends BaseCommandRepositorySequelize<Category, CategoryUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}

export class MySqlCategoryQueryRepository extends BaseQueryRepositorySequelize<Category, CategoryCondDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}