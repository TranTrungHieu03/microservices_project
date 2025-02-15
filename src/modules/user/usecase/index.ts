import {IUserUseCase} from "../interface";
import {IRepository, TokenPayload} from "../../../share/interface";
import {
    Gender,
    Role,
    Status,
    User,
    UserCondDTO,
    UserLoginDTO,
    UserLoginDTOSchema,
    UserRegistrationDTO,
    UserRegistrationDTOSchema,
    UserUpdateDTO
} from "../model";
import {PagingDTO} from "../../../share/model/paging";
import {v7} from "uuid";
import {
    ErrEmailAndPassword,
    ErrUserEmailDuplicate,
    ErrUserInActivated,
    ErrUserNotFound,
    ErrUserPasswordNotMatch
} from "../model/error";
import bcrypt from "bcrypt";
import {jwtProvider} from "../../../share/component/jwt";

export class UserUseCase implements IUserUseCase {
    constructor(private readonly repository: IRepository<User, UserCondDTO, UserUpdateDTO>) {
    
    }
    
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    getDetail(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    
    insert(data: UserRegistrationDTO): Promise<string> {
        return this.register(data)
    }
    
    list(cond: UserCondDTO, paging: PagingDTO): Promise<Array<User>> {
        throw new Error("Method not implemented.");
    }
    
    async login(data: UserLoginDTO): Promise<string> {
        const dto = UserLoginDTOSchema.parse(data)
        
        const user = await this.repository.findByCond({email: dto.email})
        
        if (!user) {
            throw ErrEmailAndPassword
        }
        const isMatch = await bcrypt.compare(`${dto.password}.${user.salt}`, user.password)
        if (!isMatch) {
            throw ErrUserPasswordNotMatch
        }
        if (user.status === Status.DELETED || user.status === Status.INACTIVE) {
            throw ErrUserInActivated
        }
        
        return jwtProvider.generate({sub: user.id, role: user.role})
    }
    
    async register(data: UserRegistrationDTO): Promise<string> {
        const dto = UserRegistrationDTOSchema.parse(data);
        
        const isExist = await this.repository.findByCond({email: dto.email})
        if (isExist) {
            throw ErrUserEmailDuplicate
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(`${dto.password}.${salt}`, 10)
        
        const newId = v7();
        const user: User = {
            ...dto,
            id: newId,
            status: Status.ACTIVE,
            role: Role.USER,
            gender: Gender.UNKNOWN,
            salt: salt,
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        await this.repository.insert(user);
        return newId;
    }
    
    update(id: string, data: UserUpdateDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    async verifyToken(token: string): Promise<TokenPayload> {
        throw new Error("Method not implemented.");
    }
    
    async profile(userId: string): Promise<User> {
        
        const user = await this.repository.get(userId);
        
        if (!user) {
            throw ErrUserNotFound
        }
        return user
    }
    
}