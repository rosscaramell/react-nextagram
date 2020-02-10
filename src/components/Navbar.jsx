import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import { Link } from "react-router-dom";
import AuthModal from './AuthModal';

const NavBar = ({ setLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar className="navBar" color="yellow" light expand="md">
                <NavbarBrand href="/">Nextagram</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Homepage</NavLink>
                        </NavItem>
                        {localStorage.getItem("jwt") && <NavLink tag={Link} to="/myProfile">My Profile</NavLink>}
                        <NavItem>
                            <NavLink tag={Link} to="/about">About page</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/uploadPage">Upload Image</NavLink>
                        </NavItem>

                    </Nav>
                    <AuthModal setLoggedIn={setLoggedIn} />

                    <NavbarText>GangStar copyright</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}
export default NavBar;