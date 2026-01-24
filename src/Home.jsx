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
    <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-500">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          darkMode
            ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900'
            : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-gray-50'
        }`}
      ></div>

      {/* Background image with subtle overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/landing.png')" }}
      ></div>

      {/* Animated gradient overlay */}
      <div className="absolute top-0 right-0 w-2/3 h-screen bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-30 blur-3xl animate-pulse-slow rounded-full -mr-32"></div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen w-full">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 text-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Visualize
            </span>{' '}
            and{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Simulate
            </span>{' '}
            <br className="hidden sm:block" />
            Quantum Circuits
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl mb-10 max-w-md sm:max-w-xl md:max-w-3xl leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Learn, design, and explore quantum algorithms in our interactive
            quantum playground.
          </p>

          <button
            className="group relative px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl"
            onClick={() => navigate('/composer')}
          >
            <span className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300 ${darkMode ? 'opacity-100' : 'opacity-90'}`}></span>
            <span className="relative flex items-center text-white">
              <svg
                className="w-6 h-6 mr-3 transition-transform group-hover:rotate-90 duration-300"
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
              Start Quantum Journey
            </span>
          </button>
        </main>
      </div>
    </div>
  );
}
