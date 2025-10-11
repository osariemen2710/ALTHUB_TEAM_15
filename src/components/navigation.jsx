import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, LayoutDashboard, Calendar, AlertTriangle, Plus, Menu, X, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../assets/Header.svg';
import Logo from '../assets/binitLogo.svg';
import { FaChartBar, FaTruck, FaQuestionCircle, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length > 1 && names[names.length - 1]) {
    return `${names[0][0]}${names[names.length - 1][0]}`;
  }
  return names[0]?.[0] || '';
};

const Sidebar =()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const navItems = [
    { 
      icon: <FaChartBar className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard"
    },
    { 
      icon: <FaTruck className="w-5 h-5" />,
      label: "Schedule Pickup",
      path: "/schedule"
    },
        {
          icon: <FaQuestionCircle className="w-5 h-5" />,
          label: "Report Illegal Dump",
          path: "/report",
    
        },
        {
          icon: <Settings className="w-5 h-5" />,
          label: "Settings",
          path: "/settings",
        }  ];

  const isPathActive = (itemPath) => {
    const currentPath = location.pathname;

    if (itemPath === '/report') {
      return currentPath === '/report' || currentPath === '/history';
    }

    if (itemPath === '/schedule') {
      const schedulePaths = [
        '/schedule',
        '/dates',
        '/waste',
        '/special',
        '/service',
        '/preview',
        '/select',
        '/success',
        '/bill-payment',
        '/notifications'
      ];
      return schedulePaths.includes(currentPath);
    }

    return currentPath.startsWith(itemPath);
  };

  return (
    <>
      {/* Mobile Menu Button */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 p-1 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
       <img src={Header} alt="Header" className="h-8" /> {/* slightly smaller */}
       <div className="flex items-center space-x-2">
         <button onClick={toggleTheme} aria-label="Toggle theme" className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
           {theme === 'dark' ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 5.47a1 1 0 011.42 0l.71.7a1 1 0 11-1.42 1.42l-.7-.71a1 1 0 010-1.41zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm8 7a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm5.36-2.53a1 1 0 010 1.41l-.7.71a1 1 0 11-1.42-1.42l.7-.71a1 1 0 011.42 0zM17 9a1 1 0 100 2h1a1 1 0 100-2h-1zM14.12 4.05a1 1 0 011.41-1.41l.71.7a1 1 0 11-1.42 1.42l-.7-.71zM6.34 15.95a6 6 0 107.32-9.9 6 6 0 00-7.32 9.9z"/></svg>
           ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293a8 8 0 11-10.586-10.586 8 8 0 0010.586 10.586z"/></svg>
           )}
         </button>
         <button onClick={toggleMobileMenu} className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
           <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
         </button>
       </div>
     </div>
     
           {/* Sidebar */}
           <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50
             transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0
             transition-transform duration-300 ease-in-out`}>
             {/* Header */}
             <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
               <img src={Logo} alt="Header" className="h-10" />
             </div>
     
           {/* Navigation */}
           <nav className="flex-1 p-4">
             <div className="space-y-5">
               {/* Search */}
               <div className="relative w-full px-1">
                 <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                 <input
                   type="text"
                   placeholder="Search..."
                   className="w-full pl-10 pr-4 py-2 text-base text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                 />
               </div>
     
               {navItems.map((item) => {
                 const isActive = isPathActive(item.path);
                 return (
                   <div
                     key={item.path}
                     onClick={() => navigate(item.path)}
                     className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer transition-colors
                       ${isActive
                         ? item.isSpecial
                           ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                           : 'bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400'
                         : item.isSpecial
                           ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                           : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                       }`}
                   >
                     {React.cloneElement(item.icon, {
                       className: `w-5 h-5 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`
                     })}
                     <span className={`text-base ${item.isSpecial ? 'font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                       {item.label}
                     </span>
                   </div>
                 )
               })}
             </div>
           </nav>
     
           {/* User Profile */}
           <div className="p-4 border-t border-gray-100 dark:border-gray-700">
             {loading ? (
                 <div className="flex items-center gap-3 animate-pulse">
                   <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                   <div className="flex flex-col gap-2">
                     <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                     <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                   </div>
                 </div>
             ) : user ? (
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                     <span className="text-white text-sm font-semibold">{getInitials(user.name)}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</span>
                     <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                   </div>
                 </div>
                 <button
                   onClick={logout}
                   className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                 >
                   <FaSignOutAlt alt="logout" className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                 </button>
               </div>
             ) : null}
           </div>    </div>
    </>
  );
}
export default Sidebar;