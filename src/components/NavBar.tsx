import { NavLink } from 'react-router-dom';
import logo from './../../public/web-internet.svg';

function NavBar() {

    const navlist = [
        { title: 'Home', navigate: '/' },
        { title: 'Dashboard', navigate: '/dashboard' },
        { title: 'About', navigate: '/about' },
        { title: 'Login', navigate: '/login' }
    ];

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="surl logo" />
                    <span className="self-center font-light text-3xl whitespace-nowrap dark:text-white">sURL</span>
                </a>
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {
                            navlist.map((nav, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={nav.navigate}
                                        className="block py-2 pl-3 pr-4 font-light text-xl hover:text-blue-700 text-gray-900 rounded md:text-gray-900 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                    >
                                        {nav.title}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;