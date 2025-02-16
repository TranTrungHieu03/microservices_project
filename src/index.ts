import express, {NextFunction, Request, Response} from 'express'
import {config} from 'dotenv'
import {setUpCategoryHexagon} from "./modules/category";
import {sequelize} from "./share/component/sequelize";
import {setUpBrandHexagon} from "./modules/brand";
import {setUpUserHexagon} from "./modules/user";
import {TokenIntrospectRPCClient} from "./share/repository/verify-token.rpc";
import morgan from "morgan";
import {setUpMiddleware} from "./share/middleware";
import {responseError} from "./share/app-error";

config();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established');
        
        const app = express();
        const port = process.env.PORT || 3000;
        
        app.use(express.json());
        app.use(morgan('dev'));
        
        app.get('/', (req: Request, res: Response) => {
            
            res.send("Hello world");
        });
        const introspect = new TokenIntrospectRPCClient(process.env.VERIFY_TOKEN_RPC_URL as string
            || "http://localhost:3000/v1/rpc/introspect");
        const sctx = {
            mdFactory: setUpMiddleware(introspect)
        }
        app.get('/v1/protected', sctx.mdFactory.auth, (req: Request, res: Response) => {
            res.status(200).json({data: res.locals['requester']});
        })
        app.use('/v1', setUpCategoryHexagon(sequelize, sctx));
        app.use('/v1', setUpBrandHexagon(sequelize, sctx));
        app.use('/v1', setUpUserHexagon(sequelize, sctx));
        
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            responseError(err, res);
            return next();
        })
        await sequelize.sync({force: false});
        console.log('Tables in database synced successfully.');
        
        app.listen(port, () => {
            console.log(`Server running at port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
})();


