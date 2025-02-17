import {Router} from "express";
import {listCategoryApi} from "./infras/list-api";
import {getCategoryApi} from "./infras/get-api";
import {createCategoryApi} from "./infras/create-api";
import {updateCategoryApi} from "./infras/update-api";
import {deleteCategoryApi} from "./infras/delete-api";
import {init, modelName} from "./infras/repository/dto";
import {Sequelize} from "sequelize";
import {CategoryHttpService} from "./infras/tranport/http-service";
import {CategoryUseCase} from "./usecase";
import {MySqlCategoryRepository} from "./infras/repository/repo";
import {ServiceContext} from "../../share/interface/service-context";
import {Role} from "../user/model";

export const setUpCategoryModule = (sequelize: Sequelize) => {
    init(sequelize)
    const router = Router()
    
    router.get('/categories', listCategoryApi);
    router.get('/categories/:id', getCategoryApi);
    router.post('/categories', createCategoryApi);
    router.patch('/categories/:id', updateCategoryApi);
    router.delete('/categories/:id', deleteCategoryApi);
    
    return router
}
export const setUpCategoryHexagon = (sequelize: Sequelize, sctx: ServiceContext) => {
    init(sequelize)
    const repository = new MySqlCategoryRepository(sequelize, modelName)
    const useCase = new CategoryUseCase(repository)
    const httpService = new CategoryHttpService(useCase)
    const router = Router()
    const mdFactory = sctx.mdFactory
    const adminChecker = mdFactory.allowRoles([Role.ADMIN])
    
    router.get('/categories', httpService.listCategoryAPI.bind(httpService));
    router.get('/categories/:id', httpService.getDetailCategoryAPI.bind(httpService));
    router.post('/categories', mdFactory.auth, adminChecker, httpService.createANewCategoryAPI.bind(httpService));
    router.patch('/categories/:id', mdFactory.auth, adminChecker, httpService.updateCategoryAPI.bind(httpService));
    router.delete('/categories/:id', mdFactory.auth, adminChecker, httpService.deleteCategoryAPI.bind(httpService));
    
    return router
}