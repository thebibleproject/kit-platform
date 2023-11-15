import {ApolloServer} from '@apollo/server';
import {buildSubgraphSchema} from '@apollo/subgraph';
import {startStandaloneServer} from '@apollo/server/standalone';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';
import {
    UserProgressData, UserProgressDataUpdates,
    UserProgressId,
    UserProgressService
} from "../../../../libs/progress/src";
import DataLoader from "dataloader";
import {verifyAccessToProgress} from "@kit-platform/user-access";
import {GraphQLError} from "graphql/error";
import {DataSource} from "typeorm";
import {
    ProgressPostgresRepository,
    UserProgressRecord
} from "../../../../libs/progress/src/infrastructure/progress.postgres.repository";

type ProgressLoader = DataLoader<UserProgressId, UserProgressData>;
type Context = {
    authToken: string | null;
    progressLoader: ProgressLoader;
    service: UserProgressService;
}

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(
        path.resolve('./dist/apps/services/progress/schema.graphql'),
        {encoding: 'utf8'}
    )
);

//set up using docker compose file run `npm start:db` to start the database
export const ProgressDatasource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kit_admin",
    password: "password",
    database: "kit",
    synchronize: true, //this automatically creates the tables for based on the entities, not ideal for production, but works well for development
    logging: false,
    entities: [UserProgressRecord],
});


// Resolvers
// ---------
const resolvers = {
    Query: {
        userProgress: async (_, {userId, contentId}, _context) => {
            const context = _context as Context;
            const userProgress = await context.progressLoader.load({userId, contentId});
            return userProgressDataToSchema(userProgress)
        }
    },
    Mutation: {
        saveProgress: async (_, {input}, _context) => {
            const context = _context as Context;
            const {userId, contentId, progressPercentInt, completedTimestamp, isBookmarked} = input;
            const completedDate = completedTimestamp ? new Date(completedTimestamp) : undefined;
            const canAccess = await verifyAccessToProgress(context.authToken, userId);
            if(!canAccess) {
                throw new GraphQLError('User does not have access to this content');
            }
            const id: UserProgressId = {userId, contentId};
            const updates: UserProgressDataUpdates = {progressPercentInt, completedDate, isBookmarked};
            const updated = await context.service.save(id, updates);
            return userProgressDataToSchema(updated);
        }
    },
    Content: {
        //ideally, rather than passing the userId as an argument, we would extract it from the context and the auth token
        progress: async (content, {userId}, _context) => {
            const context = _context as Context;
            const canAccess = await verifyAccessToProgress(context.authToken, userId);
            if(!canAccess) {
                throw new GraphQLError('User does not have access to this content');
            }
            const userProgress = await context.progressLoader.load({userId, contentId: content.id})
            return userProgressDataToSchema(userProgress);
        }
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{typeDefs, resolvers}]),
});

(async () => {
    const database = await ProgressDatasource.initialize();
    const repository = new ProgressPostgresRepository(database);
    const service = new UserProgressService(repository);
    const {url} = await startStandaloneServer(server, {
        context: async ({req}): Promise<Context> => {
            const authToken = req.headers.authorization || null;
            //we want to extract the auth token from the request, so that we can use it to verify and validate the user
            //in the resolvers
            return {
                authToken,
                service,
                //we want to create a new dataloader for each request, so that we can batch and cache the requests but not share the cache between requests
                progressLoader: createProgressLoader(service)
            }
        },
        listen: {port: parseInt(process.env.PROGRESS_SERVICE_PORT) || 6130},
    });

    console.log('Progress server ready at:', url);
})();

//data loaders help solve the n+1 problem allowing us to batch and cache requests to the database within the same request context
function createProgressLoader(service: UserProgressService):ProgressLoader {
    return new DataLoader<UserProgressId, UserProgressData>(async (ids: UserProgressId[]) => {
            const userProgress = await service.loadByIds(ids);
            return ids.map(id => {
                const foundProgress = userProgress.find(progress => progress.matches(id));
                const foundOrEmpty = foundProgress ?? UserProgressData.empty(id.userId, id.contentId);
                return foundOrEmpty;
            });
        }
    );
}


//ideally there is some type generation of the graphql types so that we can avoid the any here
// i like to have a clear seperation between the domain objects and the schema objects, often they will differ in shape
function userProgressDataToSchema(userProgress: UserProgressData): any {
    return {
        userId: userProgress.userId,
        contentId: userProgress.contentId,
        progressPercentInt: userProgress.progressPercentInt,
        completedTimestamp: userProgress.completedDate ? userProgress.completedDate.valueOf() : null,
        isBookmarked: userProgress.isBookmarked,
    }
}