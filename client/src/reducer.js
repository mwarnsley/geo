import { IS_LOGGED_IN, LOGIN_USER, SIGNOUT_USER } from './constants';

export default function reducer(state, { type, payload }) {
    switch (type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: payload
            };
        case IS_LOGGED_IN:
            return {
                ...state,
                isAuth: payload
            };
        case SIGNOUT_USER:
            return {
                ...state,
                currentUser: null,
                isAuth: false
            };
        default:
            return state;
    }
}
