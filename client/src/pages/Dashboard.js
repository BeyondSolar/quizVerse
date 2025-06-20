import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col font-sans">
      {/* Full-width Navbar */}
      <Navbar />

      {/* Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar stays fixed in width */}
        <div className="w-64 flex-shrink-0 h-full overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content is scrollable vertically but not horizontally */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-6 text-white scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
