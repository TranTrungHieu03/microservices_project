import {ITokenProvider, TokenPayload} from "../interface";
import jwt from "jsonwebtoken";
import {config} from "./config";

class JwtTokenService implements ITokenProvider {
    private readonly secret: string;
    private readonly expiresIn: string | number;
    
    constructor(secret: string, expiresIn: string | number) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }
    
    async generate(payload: TokenPayload): Promise<string> {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        })
    }
    
    async verify(token: string): Promise<TokenPayload | null> {
        return jwt.verify(token, this.secret) as TokenPayload
    }
    
}

export const jwtProvider = new JwtTokenService(config.accessToken.secret, config.accessToken.expires);