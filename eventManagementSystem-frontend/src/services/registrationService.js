import api from "./api";

// Register student for event
export const registerForEvent = async (eventId, studentId) => {
  try {
    const res = await api.post(`/registrations/events/${eventId}/students/${studentId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to register";
  }
};

// Cancel registration
export const cancelRegistration = async (registrationId, studentId) => {
  try {
    const res = await api.delete(`/registrations/${registrationId}/students/${studentId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to cancel registration";
  }
};
