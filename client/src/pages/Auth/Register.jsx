import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Check Security Logic
        if (!validatePassword(formData.password)) {
            toast.error(
                "Password must contain:\n- 8+ chars\n- 1 Uppercase (A-Z)\n- 1 Lowercase (a-z)\n- 1 Number (0-9)\n- 1 Special Char (@$!%*?&)",
                { duration: 5000 } // Keep visible longer so they can read requirements
            );
            return;
        }
        
        // 2. Proceed if valid
        const registerPromise = register(formData.name, formData.email, formData.password);
        
        toast.promise(registerPromise, {
            loading: 'Creating account...',
            success: 'Account created! Redirecting...',
            error: (err) => err.response?.data?.errors?.[0]?.msg || 'Registration failed',
        });

        try {
            await registerPromise;
            navigate('/dashboard');
        } catch (error) {
             // Error handled by toast
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join us and start managing tasks</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-700 border-none rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                            placeholder="Full Name"
                            required
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="email" 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 text-gray-700 border-none rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    {/* Password Input */}
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

                    {/* Register Button */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                        REGISTER <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-bold hover:underline">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Register;