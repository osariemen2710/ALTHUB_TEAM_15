import { useState, useEffect } from "react";
import Sidebar from "./navigation";
import { useNavigate } from "react-router-dom";
import apiFetch from "../lib/api";

const Report = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('https://binit-1fpv.onrender.com/report');
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          console.error("Failed to fetch reports");
          setReports([]);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'In review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Action Taken':
        return 'bg-red-100 text-red-800';
      case 'Cleared':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatReportTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${time} | ${day} ${month}, ${year}`;
  };

  const renderSkeletonCards = () => (
    [...Array(5)].map((_, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
        </div>
        <div className="mt-4 flex justify-between items-end">
          <div className="text-sm text-gray-500">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-12 w-12 rounded-md bg-gray-200"></div>
        </div>
      </div>
    ))
  );

  const renderSkeletonTableRows = () => (
    [...Array(5)].map((_, index) => (
      <tr key={index}>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div></td>
        <td className="px-6 py-4"><div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div></td>
        <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div></td>
      </tr>
    ))
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/report')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Report History</h1>
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          See all your past reports, pickups, and clean-up activities – and how they’ve contributed to a cleaner community.
        </p>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {loading ? renderSkeletonCards() : reports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">#{report.id.slice(-6)}</p>
                  <p className="text-sm text-gray-500">{report.location}</p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <div className="text-sm text-gray-500">
                  <p>{report.issue_type}</p>
                  <p>{formatReportTime(report.created_at)}</p>
                </div>
                <img
                  src={report.image_path}
                  alt="Report media"
                  className="h-12 w-12 rounded-md object-cover cursor-pointer"
                  onClick={() => openModal(report.image_path)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="min-w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? renderSkeletonTableRows() : reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{report.id.slice(-6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.issue_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <img
                        src={report.image_path}
                        alt="Report media"
                        className="h-10 w-10 rounded-md object-cover cursor-pointer"
                        onClick={() => openModal(report.image_path)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatReportTime(report.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination and Modal remain the same */}
      </main>
    </div>
  );
};

export default Report;