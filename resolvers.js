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
        me: authenticated((root, args, context) => context.currentUser),
        getPins: async (root, args, context) => {
            const pins = await Pin.find({})
                .populate('author')
                .populate('comments.author');
            return pins;
        }
    },
    Mutation: {
        createComment: authenticated(async (root, args, context) => {
            const newComment = {
                author: context.currentUser._id,
                text: args.text
            };
            const pinUpdated = await Pin.findOneAndUpdate(
                { _id: args.pinId },
                { $push: { comments: newComment } },
                { new: true }
            )
                .populate('author')
                .populate('comments.author');

            return pinUpdated;
        }),
        createPin: authenticated(async (root, args, context) => {
            const newPin = await new Pin({
                ...args.input,
                author: context.currentUser._id
            }).save();
            const pinAdded = await Pin.populate(newPin, 'author');

            return pinAdded;
        }),
        deletePin: authenticated(async (root, args, context) => {
            const pinDeleted = await Pin.findOneAndDelete({
                _id: args.pinId
            }).exec();

            return pinDeleted;
        })
    }
};
