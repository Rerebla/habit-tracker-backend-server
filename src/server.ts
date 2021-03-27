import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import "dotenv/config";
import "reflect-metadata";
import { UserResolver } from "./UserResolver";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
import User from './entity/user';
import { CONFIG } from './config';

(async () => {
    const app = express();
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    );
    app.use(cookieParser());
    app.post("/refresh_token", async (req, res) => {
        console.log("Request was received with cookie: ", req.cookies.jid);
        const token = req.cookies.jid;
        if (!token) {
            console.log("not token nooooooo");
            return res.send({
                ok: false,
                accessToken: ""
            });
        }
        let payload: any = null;
        try {
            payload = verify(token, CONFIG.refreshTokenSecret);
        } catch (err) {
            console.log("RefreshTokenErr: ", err);
            return res.send({
                ok: false,
                accessToken: ""
            });
        }
        const user = await User.findOne({
            id: payload.userId
        });
        if (!user) {
            console.log("user not found");
            return res.send({
                ok: false,
                accessToken: ""
            });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({
                ok: false,
                accessToken: ""
            });
        }
        sendRefreshToken(res, createRefreshToken(user));
        return res.send({
            ok: true,
            accessToken: createAccessToken(user)
        });
    });
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(8000, () => {
        console.log("Express server ready");
    });
})();
