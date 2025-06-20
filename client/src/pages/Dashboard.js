import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col">
      {/* Full-width Navbar */}
      <Navbar />

      {/* Sidebar + Main content below Navbar */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
