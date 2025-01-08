import {ICategoryUseCase, IRepository} from "../interface";
import {
    CategoryCondDTO,
    CategoryCreateDTO,
    CategoryCreateSchema,
    CategoryUpdateDTO,
    CategoryUpdateSchema
} from "../model/dto";
import {Category} from "../model/model";
import {ModelStatus} from "../../../share/model/base-model";
import {v7} from "uuid";
import {PagingDTO, PagingDTOSchema} from "../../../share/model/paging";
import {ErrDataNotFound} from "../../../share/model/base-error";
import {ZodError} from "zod";
import {ErrCategoryNameTooShort} from "../model/error";

export class CategoryUseCase implements ICategoryUseCase {
    
    constructor(private readonly repository: IRepository) {
    }
    
    async createANewCategory(data: CategoryCreateDTO): Promise<string> {
        const {success, data: parseData, error} = CategoryCreateSchema.safeParse(data)
        
        if (error) {
            const issues = (error as ZodError).issues
            for (const issue of issues) {
                if (issue.path[0] === 'name') {
                    throw ErrCategoryNameTooShort
                }
            }
            throw error
        }
        const newId = v7()
        const category: Category = {
            id: newId,
            name: parseData!.name,
            image: parseData!.image,
            position: 0,
            description: parseData!.description,
            status: ModelStatus.ACTIVE,
            created_at: new Date(),
            updated_at: new Date()
            
        }
        await this.repository.insert(category)
        return newId
    }
    
    async deleteCategory(id: string): Promise<boolean> {
        const category = await this.repository.get(id);
        if (!category || category.status === ModelStatus.DELETED) {
            throw ErrDataNotFound
        }
        return await this.repository.delete(id)
    }
    
    async getDetailCategory(id: string): Promise<Category | null> {
        const data = await this.repository.get(id)
        if (!data || data.status === ModelStatus.DELETED) {
            throw ErrDataNotFound
        }
        return data
        
    }
    
    async listCategory(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>> {
        const {success, data: parseData, error} = PagingDTOSchema.safeParse(paging)
        
        if (error) {
            const issues = (error as ZodError).issues
            for (const issue of issues) {
            
            }
            throw error
        }
        return await this.repository.list(cond, parseData!);
        
    }
    
    async updateCategory(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        const {success, data: parseData, error} = CategoryUpdateSchema.safeParse(data)
        
        if (error) {
            const issues = (error as ZodError).issues
            for (const issue of issues) {
                if (issue.path[0] === 'name') {
                    throw ErrCategoryNameTooShort
                }
            }
            throw error
        }
        const category = await this.repository.get(id);
        if (!category || category.status === ModelStatus.DELETED) {
            throw ErrDataNotFound
        }
        return await this.repository.update(id, parseData!)
    }
}