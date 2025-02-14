import {Op, Sequelize, WhereOptions} from "sequelize";
import {IRepository} from "../interface";
import {PagingDTO} from "../model/paging";
import {ModelStatus} from "../model/base-model";

export abstract class BaseRepositorySequelize<E, Cond, UpdateDTO> implements IRepository<E, Cond, UpdateDTO> {
    
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {
    }
    
    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if (isHard) {
            await this.sequelize.models[this.modelName].destroy({where: {id}})
        } else {
            await this.sequelize.models[this.modelName].update({
                status: ModelStatus.DELETED
            }, {where: {id}})
        }
        
        return true
    }
    
    async get(id: string): Promise<E | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if (!data) {
            return null;
        }
        const persistentData = data.get({plain: true})
        
        return {
            ...persistentData,
            createdAt: persistentData.created_at,
            updatedAt: persistentData.updated_at,
            children: []
        } as E
        // return CategorySchema.parse(data.get({plain: true}))
    }
    
    async insert(data: E): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data as any);
        return true
    }
    
    async list(cond: Cond, paging: PagingDTO): Promise<Array<E>> {
        
        const {page, limit} = paging
        const conditionSQL = {status: {[Op.ne]: ModelStatus.DELETED}}
        paging.total = await this.sequelize.models[this.modelName].count({where: {...conditionSQL, ...cond}})
        const rows = await this.sequelize.models[this.modelName].findAll({
            where: conditionSQL,
            limit, offset: (page - 1) * limit,
            order: [['id', 'DESC']]
        })
        
        return rows.map((row) => (row.get({plain: true})))
        
    }
    
    async update(id: string, data: UpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data as any, {where: {id}})
        return true
    }
    
    async findByCond(cond: Cond): Promise<E | null> {
        const data = await this.sequelize.models[this.modelName].findOne({
            where: cond as WhereOptions<any>
        });
        
        if (!data) {
            return null;
        }
        const persistentData = data.get({plain: true});
        
        return {
            ...persistentData,
            createdAt: persistentData.created_at,
            updatedAt: persistentData.updated_at,
        } as E;
    }
    
}