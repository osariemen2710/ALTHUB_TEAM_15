import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUser } from "../context/UserContext";
import apiFetch from "../lib/api";

const StatCard = ({ title, value, unit, loading }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-500 mb-2">{title}</p>
    {loading ? (
      <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
    ) : (
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        {value}
        {unit && <span className="text-lg font-medium text-gray-500 ml-2">{unit}</span>}
      </h2>
    )}
  </div>
);

const Dashboard = () => {
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const firstName = user?.name?.split(' ')[0];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('https://binit-1fpv.onrender.com/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error("Failed to fetch dashboard stats");
        }
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
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 pt-20 p-4 md:p-8 overflow-y-auto w-full h-screen bg-gray-50">
        <main className="p-0">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-800 font-medium mb-1">Welcome back, {firstName || 'User'}</h2>
            <p className="text-base text-gray-600 max-w-2xl">
              Track your impact, monitor community reports, and measure how your clean-up efforts are transforming your environment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
            <StatCard title="Total waste disposed (kg)" value={stats?.total_waste_disposed_kg ?? 0} loading={loading} />
            <StatCard title="Total Illegal Reports Logged" value={stats?.total_illegal_reports ?? 0} loading={loading} />
            <StatCard title="Coins Earned" value={stats?.total_coins_earned ?? 0} unit="coins" loading={loading} />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Waste Disposal Trends Overtime</h3>
              <select defaultValue="2025" className="p-2 rounded-md border border-gray-200 bg-white text-sm">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              {loading ? (
                <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
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
