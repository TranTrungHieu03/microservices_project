import {Request, Response} from 'express';
import {IUseCase} from "../interface";

export abstract class BaseHTTPService<
    Entity,
    CreateDTO,
    UpdateDTO,
    CondDTO
> {
    constructor(protected readonly useCase: IUseCase<CreateDTO, UpdateDTO, Entity, CondDTO>) {
    }
    
    async createAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.insert(req.body);
            res.status(201).json({data: result});
        } catch (err) {
            res.status(400).json({message: (err as Error).message});
        }
    }
    
    async updateAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.update(req.params.id, req.body);
            res.status(200).json({data: result});
        } catch (err) {
            res.status(400).json({message: (err as Error).message});
        }
    }
    
    async deleteAPI(req: Request, res: Response) {
        try {
            await this.useCase.delete(req.params.id);
            res.status(200).json({message: 'Deleted successfully'});
        } catch (err) {
            res.status(400).json({message: (err as Error).message});
        }
    }
    
    async getDetailAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.getDetail(req.params.id);
            if (!result) {
                res.status(404).json({message: 'Not found'});
                return;
            }
            res.status(200).json({data: result});
        } catch (err) {
            res.status(400).json({message: (err as Error).message});
        }
    }
    
    async listAPI(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const cond = req.body as CondDTO;
            
            const result = await this.useCase.list(cond, {page, limit});
            res.status(200).json({data: result, paging: {page, limit}});
        } catch (err) {
            res.status(400).json({message: (err as Error).message});
        }
    }
}
