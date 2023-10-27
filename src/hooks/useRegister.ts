import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { encryptData } from "../utils/encryptData";
import { decryptData } from "../utils/decryptData";
import axios from "axios";

export const useRegister = () => {
    const [error, setError] = useState<null | any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userAuthenticated, setuserAuthenticated] = useState<boolean>(false);
    const { dispatch } = useAuthContext();
    const api_url = import.meta.env.VITE_API_URL;

    const register = async (username: string, email: string, password: string, confirmPassword: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const encryptedData = encryptData(JSON.stringify({username, email, password, confirmPassword}));

            const response = await axios.post(`${api_url}/user/register`, { data: encryptedData });

            if (!response.data.errors) {
                const result = decryptData(response.data);

                localStorage.setItem("user", response.data);

                dispatch({ type: "LOGIN", payload: result });

                setuserAuthenticated(true);

                setIsLoading(false);
            } else {
                setIsLoading(false);
                setError(response.data.message);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
            console.error("Error registering user ::", error);
        }
    };

    return { register, isLoading, error, userAuthenticated };
};
