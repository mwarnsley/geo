import {
    CREATE_DRAFT,
    CREATE_PIN,
    DELETE_DRAFT,
    DELETE_PIN,
    GET_PINS,
    IS_LOGGED_IN,
    LOGIN_USER,
    SET_PIN,
    SIGNOUT_USER,
    UPDATE_DRAFT_LOCATION
} from './constants';

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
        case CREATE_DRAFT:
            return {
                ...state,
                currentPin: null,
                draft: {
                    latitude: 0,
                    longitude: 0
                }
            };
        case UPDATE_DRAFT_LOCATION:
            return {
                ...state,
                draft: payload
            };
        case DELETE_DRAFT:
            return {
                ...state,
                draft: null
            };
        case GET_PINS:
            return {
                ...state,
                pins: payload
            };
        case CREATE_PIN:
            const newPin = payload;
            const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
            return {
                ...state,
                pins: [...prevPins, newPin]
            };
        case SET_PIN:
            return {
                ...state,
                currentPin: payload,
                draft: null
            };
        case DELETE_PIN:
            const deletedPin = payload;
            const filteredPins = state.pins.filter(
                pin => pin._id !== deletedPin._id
            );
            return {
                ...state,
                currentPin: null,
                pins: filteredPins
            };
        default:
            return state;
    }
}
