import {BaseHTTPService} from "../../../../share/transport/http-server";
import {User, UserCondDTO, UserRegistrationDTO, UserUpdateDTO} from "../../model";
import {IUserUseCase} from "../../interface";
import {Request, Response} from "express";
import {jwtProvider} from "../../../../share/component/jwt";

export class UserHTTPService extends BaseHTTPService<User, UserRegistrationDTO, UserUpdateDTO, UserCondDTO> {
    constructor(readonly useCase: IUserUseCase) {
        super(useCase);
    }
    
    async register(req: Request, res: Response) {
        await this.createAPI(req, res);
    }
    
    async login(req: Request, res: Response) {
        try {
            const token = await this.useCase.login(req.body);
            res.status(200).json({data: token});
        } catch (e) {
            res.status(400).json({message: (e as Error).message});
        }
        
    }
    
    async profile(req: Request, res: Response) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                res.status(401).json({message: 'Unauthorized'});
                return;
            }
            const payload = await jwtProvider.verify(token);
            if (!payload) {
                res.status(401).json({message: 'Unauthorized'});
                return;
            }
            const {sub} = payload;
            const user = await this.useCase.profile(sub);
            const {salt, password, ...rest} = user as User;
            res.status(200).json({data: rest});
        } catch (e) {
            res.status(400).json({message: (e as Error).message});
        }
        
    }
}