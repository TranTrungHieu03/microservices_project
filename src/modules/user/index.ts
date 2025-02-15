import {Sequelize} from "sequelize";
import {init, modelName} from "./infras/repository/my-sequelize/dto";
import {MySqlUserRepository} from "./infras/repository/my-sequelize";
import {UserUseCase} from "./usecase";
import {UserHTTPService} from "./infras/transport";
import {Router} from "express";

export const setUpUserHexagon = (sequelize: Sequelize) => {
    init(sequelize);
    
    const repository = new MySqlUserRepository(sequelize, modelName);
    const useCase = new UserUseCase(repository)
    const httpService = new UserHTTPService(useCase);
    
    const router = Router()
    
    router.post('/register', httpService.register.bind(httpService))
    router.post('/login', httpService.login.bind(httpService))
    router.get('/profile', httpService.profile.bind(httpService))
    
    router.get('/users', httpService.listAPI.bind(httpService));
    router.get('/users/:id', httpService.getDetailAPI.bind(httpService));
    router.post('/users', httpService.createAPI.bind(httpService));
    router.patch('/users/:id', httpService.updateAPI.bind(httpService));
    router.delete('/users/:id', httpService.deleteAPI.bind(httpService));
    
    return router
    
}