import React, { useMemo } from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';
import { Home } from './routes/Home';
import { AuthProvider } from './providers/Auth';
import { Login } from './routes/Login';
import { Article } from './routes/Article';
import { Video } from './routes/Video';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/articles/:slug',
                element: <Article />,
            },
            {
                path: '/videos/:slug',
                element: <Video />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

const App = () => {
    const client = useMemo(
        () =>
            new ApolloClient({
                uri: 'http://localhost:6050',
                cache: new InMemoryCache(),
            }),
        []
    );

    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ApolloProvider>
    );
};

export default App;
