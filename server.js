const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController');

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo Database');
    })
    .catch(error => console.error('Error connecting to database: ', error));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null;
        let currentUser = null;
        try {
            authToken = req.headers.authorization;
            if (authToken) {
                // Find the user in database according to the value of the authToken or create a new user if one is not found
                currentUser = await findOrCreateUser(authToken);
            }
        } catch (error) {
            console.error(
                `Unable to authenticate user with token ${authToken}`
            );
        }
        return { currentUser };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server is listening on port: ${url}`);
});
