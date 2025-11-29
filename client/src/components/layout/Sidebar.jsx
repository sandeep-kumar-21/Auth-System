import { Link } from 'react-router-dom';
import { Home, List, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen hidden md:block">
            <div className="p-6">
                <h2 className="text-2xl font-bold">DashBoard</h2>
            </div>
            <nav className="mt-6">
                <Link to="/dashboard" className="flex items-center py-3 px-6 hover:bg-gray-800">
                    <Home className="w-5 h-5 mr-3" />
                    Overview
                </Link>
                <Link to="/dashboard" className="flex items-center py-3 px-6 hover:bg-gray-800">
                    <List className="w-5 h-5 mr-3" />
                    Tasks
                </Link>
                <Link to="/dashboard/profile" className="flex items-center py-3 px-6 hover:bg-gray-800 transition">
                    <Settings className="w-5 h-5 mr-3" />
                    Profile
                </Link>
            </nav>
        </aside>
    );
};
export default Sidebar;