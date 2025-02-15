import {PagingDTO} from "../../../share/model/paging";
import {BrandCondDTO, BrandCreateDTO, BrandUpdateDTO} from "../model/dto";
import {Brand} from "../model/brand";
import {IRepository} from "../../../share/interface";

export interface IBrandUseCase {
    createANewBrand(data: BrandCreateDTO): Promise<string>
    
    getDetailBrand(id: string): Promise<Brand | null>
    
    listBrand(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>>
    
    updateBrand(id: string, data: BrandUpdateDTO): Promise<boolean>
    
    deleteBrand(id: string): Promise<boolean>
    
}

export interface CreateCommand {
    data: BrandCreateDTO
}

export interface UpdateCommand {
    id: string
    data: BrandUpdateDTO
}

export interface GetDetailQuery {
    id: string
}

export interface DeleteCommand {
    id: string
    isHard: boolean
}
export interface ListQuery {
    cond: BrandCondDTO
    paging: PagingDTO
}

export interface IBrandRepository extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> {
}