import React, { useState } from "react";
import { Mail, Lock, LogIn, CheckCircle, Eye, EyeOff } from "lucide-react";
import binitLogo from "../assets/binitLogo.svg";

// Main App component
const ForgotPassword = () => {
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendResetLink = (e) => {
    e.preventDefault();
    // In a real application, you would send a password reset email here.
    // We'll just simulate a successful transition to the next form.
    setShowNewPasswordForm(true);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // In a real application, you would handle the password change here.
    alert("Password has been changed successfully!");
    // After changing the password, you might redirect the user to the login page.
    setShowNewPasswordForm(false);
  };

  return (
    <div className="flex min-h-screen font-[Inter]">
      {/* Left side: Forgot password form */}
      <div className="flex items-center justify-center w-full bg-white lg:w-1/2">
        <div className="max-w-md w-full px-8 py-12 space-y-6 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="mb-2">
            <img
              src={binitLogo}
              alt="Binit Logo"
              className="object-contain h-10 w-26"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Forgot Password
            </h1>
            <p className="text-gray-500">
              {showNewPasswordForm
                ? "Please enter your new password."
                : "Enter your email to receive a password reset link."}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {!showNewPasswordForm ? (
              <>
                {/* Email input for initial form */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full pl-10 pr-3 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Send Reset Link button */}
                <button
                  type="button"
                  onClick={handleSendResetLink}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LogIn
                      className="h-5 w-5 text-green-500 group-hover:text-green-400"
                      aria-hidden="true"
                    />
                  </span>
                  Send Reset Link
                </button>
              </>
            ) : (
              <>
                {/* New Password input */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="new-password"
                      id="new-password"
                      className="block w-full pl-10 pr-3 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="**********"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-inherit border-none focus:outline-none"
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password input */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm-password"
                      id="confirm-password"
                      className="block w-full pl-10 pr-3 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="**********"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-inherit border-none focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Change Password button */}
                <button
                  type="button"
                  onClick={handleChangePassword}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <CheckCircle
                      className="h-5 w-5 text-green-500 group-hover:text-green-400"
                      aria-hidden="true"
                    />
                  </span>
                  Change Password
                </button>
              </>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400">
            &copy; BinIt {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Right side: Image background, hidden on small screens */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/binit-image.jpg')" }}
      >
        <div className="w-full h-full bg-black bg-opacity-10"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
