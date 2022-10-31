import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
    return (
        <div className='navbar'>
               <NavLink to="/" end>HOME</NavLink>
               <NavLink to="/upload"> POST PICS </NavLink>
        </div>
    );
}

export default Navbar;