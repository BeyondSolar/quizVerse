// src/services/quizService.js
import API from '../utils/api'; // Axios instance

// Create a new quiz
export const createQuiz = async (quizData) => {
  const response = await API.post('/teacher/createQuiz', quizData);
  return response.data;
};

// Add a question to a quiz
export const addQuestion = async (questionData) => {
  const response = await API.post('/teacher/addQuestion', questionData);
  return response.data;
};

// Fetch quiz by code
export const fetchQuizByCode = async (quizCode) => {
  try {
    const res = await API.get(`/quiz/getQuiz/${quizCode}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// Submit quiz
export const submitQuiz = async (quizCode, payload) => {
  try {
    const res = await API.post(`/quiz/${quizCode}/submit`, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getLeaderboard = async (quizCode, payload) => {
  try {
    const res = await API.get(`/quiz/${quizCode}/leaderboard`, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getQuizzesByTeacher = async (teacherId, token) => {
  try {
    const res = await API.get(`/quiz/created-by/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getMySubmissions = async (token) => {
  const res = await API.get('/quiz/my-submissions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteQuizById = async (quizId, token) => {
  console.log(quizId);
  const res = await API.delete(`/quiz/${quizId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};





