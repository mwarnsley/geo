import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';

import { ME_QUERY } from '../../graphql/queries';
import { IS_LOGGED_IN, LOGIN_USER } from '../../constants';

const Login = ({ classes }) => {
    // Getting the dispatch from the useContext by passing in the context state
    const { dispatch } = useContext(Context);

    /**
     * On Success Function of the user successfully logging in
     * @param { Object } googleUser is the object of the signed in user data from google
     */
    const onSuccess = async googleUser => {
        try {
            // Using the getAuthResponse method to get the id token of the google login user
            const idToken = googleUser.getAuthResponse().id_token;
            // Creating a new graphql client passing in the request url and the object options with the authorization headers
            const client = new GraphQLClient('http://localhost:4000/graphql', {
                headers: {
                    authorization: idToken
                }
            });
            // Creating the client request to send the token back to the server
            const data = await client.request(ME_QUERY);
            // Dispatching the type and payload to the reducer state to update for loggin in the user
            dispatch({ type: LOGIN_USER, payload: data.me });
            // Dispatching the type and payload for checking to make sure the user is logged in
            dispatch({ type: IS_LOGGED_IN, payload: googleUser.isSignedIn() });
        } catch (error) {
            // If there is an error we will use the onFailure function passing in the error
            onFailure(error);
        }
    };

    /**
     * Function that sets the error if there is an error logging in
     * @param { String } error error passed in
     */
    const onFailure = error => {
        console.error('Error Logging In: ', error);
    };
    return (
        <div className={classes.root}>
            <Typography
                component="h1"
                gutterBottom
                noWrap
                style={{ color: 'rgb(66, 133, 244)' }}
                variant="h3"
            >
                Welcome
            </Typography>
            <GoogleLogin
                buttonText="Log in with Google"
                clientId="1005484929459-596t4gp2kirgde04ot09m6t84042e810.apps.googleusercontent.com"
                isSignedIn={true}
                onFailure={onFailure}
                onSuccess={onSuccess}
                theme="dark"
            />
        </div>
    );
};

const styles = {
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

export default withStyles(styles)(Login);
