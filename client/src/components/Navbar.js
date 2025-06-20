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
    <div className="h-20 bg-white/10 backdrop-blur-sm flex items-center justify-between px-10 text-white shadow-md border-b border-white/20">
      {/* Logo */}
      <span
        onClick={() => navigate('/dashboard')}
        className="text-3xl font-extrabold tracking-wide cursor-pointer hover:text-yellow-300 transition duration-300"
      >
        QuizVerse 🎯
      </span>

      {/* User Info + Logout */}
      <div className="flex items-center gap-6 text-lg font-medium">
        <span className="flex items-center gap-2">
          👋 {user?.username}
          <span>{role === 'student' ? '👨‍🎓' : '👨‍🏫'}</span>
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-base text-white bg-red-500 rounded transition duration-300 hover:bg-red-600 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.3)]"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;



