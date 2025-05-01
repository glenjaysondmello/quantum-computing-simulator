import { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router';

export default function QSIMHomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
=======
import Navbar from './NavBar';
import { useNavigate } from 'react-router';
export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate=useNavigate()
>>>>>>> harsu
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
<<<<<<< HEAD
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div
  className={`min-h-screen w-full bg-no-repeat bg-cover bg-center ${
    darkMode
      ? 'bg-gradient-to-br from-gray-900 to-blue-900'
      : 'bg-gradient-to-br from-gray-100 to-blue-100'
  } bg-[url('/landing.png')]`}
>
      {/* Blue/purple overlay effect */}
      <div className="absolute top-0 right-0 w-2/3 h-screen bg-purple-600 opacity-10 blur-3xl rounded-full -mr-32"></div>
      
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="text-2xl sm:text-3xl font-bold text-cyan-400">QSIM</div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <NavItem text="Home" active={true} />
          <NavItem text="Simulator" />
          <NavItem text="Learn" />
          <NavItem text="About" />
          <NavItem text="Contact" />
          
          <div className="flex items-center ml-4 lg:ml-8 space-x-2 lg:space-x-4">
            <span className={`text-xs lg:text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dark Mode</span>
            <button 
              onClick={toggleDarkMode} 
              className={`relative inline-flex h-5 lg:h-6 w-10 lg:w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${darkMode ? 'bg-cyan-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 lg:h-5 w-4 lg:w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-5 lg:translate-x-6' : 'translate-x-1'}`} />
            </button>
            
            <button className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base text-white bg-cyan-500 rounded-full font-medium hover:bg-cyan-600 transition-colors">
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-90 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <NavItem text="Home" active={true} />
            <NavItem text="Simulator" />
            <NavItem text="Learn" />
            <NavItem text="About" />
            <NavItem text="Contact" />
            
            <div className="flex items-center space-x-4 pt-6">
              <span className="text-white">Dark Mode</span>
              <button 
                onClick={toggleDarkMode} 
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${darkMode ? 'bg-cyan-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <button className="px-6 py-2 text-white bg-cyan-500 rounded-full font-medium hover:bg-cyan-600 transition-colors">
              Login / Sign Up
            </button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 text-center">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Visualize and Simulate <br className="hidden sm:block" />
          Quantum Circuits
        </h1>
        
        <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Learn, design, and explore quantum algorithms in an 
          interactive simulator.
        </p>
        
        <button className="flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-medium text-gray-800 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Start Simulating
        </button>
      </main>
    </div>
  );
}

function NavItem({ text, active = false }) {
  return (
    <Link 
      to="/"
      className={`text-base ${active ? 'text-white font-medium' : 'text-gray-300 hover:text-white'} transition-colors`}
    >
      {text}
    </Link>
  );
=======
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-gray-100 to-blue-100'}`}></div>
      
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/landing.png')" }}></div>
      
      {/* Blue/purple overlay effect */}
      <div className="absolute top-0 right-0 w-2/3 h-screen bg-purple-600 opacity-10 blur-3xl rounded-full -mr-32"></div>
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Navigation Component */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Main content */}
        <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 text-center">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Visualize and Simulate <br className="hidden sm:block" />
            Quantum Circuits
          </h1>
          
          <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Learn, design, and explore quantum algorithms in an 
            interactive simulator.
          </p>
          
          <button className="flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-medium text-gray-800 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg" onClick={()=>navigate("/")}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Start Simulating
          </button>
        </main>
      </div>
    </div>
  );
>>>>>>> harsu
}