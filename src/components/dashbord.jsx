import React from "react";
import Sidebar from "./navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useUser } from "../context/UserContext";

const activeData = [
  { name: 'Jan', General: 280, Organic: 540, Recyclables: 180 },
  { name: 'Feb', Organic: 700, General: 280, Recyclables: 220 },
  // ... add data for other months as seen in the image
  { name: 'Dec', Organic: 520, General: 220, Recyclables: 150 },
];

const StatCard = ({ title, value, unit }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-500 mb-2">{title}</p>
    <h2 className="text-3xl font-semibold text-gray-800">
      {value}
      {unit && <span className="text-lg font-medium text-gray-500 ml-2">{unit}</span>}
    </h2>
  </div>
);

const Dashboard = ({ isEmpty }) => {
  const chartData = isEmpty ? [] : activeData;
  const { user } = useUser();
  const firstName = user?.name?.split(' ')[0];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 p-8 overflow-y-auto w-full h-screen bg-gray-50">
        <main className="p-0">
          <div className="mb-8">
            <h2 className="text-2xl text-gray-800 font-medium mb-1">Welcome back, {firstName || 'User'}</h2>
            <p className="text-base text-gray-600 max-w-2xl">
              Track your impact, monitor community reports, and measure how your clean-up efforts are transforming your environment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
            <StatCard title="Total waste disposed (kg)" value={isEmpty ? '0' : '20'} />
            <StatCard 
              title={isEmpty ? "No. of clean-up drives joined" : "Total Illegal Reports Logged"} 
              value={isEmpty ? '0' : '02'} 
            />
            <StatCard title="Coins Earned" value={isEmpty ? '0' : '12'} unit="coins" />
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
