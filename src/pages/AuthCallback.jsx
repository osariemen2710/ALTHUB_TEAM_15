import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const userParam = params.get('user');
    const errorParam = params.get('error');

    if (errorParam) {
      setError(`Authentication failed: ${errorParam}`);
      setTimeout(() => navigate('/login'), 5000);
      return;
    }

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      if (userParam) {
        try {
          const userData = JSON.parse(decodeURIComponent(userParam));
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
          console.error("Failed to parse user data from URL", e);
        }
      }
      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      setError('Authorization token not found in URL.');
      setTimeout(() => navigate('/login'), 5000);
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Login Failed</h1>
            <p className="text-gray-700">{error}</p>
            <p className="text-gray-500 mt-2">Redirecting to login page...</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Logging you in...</h1>
            <p className="text-gray-600">Please wait while we verify your details.</p>
            {/* You can add a spinner here */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mt-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
