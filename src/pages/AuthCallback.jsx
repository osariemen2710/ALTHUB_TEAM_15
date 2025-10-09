import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    const errorParam = params.get('error');

    if (errorParam) {
      setError(`Google authentication failed: ${errorParam}`);
      setTimeout(() => navigate('/login'), 5000);
      return;
    }

    if (code) {
      const exchangeCodeForToken = async () => {
        try {
          // ========================================================================
          // NOTE: Sending code to the backend via GET request as requested.
          const backendUrl = new URL('https://binit-1fpv.onrender.com/auth/google/callback');
          backendUrl.searchParams.append('code', code);
          if (state) {
            backendUrl.searchParams.append('state', state);
          }
          // ========================================================================

          const response = await fetch(backendUrl.toString(), {
            method: 'GET',
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to exchange code for token.');
          }

          const data = await response.json();

          if (data.access_token && data.refresh_token) {
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            navigate('/dashboard');
          } else {
            throw new Error('Tokens not provided by the backend.');
          }

        } catch (err) {
          console.error('Authentication error:', err);
          setError('Authentication failed. Please try logging in again.');
          setTimeout(() => navigate('/login'), 5000);
        }
      };
      exchangeCodeForToken();
    } else {
      setError('Authorization code not found in URL.');
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
