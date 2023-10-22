import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import URLInput from './components/URLInput.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import './../dist/output.css';

// TODO add dashboard page
const router = createBrowserRouter([
	{
		path: "/",
		element: <URLInput />,
		errorElement: <ErrorPage />
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
