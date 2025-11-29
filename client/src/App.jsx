import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layouts & Components
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardHome from './pages/Dashboard/DashboardHome';
import Profile from './pages/Dashboard/Profile';

/**
 * @desc Main Application Component
 * Sets up Global State (Auth), Notifications (Toaster), and Routing.
 */
function App() {
  return (
    <AuthProvider>
      {/* Global Notification Config (Centered below navbar) */}
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ top: '80px'}} /> 
      
      <Router>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* --- Protected Routes (Require Login) --- */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                 <DashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          } />

           <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <DashboardLayout>
                 <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* --- Default Redirect --- */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;