import {Sequelize} from "sequelize";
import {init, modelName} from "./infras/repository/my-sequelize/dto";
import {MySqlUserRepository} from "./infras/repository/my-sequelize";
import {UserUseCase} from "./usecase";
import {UserHTTPService} from "./infras/transport";
import {Router} from "express";
import {ServiceContext} from "../../share/interface/service-context";
import {Role} from "./model";

export const setUpUserHexagon = (sequelize: Sequelize, sctx: ServiceContext) => {
    init(sequelize);
    
    const repository = new MySqlUserRepository(sequelize, modelName);
    const useCase = new UserUseCase(repository)
    const httpService = new UserHTTPService(useCase);
    
    const router = Router()
    const mdFactory = sctx.mdFactory
    const adminChecker = mdFactory.allowRoles([Role.ADMIN])
    
    router.post('/register', httpService.register.bind(httpService))
    router.post('/login', httpService.login.bind(httpService))
    router.get('/profile', httpService.profile.bind(httpService))
    
    router.get('/users', mdFactory.auth, adminChecker, httpService.listAPI.bind(httpService));
    router.get('/users/:id', httpService.getDetailAPI.bind(httpService));
    router.post('/users', mdFactory.auth, adminChecker, httpService.createAPI.bind(httpService));
    router.patch('/users/:id', mdFactory.auth, adminChecker, httpService.updateAPI.bind(httpService));
    router.delete('/users/:id', mdFactory.auth, adminChecker, httpService.deleteAPI.bind(httpService));
    
    //RPC API (use internally)
    router.post('/rpc/introspect', httpService.introspectAPI.bind(httpService));
    
    return router
    
}