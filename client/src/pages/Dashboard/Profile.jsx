import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Lock, Key, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updatePassword } = useContext(AuthContext);
    
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!strongPasswordRegex.test(passwords.newPassword)) {
             toast.error("Password too weak! Needs 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol, Min 8 Chars.");
             return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        const promise = updatePassword(passwords.oldPassword, passwords.newPassword);

        toast.promise(promise, {
            loading: 'Updating password...',
            success: 'Password updated successfully!',
            error: (err) => err.msg || 'Failed to update password' // Logic depends on how your updatePassword returns errors
        });

        const res = await promise;
        if (res.success) {
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-blue-600">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    </div>
                </div>

                {/* Change Password Form */}
                <div className="md:col-span-2">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-blue-600" />
                            Change Password
                        </h3>

                        {status.msg && (
                            <div className={`p-4 mb-6 rounded-xl flex items-center gap-3 ${
                                status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                                {status.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        value={passwords.oldPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                                        placeholder="Enter current password"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                                        placeholder="New password"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                                        placeholder="Repeat new password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button className="px-6 py-3 cursor-pointer bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition shadow-lg w-full md:w-auto">
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;