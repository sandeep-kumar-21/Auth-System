const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
    const baseStyle = "px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none transform active:scale-95 flex items-center justify-center";
    
    const variants = {
        primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 border border-transparent",
        danger: "bg-gradient-to-r from-rose-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md"
    };

    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`${baseStyle} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};
export default Button;