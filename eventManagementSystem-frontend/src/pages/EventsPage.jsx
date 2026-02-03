import { useEffect, useState } from "react";
import api from "../services/api";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Hardcoded studentId (since login is skipped now)
  const studentId = 1;

  useEffect(() => {
    api.get("/events")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/registrations/events/${eventId}/students/${studentId}`);
      setMessage("Registration successful ✅");
    } catch (err) {
      setMessage("Registration failed ❌");
    }
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upcoming Events</h2>
      {message && <p style={styles.message}>{message}</p>}
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div style={styles.grid}>
          {events.map(event => (
            <div key={event.id} style={styles.card}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Seats:</strong> {event.availableSeats} / {event.maxParticipants}</p>
              <button style={styles.button} onClick={() => handleRegister(event.id)}>
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  heading: { textAlign: "center", marginBottom: "20px" },
  message: { textAlign: "center", color: "green", fontWeight: "bold" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
  card: { padding: "15px", borderRadius: "10px", background: "#f9f9f9", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  button: { marginTop: "10px", padding: "8px 15px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default EventsPage;
