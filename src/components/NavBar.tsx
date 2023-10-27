/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { navTheme } from '../styles-overwrite';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import logo from '/web-internet.svg';

function NavBar() {

    const { user } = useAuthContext();

    const { logout } = useLogout();

    const location = useLocation();

    const navlist = [
        { title: 'Home', navigate: '/' },
        { title: 'Dashboard', navigate: '/dashboard' },
        user ? { title: 'Logout', navigate: '/' } : { title: 'Login', navigate: '/login' }
    ];

    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} to="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="sUrl Logo" />
                <span className="self-center whitespace-nowrap text-2xl font-light dark:text-white">sURL</span>
            </Navbar.Brand>
            {/* // TODO Under Construction */}
            {/* <Navbar.Toggle /> */}
            {/* <Navbar.Collapse> */}
                {
                    // navlist.map((nav, index) => (
                    //     <Navbar.Link
                    //         as={Link}
                    //         to={nav.navigate}
                    //         key={index}
                    //         active={nav.navigate === location.pathname}
                    //         theme={navTheme?.link}
                    //         onClick={() => user && logout()}
                    //     >
                    //         {nav.title}
                    //     </Navbar.Link>
                    // ))
                }
            {/* </Navbar.Collapse> */}
        </Navbar>
    );
}

export default NavBar;