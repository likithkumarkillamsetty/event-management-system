import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getEventById} from "../services/eventService";
import {registerForEvent} from "../services/registrationService"

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getEventById(id)
      .then(res => setEvent(res.data))
      .catch(() => setMessage("Failed to load event details"));
  }, [id]);

  const handleRegister = () => {
    registerForEvent(id, 1) // studentId hardcoded for now
      .then(() => setMessage("✅ Successfully registered"))
      .catch(() => setMessage("❌ Failed to register"));
  };

  if (!event) return <div className="p-6 text-center">{message || "Loading..."}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <p className="mb-3">{event.description}</p>
        <p className="text-sm">📍 {event.venue}</p>
        <p className="text-sm">🗓 {new Date(event.eventDate).toLocaleString()}</p>
        <p className="text-sm mt-1">Seats Left: {event.availableSeats}</p>
        <button
          onClick={handleRegister}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Register
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
