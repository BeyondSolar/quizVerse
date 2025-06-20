import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import DashboardLayout from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import DashboardHome from './components/DashboardHome';
import CreateQuiz from './components/createQuiz/CreateQuiz';
import JoinQuiz from './components/quiz/JoinQuiz'
import Leaderboard from './components/Leaderboard';
import MyQuizzes from './components/MyQuizzes';
import StudentQuizzes from './components/StudentQuizzes'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected nested routes under /dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="create" element={<CreateQuiz />} />
          <Route path="join" element={<JoinQuiz/>} />
          <Route path="leaderboard/:quizCode" element={<Leaderboard />} />
          <Route path="my-quizzes" element={<MyQuizzes />} />
          <Route path="my-scores" element={<StudentQuizzes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
