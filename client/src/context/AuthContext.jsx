import { createContext, useState, useEffect } from 'react';
import API from '../api/axiosInstance';

// Create the Context object to be consumed by components
export const AuthContext = createContext();

/**
 * @desc    Provider component that wraps the app and handles Global Auth State
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Crucial for ProtectedRoute

    /**
     * @desc    Check for an existing token on App Load (Persistence)
     * This keeps the user logged in if they refresh the page.
     */
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token with backend and get user details
                    const res = await API.get('/auth/me');
                    setUser(res.data);
                } catch (err) {
                    // If token is invalid/expired, clear it
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false); // Auth check finished
        };
        loadUser();
    }, []);

    /**
     * @desc    Login User
     * @param   {string} email 
     * @param   {string} password 
     */
    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        
        // Save token to LocalStorage for persistence
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    /**
     * @desc    Register New User
     * Automatically logs them in after successful registration.
     */
    const register = async (name, email, password) => {
        const res = await API.post('/auth/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        
        // Fetch full user profile immediately to populate state
        const userRes = await API.get('/auth/me');
        setUser(userRes.data);
    };

    /**
     * @desc    Logout User
     * Clears storage and resets state.
     */
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    /**
     * @desc    Update Password
     * @returns {Object} { success: boolean, msg: string }
     */
    const updatePassword = async (oldPassword, newPassword) => {
        try {
            await API.put('/auth/update-password', { oldPassword, newPassword });
            return { success: true };
        } catch (err) {
            // Extract specific error message from backend response
            const msg = err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Update failed';
            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updatePassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
};