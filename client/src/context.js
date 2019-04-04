import { createContext } from 'react';

// Creating the context from react which is basically the state
const Context = createContext({
    currentUser: null,
    isAuth: false
});

export default Context;
