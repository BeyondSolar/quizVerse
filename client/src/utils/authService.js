// utils/authService.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api/auth',
});

export const loginUser = async (username, password) => {
  const response = await API.post('/login', { username, password });
  return response.data;
};

export const registerUser = async (username, email, password, role) => {
  const response = await API.post('/register', {
    username,
    email,
    password,
    role,
  });
  return response.data;
};
