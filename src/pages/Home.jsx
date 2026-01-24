// ... existing imports ...
import { motion } from "framer-motion";

const Home = () => {
  // ... existing state and functions ...

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
      <div className="absolute top-0 right-0 w-2/3 h-screen bg-purple-600 opacity-10 blur-3xl rounded-full -mr-32"></div>

      {/* QSIM Logo */}
      <Link to="/" className="absolute top-6 left-6 flex items-center space-x-2">
        <motion.div
          className="relative w-12 h-12"
          animate={{ 
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Gradient Sphere */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-blue-600 shadow-[0_0_20px_rgba(96,165,250,0.5)]"></div>
          {/* SIM text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">SIM</span>
          </div>
        </motion.div>
      </Link>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Quantum Computing Simulator
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore the fascinating world of quantum computing with our interactive simulator
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/composer"
              className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              Start Simulating
            </Link>
            <Link
              to="/learn"
              className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
            >
              Learn Quantum
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {/* Feature Card 1 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Interactive Circuits</h3>
            <p className="text-gray-300">Build and visualize quantum circuits in real-time</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Quantum Gates</h3>
            <p className="text-gray-300">Experiment with various quantum gates and operations</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Visualization Tools</h3>
            <p className="text-gray-300">See quantum states and probabilities in action</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;