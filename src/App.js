import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import RoomList from "./components/RoomList";
import Bookings from "./components/Bookings";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <div className="container pt-8">
    <Router>
      <div>
        <nav>
          {!user && <><Link to="/register">Register</Link> |{" "}<Link to="/login">Login</Link></>}
          {user && <><Link to="/rooms">Rooms</Link> |{" "}<Link to="/bookings">My Bookings</Link> |{" "}<button onClick={handleLogout}>Logout</button></>}
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/rooms" element={<RoomList user={user} />} />
          <Route path="/bookings" element={<Bookings user={user} />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}