import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import binitLogo from '../assets/binitLogo.svg';
import binitImage from '../assets/binit-image.jpg';
import GoogleAuthButton from './GoogleAuthButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


// Main App component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleInputChange = (e, field) => {
    if (field === 'email') {
        setEmail(e.target.value);
    } else if (field === 'password') {
        setPassword(e.target.value);
    }

    if (errors[field] || errors.form) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
        form: ''
      }));
    }
  };

  const handleGoogleLoginSuccess = async (backendResponse) => {
    try {
      setLoading(true);
      // Assuming the backend response includes access_token and refresh_token
      await login(backendResponse.access_token, backendResponse.refresh_token);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ form: 'Failed to log in with Google. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // Basic validation
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setErrors({});
      try {
        const details = {
            grant_type: 'password',
            username: email,
            password: password,
            scope: '',
            client_id: '',
            client_secret: ''
        };

        const formBody = Object.keys(details).map(key => 
            encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
        ).join('&');

        const response = await fetch('https://binit-1fpv.onrender.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formBody,
        });

        const data = await response.json();

        if (response.ok) {
          // Assuming the API response includes access_token and refresh_token
          await login(data.access_token, data.refresh_token);
          navigate('/dashboard');
        } else {
          setErrors({ form: data.detail || 'Login failed. Please check your credentials.' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ form: 'A network error occurred. Please try again.' });
      } finally {
        setLoading(false);
      }
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
            {errors.form && (
              <p className="text-xs text-red-500 text-center">{errors.form}</p>
            )}
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
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => handleInputChange(e, 'password')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
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
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Log In'}
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
           <GoogleAuthButton onSuccess={handleGoogleLoginSuccess} />
          
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