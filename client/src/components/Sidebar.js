import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-white bg-opacity-10 text-white p-4">
      <h2 className="text-2xl font-bold mb-10"></h2>

      <ul className="space-y-5">
        {role === 'teacher' ? (
          <>
            <li
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => navigate('/dashboard/create')}
            >
              📘 Create Quiz
            </li>
            <li className="hover:text-yellow-300 cursor-pointer" onClick={()=>navigate('/dashboard/my-quizzes')}>📋 My Quizzes</li>
          </>
        ) : (
          <>
            <li className="hover:text-yellow-300 cursor-pointer" onClick={() => navigate('/dashboard/join')}>📝 Join Quiz</li>
            <li className="hover:text-yellow-300 cursor-pointer" onClick={()=>navigate('/dashboard/my-scores')}>📊 My Results</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
