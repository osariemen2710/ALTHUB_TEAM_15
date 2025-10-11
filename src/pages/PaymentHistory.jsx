import React, { useState, useEffect } from 'react';
import Sidebar from '../components/navigation';
import apiFetch from '../lib/api';
import { Toaster, toast } from 'sonner';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('https://binit-1fpv.onrender.com/payments');
        if (response.ok) {
          const data = await response.json();
          setPayments(data.payments);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch payment history.');
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const formatCurrency = (number) => {
    return `₦${number.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 pt-20 p-4 md:p-8 overflow-y-auto w-full h-screen">
        <div className="mb-8">
          <h1 className="text-2xl text-gray-800 dark:text-gray-100 font-semibold mb-1">Payment History</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Here is a record of your past payments.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b dark:border-gray-600 font-medium bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4 text-gray-800 dark:text-gray-100">Date</th>
                  <th scope="col" className="px-6 py-4 text-gray-800 dark:text-gray-100">Amount</th>
                  <th scope="col" className="px-6 py-4 text-gray-800 dark:text-gray-100">Description</th>
                  <th scope="col" className="px-6 py-4 text-gray-800 dark:text-gray-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">Loading payments...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.id} className="border-b dark:border-gray-700 transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="whitespace-nowrap px-6 py-4 text-gray-800 dark:text-gray-100">{formatDate(payment.created_at)}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-800 dark:text-gray-100">{formatCurrency(payment.amount)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-800 dark:text-gray-100">{payment.description || 'N/A'}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`capitalize px-3 py-1.5 rounded-full text-xs font-medium ${
                            payment.status === 'completed'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                              : payment.status === 'refunded'
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                              : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No payment history found.
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

export default PaymentHistory;
