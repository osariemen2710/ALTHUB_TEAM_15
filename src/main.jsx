import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Components/registration/SignUp.jsx'; 
import Login from './Components/registration/Login';
import './index.css'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/SignUp',
    element: <SignUp />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
