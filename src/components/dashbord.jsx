import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUser } from "../context/UserContext";
import apiFetch from "../lib/api";
import { useNavigate } from "react-router-dom";
import { TrendingUp, AlertCircle, Coins, Calendar, History, Info, LayoutDashboard } from 'lucide-react';


const StatCard = ({ title, value, unit, loading, icon: Icon, gradient, iconColor, tooltip }) => (
  <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${gradient}`}></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        {Icon && (
          <div className={`p-2 rounded-lg ${gradient} bg-opacity-10`}>
            <Icon className={`w-5 h-5 ${iconColor || 'text-green-600 dark:text-green-400'}`} />
          </div>
        )}
      </div>
      {loading ? (
        <div className="h-9 w-28 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse"></div>
      ) : (
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {value}
          </h2>
          {unit && <span className="text-lg font-semibold text-green-600 dark:text-green-400">{unit}</span>}
        </div>
      )}
    </div>
    {tooltip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 text-sm font-medium text-green-700 bg-white dark:bg-black dark:text-green-400 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {tooltip}
      </div>
    )}
  </div>
);

const processPickupData = (pickups) => {
  const monthlyData = {};
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (const pickup of pickups) {
    const date = new Date(pickup.created_at);
    const monthKey = date.toISOString().substring(0, 7); // "YYYY-MM"

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthNames[date.getMonth()],
        organic: 0,
        plastic: 0,
        electronic: 0, // This key maps to the 'General' bar in the chart
      };
    }

    const wasteType = pickup.waste_type.toLowerCase();

    if (wasteType === 'organic') {
      monthlyData[monthKey].organic += 1;
    } else if (wasteType === 'plastic' || wasteType === 'recycling') {
      monthlyData[monthKey].plastic += 1;
    } else {
      // Grouping general, mixed, electronic, etc. into one bar.
      monthlyData[monthKey].electronic += 1;
    }
  }

  return Object.values(monthlyData);
};

const isDashboardDataEmpty = (data) => {
  if (!data) return true;

  if (data.total_waste_disposed_kg !== 0) return false;
  if (data.total_illegal_reports !== 0) return false;
  if (data.total_coins_earned !== 0) return false;

  if (!data.monthly_waste_data || data.monthly_waste_data.length === 0) return true;

  for (const monthData of data.monthly_waste_data) {
    if (monthData.organic_waste !== 0) return false;
    if (monthData.general_waste !== 0) return false;
    if (monthData.e_waste !== 0) return false;
    if (monthData.recycling !== 0) return false;
  }

  return true;
};

const Dashboard = () => {
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const firstName = user?.name?.split(' ')[0];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('https://binit-1fpv.onrender.com/dashboard/stats');
        
        if (response.ok) {
          const data = await response.json();
          // Check if data is considered valid/not empty
          if (data && !isDashboardDataEmpty(data)) { // Modified condition
            setStats(data);
            return;
          }
        }
        
        // Fallback if the primary endpoint fails or returns empty data
        console.log("Primary stats endpoint failed or is empty. Using fallback.");
        const [pickupResponse, reportResponse] = await Promise.all([
          apiFetch('https://binit-1fpv.onrender.com/pickup/'),
          apiFetch('https://binit-1fpv.onrender.com/report')
        ]);

        let pickups = [];
        if (pickupResponse.ok) {
          const pickupData = await pickupResponse.json();
          pickups = Array.isArray(pickupData) ? pickupData : [pickupData];
        } else {
          console.error("Failed to fetch fallback pickup stats");
        }

        let total_illegal_reports = 0;
        let total_coins_earned = 0;
        if (reportResponse.ok) {
          const reportData = await reportResponse.json();
          if (Array.isArray(reportData)) {
            total_illegal_reports = reportData.length;
            total_coins_earned = Math.floor(reportData.length / 2);
          }
        } else {
          console.error("Failed to fetch fallback report stats");
        }

        const fallbackStats = {
          total_waste_disposed_kg: pickups.length, // Total number of pickups
          total_illegal_reports,
          total_coins_earned,
          monthly_waste_data: processPickupData(pickups),
        };
        setStats(fallbackStats);

      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = useMemo(() => {
    if (!stats?.monthly_waste_data) return [];
    return stats.monthly_waste_data.map(monthData => ({
      name: monthData.month.substring(0, 3),
      Organic: monthData.organic,
      Recyclables: monthData.plastic,
      General: monthData.electronic,
    }));
  }, [stats]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Sidebar />
      <div className="flex-1 pt-20 p-4 md:p-8 overflow-y-auto w-full h-screen">
        <main className="p-0">
             {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
              <h2 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 dark:from-gray-100 dark:via-green-400 dark:to-gray-100 bg-clip-text text-transparent">Welcome back, {firstName || 'User'}</h2>
             </div>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                Track your impact, monitor community reports, and measure how your clean-up efforts are transforming your environment
              </p>
            </div>
            <button 
              onClick={() => navigate('/payment-history')} 
              className="group relative bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <History className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Payment History</span>
            </button>
          </div>
           {/* Stats Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StatCard 
              title="Total Number of PickUps" 
              value={stats?.total_waste_disposed_kg ?? 0} 
              loading={loading}
              icon={TrendingUp}
              gradient="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800"
            />
            <StatCard 
              title="Total Illegal Reports Logged" 
              value={stats?.total_illegal_reports ?? 0} 
              loading={loading}
              icon={AlertCircle}
              gradient="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800"
              iconColor="text-amber-600 dark:text-amber-400"
            />
            <StatCard 
              title="Coins Earned" 
              value={stats?.total_coins_earned ?? 0} 
              unit="coins" 
              loading={loading}
              icon={Coins}
              gradient="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800"
              iconColor="text-yellow-600 dark:text-yellow-400"
              tooltip="Coins can be used as discount for your pickup payment"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5">
               <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl md:text-1xl font-bold text-gray-900 dark:text-gray-100">
                    Waste Disposal Trends
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly breakdown of waste collection</p>
              </div>
              <select defaultValue="2025" className="p-2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm dark:text-gray-100">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              {loading ? (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend />
                    <Bar dataKey="General" stackId="a" fill="#A5D6A7" />
                    <Bar dataKey="Organic" stackId="a" fill="#4CAF50" />
                    <Bar dataKey="Recyclables" stackId="a" fill="#1B5E20" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
