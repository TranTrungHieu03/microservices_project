import {ITokenIntrospect} from "../interface";
import {MdFactory} from "../interface/service-context";
import {authMiddleware} from "./auth";
import {allowRoles} from "./check-role";

export const setUpMiddleware = (introspect: ITokenIntrospect): MdFactory => {
    const auth = authMiddleware(introspect);
    return {
        auth,
        allowRoles
    }
    
}