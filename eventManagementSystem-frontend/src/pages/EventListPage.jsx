import React, { useEffect, useState } from "react";
import {getAllEvents} from "../services/eventService";
import { Link } from "react-router-dom";

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAllEvents()
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="mt-2 text-sm">📍 {event.venue}</p>
            <p className="text-sm">🗓 {new Date(event.eventDate).toLocaleString()}</p>
            <p className="text-sm mt-1">Seats Left: {event.availableSeats}</p>
            <Link
              to={`/events/${event.id}`}
              className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
