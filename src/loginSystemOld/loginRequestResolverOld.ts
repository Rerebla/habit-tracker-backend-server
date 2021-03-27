import User from '../entity/user';
import checkHash from '../passwordCryptoOld/checkHashOld';

export async function loginRequestResolver(args: { email: string, password: string; }): Promise<string> {
    const user = await User.findOne({ email: args.email });
    if (!user) return "ERROR User not found";
    const passwordHash = user.password;
    const clearTextPassword = args.password;
    if (!await checkHash(clearTextPassword, passwordHash)) return "ERROR Password didn't match";


    return "yes";
}