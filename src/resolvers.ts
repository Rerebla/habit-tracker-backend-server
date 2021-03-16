import { IResolvers } from 'graphql-tools'
const resolvers: IResolvers = {
    Query: {
        helloWorld: () => "Hello world",
    },
};

export default resolvers;