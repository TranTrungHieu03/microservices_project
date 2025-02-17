import {Category} from "../model/model";
import {PagingDTO} from "../../../share/model/paging";
import {CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO} from "../model/dto";

export interface ICategoryUseCase {
    createANewCategory(data: CategoryCreateDTO): Promise<string>
    
    getDetailCategory(id: string): Promise<Category | null>
    
    listCategory(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>>
    
    updateCategory(id: string, data: CategoryUpdateDTO): Promise<boolean>
    
    deleteCategory(id: string): Promise<boolean>
    
}
