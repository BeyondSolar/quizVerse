import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Else, show the protected page
  return children;
};

export default PrivateRoute;
