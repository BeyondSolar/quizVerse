import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const navItemStyle =
    'text-lg font-semibold px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition duration-300 cursor-pointer';

  return (
    <div className="w-64 h-full bg-white bg-opacity-20 text-white p-6 font-sans shadow-md">

      <ul className="space-y-4 mt-6 ">
        {role === 'teacher' ? (
          <>
            <li
              className={navItemStyle}
              onClick={() => navigate('/dashboard/create')}
            >
              📘 Create Quiz
            </li>
            <li
              className={navItemStyle}
              onClick={() => navigate('/dashboard/my-quizzes')}
            >
              📋 My Quizzes
            </li>
          </>
        ) : (
          <>
            <li
              className={navItemStyle}
              onClick={() => navigate('/dashboard/join')}
            >
              📝 Join Quiz
            </li>
            <li
              className={navItemStyle}
              onClick={() => navigate('/dashboard/my-scores')}
            >
              📊 My Results
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
