import {ITokenIntrospect, TokenIntrospectResult} from "../interface";
import axios from "axios";

export class TokenIntrospectRPCClient implements ITokenIntrospect {
    constructor(private readonly url: string) {
    
    }
    
    async introspect(token: string): Promise<TokenIntrospectResult> {
        try {
            const {data} = await axios.post(this.url, {token})
            const {sub, role} = data.data
            return {
                payload: {sub, role},
                isOk: true
            }
        } catch (e) {
            return {
                payload: null,
                error: (e as Error),
                isOk: false
            }
        }
    }
}