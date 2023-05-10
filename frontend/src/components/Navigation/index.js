// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import CreateSpot from '../CreateSpot';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='header-ul '>
            <li id='logo-text'>
                <NavLink exact to="/"><span >staybnb</span></NavLink>
            </li>
            <li id='create-spot-li'>

            {sessionUser && (
                <NavLink  to="/spots/new">Create a new Spot</NavLink>
                )}
                </li>
            {isLoaded && (
                <li id='profile-li'>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
