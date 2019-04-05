import { GraphQLClient } from 'graphql-request';
import { useState, useEffect } from 'react';

// The base url to call the request
export const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '<production-url>'
        : 'http://localhost:4000/graphql';

/**
 * Function that calls the new GraphQLClient request as a utility function to reuse
 */
export const useClient = () => {
    const [idToken, setIdToken] = useState('');

    useEffect(() => {
        const token = window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().id_token;

        setIdToken(token);
    }, []);

    return new GraphQLClient(BASE_URL, {
        headers: {
            authorization: idToken
        }
    });
};
