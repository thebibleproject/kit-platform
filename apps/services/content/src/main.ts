import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';

import { articles } from './data/articles';
import { videos } from './data/videos';
import { quizzes } from './data/quizzes';

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(
        path.resolve('./dist/apps/services/content/schema.graphql'),
        { encoding: 'utf8' }
    )
);

// Resolvers
// ---------
const resolvers = {
    Query: {
        articles: () => articles,
        article: (_, { id, slug }) => {
            return articles.find(
                (article) => article.id === id || article.slug === slug
            );
        },
        quizzes: () => quizzes,
        quizById: (_, { id }) => {
            return quizzes.find((quiz) => quiz.id === id);
        },
        videos: () => videos,
        video: (_, { id, slug }) => {
            return videos.find(
                (video) => video.id === id || video.slug === slug
            );
        },
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.CONTENT_SERVICE_PORT) || 6110 },
    });

    console.log('Content server ready at:', url);
})();
