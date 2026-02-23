import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Bookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      api.get(`/bookings?userId=${user.id}`)
        .then(res => setBookings(res.data))
        .catch(() => setMessage("Error loading bookings"));
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your bookings.</p>;
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {message && <p>{message}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              Room {booking.roomNumber} - Check-in: {booking.checkIn} - Check-out: {booking.checkOut}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
