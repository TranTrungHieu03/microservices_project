import express, {Request, Response} from 'express'
import {config} from 'dotenv'
import {setUpCategoryHexagon, setUpCategoryModule} from "./modules/category";
import {sequelize} from "./share/component/sequelize";
import {setUpBrandHexagon} from "./modules/brand";
import {setUpUserHexagon} from "./modules/user";

config();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established');
        
        
        const app = express();
        const port = process.env.PORT || 3000;
        
        app.use(express.json());
        
        app.get('/', (req: Request, res: Response) => {
            res.send("Hello world");
        });
        
        app.use('/v1', setUpCategoryHexagon(sequelize));
        app.use('/v1', setUpBrandHexagon(sequelize));
        app.use('/v1', setUpUserHexagon(sequelize));
        
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


