import { CreditCard, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation.jsx";
import ConnectingLines from "../components/ConnectingLines.jsx";

const PaymentBillingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scheduleData = location.state?.scheduleData;

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
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto flex items-center justify-center">
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
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

              <div className="mt-6 bg-gray-50 border border-gray-300 rounded-md p-4">
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Payment will be automatically charged to your card ending in ****4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm">
              Confirm & Pay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentBillingPage;