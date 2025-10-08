import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

const GoogleAuthButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  // Vite uses import.meta.env for environment variables
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const isConfigured = googleClientId && googleClientId !== 'your-actual-client-id-here';

  if (!isConfigured) {
    return (
      <div className="w-full mb-4">
        <button
          disabled
          className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
        >
          Google OAuth Not Configured
        </button>
        <p className="mt-1 text-xs text-red-500">
          Please configure VITE_GOOGLE_CLIENT_ID in your .env file
        </p>
      </div>
    );
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await fetch('https://althub-team-15-97kt.vercel.app/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (res.ok) {
        const data = await res.json();
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        console.error('Backend login failed');
      }
    } catch (error) {
      console.error('Error sending token to backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Auth Error');
  };

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <div className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600">
          Connecting...
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="outline"
          shape="rectangular"
          text="continue_with"
        />
      )}
    </div>
  );
};

export default GoogleAuthButton;