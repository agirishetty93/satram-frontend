import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function RoomList({ user }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data));
  }, []);

  const handleBook = async (roomId) => {
    const checkIn = prompt("Enter check-in date (YYYY-MM-DD)");
    const checkOut = prompt("Enter check-out date (YYYY-MM-DD)");

    const res = await api.post(`/bookings?userId=${user.id}&roomId=${roomId}`, { checkIn, checkOut });
    alert(res.data);
  };

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.roomNumber} - ${room.price} - {room.available ? "Available" : "Booked"}
            {room.available && <button onClick={() => handleBook(room.id)}>Book</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}