import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
    text: "center"
}

function NavBar() {
    return (
        <div className= "NavLinks">
            <NavLink to="/login" exact style={linkStyles}>Login</NavLink>
            <NavLink to="/collection" exact style={linkStyles}>Plant Collection</NavLink>
            <NavLink to="/forums" exact style={linkStyles}>Forums</NavLink>
        </div>
    )
}

export default NavBar;