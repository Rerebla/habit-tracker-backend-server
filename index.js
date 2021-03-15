import express from 'express';
import {
    ApolloServer,
    gql
} from 'apollo-server-express';
const port = 8080;
const typeDefs = gql `
    type Query{
        hello: String
        age: Int
    }
`;


const resolvers = {
    Query: {
        hello: () => 'Hell World',
        age: () => ageResolver(),
    },
};

function ageResolver() {
    return "abc";
}
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const app = express();
server.applyMiddleware({
    app
});

app.listen({
    port: port
}, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});