import {IQueryHandler} from "../../../share/interface";
import {IBrandRepository, ListQuery} from "../interface";
import {Brand} from "../model/brand";

export class GetListBrandQueryHandler implements IQueryHandler<ListQuery, Array<Brand>> {
    constructor(private readonly repository: IBrandRepository
    ) {
    }
    
    async query(query: ListQuery): Promise<Array<Brand>> {
        
        return this.repository.list(query.cond, query.paging)
    }
}