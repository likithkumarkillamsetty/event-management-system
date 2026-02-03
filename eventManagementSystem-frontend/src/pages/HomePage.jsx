import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      <nav className="flex justify-between items-center p-6 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-2xl font-bold">Event Management System</h1>
        <div className="flex gap-6">
          <Link to="/events" className="hover:underline">Events</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-white text-gray-900 hover:bg-gray-200"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-6">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to EventHub 🎉</h2>
        <p className="text-lg mb-8 max-w-2xl">
          Manage your college events with ease. Explore upcoming events, register instantly, and track your participation seamlessly.
        </p>
        <Link
          to="/events"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition"
        >
          Explore Events
        </Link>
      </div>
    </div>
   
  );
}
