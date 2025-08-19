import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import binitLogo from "../assets/binitLogo.svg";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup submitted:", formData);
    }
  };

  return (
    <div className="flex lg:flex-row md:flex-row h-screen w-full bg-white font-inter">
      {/* Left Section */}
      <div className="flex items-center justify-center w-full bg-white lg:w-1/2 overflow-y-auto order-2 lg:order-1">
        <div className="max-w-md w-full px-4 py-4 space-y-2">
          {/* Logo and Header */}
          <div className="flex flex-col items-start mb-4">
            <div className="mb-2">
              <img
                src={binitLogo}
                alt="Binit Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Sign up</h1>
              <p className="text-gray-600 text-sm">
                Create an account to report waste, request pickups, join
                cleanups, and earn rewards.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border bg-transparent text-gray-600 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-binit-green outline-none"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-binit-green outline-none"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-binit-green outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-inherit border-invisible focus:outline-none"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-binit-green outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-inherit border-invisible focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="w-full bg-binit-green text-white py-2 rounded-lg text-sm font-medium hover:bg-binit-green transition-colors"
            >
              Sign up
            </button>

            {/* Or separator */}
            <div className="relative mt-px">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-px bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-binit-green hover:text-binit-green font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image background, hidden on small screens */}
      <div
        className="lg:w-1/2 bg-cover bg-center h-48 lg:h-auto order-1 lg:order-2"
        style={{ backgroundImage: "url('/binit-image.jpg')" }}
      >
        <div className="w-full h-full bg-opacity-10"></div>
      </div>
      {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div>*/}
    </div>
  );
}
