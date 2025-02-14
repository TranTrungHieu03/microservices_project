import {Request, Response} from "express";
import {ICategoryUseCase} from "../../interface";
import {Category} from "../../model/model";

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
            // const limit = parseInt(req.query.limit as string);
            const paging = {page: page, limit: 100};
            
            const result = await this.useCase.listCategory({}, paging);
            const categoriesTree = this.buildTree(result);
            res.status(200).json({data: categoriesTree, paging});
        } catch (err) {
            res.status(400).json({
                message: (err as Error).message
            });
        }
    }
    
    private buildTree(categories: Category[]): Category[] {
        const categoriesTree: Category[] = [];
        const mapChildren = new Map<string, Category[]>();
        
        for (const category of categories) {
            mapChildren.set(category.id, mapChildren.get(category.id) || []);
            category.children = mapChildren.get(category.id)!;
            
            if (!category.parentId) {
                categoriesTree.push(category);
            } else {
                mapChildren.set(category.parentId, mapChildren.get(category.parentId) || []);
                mapChildren.get(category.parentId)!.push(category);
            }
        }
        
        return categoriesTree;
    }
    
}