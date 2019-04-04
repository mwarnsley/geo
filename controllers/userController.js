const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

/**
 * Function that either finds or creates the enxt user
 * @param { String } token given token from the user that is trying to sign in or needs to be created
 */
exports.findOrCreateUser = async token => {
    // Verify the auth token
    const googleUser = await verifyAuthToken(token);
    // Check if the user exists
    const user = await checkIfUserExists(googleUser.email);
    // If the user exists, return them. Otherwise, create the user in the database
    return user ? user : createNewUser(googleUser);
};

/**
 * Function that checks and authenticates the token
 * @param { String } token given from the signed in user
 */
const verifyAuthToken = async token => {
    try {
        // Verifying the id Token from the client passing in the idToken and the audience
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });
        // Returns the google user if we have one
        return ticket.getPayload();
    } catch (error) {
        console.error('Error verifying auth token', error);
    }
};

/**
 * Function that checks if the user exists in the database
 * @param { String } email email of the user that was given back from the user
 */
const checkIfUserExists = async email => await User.findOne({ email }).exec();

/**
 * Function that creates the new user in the database
 * @param { Object } googleUser the user being created
 */
const createNewUser = googleUser => {
    const { name, email, picture } = googleUser;
    // Creating the new user object
    const user = { name, email, picture };
    // Saving the user to the database
    return new User(user).save();
};
