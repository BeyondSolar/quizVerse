import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white px-4 font-sans">
      <h1 className="text-5xl font-bold mb-6 text-yellow-300 drop-shadow-lg transition-all duration-300">
        Welcome, {user?.username}! 🎉
      </h1>

      <p className="text-xl max-w-xl bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-md">
        {user?.role === 'teacher' ? (
          <>
            🚀 You're all set to <span className="font-semibold text-orange-300">create a new quiz</span>.<br />
            Use the sidebar to begin crafting your questions!
          </>
        ) : (
          <>
            ✏️ Ready to test your knowledge?<br />
            Enter your <span className="font-semibold text-orange-200">quiz code</span> to join an active quiz!
          </>
        )}
      </p>
    </div>
  );
};

export default DashboardHome;
