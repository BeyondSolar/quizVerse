import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <div className="h-16 bg-white bg-opacity-20 flex items-center justify-between px-6 text-white shadow-md">
      <span
        onClick={() => navigate('/dashboard')}
        className="text-xl font-semibold cursor-pointer hover:text-yellow-300 transition duration-200"
      >
        Quiz Verse🎯
      </span>
      <div className="flex items-center gap-4">
        <span className="font-medium">
          👋 {user?.username} {role === 'student' ? '👨‍🎓' : '👨‍🏫'}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
