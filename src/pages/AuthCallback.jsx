import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '../context/UserContext';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const errorParam = params.get('error');

      if (errorParam) {
        setError(`Authentication failed: ${errorParam}`);
        setTimeout(() => navigate('/login'), 5000);
        return;
      }

      if (accessToken) {
        try {
          await login(accessToken, refreshToken);
          navigate('/dashboard');
        } catch (e) {
          console.error("Failed to log in after auth callback", e);
          setError('Authentication failed. Please try logging in again.');
          setTimeout(() => navigate('/login'), 5000);
        }
      } else {
        setError('Authorization token not found in URL.');
        setTimeout(() => navigate('/login'), 5000);
      }
    };

    handleAuth();
  }, [location, navigate, login]);

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
