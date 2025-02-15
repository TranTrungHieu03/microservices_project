import {Request, Response} from "express";
import {
    CreateCommand,
    DeleteCommand,
    GetDetailQuery,
    ListQuery,
    UpdateCommand,
} from "../../interface";
import {Brand} from "../../model/brand";
import {ICommandHandler, IQueryHandler} from "../../../../share/interface";

export class BrandHttpService {
    constructor(private readonly createCmdHandle: ICommandHandler<CreateCommand, string>,
                private readonly getDetailCmdHandle: IQueryHandler<GetDetailQuery, Brand>,
                private readonly updateCmdHandle: ICommandHandler<UpdateCommand, void>,
                private readonly deleteCmdHandle: ICommandHandler<DeleteCommand, void>,
                private readonly getListQueryHandle: IQueryHandler<ListQuery, Array<Brand>>,) {
    }
    
    async createANewBrandAPI(req: Request, res: Response) {
        try {
            const cmd: CreateCommand = {data: req.body}
            const result = await this.createCmdHandle.execute(cmd)
            res.status(201).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
        
    }
    
    async getDetailBrandAPI(req: Request, res: Response) {
        try {
            const result = await this.getDetailCmdHandle.query({id: req.params.id})
            res.status(200).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
    }
    
    async updateBrandAPI(req: Request, res: Response) {
        
        try {
            await this.updateCmdHandle.execute({id: req.params.id, data: req.body});
            res.status(200).json({data: true})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
    }
    
    async deleteBrandAPI(req: Request, res: Response) {
        
        try {
            const result = await this.deleteCmdHandle.execute({id: req.params.id, isHard: false});
            res.status(200).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
    }
    
    async listBrandAPI(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string);
            // const limit = parseInt(req.query.limit as string);
            const paging = {page: page, limit: 100};
            
            const result = await this.getListQueryHandle.query({
                cond: {},
                paging
            });
            res.status(200).json({data: result, paging});
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            });
        }
    }
    
}