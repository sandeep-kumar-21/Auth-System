import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, LogOut, User, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

    return (
        // Changed to Glassmorphism (White with blur) instead of dark gray
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-8 py-3 flex justify-between items-center">
            
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="md:hidden text-slate-500 hover:text-indigo-600 transition">
                    <Menu size={24} />
                </button>

                <div>
                    {/* Darker text for light background */}
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-xs text-slate-500 font-medium">Welcome back, {user?.name?.split(' ')[0]}</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 focus:outline-none group p-1 rounded-full hover:bg-slate-50 transition"
                    >
                        <div className="text-right hidden md:block mr-1">
                            <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition">
                                {user?.name}
                            </p>
                        </div>
                        
                        {/* Gradient Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20 ring-2 ring-white group-hover:ring-indigo-100 transition">
                            {getInitials(user?.name)}
                        </div>
                        
                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Modern Dropdown Card */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">My Account</p>
                                <p className="text-sm font-medium text-slate-700 truncate">{user?.email}</p>
                            </div>
                            
                            <Link 
                                to="/dashboard/profile" 
                                className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition mx-2 rounded-lg"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <User size={18} /> Profile Settings
                            </Link>
                            
                            <div className="border-t border-slate-50 my-1 mx-2"></div>
                            
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-rose-500 hover:bg-rose-50 transition text-left mx-2 rounded-lg mb-1"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;