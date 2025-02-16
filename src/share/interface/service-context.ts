import {Handler} from "express";
import {Role} from "../../modules/user/model";

export interface MdFactory {
    auth: Handler;
    allowRoles: (roles: Role[]) => Handler;
}

export type ServiceContext =  {
    mdFactory: MdFactory;
}