import {Router} from "express";
import {MySqlBrandRepository} from "./infras/repository-sequelize";
import {BrandHttpService} from "./infras/transport";
import {BrandUseCase} from "./usecase";
import {Sequelize} from "sequelize";
import {init} from "./infras/repository-sequelize/dto";
import {CreateNewBrandCmdHandler} from "./usecase/create-new-brand";
import {GetBrandDetailQuery} from "./usecase/get-brand-detail";

export const setUpBrandHexagon = (sequelize: Sequelize) => {
    init(sequelize)
    const repository = new MySqlBrandRepository(sequelize)
    const useCase = new BrandUseCase(repository)
    const createCmdHandler = new CreateNewBrandCmdHandler(repository)
    const getDetailQueryHandler = new GetBrandDetailQuery(repository)
    const httpService = new BrandHttpService(createCmdHandler, getDetailQueryHandler, useCase)
    const router = Router()
    
    router.get('/brands', httpService.listBrandAPI.bind(httpService));
    router.get('/brands/:id', httpService.getDetailBrandAPI.bind(httpService));
    router.post('/brands', httpService.createANewBrandAPI.bind(httpService));
    router.patch('/brands/:id', httpService.updateBrandAPI.bind(httpService));
    router.delete('/brands/:id', httpService.deleteBrandAPI.bind(httpService));
    
    return router
}