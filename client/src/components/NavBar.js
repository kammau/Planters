import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({user, handleLogin, onLogout}) {
    
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
                    <NavLink to="/plants" exact user={user}><button className="nav_links">Plant Collection</button></NavLink>
                    <NavLink to="/forums" exact user={user}><button className="nav_links">Forums</button></NavLink>
                    <button onClick={handleLogout} id="logout_btn">LOGOUT</button>
                </>
            ) : (
                <>
                    <NavLink to="/login" exact handleLogin={handleLogin}><button className="home_btn">Login</button></NavLink>
                    <NavLink to="/signup" handleLogin={handleLogin}><button className="home_btn">Signup</button></NavLink>
                </>
            )}
        </div>
    )
}

export default NavBar;
