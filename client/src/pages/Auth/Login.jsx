import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * @desc Login Page Component
 * Handles user authentication and redirection
 */
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    // Auth & Navigation Hooks
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            toast.success('Welcome back!');
            navigate('/dashboard'); // Redirect on success
        } catch (err) {
            toast.error('Invalid Email or Password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8 transform transition-all hover:scale-[1.01]">
                
                {/* --- Header Section --- */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-400 mt-2">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* --- Email Input --- */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="email" 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-700 border-none rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    {/* --- Password Input --- */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="password" 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-700 border-none rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                            placeholder="Password"
                            required
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    {/* --- Login Button --- */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                        LOGIN <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                {/* --- Footer: Register Link --- */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        Not a member?{' '}
                        <Link to="/register" className="text-blue-600 font-bold hover:underline">
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;