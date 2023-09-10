import React, { useState } from "react";

function Login({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <h1>Welcome to the Login page!</h1>
    )
}

export default Login;