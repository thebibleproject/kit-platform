import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';

import depthLimit from 'graphql-depth-limit';
import * as fs from 'fs';
import * as path from 'path';

const supergraphSdl = fs.readFileSync(
    path.resolve('./dist/apps/gateway/supergraph.graphql'),
    { encoding: 'utf8' }
);

const gateway = new ApolloGateway({
    __exposeQueryPlanExperimental: false,
    supergraphSdl,
});

const server = new ApolloServer({
    gateway,
    validationRules: [depthLimit(10)],
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.GATEWAY_PORT) || 6050 },
    });
    console.log('Gateway ready at:', url);
})();
