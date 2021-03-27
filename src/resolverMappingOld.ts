import { IResolvers } from 'graphql-tools';
import { helloWorldResolver } from './resolversOld/helloWorldResolverOld';
import { signUpRequestResolver } from './signUpSystem/signUpRequestResolver';
import { loginRequestResolver } from './loginSystemOld/loginRequestResolverOld';
const resolvers: IResolvers = {
    Query: {
        helloWorld: (_, args, context) => helloWorldResolver(_, args, context),
        suppe: () => 1,
        signUp: (_, args) => signUpRequestResolver(args),
        login: (_, args) => loginRequestResolver(args)
    },
};
export default resolvers;