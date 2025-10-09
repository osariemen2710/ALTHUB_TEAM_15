import { useState } from "react";
import { CreditCard, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation.jsx";
import ConnectingLines from "../components/ConnectingLines.jsx";
import { useSchedule } from "../context/ScheduleContext";
import apiFetch from "../lib/api.js";

const PaymentBillingPage = () => {
  const navigate = useNavigate();
  const { scheduleData } = useSchedule();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleLineClick = (step) => {
    switch (step) {
      case 1:
        navigate("/schedule");
        break;
      case 2:
        navigate("/dates");
        break;
      case 3:
        navigate("/waste");
        break;
      case 4:
        navigate("/special");
        break;
      case 5:
        navigate("/success");
        break;
      default:
        break;
    }
  };

  if (!scheduleData) {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 pt-20 p-6 md:p-8 lg:p-12 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold">Missing schedule information</p>
            <p className="text-gray-600 mt-2">It seems some data is missing. Please go back and start over.</p>
            <button
              onClick={() => navigate("/schedule")}
              className="mt-6 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <span>Start Over</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  const { frequency, timeWindow, startDate, company } = scheduleData;
  
  const parseCurrency = (currencyString) => {
    if (typeof currencyString !== 'string') return 0;
    return Number(currencyString.replace(/[^0-9.-]+/g,""));
  }

  const formatCurrency = (number) => {
    return `₦${number.toLocaleString()}`;
  }

  const monthlyCostValue = parseCurrency(company?.price || "0");
  const newCustomerDiscount = 150;
  const firstPayment = monthlyCostValue - newCustomerDiscount;

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    setPaymentSuccess(false);

    try {
      // 1. Create Payment Intent
      const intentResponse = await apiFetch('https://binit-1fpv.onrender.com/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: firstPayment,
          currency: 'NAIRA',
          description: `Payment for ${company?.name} waste collection.`,
          payment_metadata: {
            card_number: cardNumber,
            expiry_date: expiryDate,
            cvc: cvc,
          },
        }),
      });

      if (!intentResponse.ok) {
        const errorData = await intentResponse.json();
        throw new Error(errorData.message || 'Failed to create payment intent.');
      }

      const intentData = await intentResponse.json();
      const { id: payment_intent_id } = intentData;

      // 2. Confirm Payment
      const confirmResponse = await apiFetch('https://binit-1fpv.onrender.com/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_intent_id,
          payment_method: 'card',
        }),
      });

      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json();
        throw new Error(errorData.message || 'Payment confirmation failed.');
      }

      // 3. Handle Success
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/success");
      }, 3000);


    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateUpcomingPickups = (startDate, frequency, timeWindow) => {
    const pickups = [];
    if (!startDate) return ["N/A"];
    const start = new Date(startDate);
    // Simple logic assuming weekly pickups for demonstration
    for (let i = 0; i < 3; i++) {
      const pickupDate = new Date(start.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
      const dateString = pickupDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      pickups.push(`${dateString} (${timeWindow || '9AM-12PM'})`);
    }
    return pickups;
  };

  const upcomingPickups = calculateUpcomingPickups(startDate, frequency, timeWindow);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 pt-20 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ConnectingLines currentStep={5} onLineClick={handleLineClick} />

          <div className="text-center mb-8 mt-8">
            <p className="text-sm text-gray-500 mb-2">Step 5 of 5: Payment & Billing</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border-2 border-blue-400 p-8 max-w-3xl mx-auto">
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Upcoming Pickups
              </h3>
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 appearance-none pr-10">
                  {upcomingPickups.map((pickup, index) => (
                    <option key={index}>{pickup}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Billing Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Monthly Cost:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(monthlyCostValue)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">New Customer Discount:</span>
                  <span className="text-green-600 font-semibold">-{formatCurrency(newCustomerDiscount)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">First Payment:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(firstPayment)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-4">
                  <span className="text-gray-700 font-medium">Next Billing:</span>
                  <span className="text-gray-900 font-semibold">August 10, 2025</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Enter Card Details
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="0000 0000 0000 0000" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="MM / YY" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input type="text" id="cvc" value={cvc} onChange={(e) => setCvc(e.target.value)} className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="123" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">
              {error}
            </div>
          )}
          {paymentSuccess && (
            <div className="mt-4 text-center text-green-600 bg-green-100 p-3 rounded-lg">
              Payment successful! Redirecting...
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button 
              onClick={handlePayment}
              disabled={isLoading || paymentSuccess}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (paymentSuccess ? 'Paid!' : 'Confirm & Pay')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentBillingPage;