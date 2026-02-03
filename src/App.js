import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import RoomList from "./components/RoomList";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="container pt-8">
    <Router>
      <div>
        <nav>
          <Link to="/register">Register</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          {user && <Link to="/rooms">Rooms</Link>}
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/rooms" element={<RoomList user={user} />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}