import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavItem({ text, path, active = false }) {
  return (
    <Link 
      to={path}
      className={`text-base ${active ? 'text-white font-medium' : 'text-gray-300 hover:text-white'} transition-colors`}
    >
      {text}
    </Link>
  );
}

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Navigation items with their respective routes
  const navItems = [
    { text: "Home", path: "/" },
    { text: "Simulator", path: "/composer" },
    { text: "Learn", path: "/learn" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" }
  ];
  
  return (
    <>
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-cyan-400">QSIM</Link>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navItems.map((item) => (
            <NavItem 
              key={item.path}
              text={item.text} 
              path={item.path}
              active={location.pathname === item.path || 
                (location.pathname === "" && item.path === "/")}
            />
          ))}
          
          <div className="flex items-center ml-4 lg:ml-8 space-x-2 lg:space-x-4">
            <span className={`text-xs lg:text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dark Mode</span>
            <button 
              onClick={toggleDarkMode} 
              className={`relative inline-flex h-5 lg:h-6 w-10 lg:w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${darkMode ? 'bg-cyan-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 lg:h-5 w-4 lg:w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5 lg:translate-x-6' : 'translate-x-1'}`} />
            </button>
            
            <Link to="/login" className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base text-white bg-cyan-500 rounded-full font-medium hover:bg-cyan-600 transition-colors">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-90 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            {navItems.map((item) => (
              <NavItem 
                key={item.path}
                text={item.text} 
                path={item.path}
                active={location.pathname === item.path || 
                  (location.pathname === "" && item.path === "/")}
              />
            ))}
            
            <div className="flex items-center space-x-4 pt-6">
              <span className="text-white">Dark Mode</span>
              <button 
                onClick={toggleDarkMode} 
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${darkMode ? 'bg-cyan-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <Link to="/login" className="px-6 py-2 text-white bg-cyan-500 rounded-full font-medium hover:bg-cyan-600 transition-colors">
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}