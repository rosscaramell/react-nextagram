import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import { Link } from 'react-router-dom';

const AuthModal = (props) => {
    const {
        buttonLabel,
        className,
        setLoggedIn
    } = props;

    const [modal, setModal] = useState(false);

    const [showLogin, setShowLogin] = useState(true);


    const toggle = () => {
        setModal(!modal);
    }

    // const AuthModal = ({ buttonLabel })
    // const [modal, setModal] = useState(false);

    // const toggle = () => {
    //     setModal(!modal);
    //     setShowLogin(true);
    // };

    const toggleLogin = () => {
        if (showLogin) {
            setShowLogin(true)
        } else {
            setShowLogin(false)
        }
        setLoggedIn(true)
    }

    const logout = () => {
        if (localStorage.getItem("jwt")) {
            localStorage.removeItem('jwt');
            setLoggedIn(false)
        }

    }


    return (
        <>
            <NavLink onClick={localStorage.getItem("jwt") ? logout : toggle}>{localStorage.getItem("jwt") ? "logout" : "login"}</NavLink>
            <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                toggle={toggle}>
                <ModalHeader toggle={toggle}>Login To Enter</ModalHeader>

                <ModalBody>
                    {showLogin ? <Login toggle={toggle} toggleLogin={toggleLogin} setLoggedIn={setLoggedIn} /> : <Signup toggle={toggle} toggleLogin={toggleLogin} />}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={showLogin ? () => setShowLogin(false) : () => setShowLogin(true)}>Register</Button>{' '}
                    <Button tag={Link} to="/signup" color="secondary" onClick={toggle}>close </Button>{Signup}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AuthModal;