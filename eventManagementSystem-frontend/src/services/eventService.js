import api from "./api";

export const getAllEvents = async () => {
  try {
    const res = await api.get("/events");
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to fetch events";
  }
};

export const getEventById = async (id) => {
  try {
    const res = await api.get(`/events/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Event not found";
  }
};

export const createEvent = async (eventData) => {
  try {
    const res = await api.post("/events", eventData);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to create event";
  }
};

export const getAvailableSeats = async (eventId) => {
  try {
    const res = await api.get(`/events/${eventId}/available-seats`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to fetch available seats";
  }
};




// import api from "./api";

// export const getAllEvents = async () => {
//   const response = await api.get("/events");
//   return response.data;
// };

// export const createEvent = async (eventData) => {
//   const response = await api.post("/events", eventData);
//   return response.data;
// };

// export const getEventById = async (id) => {
//   const response = await api.get(`/events/${id}`);
//   return response.data;
// };
