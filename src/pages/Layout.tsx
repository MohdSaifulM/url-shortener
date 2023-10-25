import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";

function Layout() {
    return (
        <div className='h-screen relative'>
			<NavBar />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
			<Outlet />
		</div>
    );
}

export default Layout;