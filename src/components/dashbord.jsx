import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle, Coins, Calendar } from 'lucide-react';

// Mock components for demo
const Sidebar = () => <div className="hidden md:block w-64 bg-gray-800 h-screen fixed left-0 top-0"></div>;
const useUser = () => ({ user: { name: 'John Doe' } });
const useNavigate = () => () => {};
const apiFetch = async () => ({ ok: false });

const StatCard = ({ title, value, unit, loading, icon: Icon, gradient }) => (
  <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${gradient}`}></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        {Icon && (
          <div className={`p-2 rounded-lg ${gradient} bg-opacity-10`}>
            <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
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
  </div>
);

const processPickupData = (pickups) => {
  const monthlyData = {};
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (const pickup of pickups) {
    const date = new Date(pickup.created_at);
    const monthKey = date.toISOString().substring(0, 7);

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthNames[date.getMonth()],
        organic: 0,
        plastic: 0,
        electronic: 0,
      };
    }

    const wasteType = pickup.waste_type.toLowerCase();

    if (wasteType === 'organic') {
      monthlyData[monthKey].organic += 1;
    } else if (wasteType === 'plastic' || wasteType === 'recycling') {
      monthlyData[monthKey].plastic += 1;
    } else {
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
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
          if (data && !isDashboardDataEmpty(data)) {
            setStats(data);
            return;
          }
        }
        
        const [pickupResponse, reportResponse] = await Promise.all([
          apiFetch('https://binit-1fpv.onrender.com/pickup/'),
          apiFetch('https://binit-1fpv.onrender.com/report')
        ]);

        let pickups = [];
        if (pickupResponse.ok) {
          const pickupData = await pickupResponse.json();
          pickups = Array.isArray(pickupData) ? pickupData : [pickupData];
        }

        let total_illegal_reports = 0;
        let total_coins_earned = 0;
        if (reportResponse.ok) {
          const reportData = await reportResponse.json();
          if (Array.isArray(reportData)) {
            total_illegal_reports = reportData.length;
            total_coins_earned = Math.floor(reportData.length / 2);
          }
        }

        const fallbackStats = {
          total_waste_disposed_kg: pickups.length,
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
      <div className="flex-1 md:ml-64 pt-20 p-4 md:p-8 overflow-y-auto">
        <main className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 dark:from-gray-100 dark:via-green-400 dark:to-gray-100 bg-clip-text text-transparent">
                Welcome back, {firstName || 'User'}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                Track your impact, monitor community reports, and measure how your clean-up efforts are transforming your environment
              </p>
            </div>
            <button 
              onClick={() => navigate('/payment-history')} 
              className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Calendar className="w-5 h-5" />
              <span>Payment History</span>
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
            />
            <StatCard 
              title="Coins Earned" 
              value={stats?.total_coins_earned ?? 0} 
              unit="coins" 
              loading={loading}
              icon={Coins}
              gradient="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800"
            />
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Waste Disposal Trends
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly breakdown of waste collection</p>
              </div>
              <div className="relative">
                <select 
                  defaultValue="2025" 
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-green-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200 cursor-pointer"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="w-full h-80 md:h-96">
              {loading ? (
                <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorGeneral" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A5D6A7" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#A5D6A7" stopOpacity={0.7}/>
                      </linearGradient>
                      <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.7}/>
                      </linearGradient>
                      <linearGradient id="colorRecyclables" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#1B5E20" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6b7280" 
                      className="dark:stroke-gray-400"
                      tick={{ fontSize: 12, fontWeight: 500 }}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      className="dark:stroke-gray-400"
                      tick={{ fontSize: 12, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(229, 231, 235, 0.3)' }} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
                    <Bar dataKey="General" stackId="a" fill="url(#colorGeneral)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Organic" stackId="a" fill="url(#colorOrganic)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Recyclables" stackId="a" fill="url(#colorRecyclables)" radius={[8, 8, 0, 0]} />
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
