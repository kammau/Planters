import React, { useState } from "react";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((user) => setUser(user))
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Welcome Back!</h1>
                <p>Please Enter Your Login Info</p>
                

                <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;