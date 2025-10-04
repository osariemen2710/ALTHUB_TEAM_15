import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Truck, Search, FileQuestionMark, LogOut} from "lucide-react" // nice icons
import logo from "../assets/logo.jpg"
import { useUser } from "../context/UserContext";

const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length > 1 && names[names.length - 1]) {
    return `${names[0][0]}${names[names.length - 1][0]}`;
  }
  return names[0]?.[0] || '';
};

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, logout } = useUser();

  return (
    <>
      <div className="md:hidden p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"> ☰
        </button>
      </div>

      <aside className={`w-64 min-h-screen bg-white border-r border-neutral-200 p-4 flex-col justify-between ${sidebarOpen ? "flex" : "hidden"} md:flex fixed md:relative z-50`}>
        <div>
          {/* Logo */}
          <img 
            src={logo}
            className="w-20 mb-5"
            alt="Logo"
          />

          {/* Search bar */}
          <div className="relative w-full mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2">
            <Link
              to="/Dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>

            <Link
              to="/schedule"
              className="flex items-center  text-green-600 gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <Truck className="h-4 w-4" /> Schedule Pickup
            </Link>

            <Link
              to="/report"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <FileQuestionMark className="h-4 w-4" /> Report Illegal Dump
            </Link>
          </nav>
        </div>

        {/* User profile */}
        <div className="mt-auto">
          {loading ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                {getInitials(user.name)}
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button onClick={logout} className="ml-auto p-2 rounded-md hover:bg-gray-100">
                <LogOut size={20} />
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  )
}