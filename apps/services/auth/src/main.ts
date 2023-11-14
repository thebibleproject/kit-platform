import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { login } from '@kit-platform/user-access';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';
import { GraphQLError } from 'graphql/error';

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(path.resolve('./dist/apps/services/auth/schema.graphql'), {
        encoding: 'utf8',
    })
);

// Resolvers
// ---------
const resolvers = {
    Mutation: {
        login: async (_, { username, password }) => {
            try {
                const { accessToken, user } = await login(username, password);
                return { accessToken, user, success: true };
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.AUTH_SERVICE_PORT) || 6120 },
    });

    console.log('Auth server ready at:', url);
})();
