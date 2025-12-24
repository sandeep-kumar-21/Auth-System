import { Link, useLocation } from 'react-router-dom';
import { Home, List, Settings } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    // Helper to check active state
    const isActive = (path) => location.pathname === path;

    const navItemClass = (path) => `
        flex items-center py-3.5 px-6 my-1 mx-3 rounded-lg transition-all duration-200 group
        ${isActive(path) 
            ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'}
    `;

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen hidden md:flex flex-col">
            <div className="p-8">
                {/* Modern Gradient Logo Text */}
                <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-tight">
                    TaskFlow.
                </h2>
            </div>
            
            <nav className="mt-2 flex-1">
                <Link to="/dashboard" className={navItemClass('/dashboard')}>
                    <Home className={`w-5 h-5 mr-3 transition ${isActive('/dashboard') ? 'text-indigo-400' : 'group-hover:text-white'}`} />
                    Overview
                </Link>
                {/* <Link to="/dashboard/tasks" className={navItemClass('/dashboard/tasks')}>
                    <List className={`w-5 h-5 mr-3 transition ${isActive('/dashboard/tasks') ? 'text-indigo-400' : 'group-hover:text-white'}`} />
                    Tasks
                </Link> */}
                <Link to="/dashboard/profile" className={navItemClass('/dashboard/profile')}>
                    <Settings className={`w-5 h-5 mr-3 transition ${isActive('/dashboard/profile') ? 'text-indigo-400' : 'group-hover:text-white'}`} />
                    Profile
                </Link>
            </nav>

            <div className="p-6">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Pro Plan</p>
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;