import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const api_url = import.meta.env.VITE_API_URL;

    const login = async (username: string, email: string, password: string, confirmPassword: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${api_url}/user/login`, {
                username,
                email,
                password,
                confirmPassword
            });

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));

                dispatch({ type: "LOGIN", payload: response.data });

                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
            console.error("Error logging in user ::");
        }
    };

    return { login, isLoading, error };
};
