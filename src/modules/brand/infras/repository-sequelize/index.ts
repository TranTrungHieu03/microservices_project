import {
    BaseCommandRepositorySequelize,
    BaseQueryRepositorySequelize,
    BaseRepositorySequelize
} from "../../../../share/repository/base-repo-sequelize";
import {Brand} from "../../model/brand";
import {BrandCondDTO, BrandUpdateDTO} from "../../model/dto";
import {Sequelize} from "sequelize";

// export class MySqlBrandRepository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
//     constructor(sequelize: Sequelize) {
//         super(sequelize, modelName);
//     }
// }

export class MySqlBrandRepository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(
            new MySqlBrandCommandRepository(sequelize, modelName),
            new MySqlBrandQueryRepository(sequelize, modelName)
        );
    }
}

export class MySqlBrandCommandRepository extends BaseCommandRepositorySequelize<Brand, BrandUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}

export class MySqlBrandQueryRepository extends BaseQueryRepositorySequelize<Brand, BrandCondDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}