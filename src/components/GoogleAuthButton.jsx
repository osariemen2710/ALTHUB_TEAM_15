import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

const GoogleAuthButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

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

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
        setLoading(true);
        try {
          const code = codeResponse.code;
          const res = await fetch(`https://binit-1fpv.onrender.com/auth/callback?code=${encodeURIComponent(code)}`, {
            method: 'GET',
          });
    
          if (res.ok) {
            const data = await res.json();
            if (onSuccess) {
              onSuccess(data);
            }
          } else {
            const errorData = await res.json().catch(() => ({ detail: 'Backend login failed.' }));
            console.error('Backend login failed:', errorData.detail);
          }
        } catch (error) {
          console.error('Error sending authorization code to backend:', error);
        } finally {
          setLoading(false);
        }
    },
    onError: () => {
        console.error('Google Auth Error');
        setLoading(false);
    },
    flow: 'auth-code', // Use the authorization code flow
  });

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <div className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600">
          Connecting...
        </div>
      ) : (
        <button
          onClick={() => login()}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50"
        >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M24 9.5c3.9 0 6.9 1.6 9 3.6l6.9-6.9C35.4 2.3 30.1 0 24 0 14.9 0 7.3 5.4 4.1 12.9l7.8 6C13.8 12.9 18.5 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.2 25.5c0-1.7-.2-3.4-.5-5H24v9.4h12.5c-.5 3-2.1 5.6-4.6 7.3l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
                <path fill="#FBBC05" d="M11.9 28.8c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6C1.5 17.6 0 20.7 0 24s1.5 6.4 4.1 9.2l7.8-6z"/>
                <path fill="#EA4335" d="M24 48c6.1 0 11.4-2 15.1-5.4l-7.5-5.8c-2.1 1.4-4.8 2.3-7.6 2.3-5.6 0-10.3-3.4-12-8.1l-7.8 6C7.3 42.6 14.9 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
          Continue with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuthButton;
