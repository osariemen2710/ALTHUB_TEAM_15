import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForToken = async (code) => {
      try {
        // ========================================================================
        // TODO: Replace with your actual backend endpoint for code exchange
        const response = await fetch('https://binit-1fpv.onrender.com/auth/google/callback', {
        // ========================================================================
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to exchange code for token.');
        }

        const data = await response.json();

        // Assuming the backend returns accessToken and refreshToken
        if (data.access_token && data.refresh_token) {
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          // Redirect to the dashboard or a protected route
          navigate('/dashboard');
        } else {
          throw new Error('Tokens not provided by the backend.');
        }

      } catch (err) {
        console.error('Authentication error:', err);
        setError('Authentication failed. Please try logging in again.');
        // Optionally redirect to login page after a delay
        setTimeout(() => navigate('/login'), 5000);
      }
    };

    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      exchangeCodeForToken(code);
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
