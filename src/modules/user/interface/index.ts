import {IUseCase, TokenPayload} from "../../../share/interface";
import {User, UserCondDTO, UserLoginDTO, UserRegistrationDTO, UserUpdateDTO} from "../model";

export interface IUserUseCase extends IUseCase<UserRegistrationDTO, UserUpdateDTO, User, UserCondDTO> {
    register(data: UserRegistrationDTO): Promise<string>
    
    login(data: UserLoginDTO): Promise<string>
    
    verifyToken(token: string): Promise<TokenPayload>
    
    profile(userId: string): Promise<User | null>
}