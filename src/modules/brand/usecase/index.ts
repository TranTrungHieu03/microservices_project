import {IBrandUseCase} from '../interface';
import {BrandCondDTO, BrandCreateDTO, BrandUpdateDTO, BrandUpdateDTOSchema,} from '../model/dto';
import {Brand} from '../model/brand';
import {ModelStatus} from '../../../share/model/base-model';
import {PagingDTO, PagingDTOSchema} from '../../../share/model/paging';
import {ErrDataNotFound} from '../../../share/model/base-error';
import {IRepository} from "../../../share/interface";

export class BrandUseCase implements IBrandUseCase {
    constructor(private readonly repository: IRepository<Brand, BrandCondDTO, BrandUpdateDTO>) {
    }
    
    async createANewBrand(data: BrandCreateDTO): Promise<string> {
        
        return ""
    }
    
    async getDetailBrand(id: string): Promise<Brand | null> {
        const brand = await this.repository.get(id);
        if (!brand || brand.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        return brand;
    }
    
    async listBrand(cond: BrandCondDTO, paging: PagingDTO): Promise<Brand[]> {
        const {success, data: parsedPaging, error} = PagingDTOSchema.safeParse(paging);
        if (!success) {
            throw error;
        }
        return await this.repository.list(cond, parsedPaging);
    }
    
    async updateBrand(id: string, data: BrandUpdateDTO): Promise<boolean> {
        const {success, data: parsedData, error} = BrandUpdateDTOSchema.safeParse(data);
        if (!success) {
            throw new Error(JSON.stringify(error));
        }
        
        const brand = await this.repository.get(id);
        if (!brand || brand.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        
        return await this.repository.update(id, parsedData);
    }
    
    async deleteBrand(id: string): Promise<boolean> {
        const brand = await this.repository.get(id);
        if (!brand || brand.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }
        return await this.repository.delete(id);
    }
}
