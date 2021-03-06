import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field,
    Ctx,
    UseMiddleware,
    Int
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import User from "./entity/user";
import { MyContext } from "./MyContext";
import { createRefreshToken, createAccessToken } from "./auth";
import { isAuth } from "./isAuth";
import { sendRefreshToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { addPermissions } from './permissionSystem/addPermissionsMiddleware';
import { addPermissionToUser } from './permissionSystem/addPermissionToUser';
import { getPermissionsOfUser } from './permissionSystem/getPermissionsOfUser';
import { CONFIG } from './config';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}
@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "hi!";
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() { payload }: MyContext) {
        console.log(payload);
        return `your user id is: ${payload!.userId}`;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Query(() => User, { nullable: true })
    me(
        @Ctx() context: MyContext) {
        const authorization = context.req.headers["authorization"];
        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, CONFIG.accessTokenSecret);
            return User.findOne(payload.userId);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { res }: MyContext) {
        sendRefreshToken(res, "");

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(
        @Arg("userId", () => Int) userId: number) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);

        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Username or Password invalid!");
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error("Username or Password invalid!");
        }

        // login successful

        sendRefreshToken(res, createRefreshToken(user));
        return {
            accessToken: createAccessToken(user),
            user
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    @Query(() => [String])
    @UseMiddleware(addPermissions)
    async getPermissions(
        @Ctx() { permissions }: MyContext) {
        if (permissions) return permissions;
        return [];
    }

    @Mutation(() => [String])
    @UseMiddleware(addPermissions)
    async addPermission(
        @Ctx() { payload }: MyContext,
        @Arg("permission") permission: string) {
        if (!payload) {
            return [];
        }
        await addPermissionToUser(permission, payload.userId);
        return getPermissionsOfUser(payload.userId);
    }
}