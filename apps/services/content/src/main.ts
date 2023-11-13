import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as fs from 'fs';
import gql from 'graphql-tag';
import * as path from 'path';

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
    articles: [
        {
            id: '100',
            title: 'Edible Espresso Pucks',
            uri: 'https://www.jameshoffmann.co.uk/weird-coffee-science/edible-espresso-pucks',
        },
    ],
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
    videos: [
        {
            id: '1',
            title: 'How I Dial-In Espresso - Part #1',
            description: 'The first in a series about dialing in espresso',
            uri: 'https://www.youtube.com/watch?v=lFwJF-_SUr0&list=PLxz0FjZMVOl3ksLTyWsWNFdU1b73w1BUW',
            duration: 7 * 60 + 8,
        },
        {
            id: '2',
            title: 'How I Dial In Espresso - Episode 2',
            uri: 'https://www.youtube.com/watch?v=1eK0eidOA_U&list=PLxz0FjZMVOl3ksLTyWsWNFdU1b73w1BUW&index=2',
            duration: 9 * 60 + 56,
        },
    ],
};

// Resolvers
// ---------
const resolvers = {
    Query: {
        articles: () => data.articles,
        articleById: (_, { id }) => {
            return data.articles.find((article) => article.id === id);
        },
        quizzes: () => data.quizzes,
        quizById: (_, { id }) => {
            return data.quizzes.find((quiz) => quiz.id === id);
        },
        videos: () => data.videos,
        videoById: (_, { id }) => {
            return data.videos.find((video) => video.id === id);
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
