import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
    "textDecoration": "none",
    "color": "white"
    
}

function NavBar({user, setUser}) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((res) => {
            if (res.ok) {
                setUser(null)
            }
        })
    }


    return (
        <div className="NavLinks">
            {user ? (
                <>
                    <NavLink to="/collection" exact>Plant Collection</NavLink>
                    <NavLink to="/forums" exact>Forums</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <div>
                    <button className="logButtons"><NavLink to="/login" exact style={linkStyles}>Login</NavLink></button>
                    <button className="logButtons"><NavLink to="/signup" exact style={linkStyles}>Signup</NavLink></button>
                </div>
            )}
        </div>
    )
}

export default NavBar;
