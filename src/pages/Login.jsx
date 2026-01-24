import React from "react";
import { useForm } from "react-hook-form";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = userCredentials.user;
      const token = await loggedUser.getIdToken();

      localStorage.setItem("token", token);

      dispatch(
        setAuthUser({
          user: {
            uid: loggedUser.uid,
            email: loggedUser.email,
            displayName: loggedUser.displayName || "User",
          },
          token,
        })
      );
      toast.success("Logged In Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Incorrect Email and Password");
    }
  };

  const handleGoogleSignIn = async () => {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const loggedUser = userCredentials.user;
      const token = await loggedUser.getIdToken();

      localStorage.setItem("token", token);

      dispatch(
        setAuthUser({
          user: {
            uid: loggedUser.uid,
            email: loggedUser.email,
            displayName: loggedUser.displayName,
            photoURL: loggedUser.photoURL,
          },
          token,
        })
      );
      toast.success("Signed In With Google");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google Sign-In Failed");
    }
  };

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

      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input fields */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-400 mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button matching Home page style */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
              Create Account
            </Link>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/5 text-gray-400">OR</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <img src="/google.png" alt="Google Logo" className="w-5 h-5" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
