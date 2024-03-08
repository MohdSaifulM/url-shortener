import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.ts";
import Layout from './pages/Layout.tsx';
import URLInput from './components/URLInput.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from "./pages/Login.tsx";

function App() {
    const { user } = useAuthContext();
    const isLoggedIn = user !== null;

    const router = createBrowserRouter([
        {
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <URLInput />
                },
                {
                    path: "/login",
                    element: !isLoggedIn ? <Login /> : <Navigate to="/" />
                },
                {
                    path: "/dashboard",
                    element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                }
            ]
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
