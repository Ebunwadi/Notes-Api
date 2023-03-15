import { RequestHandler } from "express";
import { errMsg } from "../util/responseMsg";


export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        return errMsg(401, 'error', 'user not authenticated', res);
    }
};