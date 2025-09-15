import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import binitLogo from '../assets/binitLogo.svg';
import binitImage from '../assets/binit-image.jpg';


// Main App component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, field) => {
    if (field === 'email') {
        setEmail(e.target.value);
    } else if (field === 'password') {
        setPassword(e.target.value);
    }

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    // Basic validation
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        // Assuming you'd send this to a backend
        console.log('Logging in with:', { email, password });
        // e.g., loginUser({ email, password });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-['Calibri',_sans-serif]">
      {/* Left side: Sign-in form */}
      <div className="flex items-center justify-center w-full bg-white lg:w-1/2 overflow-y-auto order-2 lg:order-1">
        <div className="max-w-md w-full px-8 py-6 space-y-3">
          {/* Logo and title */}
          <div className="mb-2">
 <img
 src={binitLogo}
 alt="Binit Logo"
 className="object-contain h-10 w-26"  
 />
</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Log in</h1>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleInputChange(e, 'email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password input */}
            <div >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => handleInputChange(e, 'password')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember me & forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember for 30 days
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-green-600 hover:text-green-700">
                  Forgot password
                </a>
              </div>
            </div>

            {/* Log In button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Log In
            </button>
          </form>

          {/* Or separator */}
          <div className="relative mt-3">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social sign-in button */}
           <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          
          {/* Sign up link */}
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-green-600 hover:text-green-700">
              Sign up
            </a>
          </div>

          {/* Footer */}
          <div className="mt-4 text-left text-xs text-gray-400">
  &copy; BinIt {new Date().getFullYear()}
</div>
        </div>
      </div>

      {/* Right side: Image background, hidden on small screens */}
      <div className="lg:w-1/2 bg-cover bg-center h-48 lg:h-auto order-1 lg:order-2" style={{  backgroundImage: `url(${binitImage})` }}>
        
      </div>
    </div>
  );
};

export default Login;