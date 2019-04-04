const { AuthenticationError } = require('apollo-server');

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

const Pin = require('./models/Pin');

module.exports = {
    Query: {
        me: authenticated((root, args, context) => context.currentUser)
    },
    Mutation: {
        createPin: authenticated(async (root, args, context) => {
            const newPin = await new Pin({
                ...args.input,
                author: context.currentUser._id
            }).save();
            const pinAdded = await Pin.populate(newPin, 'author');

            return pinAdded;
        })
    }
};
