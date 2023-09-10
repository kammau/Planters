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
                
                <label for="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label for="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;