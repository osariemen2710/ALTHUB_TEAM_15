import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token"); // or 'code', depending on backend

    if (token) {
      // Save token (or send it to backend to exchange for user info)
      localStorage.setItem("authToken", token);
      navigate("/dashboard"); // or wherever your app should go
    } else {
      console.error("No token found in redirect URL");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-gray-600">Finishing sign in...</p>
    </div>
  );
};

export default AuthCallback;
