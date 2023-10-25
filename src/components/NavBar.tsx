import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import { navTheme } from '../styles-overwrite';
import logo from '/web-internet.svg';

function NavBar() {

    const [activeOption, setActiveOption] = useState('Home');

    const navlist = [
        { title: 'Home', navigate: '/' },
        { title: 'Dashboard', navigate: '/dashboard' },
        { title: 'Login', navigate: '/login' }
    ];

    const handleClick = (option: string) => {
        setActiveOption(option)
    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} to="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="sUrl Logo" />
                <span className="self-center whitespace-nowrap text-2xl font-light dark:text-white">sURL</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {
                    navlist.map((nav, index) => (
                        <Navbar.Link
                            as={Link}
                            to={nav.navigate}
                            key={index}
                            onClick={() => handleClick(nav.title)}
                            active={nav.title === activeOption ? true : false}
                            theme={navTheme?.link}
                        >
                            {nav.title}
                        </Navbar.Link>
                    ))
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;