import React, { useEffect, useState } from "react";
import {getUserById} from "../services/userService";
// import {getAllRegistrations} from "../services/registrationService";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    getUserById(1) // hardcoded for now
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

  //  getAllRegistrations()
  //     .then(res => setRegistrations(res.data))
  //     .catch(err => console.error(err));
  }, []);

  if (!user) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">👤 {user.name}</h2>
        <p className="text-gray-700">📧 {user.email}</p>
        <p className="text-gray-700">🔑 Role: {user.role}</p>

        <h3 className="mt-6 text-xl font-semibold">My Registrations</h3>
        <ul className="mt-3 space-y-2">
          {registrations.length === 0 ? (
            <li>No registrations yet</li>
          ) : (
            registrations.map(r => (
              <li key={r.id} className="p-3 border rounded">
                Event ID: {r.eventId} | Status: {r.status}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
