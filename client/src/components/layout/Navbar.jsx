import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User, Settings, Menu } from 'lucide-react';

/**
 * @desc    Top Navigation Bar with responsive menu and user profile dropdown
 */
const Navbar = ({ toggleSidebar }) => { // Accepted toggleSidebar prop if you used it in Layout
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Effect: Close dropdown when clicking outside component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handlers
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    return (
        <nav className="bg-gray-800 text-white border-b border-gray-800 sticky top-0 z-50 px-8 py-4 flex justify-between items-center transition-all duration-300">
            
            {/* --- Left Side: Branding & Toggle --- */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white">
                    <Menu size={24} />
                </button>

                {/* Brand Title */}
                <div>
                    <h1 className="text-xl font-bold text-white">Primetrade.ai</h1>
                    <p className="text-xs text-gray-400 font-medium">Welcome back, {user?.name?.split(' ')[0]}</p>
                </div>
            </div>

            {/* --- Right Side: Profile & Actions --- */}
            <div className="flex items-center gap-6">
                
                {/* Divider (Desktop only) */}
                <div className="h-8 w-px bg-gray-700 hidden md:block"></div>

                {/* User Dropdown Area */}
                <div className="relative" ref={dropdownRef}>
                    {/* Trigger Button */}
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 focus:outline-none group"
                    >
                        {/* User Name (Desktop) */}
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition">
                                {user?.name}
                            </p>
                        </div>
                        
                        {/* Avatar Circle */}
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-gray-800 group-hover:ring-blue-500 transition">
                            {getInitials(user?.name)}
                        </div>
                        
                        {/* Chevron Icon */}
                        <ChevronDown size={16} className={`text-gray-400 cursor-pointer transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu Content */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-down z-50 text-gray-800">
                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Account</p>
                            </div>
                            
                            {/* Profile Link */}
                            <Link 
                                to="/dashboard/profile" 
                                className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <User size={18} /> Profile
                            </Link>
                            
                            <div className="border-t border-gray-50 my-1"></div>
                            
                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition text-left"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;