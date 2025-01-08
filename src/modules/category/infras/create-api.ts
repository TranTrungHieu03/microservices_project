import {Request, Response} from "express";
import {CategoryCreateSchema} from "../model/dto";
import {v7} from "uuid";
import {CategoryPersistence} from "./repository/dto";

export const createCategoryApi = async (req: Request, res: Response): Promise<void> => {
    const {success, data, error} = CategoryCreateSchema.safeParse(req.body)
    
    if (!success) {
        res.status(400).json({
            error: error.issues
        })
        return
    }
    const newId = v7()
    
    await CategoryPersistence.create({id: newId, ...data})
    
    res.status(201).json({
        data: newId
    })
    return
}