import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function RoomList({ user }) {
  const [rooms, setRooms] = useState([]);
  const [bookingRoomId, setBookingRoomId] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data));
  }, []);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      setMessage("Check-out date must be after check-in date");
      return;
    }
    try {
      const res = await api.post(`/bookings?userId=${user.id}&roomId=${bookingRoomId}`, { checkIn, checkOut });
      setMessage(res.data);
      setBookingRoomId(null);
      setCheckIn("");
      setCheckOut("");
      api.get("/rooms").then(res => setRooms(res.data));
    } catch (err) {
      setMessage("Error making booking");
    }
  };

  return (
    <div>
      <h2>Rooms</h2>
      {message && <p>{message}</p>}
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.roomNumber} - ${room.price} - {room.available ? "Available" : "Booked"}
            {room.available && bookingRoomId !== room.id && (
              <button onClick={() => { setBookingRoomId(room.id); setMessage(""); }}>Book</button>
            )}
            {bookingRoomId === room.id && (
              <form onSubmit={handleBookSubmit}>
                <input
                  type="date"
                  placeholder="Check-in date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  required
                />
                <input
                  type="date"
                  placeholder="Check-out date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  required
                />
                <button type="submit">Confirm</button>
                <button type="button" onClick={() => setBookingRoomId(null)}>Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}