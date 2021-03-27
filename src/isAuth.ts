import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./MyContext";
import { CONFIG } from './config';


export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        throw new Error("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, CONFIG.accessTokenSecret);
        context.payload = payload as any;
        console.log("context.payload:   ", context.payload?.userId);
    } catch (err) {
        console.log("AccessToken Error: ", err);
        throw new Error("not authenticated");
    }

    return next();
};