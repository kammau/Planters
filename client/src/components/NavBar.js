import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({user, onLogout}) {
    
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((res) => {
            if (res.ok) {
                onLogout()
            }
        })
    }


    return (
        <div id="nav_bar">
            {user ? (
                <>
                    <NavLink to="/plants" exact ><button className="nav_links">Plants</button></NavLink>
                    <NavLink to="/user_plants" exact user={user}><button className="nav_links">My Plant Collection</button></NavLink>
                    <NavLink to="/posts" exact ><button className="nav_links">Posts</button></NavLink>
                    <button onClick={handleLogout} id="logout_btn">LOGOUT</button>
                </>
            ) : (
                <>
                    <NavLink to="/login" exact ><button className="home_btn">Login</button></NavLink>
                    <NavLink to="/signup" ><button className="home_btn">Signup</button></NavLink>
                </>
            )}
        </div>
    )
}

export default NavBar;
