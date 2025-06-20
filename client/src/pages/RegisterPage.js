import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, role } = formData;
    const success = await register(username, email, password, role);
    if (success) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      alert('Registration failed!');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 rounded border border-gray-300"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded border border-gray-300"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded border border-gray-300"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-2 rounded border border-gray-300"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Register
        </button>

        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <span
            className="text-purple-500 cursor-pointer underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
