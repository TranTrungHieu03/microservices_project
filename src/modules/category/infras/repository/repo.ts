import {IRepository} from "../../interface";
import {Op, Sequelize} from "sequelize";
import {Category, CategorySchema} from "../../model/model";
import {CategoryCondDTO, CategoryUpdateDTO} from "../../model/dto";
import {PagingDTO} from "../../../../share/model/paging";
import {ModelStatus} from "../../../../share/model/base-model";

export class MySqlCategoryRepository implements IRepository {
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
    
    async get(id: string): Promise<Category | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if (!data) {
            return null;
        }
        return CategorySchema.parse(data.get({plain: true}))
    }
    
    async insert(data: Category): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data);
        return true
    }
    
    async list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>> {
        
        const {page, limit} = paging
        const conditionSQL = {status: {[Op.ne]: ModelStatus.DELETED}}
        paging.total = await this.sequelize.models[this.modelName].count({where: {...conditionSQL, ...cond}})
        const rows = await this.sequelize.models[this.modelName].findAll({
            where: conditionSQL,
            limit, offset: (page - 1) * limit,
            order: [['id', 'DESC']]
        })
        
        return rows.map((row) => CategorySchema.parse(row.get({plain: true})))
        
    }
    
    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data, {where: {id}})
        return true
    }
    
}