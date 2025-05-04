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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Create Account</h2>
      
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters are allowed",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-sm text-red-400 mt-1 block">{errors.name.message}</span>
                )}
              </div>
      
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-sm text-red-400 mt-1 block">{errors.email.message}</span>
                )}
              </div>
      
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Choose a password"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be less than 20 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-sm text-red-400 mt-1 block">{errors.password.message}</span>
                )}
              </div>
      
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirm", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                {errors.confirm && (
                  <span className="text-sm text-red-400 mt-1 block">{errors.confirm.message}</span>
                )}
              </div>
      
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-semibold"
              >
                Create Account
              </button>
      
              {/* Redirect */}
              <p className="text-sm text-center mt-4 text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
      
            {/* Divider */}
            <div className="my-6 flex items-center text-gray-400">
              <div className="flex-grow h-px bg-gray-600"></div>
              <span className="px-3 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-600"></div>
            </div>
      
            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 bg-white text-black border border-white/30 py-2 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-400/40"
            >
              <img src="../../google.png" alt="Google Logo" className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Up with Google</span>
            </button>
          </div>
        </div>
      

  );
};

export default Signup;
