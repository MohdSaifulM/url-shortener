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
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                onClick={redirectToHome}
            >
                Go Home
            </button>
        </div>
    );
}

export default ErrorPage;