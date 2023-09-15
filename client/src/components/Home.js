import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Home({setUser}) {
    const [view, setView] = useState("login");

    return (
        <div>
            <nav className="home_buttons">
                <button onClick={() => setView("login")} className="home_btn">Login</button>
                <button onClick={() => setView("signup")} className="home_btn">Signup</button>
            </nav>
            {view === "login" ? <Login setUser={setUser} /> : <Signup setUser={setUser} />}
        </div>
    )
}

export default Home;