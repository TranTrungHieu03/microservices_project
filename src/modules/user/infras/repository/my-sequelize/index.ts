import {
    BaseCommandRepositorySequelize,
    BaseQueryRepositorySequelize,
    BaseRepositorySequelize
} from "../../../../../share/repository/base-repo-sequelize";
import {User, UserCondDTO, UserUpdateDTO} from "../../../model";
import {Sequelize} from "sequelize";

export class MySqlUserRepository extends BaseRepositorySequelize<User, UserCondDTO, UserUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(
            new MySqlUserCommandRepository(sequelize, modelName),
            new MySqlUserQueryRepository(sequelize, modelName)
        );
    }
}

export class MySqlUserCommandRepository extends BaseCommandRepositorySequelize<User, UserUpdateDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}

export class MySqlUserQueryRepository extends BaseQueryRepositorySequelize<User, UserCondDTO> {
    constructor(readonly sequelize: Sequelize, readonly modelName: string) {
        super(sequelize, modelName);
    }
}