import {Router} from "express";
import {MySqlBrandRepository} from "./infras/repository-sequelize";
import {BrandHttpService} from "./infras/transport";
import {Sequelize} from "sequelize";
import {init, modelName} from "./infras/repository-sequelize/dto";
import {CreateNewBrandCmdHandler} from "./usecase/create-new-brand";
import {GetBrandDetailQuery} from "./usecase/get-brand-detail";
import {UpdateBrandCmdHandler} from "./usecase/update-brand";
import {DeleteBrandCmdHandler} from "./usecase/delete-brand";
import {GetListBrandQueryHandler} from "./usecase/get-list-brand";

export const setUpBrandHexagon = (sequelize: Sequelize) => {
    init(sequelize)
    const repository = new MySqlBrandRepository(sequelize, modelName)
    const createCmdHandler = new CreateNewBrandCmdHandler(repository)
    const getDetailQueryHandler = new GetBrandDetailQuery(repository)
    const updateCmdHandler = new UpdateBrandCmdHandler(repository)
    const deleteCmdHandler = new DeleteBrandCmdHandler(repository)
    const listBrandQueryHandler = new GetListBrandQueryHandler(repository)
    const httpService = new BrandHttpService(createCmdHandler, getDetailQueryHandler, updateCmdHandler, deleteCmdHandler, listBrandQueryHandler)
    const router = Router()
    
    router.get('/brands', httpService.listBrandAPI.bind(httpService));
    router.get('/brands/:id', httpService.getDetailBrandAPI.bind(httpService));
    router.post('/brands', httpService.createANewBrandAPI.bind(httpService));
    router.patch('/brands/:id', httpService.updateBrandAPI.bind(httpService));
    router.delete('/brands/:id', httpService.deleteBrandAPI.bind(httpService));
    
    return router
}