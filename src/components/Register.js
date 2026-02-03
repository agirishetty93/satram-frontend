import React, { useState } from "react";
import api from "../services/api";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            const res = await api.post("/users/register", { name, email, phone, password });
            setMessage(res.data);
        } catch (err) {
            setMessage("Error registering user");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
}