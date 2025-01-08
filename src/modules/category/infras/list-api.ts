import {Request, Response} from "express";
import {CategoryPersistence} from "./repository/dto";
import {Op} from "sequelize";
import {PagingDTOSchema} from "../../../share/model/paging";
import {ModelStatus} from "../../../share/model/base-model";

export const listCategoryApi = async (req: Request, res: Response) => {
    const {success, data} = PagingDTOSchema.safeParse(req.query)
    if (!success) {
        
        res.status(400).json({
            message: "Invalid paging"
        })
        return
    }
    const {page, limit} = data
    const condition = {status: {[Op.ne]: ModelStatus.DELETED}}
    data.total = await CategoryPersistence.count({where: condition})
    const rows = await CategoryPersistence.findAll({
        where: condition,
        limit, offset: (page - 1) * limit,
        order: [['id', 'DESC']]
    })
    
    res.status(200).json({
        data: rows,
        paging: data
    })
    
}