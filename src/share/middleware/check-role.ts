import {Role} from "../../modules/user/model";
import {Handler, NextFunction, Request, Response} from "express";
import {Requester} from "../interface";
import {ErrForbidden, ErrUnauthorized, responseError} from "../app-error";

export function allowRoles(roles: Role[]): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!res.locals['requester']) {
            responseError(ErrUnauthorized, res);
            return;
        }
        const requester = res.locals.requester as Requester;
        console.log(requester)
        if (!roles.includes(requester.role)) {
            responseError(ErrForbidden.withLogMessage(`This user has role: ${requester.role}`), res);
            return;
        }
        next();
    }
}