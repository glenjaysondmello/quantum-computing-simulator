import { useState } from 'react';
import Navbar from './NavBar';
import { useNavigate } from 'react-router';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-900 to-blue-900'
            : 'bg-gradient-to-br from-gray-100 to-blue-100'
        }`}
      ></div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing.png')" }}
      ></div>

      {/* Blue/purple overlay effect */}
      <div className="absolute top-0 right-0 w-2/3 h-screen bg-purple-600 opacity-10 blur-3xl rounded-full -mr-32"></div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Navigation Component */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main content */}
        <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Visualize and Simulate <br className="hidden sm:block" />
            Quantum Circuits
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            Learn, design, and explore quantum algorithms in an interactive
            simulator.
          </p>

          <button
            className="flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-medium text-gray-800 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => navigate('/composer')}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M12 8v8M8 12h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Start Simulating
          </button>
        </main>
      </div>
    </div>
  );
}
