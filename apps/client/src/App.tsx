import React, {useMemo} from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const App = () => {
    const client = useMemo(() => new ApolloClient({
        uri: 'http://localhost:6050',
        cache: new InMemoryCache()
    }), []);

    return <ApolloProvider client={client}>Class Hello</ApolloProvider>
}

export default App;