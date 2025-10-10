import React, { useState, useEffect } from 'react';
import Sidebar from '../components/navigation';
import apiFetch from '../lib/api';
import { Toaster, toast } from 'sonner';

const PickupHistory = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPickupHistory = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('https://binit-1fpv.onrender.com/pickup');
        if (response.ok) {
          const data = await response.json();
          setPickups(Array.isArray(data) ? data : []);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch pickup history.');
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPickupHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 pt-20 p-4 md:p-8 overflow-y-auto w-full h-screen bg-gray-50">
        <div className="mb-8">
          <h1 className="text-2xl text-gray-800 font-semibold mb-1">Pickup History</h1>
          <p className="text-base text-gray-600">
            Here is a record of your past pickups.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b font-medium bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4">Scheduled Date</th>
                  <th scope="col" className="px-6 py-4">Location</th>
                  <th scope="col" className="px-6 py-4">Waste Type</th>
                  <th scope="col" className="px-6 py-4">Frequency</th>
                  <th scope="col" className="px-6 py-4">Service Provider</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                      <p className="mt-2 text-gray-500">Loading pickups...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : pickups.length > 0 ? (
                  pickups.map((pickup) => (
                    <tr key={pickup.id} className="border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="whitespace-nowrap px-6 py-4">{formatDate(pickup.scheduled_date)}</td>
                      <td className="whitespace-nowrap px-6 py-4">{pickup.location}</td>
                      <td className="whitespace-nowrap px-6 py-4">{pickup.waste_type}</td>
                      <td className="whitespace-nowrap px-6 py-4">{pickup.frequency}</td>
                      <td className="whitespace-nowrap px-6 py-4">{pickup.service_provider}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`capitalize px-3 py-1.5 rounded-full text-xs font-medium ${
                            pickup.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : pickup.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {pickup.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No pickup history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default PickupHistory;
