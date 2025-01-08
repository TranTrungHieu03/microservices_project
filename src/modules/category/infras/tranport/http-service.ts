import {Request, Response} from "express";
import {ICategoryUseCase} from "../../interface";

export class CategoryHttpService {
    constructor(private readonly useCase: ICategoryUseCase) {
    }
    
    async createANewCategoryAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.createANewCategory(req.body)
            res.status(201).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
        
    }
    
    async getDetailCategoryAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.getDetailCategory(req.params.id);
            res.status(200).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
    }
    
    async updateCategoryAPI(req: Request, res: Response) {
        
        try {
            const result = await this.useCase.updateCategory(req.params.id, req.body);
            res.status(200).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
    }
    
    async deleteCategoryAPI(req: Request, res: Response) {
        
        try {
            const result = await this.useCase.deleteCategory(req.params.id);
            res.status(200).json({data: result})
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            })
        }
    }
    
    async listCategoryAPI(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
            
            const result = await this.useCase.listCategory({}, {page, limit});
            res.status(200).json({data: result});
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            });
        }
    }
    
}