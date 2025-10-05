import { Search, BarChart3, Calendar, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../components/navigation.jsx";
import ConnectingLines from "../components/ConnectingLines.jsx";

const NotificationPreferencesPage = () => {
  const [activeTab, setActiveTab] = useState("Schedule Pickup");
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    smsReminders: true,
    emailNotifications: true,
    monthlyReports: false,
    weatherUpdates: true
  });  

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 pt-20 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ConnectingLines currentStep={5} />

          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">Step 5 of 5: Choose Schedule Type</p>
          </div>

          {/* What to expect section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">What to expect:</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">SMS notification 30 minutes before arrival</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Professional uniformed staff</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Clean-up of collection area</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">Monthly service report via email</span>
              </li>
            </ul>
          </div>

          {/* Notification & Reminder section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Notification & Reminder</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.smsReminders}
                    onChange={() => handleNotificationChange('smsReminders')}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                      notifications.smsReminders 
                        ? 'bg-green-600 border-green-600' 
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleNotificationChange('smsReminders')}
                  >
                    {notifications.smsReminders && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700">SMS reminders 30 min before pickup</span>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                      notifications.emailNotifications 
                        ? 'bg-green-600 border-green-600' 
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleNotificationChange('emailNotifications')}
                  >
                    {notifications.emailNotifications && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700">Email notifications for schedule changes</span>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.monthlyReports}
                    onChange={() => handleNotificationChange('monthlyReports')}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                      notifications.monthlyReports 
                        ? 'bg-green-600 border-green-600' 
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleNotificationChange('monthlyReports')}
                  >
                    {notifications.monthlyReports && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700">Monthly service reports</span>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications.weatherUpdates}
                    onChange={() => handleNotificationChange('weatherUpdates')}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${
                      notifications.weatherUpdates 
                        ? 'bg-green-600 border-green-600' 
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleNotificationChange('weatherUpdates')}
                  >
                    {notifications.weatherUpdates && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700">Weather-related updates</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Update Preference
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Back to dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationPreferencesPage;