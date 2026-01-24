import React from "react";
import { useForm } from "react-hook-form";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../features/authSlice";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const registeredUser = userCredentials.user;

      try {
        await sendEmailVerification(registeredUser);
        toast.success("Verification email sent! Please check your inbox.");
      } catch (error) {
        toast.error("Failed to send verification email. Please try again.");
        console.error("Verification email error:", error);
      }

      const token = await registeredUser.getIdToken();

      localStorage.setItem("token", token);

      updateProfile(registeredUser, {
        displayName: name,
      }).then(() => {
        dispatch(
          setAuthUser({
            user: {
              uid: registeredUser.uid,
              email: registeredUser.email,
              displayName: name,
            },
            token,
          })
        );
        toast.success("Registered Successfully");
        navigate("/");
      });
    } catch (error) {
      error.code === "auth/email-already-in-use"
        ? toast.error("Email already in use")
        : toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };

  const handleGoogleSignUp = async () => {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const registeredUser = userCredentials.user;
      const token = await registeredUser.getIdToken();

      localStorage.setItem("token", token);

      dispatch(
        setAuthUser({
          user: {
            uid: registeredUser.uid,
            email: registeredUser.email,
            displayName: registeredUser.displayName,
            photoURL: registeredUser.photoURL,
          },
          token,
        })
      );
      toast.success("Signed Up With Google");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google Sign-Up Failed");
    }
  };

  const password = watch("password");

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

      {/* Signup Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name")}
              />
            </div>

            {/* Email Field */}
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
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                {...register("password")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Log In
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

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <img src="/google.png" alt="Google Logo" className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
