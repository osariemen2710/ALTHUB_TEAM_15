import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation";
import Dashboard from "./components/dashbord";
import SignUp from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/schedule" element={<div>Schedule Pickup</div>} />
      <Route path="/report" element={<div>Report Illegal Dump</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
