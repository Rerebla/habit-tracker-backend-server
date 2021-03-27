import User from "../entity/user";
import makeHash from "../passwordCryptoOld/makeHashOld";

export async function signUpRequestResolver(
    args: { userName: string; emailAdress: string; password: string; }
): Promise<String> {
    if (await User.findOne({ email: args.emailAdress })) return "ERROR E-mail adress already in use";
    const user = new User();
    user.userName = args.userName;
    user.email = args.emailAdress;
    user.password = await makeHash(10, args.password);
    await User.save(user);

    if (!user.id) return "ERROR Couldn't save to database";
    return "SUCCESS Successfully signed up";
}
