import {Op, Sequelize, WhereOptions} from "sequelize";
import {ICommandRepository, IQueryRepository} from "../interface";
import {PagingDTO} from "../model/paging";
import {ModelStatus} from "../model/base-model";

export class BaseCommandRepositorySequelize<E, UpdateDTO> implements ICommandRepository<E, UpdateDTO> {
    constructor(protected readonly sequelize: Sequelize, protected readonly modelName: string) {
    }
    
    async insert(data: E): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data as any);
        return true;
    }
    
    async update(id: string, data: UpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data as any, {where: {id}});
        return true;
    }
    
    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if (isHard) {
            await this.sequelize.models[this.modelName].destroy({where: {id}});
        } else {
            await this.sequelize.models[this.modelName].update(
                {status: ModelStatus.DELETED},
                {where: {id}}
            );
        }
        return true;
    }
}

export class BaseQueryRepositorySequelize<E, Cond> implements IQueryRepository<E, Cond> {
    constructor(protected readonly sequelize: Sequelize, protected readonly modelName: string) {
    }
    
    async get(id: string): Promise<E | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if (!data) return null;
        const persistentData = data.get({plain: true});
        return {
            ...persistentData,
            createdAt: persistentData.created_at,
            updatedAt: persistentData.updated_at,
        } as E;
    }
    
    async findByCond(cond: Cond): Promise<E | null> {
        const data = await this.sequelize.models[this.modelName].findOne({where: cond as WhereOptions<any>});
        if (!data) return null;
        const persistentData = data.get({plain: true});
        return {
            ...persistentData,
            createdAt: persistentData.created_at,
            updatedAt: persistentData.updated_at,
        } as E;
    }
    
    async list(cond: Cond, paging: PagingDTO): Promise<E[]> {
        const {page, limit} = paging;
        const conditionSQL = {status: {[Op.ne]: ModelStatus.DELETED}};
        paging.total = await this.sequelize.models[this.modelName].count({where: {...conditionSQL, ...cond}});
        
        const rows = await this.sequelize.models[this.modelName].findAll({
            where: {...conditionSQL, ...cond},
            limit,
            offset: (page - 1) * limit,
            order: [['id', 'DESC']],
        });
        
        return rows.map((row) => row.get({plain: true}));
    }
}

export class BaseRepositorySequelize<E, Cond, UpdateDTO>
    implements ICommandRepository<E, UpdateDTO>, IQueryRepository<E, Cond> {
    constructor(
        protected readonly commandRepository: BaseCommandRepositorySequelize<E, UpdateDTO>,
        protected readonly queryRepository: BaseQueryRepositorySequelize<E, Cond>
    ) {
    }
    
    // Command methods
    insert(data: E): Promise<boolean> {
        return this.commandRepository.insert(data);
    }
    
    update(id: string, data: UpdateDTO): Promise<boolean> {
        return this.commandRepository.update(id, data);
    }
    
    delete(id: string, isHard: boolean = false): Promise<boolean> {
        return this.commandRepository.delete(id, isHard);
    }
    
    // Query methods
    get(id: string): Promise<E | null> {
        return this.queryRepository.get(id);
    }
    
    findByCond(cond: Cond): Promise<E | null> {
        return this.queryRepository.findByCond(cond);
    }
    
    list(cond: Cond, paging: PagingDTO): Promise<E[]> {
        return this.queryRepository.list(cond, paging);
    }
}