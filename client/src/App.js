import React from 'react'
import BookList from "./components/BookLists"
import AddBook from './components/AddBook';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

// Apollo Client Setup
const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache()
})

const App = () => {
        return (
            <ApolloProvider client={client}>
                <div className="main">
                    <h1>Reading List</h1>
                    <BookList />
                    <AddBook />
                </div>
            </ApolloProvider>
        )
    }

export default App