import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar} from "reactstrap";
import './Navbar.css'

function NavBar({currUser, logout}) {
    return (
        <div className="nav">
            <Navbar>
                {!currUser ? <NavLink className="links" to="/signup">Signup</NavLink> : null}
                {!currUser ? <NavLink className="links" to="/login">Login</NavLink> : null}
                {currUser ? <NavLink className="links" onClick={logout} to="/">Log out</NavLink> : null }
                {currUser ? <NavLink className="links" to="/profile">Profile</NavLink> : null}
                {currUser ? <NavLink className="links" to="/jobs">Jobs</NavLink> : null}
                {currUser ? <NavLink className="links" to="/companies">Companies</NavLink> : null}
                <NavLink id='jobly-link'className="links" to="/">Jobly</NavLink>
            </Navbar>
        </div>
    )
}

export default NavBar