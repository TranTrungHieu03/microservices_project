import {ITokenIntrospect, Requester} from "../interface";
import {Handler, NextFunction, Request, Response} from "express";

export function authMiddleware(
    introspection: ITokenIntrospect
): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                res.status(401).json({error: 'Unauthorized'});
                return;
            }
            const {payload, error, isOk} = await introspection.introspect(token);
            if (!isOk) {
                res.status(401).json({error: error?.message || 'Unauthorized'});
                return;
            }
            res.locals.requester = payload as Requester;
            
            next();
        } catch (e) {
            res.status(401).json({error: (e as Error).message});
            return
        }
    }
}

