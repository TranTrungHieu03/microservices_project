// import {ITokenIntrospectResult, Requester} from "../interface";
// import {Request, Response, NextFunction} from "express";
// export function authMiddleware(
//     introspection: ITokenIntrospectResult
// ):Requester {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const token = req.headers['authorization']?.split(' ')[1];
//             if (!token) {
//                 res.status(401).json({message: 'Unauthorized'});
//                 return;
//             }
//             const {payload, error,isOk} = await introspection(token);
//             if (!payload) {
//                 res.status(401).json({message: 'Unauthorized'});
//                 return;
//             }
//             req.requester = payload;
//             next();
//         } catch (e) {
//             res.status(500).json({message: (e as Error).message});
//         }
//     });
// }