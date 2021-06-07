import React from 'react';
import { Link } from "react-router-dom";
import './Homepage.css'

function Homepage({currUser}) {
    return (
        <div class='homepage-text'>
            {currUser ? <h1>Hey, {currUser.firstName}!</h1> : null}
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place</p>
            {!currUser ? 
            <Link class='homepage-links' to='/login'>
                <h4 class='homepage-links'>Login</h4>
            </Link> 
            : null}
            {!currUser ? 
            <Link class='homepage-links' to='/signup'>
                <h4 class='homepage-links'>Sign Up</h4>
            </Link>
            : null}
        </div>
    )
}

export default Homepage