import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/Layout.tsx';
import URLInput from './components/URLInput.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import './assets/output.css';

// TODO add dashboard page
const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <URLInput />
			}	
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
			<RouterProvider router={router} />
	</React.StrictMode>,
)
