import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useRegister = () => {
    const [error, setError] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const api_url = import.meta.env.VITE_API_URL;

    const register = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${api_url}/user/register`, {
                username,
                password,
            });

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));

                dispatch({ type: "LOGIN", payload: response.data });

                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
            console.error("Error registering user ::");
        }
    };

    return { register, isLoading, error };
};
