import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../MyContext';
import { getPermissionsOfUser } from './getPermissionsOfUser';

export const addPermissions: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("not authenticated");
    }
    const userId = context.payload?.userId || (verify(authorization.split(" ")[1], process.env.ACCESS_TOKEN_SECRET!) as any).userId;
    context.payload = { userId: userId };
    context.permissions = await getPermissionsOfUser(userId);

    return next();
};
