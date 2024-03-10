import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { decryptData } from "../utils/decryptData";

interface User {
    token: string;
    user: { username: string | null; password: string };
}

interface IContextProps {
    user: User;
    state: any;
    dispatch: ({ type }: { type: string; payload?: User }) => void;
}

function isTokenExpired(token: string) {
    if (!token || token === "") return true;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
    );

    const { exp } = JSON.parse(jsonPayload);
    const expired = Date.now() >= exp * 1000;
    return expired;
}

export const AuthContext = createContext({} as IContextProps);

export const AuthContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    let user: User | null = null;
    const userString = localStorage.getItem("user");

    if (userString !== null) user = decryptData(userString);

    const isExpired = isTokenExpired(user ? user.token : "");

    if (isExpired) localStorage.removeItem("user");

    useEffect(() => {
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
