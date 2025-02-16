import {PagingDTO} from "../model/paging";
import {Role} from "../../modules/user/model";

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

export interface IQueryHandler<Query, Result> {
    query(query: Query): Promise<Result>
}

export interface ICommandHandler<Cmd, Result> {
    execute(command: Cmd): Promise<Result>
}

export interface IUseCase<CreatDTO, UpdateDTO, Entity, CondDTO> {
    insert(data: CreatDTO): Promise<string>
    
    update(id: string, data: UpdateDTO): Promise<boolean>
    
    delete(id: string): Promise<boolean>
    
    getDetail(id: string): Promise<Entity | null>
    
    list(cond: CondDTO, paging: PagingDTO): Promise<Array<Entity>>
}

export interface TokenPayload {
    sub: string;
    
    role: Role;
    
}

export interface Requester extends TokenPayload {
}

export interface ITokenProvider {
    generate(payload: TokenPayload): Promise<string>;
    
    verify(token: string): Promise<TokenPayload | null>;
}

export type TokenIntrospectResult = {
    payload: TokenPayload | null;
    error?: Error,
    isOk: boolean
}

export interface ITokenIntrospect {
    introspect(token: string): Promise<TokenIntrospectResult>
}

export type UserToken = {
    accessToken: string;
    refreshToken: string;
}