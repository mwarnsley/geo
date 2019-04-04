const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo Database');
    })
    .catch(error => console.error('Error connecting to database: ', error));

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server is listening on port: ${url}`);
});
