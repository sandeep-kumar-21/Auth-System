import { useState, useEffect } from 'react';
import API from '../../api/axiosInstance';
import { Plus, Trash2, CheckCircle, Circle, Clock, Pencil, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * @desc Main Dashboard Component
 * Handles CRUD operations for tasks with Optimistic UI updates.
 */
const DashboardHome = () => {
    // --- State Management ---
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    
    // Editing State
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    // --- API & Effects ---
    const fetchTasks = async () => {
        try {
            const res = await API.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // --- Action Handlers ---

    // Create Task
    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        try {
            await API.post('/tasks', { title });
            setTitle('');
            fetchTasks();
            toast.success('Task added');
        } catch (err) {
            toast.error("Failed to add task");
        }
    };

    // Delete Task
    const deleteTask = async (id) => {
        if(!window.confirm("Are you sure?")) return;
        try {
            // Optimistic Delete: Remove from UI immediately
            setTasks(tasks.filter(t => t._id !== id));
            await API.delete(`/tasks/${id}`);
            toast.success('Task deleted');
        } catch (err) {
            toast.error("Error deleting task");
            fetchTasks(); // Revert on error
        }
    };

    // Toggle Completion Status (Robust Pattern)
    const toggleStatus = async (task) => {
        const newStatus = !task.isCompleted;
        
        // 1. Backup current state for rollback
        const originalTasks = [...tasks];

        // 2. Optimistic Update (Immediate UI change)
        setTasks(tasks.map(t => 
            t._id === task._id ? { ...t, isCompleted: newStatus } : t
        ));

        try {
            // 3. API Call
            await API.put(`/tasks/${task._id}`, { isCompleted: newStatus });
        } catch (err) {
            console.error("Error updating status");
            // 4. Rollback on error
            setTasks(originalTasks); 
            toast.error("Could not update status");
        }
    };

    // --- Edit Handlers ---
    const startEditing = (task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle('');
    };

    const saveEdit = async (id) => {
        if (!editTitle.trim()) return;
        try {
            // Optimistic Update
            setTasks(tasks.map(t => 
                t._id === id ? { ...t, title: editTitle } : t
            ));
            setEditingId(null); // Exit edit mode
            
            await API.put(`/tasks/${id}`, { title: editTitle });
            toast.success('Task updated');
        } catch (err) {
            toast.error("Failed to update task");
            fetchTasks(); // Revert
        }
    };

    // Keyboard Shortcuts (Enter to save, Esc to cancel)
    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveEdit(id);
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* --- Header --- */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500">Manage your daily tasks efficiently.</p>
            </div>

            {/* --- Add Task Input --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
                <form onSubmit={addTask} className="flex gap-4 items-center">
                    <div className="grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition outline-none"
                            placeholder="What needs to be done today?"
                        />
                    </div>
                    <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition shadow-lg shadow-blue-200">
                        <Plus size={20} /> <span className="hidden md:inline">Add Task</span>
                    </button>
                </form>
            </div>

            {/* --- Task Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div 
                            key={task._id} 
                            className={`p-6 rounded-2xl shadow-sm border transition duration-300 flex flex-col justify-between h-44 relative group ${
                                task.isCompleted 
                                ? 'bg-green-50 border-green-100' 
                                : 'bg-white border-gray-100 hover:shadow-md'
                            }`}
                        >
                            
                            {/* Card Header & Controls */}
                            <div className="flex items-start justify-between mb-3">
                                {/* Completion Toggle */}
                                <button 
                                    onClick={() => toggleStatus(task)}
                                    className={`p-2 cursor-pointer rounded-lg transition ${
                                        task.isCompleted 
                                        ? 'bg-green-200 text-green-700' 
                                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                    }`}
                                >
                                    {task.isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                                </button>
                                
                                {/* Edit/Delete Controls */}
                                <div className="flex gap-2">
                                    {editingId === task._id ? (
                                        <>
                                            <button onClick={() => saveEdit(task._id)} className="p-1.5 cursor-pointer text-green-600 hover:bg-green-100 rounded-full transition"><Save size={18} /></button>
                                            <button onClick={cancelEditing} className="p-1.5 text-gray-400 cursor-pointer hover:bg-gray-200 rounded-full transition"><X size={18} /></button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditing(task)} className="p-1.5 cursor-pointer text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"><Pencil size={18} /></button>
                                            <button onClick={() => deleteTask(task._id)} className="p-1.5 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"><Trash2 size={18} /></button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Card Body (Text or Edit Input) */}
                            <div className="grow">
                                {editingId === task._id ? (
                                    <textarea 
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, task._id)}
                                        onFocus={(e) => e.target.select()} // Auto-select text on focus
                                        className="w-full h-full bg-white/50 p-2 rounded-lg border-2 border-blue-100 focus:border-blue-500 focus:outline-none resize-none text-gray-800"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 
                                        onClick={() => toggleStatus(task)}
                                        className={`text-lg font-semibold line-clamp-2 leading-relaxed transition-all cursor-pointer select-none ${
                                            task.isCompleted ? 'text-gray-400 line-through decoration-2' : 'text-gray-800'
                                        }`}
                                    >
                                        {task.title}
                                    </h3>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-black/5 flex items-center gap-2">
                                <Clock size={12} />
                                {task.isCompleted ? 'Completed' : `Created: ${new Date(task.createdAt).toLocaleDateString()}`}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                            <Clock size={32} className="text-gray-300" />
                        </div>
                        <p>No tasks yet. Start by adding one above!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default DashboardHome;