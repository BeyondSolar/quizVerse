import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {user?.username}!
      </h1>

      {user?.role === 'teacher' ? (
        <p className="text-lg">
          Ready to create a new quiz? Use the sidebar to get started!
        </p>
      ) : (
        <p className="text-lg">
          Join a quiz using the code provided by your teacher!
        </p>
      )}
    </div>
  );
};

export default DashboardHome;
