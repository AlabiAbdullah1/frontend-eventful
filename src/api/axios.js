import axios from "axios";

const API = axios.create({
  baseURL: "https://eventful-0ucd.onrender.com", // Adjust the base URL as needed
  // baseURL: "http://localhost:8000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors here, like redirecting to login
    }
    return Promise.reject(error);
  }
);
const API_URL = "https://eventful-0ucd.onrender.com";
// const API_URL = "http://localhost:8000";

export const login = async (email, password) => {
  const response = await API.post(`${API_URL}/creator/login`, {
    email,
    password,
  });
  return response.data;
};

export const eventeeLogin = async (email, password) => {
  const response = await API.post(`${API_URL}/user/login`, {
    email,
    password,
  });
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/creator/signup`, userData);
  return response.data;
};

export const eventeesignup = async (userData) => {
  const response = await axios.post(`${API_URL}/user/signup`, userData);
  return response.data;
};

export const createEvent = async (eventData, token) => {
  const response = await axios.post(`${API_URL}/event`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getEvents = async () => {
  const response = await API.get(`${API_URL}/event`);
  //   console.log(response?.data.data);
  return response.data.data || [];
};

export const getEvent = async (id) => {
  const response = await API.get(`${API_URL}/event/${id}`);
  return response.data;
};

export const initializePayment = async (paymentData) => {
  const response = await API.post(`${API_URL}/payment/initialize`, paymentData);
  return response.data;
};

export const verifyPayment = async (reference) => {
  const response = await API.get(`${API_URL}/payment/verify/${reference}`);
  return response.data;
};

export const joinEvent = async (eventId) => {
  const response = await API.post(`${API_URL}/event/${eventId}/join`, null, {});
  return response.data;
};

export const getUserEvents = async (token) => {
  const response = await axios.get(`${API_URL}/user/eventsAttended`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCreatorEvents = async (token) => {
  const response = await axios.get(`${API_URL}/event/creator-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const getAnalytics = async (token) => {
  const response = await axios.get(`${API_URL}/creator/analytic`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
