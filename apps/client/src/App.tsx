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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ],
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
            <RouterProvider router={router} />
        </ApolloProvider>
    );
};

export default App;