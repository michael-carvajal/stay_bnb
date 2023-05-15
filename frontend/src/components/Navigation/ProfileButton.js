import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu} id='profile-btn'>
                <i className="fas fa-bars" />
                <i className="fas fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li className="manage-spot-btn">
                            <div className="manage-user">
                            <p>
                                Hello, {user.username}
                            </p>
                            <p>{user.email}</p>

                            <hr />
                            </div>
                        </li>
                        <li className="manage-spot-btn">
                            <div className="manage-user">
                                <NavLink to="/spots/current">Manage Spots</NavLink>
                                <NavLink to="/reviews/current">Manage Reviews</NavLink>
                            <hr />
                            </div>
                        </li>
                        <li onClick={logout}  className="logout-btn" >
                            <p >Log Out</p>
                        </li>
                    </>
                ) : (
                    <div className="signup-login">
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                    </div >
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
