import React, { Component } from 'react';
import {Link } from 'react-router-dom';


const NavBar = () => {
    
    return (
        <nav className="navbar navbar-dark  justify-content-between">
            <Link to='/'>
                <span to='/' className="navbar-brand mb-0 h1">Covid-19 Tracker</span>
            </Link>
            
            <form className="form-inline">
                <input className="form-control mr-sm-2 dark" type="search" placeholder="Enter Province/Territory " aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
    );
    
};

export default NavBar;