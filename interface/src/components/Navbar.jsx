import logoImg from '../assets/Logo.png';
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const Navbar = () => {
    const { auth, setAuth } = useAuth(); 

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
            setAuth(null); // This is why we still need useAuth
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="font-sora flex items-center justify-between px-11 w-full h-15 rounded-b-lg bg-[#021129] shadow-2xl">

            <div className='flex items-center gap-0.8 shrink-6'>
                <img
                    src={logoImg}
                    alt="Club Logo"
                    className="w-8 h-9 md:w-10 mh:11 object-contain"
                />
                <h1 className="hidden lg:block text-ld xl:text-xl ml-4 font-bold text-white/80">UNIVERSITY CLUB MANAGEMENT SYSTEM</h1>
                <h1 className="block lg:hidden text-lg font-bold text-white/80 ml-4 uppercase tracking-widest">UCMS</h1>
            </div>

            <div className="flex gap-25 ">
                <div className='flex gap-2'>
                    {/* Profile Icon */}
                    <div className=" relative w-6.5 h-6.5 overflow-hidden bg-blue-100 rounded-full border-2 border-white/30">
                        <svg className="absolute w-7.5 h-5 text-blue-600 -left-1 top-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>

                    <h1 className="text-white/60 font-bold"></h1>
                </div>
                <div className='flex items-center'>
                    <button onClick={handleLogout} className="hover:scale-105 transition-colors hover:bg-blue-800 absolute right-5.5 bg-blue-900 rounded-lg text-white/85 hover:cursor-pointer p-2">
                        Logout
                    </button>
                </div>
            </div>
        </header>

    );
};

export default Navbar;