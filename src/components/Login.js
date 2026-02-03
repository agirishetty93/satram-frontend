import React, { useState } from "react";
import api from "../services/api";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/users/login", { email, password });
            if (res.data.id) {
                onLogin(res.data);
                setMessage("Login successful");
            } else {
                setMessage("Invalid credentials");
            }
        } catch (err) {
            setMessage("Error logging in");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
}