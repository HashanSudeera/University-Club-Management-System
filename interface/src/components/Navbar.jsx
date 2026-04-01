import logoImg from '../assets/Logo.png';

const Navbar = () => {
    return(
       <header className="flex items-center justify-between px-11 w-full h-10 rounded-b-lg flex items-center bg-linear-to-l to-blue-900 from-blue-200 shadow-2xl">

            <div className='flex items-center gap-0.8 shrink-6'>
                <img
                    src={logoImg}
                    alt="Club Logo"
                    className="w-8 h-9 md:w-10 mh:11 object-contain"
                />
                <h1 className= "hidden lg:block text-ld xl:text-xl ml-4 font-bold text-white/80">UNIVERSITY CLUB MANAGEMENT SYSTEM</h1>
                <h1 className="block lg:hidden text-lg font-bold text-white/80 ml-4 uppercase tracking-widest">UCMS</h1>
            </div>

            <div className="flex items-center gap-3 md:gap-2 absolute right-55.5">
                
                {/* Profile Icon */}
                <div className="flex items-center gap-2 relative w-6.5 h-6.5 overflow-hidden bg-blue-100 rounded-full border-2 border-white/30">
                    <svg className="absolute w-7.5 h-5 text-blue-600 -left-1 top-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                </div>

                <h1 className="text-black/65 font-bold font-sans">Maleesha Kalhara</h1>
            </div>

            <button className="hover:scale-105 transition-colors hover:bg-blue-800 absolute right-5.5 bg-blue-900 rounded-lg text-white/85 hover:cursor-pointer px-5">
                Logout
            </button>
       </header> 

    );
};

export default Navbar;