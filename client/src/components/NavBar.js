import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="links">
            <Link>Login/Signup</Link>
            <Link>Forums</Link>
            <Link>Collection</Link>
        </div>
    )
}