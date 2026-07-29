import logoImg from '/clublink.svg';
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

const Navbar = () => {
    const { auth, setAuth } = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
            setAuth(null); 
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="font-sora flex items-center justify-between px-11 w-full h-15 rounded-b-lg bg-[#021129] shadow-2xl relative">

            {/* Logo Section */}
            <div className='flex items-center gap-0.8 shrink-6 z-10'>
                <img
                    src={logoImg}
                    alt="Club Logo"
                    className="w-8 h-9 md:w-10 mh:11 object-contain"
                />
                <h1 className="hidden lg:block text-ld xl:text-xl ml-4 font-bold text-white/80">Club Link</h1>
                <h1 className="block lg:hidden text-lg font-bold text-white/80 ml-4 uppercase tracking-widest">UCMS</h1>
            </div>

            {/* Middle Navigation Links Section */}
            {/* Absolute positioning on large screens ensures perfect centering, standard flex on medium screens */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-10 absolute left-1/2 transform -translate-x-1/2 z-0">
                <Link 
                    to="/" 
                    className="text-white/70 hover:text-white font-medium transition-colors text-sm lg:text-base tracking-wide"
                >
                    Home
                </Link>
                <Link 
                    to="/dashboard" 
                    className="text-white/70 hover:text-white font-medium transition-colors text-sm lg:text-base tracking-wide"
                >
                    Dashboard
                </Link>
                <Link 
                    to="/AboutUs" 
                    className="text-white/70 hover:text-white font-medium transition-colors text-sm lg:text-base tracking-wide"
                >
                    About Us
                </Link>
            </nav>

            {/* Navigation / Auth Buttons Section */}
            <div className="flex items-center z-10">
                {auth ? (
                    // ----------- WHAT TO SHOW WHEN LOGGED IN -----------
                    <div className="flex items-center gap-6">
                        <div className='flex items-center gap-2'>
                            {/* Profile Icon */}
                            <div className="relative w-6.5 h-6.5 overflow-hidden bg-blue-100 rounded-full border-2 border-white/30 flex-shrink-0">
                                <svg className="absolute w-7.5 h-5 text-blue-600 -left-1 top-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            {/* Optional: Display user's name if it exists in your auth context */}
                            <h1 className="text-white/60 font-bold">{auth?.name || "Profile"}</h1>
                        </div>
                        
                        <button 
                            onClick={handleLogout} 
                            className="hover:scale-105 transition-colors hover:bg-blue-800 bg-blue-900 rounded-lg text-white/85 hover:cursor-pointer px-4 py-2 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // ----------- WHAT TO SHOW WHEN LOGGED OUT -----------
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/login" 
                            className="hover:scale-105 transition-colors hover:text-white border border-blue-700 text-white/85 rounded-lg hover:cursor-pointer px-5 py-2 font-medium"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="hover:scale-105 transition-colors hover:bg-blue-600 bg-blue-700 text-white rounded-lg hover:cursor-pointer px-5 py-2 font-medium shadow-md"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;