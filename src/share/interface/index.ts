import {PagingDTO} from "../model/paging";

export interface IRepository<E, Cond, UpdateDTO> extends IQueryRepository<E, Cond>, ICommandRepository<E, UpdateDTO> {
}

export interface IQueryRepository<E, Cond> {
    get(id: string): Promise<E | null>;
    findByCond(cond: Cond): Promise<E | null>;
    list(cond: Cond, paging: PagingDTO): Promise<Array<E>>
}

export interface ICommandRepository<E, UpdateDTO> {
    insert(data: E): Promise<boolean>;
    
    update(id: string, data: UpdateDTO): Promise<boolean>
    
    delete(id: string, isHard?: boolean): Promise<boolean>
}