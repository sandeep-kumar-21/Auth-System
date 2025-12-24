import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        // Changed bg-gray-50 to bg-slate-50 (a slightly cooler, more modern gray)
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <Navbar /> 
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;