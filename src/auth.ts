import User from "./entity/user";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
    console.log("New access token was generated");
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m"
    });
};

export const createRefreshToken = (user: User) => {
    const refresh_token = sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d"
        }
    );
    console.log(refresh_token);
    return refresh_token;
};