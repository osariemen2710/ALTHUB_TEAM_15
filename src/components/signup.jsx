import React from "react";
import { useState } from "react";

import binitLogo from '../assets/binitLogo.svg';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import binitImage from '../assets/binit-image.jpg';
import GoogleAuthButton from './GoogleAuthButton';
import { useUser } from "../context/UserContext";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { login } = useUser();
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const handleSuccess = (message) => {
    toast.success(message);
    setTimeout(() => navigate('/login'), 2000); // Navigate after 2 seconds
  };

  const handleGoogleSignupSuccess = async (backendResponse) => {
    try {
      setLoading(true);
      await login(backendResponse.access_token, backendResponse.refresh_token);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ form: 'Failed to sign up with Google. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name] || errors.form) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        form: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!acceptedPolicy) newErrors.acceptedPolicy = 'You must accept the Privacy Policy and Terms before signing up';

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});
      try {
        const response = await fetch('https://binit-1fpv.onrender.com/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            acceptedPolicy: true,
            acceptedAt: new Date().toISOString(),
            role: 'user'
          }),
        });

        const data = await response.json();

        if (response.ok) {
          handleSuccess('Account created successfully!');
        } else {
          setErrors({ form: data.message || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ form: 'A network error occurred. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white font-inter">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 md:px-12 py-12 md:py-0 order-2 md:order-1">
        <div className="max-w-md w-full">
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
                Create an account to report waste, request pickups, join cleanups, and earn rewards.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {errors.form && (
              <p className="text-xs text-red-500 text-center">{errors.form}</p>
            )}
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-binit-green outline-none"
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-binit-green outline-none"
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
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-binit-green outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-binit-green outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Privacy Policy Acceptance */}
            <div className="flex items-start space-x-3">
              <input
                id="acceptPolicy"
                type="checkbox"
                checked={acceptedPolicy}
                onChange={(e) => {
                  setAcceptedPolicy(e.target.checked);
                  if (errors.acceptedPolicy) setErrors(prev => ({ ...prev, acceptedPolicy: '' }));
                }}
                className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="acceptPolicy" className="text-sm text-gray-700">
                I have read and agree to the <a href="/privacy" className="text-green-600 hover:underline">BinIt Privacy Policy</a> and <a href="/privacy" className="text-green-600 hover:underline">Terms &amp; Conditions</a>.
              </label>
            </div>
            {errors.acceptedPolicy && (
              <p className="mt-1 text-xs text-red-500">{errors.acceptedPolicy}</p>
            )}


            {/* Buttons */}
            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-400"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>

                        <div className="relative my-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

                        <GoogleAuthButton onSuccess={handleGoogleSignupSuccess} />

            {/* Login Link */}
            <div className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-green-600 hover:text-green-700">Login</a>
            </div>
          </form>
          
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 relative h-48 md:h-auto order-1 md:order-2">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${binitImage})` }}
        >
        </div>
      </div>
    </div>
  );
}