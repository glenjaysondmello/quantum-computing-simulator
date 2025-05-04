import React from "react";
import { useForm } from "react-hook-form";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      const userCredentials = await signInWithEmailAndPassword({
        auth,
        email,
        password,
      });
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
      error.code === "auth/invalid-credentials"
        ? toast.error("Incorrect Email and Password")
        : toast.error("An error occured. Please try again.");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 px-4">
  {/* Glassmorphic Card */}
  <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
    <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>

    <form onSubmit={handleSubmit()}>
      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid user format",
            },
          })}
        />
        {errors.email && (
          <span className="text-sm text-red-400 mt-1 block">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <span className="text-sm text-red-400 mt-1 block">{errors.password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-semibold"
      >
        Sign In
      </button>

      {/* Sign Up Link */}
      <p className="text-sm text-center mt-4 text-gray-300">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>

    {/* Divider */}
    <div className="my-6 flex items-center text-gray-400">
      <div className="flex-grow h-px bg-gray-600"></div>
      <span className="px-3 text-sm">OR</span>
      <div className="flex-grow h-px bg-gray-600"></div>
    </div>

    {/* Google Sign In */}
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 bg-white text-black border border-white/30 py-2 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-400/40"
>
      <img src="../../google.png" alt="Google Logo" className="w-5 h-5" />
      <span className="text-sm font-medium">Sign In with Google</span>
    </button>
  </div>
</div>

  );
};

export default Login;
