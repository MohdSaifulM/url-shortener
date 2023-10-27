import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { encryptData } from "../utils/encryptData";
import { decryptData } from "../utils/decryptData";
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const api_url = import.meta.env.VITE_API_URL;

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const encryptedData = encryptData(JSON.stringify({username, password}));

            const response = await axios.post(`${api_url}/user/login`, { data: encryptedData });
            

            if (!response.data.errors) {
                const result = decryptData(response.data);

                localStorage.setItem("user", response.data);

                dispatch({ type: "LOGIN", payload: result });

                setIsLoading(false);
            } else {
                setIsLoading(false);
                setError(response.data.message);
            }
        } catch (err) {
            setIsLoading(false);
            setError(error);
            console.log("Error logging in user ::", error);
        }
    };

    return { login, isLoading, error };
};
