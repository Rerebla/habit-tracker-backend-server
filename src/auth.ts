import User from "./entity/user";
import { sign } from "jsonwebtoken";
import { CONFIG } from './config';

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, CONFIG.accessTokenSecret, {
        expiresIn: "15m"
    });
};

export const createRefreshToken = (user: User) => {
    const refresh_token = sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        CONFIG.refreshTokenSecret,
        {
            expiresIn: "7d"
        }
    );
    console.log(refresh_token);
    return refresh_token;
};