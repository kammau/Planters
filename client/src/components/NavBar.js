import React from "react";
import { NavLink } from "react-router-dom";

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
        <div id="nav_bar">
            <NavLink to="/collection" exact user={user}><button className="nav_links">Plant Collection</button></NavLink>
            <NavLink to="/forums" exact user={user}><button className="nav_links">Forums</button></NavLink>
            <button onClick={handleLogout} id="logout_btn">LOGOUT</button>
        </div>
    )
}

export default NavBar;
