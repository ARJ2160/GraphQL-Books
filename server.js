const express = require('express');
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema')

const app = express();

mongoose.connect('mongodb+srv://admin:admin@gql-cluster.dblaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, })
    .then(() => {
        console.log("Successfully Connected to Database");
    })
    .catch(err => {
        console.log(err);
    }
)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(5000, () => {
    console.log("Server Running on 5000");
})
