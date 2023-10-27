import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        console.log('here')
        localStorage.removeItem('user');

        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
