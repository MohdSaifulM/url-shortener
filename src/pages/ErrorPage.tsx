import { useRouteError, useNavigate } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError() as any;
    const navigate = useNavigate();
    console.error(error);

    const redirectToHome = async () => {
        navigate("/");
    }

    return (
        <div className="h-screen text-left p-5 flex justify-center flex-col items-center">
            <h1 className="text-5xl font-semibold">Oops!</h1>
            <p className="text-xl text-center font-light my-[25px]">Sorry, an unexpected error has occurred.
                <span className="text-xl font-light mt-3 ml-3">
                    <i>{error.statusText || error.message}</i>
                </span>
            </p>
            <button 
                className="relative inline-flex items-center justify-center p-0.5 my-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                onClick={redirectToHome}
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Go Home
                </span>
            </button>
        </div>
    );
}

export default ErrorPage;