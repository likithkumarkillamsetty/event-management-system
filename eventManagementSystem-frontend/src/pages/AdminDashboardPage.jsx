import React, { useEffect, useState } from "react";
import {getAllEvents,createEvent} from "../services/eventService";

export default function AdminDashboardPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    venue: "",
    maxParticipants: 50,
    organizerId: 1
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    getAllEvents()
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEvent(form)
      .then(() => {
        setForm({ title: "", description: "", eventDate: "", venue: "", maxParticipants: 50, organizerId: 1 });
        loadEvents();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 mb-3 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 mb-3 border rounded" />
          <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
          <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" className="w-full p-2 mb-3 border rounded" />
          <input type="number" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Create Event
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-4">All Events</h3>
        <ul className="space-y-3">
          {events.map(event => (
            <li key={event.id} className="p-4 bg-white shadow rounded">
              <strong>{event.title}</strong> — {new Date(event.eventDate).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
