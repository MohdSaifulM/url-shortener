import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { useJwt } from "react-jwt";

interface User {
    token: string,
    user: { username: string | null, password: string }
}

interface IContextProps {
    user: User,
    state: any,
    dispatch: ({ type }: {
        type: string,
        payload?: User
    }) => void;
}

export const AuthContext = createContext({} as IContextProps);

export const AuthContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    let user: User | null = null;
    const userString = localStorage.getItem('user');

    if (userString !== null) user = JSON.parse(userString);

    const { isExpired } = useJwt(user ? user.token : "");

    if (isExpired) localStorage.removeItem('user');

    console.log(`AuthContext children ${JSON.stringify(children)}`)

    useEffect(() => {
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    },[user]);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}