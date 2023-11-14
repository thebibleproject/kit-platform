import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';

import { articles } from './data/articles';
import { videos } from './data/videos';

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(
        path.resolve('./dist/apps/services/content/schema.graphql'),
        { encoding: 'utf8' }
    )
);

// Hardcoded Data
// --------------
const data = {
    quizzes: [
        {
            id: '1',
            title: 'Dialing in Espresso - Quiz',
            description:
                'This quiz will test your knowledge of dialing in espresso',
            questions: [
                {
                    id: '1',
                    questionText:
                        'Suppose the taste is a little harsh and overly roasty.  What is the first thing you should check?',
                    answerText: 'Water temperature',
                },
                {
                    id: '2',
                    questionText:
                        'For an 18-gram dose of coffee, what is the ideal espresso output weight?',
                    answerText:
                        'It depends on the roast, but aim for 36--45 grams.',
                },
            ],
        },
    ],
};

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
        quizzes: () => data.quizzes,
        quizById: (_, { id }) => {
            return data.quizzes.find((quiz) => quiz.id === id);
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
