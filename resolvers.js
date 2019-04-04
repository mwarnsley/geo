const { AuthenticationError } = require('apollo-server');

const user = {
    _id: '1',
    name: 'Marcus',
    email: 'marcus.warnsley@gmail.com',
    picture: 'https://www.cloudinary.com/asdf'
};

/**
 * Function to wrap the resolver functions for authentication
 * @param { Function } next steps to the next function and runs it
 * @param { } args
 * @param { } context
 * @param { } info
 */
const authenticated = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new AuthenticationError('You must be logged in');
    }
    return next(root, args, context, info);
};

module.exports = {
    Query: {
        me: authenticated((root, args, context) => context.currentUser)
    }
};
