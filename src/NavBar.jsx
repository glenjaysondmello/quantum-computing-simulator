import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { clearAuthUser, setAuthUser } from "./features/authSlice";
import Avatar from "@mui/material/Avatar";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function NavItem({ text, path, active = false }) {
  return (
    <Link
      to={path}
      className={`text-base ${
        active ? "text-white font-medium" : "text-gray-300 hover:text-white"
      } transition-colors`}
    >
      {text}
    </Link>
  );
}

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearAuthUser());
        toast.success("Logged Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setAuthUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setAuthUser(null));
      }
    });
    return () => unSubscribe();
  }, [dispatch]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items with their respective routes
  const navItems = [
    { text: "Home", path: "/" },
    { text: "Simulator", path: "/composer" },
    { text: "Learn", path: "/learn" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <Link to="/" className="flex items-center">
          <motion.div
            className="relative w-14 h-14"
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
            {/* 3D Sphere */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-400 via-purple-500 to-blue-600 shadow-[0_0_20px_rgba(96,165,250,0.5)] transform-style-3d">
              {/* Light reflection */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-[10px]"></div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-cyan-400/20 via-purple-500/20 to-blue-600/20 animate-pulse-slow"></div>
            </div>
            {/* SIM text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                SIM
              </span>
            </div>
          </motion.div>
        </Link>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              text={item.text}
              path={item.path}
              active={
                location.pathname === item.path ||
                (location.pathname === "" && item.path === "/")
              }
            />
          ))}

          <div className="flex items-center ml-4 lg:ml-8 space-x-2 lg:space-x-4">
            {user ? (
              <>
                <div className="flex items-center gap-10 animate-slideFromRight">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden animate-pulse">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User Avatar"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://tse3.mm.bing.net/th?id=OIP.btgP01toqugcXjPwAF-k2AHaHa&pid=Api&P=0&h=180";
                          }}
                        />
                      ) : (
                        <Avatar
                          src="https://tse3.mm.bing.net/th?id=OIP.btgP01toqugcXjPwAF-k2AHaHa&pid=Api&P=0&h=180"
                          size="40"
                          round={true}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-gray-300 font-medium">
                      {user.displayName}
                    </h3>
                  </div>
                  <button
                    onClick={logOut}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 animate-slideFromRight">
                <Link
                  to="/login"
                  className="px-3 lg:px-4 py-1.5 lg:py-2 text-sm lg:text-base text-white bg-cyan-500 rounded-full font-medium hover:bg-cyan-600 transition-colors"
                >
                  Login / Sign Up
                </Link>
              </div>
            )}
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
                active={
                  location.pathname === item.path ||
                  (location.pathname === "" && item.path === "/")
                }
              />
            ))}

            <div className="flex items-center space-x-4 pt-6">
              <span className="text-white">Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${
                  darkMode ? "bg-cyan-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <Link
              to="/login"
              className="px-6 py-2 text-white bg-cyan-500 rounded-full font-medium hover:bg-cyan-600 transition-colors"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
