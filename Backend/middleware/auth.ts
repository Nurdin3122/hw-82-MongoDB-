import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { UserFields} from "../type.db";
import User from "../models/Users";
export interface RequestWithUser extends Request {
    user?: HydratedDocument<UserFields>;
}
const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'Token not provided!'});
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'No such user!'});
    }
    req.user = user;
    return next();
};



export default auth;