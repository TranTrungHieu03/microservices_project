import {Request, Response} from "express";
import {CategoryPersistence} from "./repository/dto";
import {ModelStatus} from "../../../share/model/base-model";

export const deleteCategoryApi = async (req: Request, res: Response) => {
    
    const {id} = req.params
    const category = await CategoryPersistence.findByPk(id)
    if (!category) {
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
    const [affectedCount] = await CategoryPersistence.update({status: ModelStatus.DELETED}, {where: {id}})
    res.status(200).json({
        data: affectedCount > 0
    })
    return
}