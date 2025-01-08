import {Request, Response} from "express";
import {CategoryUpdateSchema} from "../model/dto";
import {CategoryPersistence} from "./repository/dto";
import {ModelStatus} from "../../../share/model/base-model";

export const updateCategoryApi = async (req: Request, res: Response) => {
    const {id} = req.params
    const {success, data, error} = CategoryUpdateSchema.safeParse(req.body)
    
    if (!success) {
        res.status(400).json({
            error: error.issues
        })
        return
    }
    const category = await CategoryPersistence.findByPk(id)
    if (!category || category.status === ModelStatus.DELETED) {
        res.status(404).json({
            error: "Category not found"
        })
        return
    }
    
    if (category.status === ModelStatus.DELETED) {
        res.status(400).json({
            error: "Category already deleted"
        })
        return
    }
    const [affectedCount] = await CategoryPersistence.update(data, {where: {id}})
    res.status(200).json({
        data: affectedCount > 0
    })
    return
}