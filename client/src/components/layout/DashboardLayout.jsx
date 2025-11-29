import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar /> {/* Navbar sits inside here */}
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;