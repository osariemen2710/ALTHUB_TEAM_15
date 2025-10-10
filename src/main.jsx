import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';
import { ScheduleProvider } from './context/ScheduleContext';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <UserProvider>
        <ScheduleProvider>
          <ThemeProvider> {/* Wrap App with ThemeProvider */}
            <App />
          </ThemeProvider>
        </ScheduleProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
