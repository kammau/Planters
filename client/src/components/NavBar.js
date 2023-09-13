import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
    text: "center"
}

function NavBar({user, setUser}) {
    return (
        <div className= "NavLinks">
            {user ? (
                <>
                    <NavLink to="/collection" exact style={linkStyles}>Plant Collection</NavLink>
                    <NavLink to="/forums" exact style={linkStyles}>Forums</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login" exact style={linkStyles}>Login</NavLink>
                    <NavLink to="/signup" exact style={linkStyles}>Signup</NavLink>
                </>
            )}
        </div>
    )
}

export default NavBar;

// <NavLink to="/collection" exact style={linkStyles}>Plant Collection</NavLink>
// <NavLink to="/forums" exact style={linkStyles}>Forums</NavLink>