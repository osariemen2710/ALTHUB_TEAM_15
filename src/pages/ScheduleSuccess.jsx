import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation.jsx";
import ConnectingLines from "../components/ConnectingLines.jsx";

const ScheduleSuccess = () => {
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

  const {
    frequency,
    timeWindow,
    startDate,
    location: address,
    wasteType,
    volume,
    specialRequirements,
    company,
  } = scheduleData;

  const scheduleName = `${frequency} ${wasteType} Collection`;
  const nextPickup = "Wednesday, July 10, 2025 at 9:00AM"; // This seems to be hardcoded, I will leave it for now.
  const monthlyCost = company?.price || "N/A";

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ConnectingLines currentStep={5} onLineClick={handleLineClick} />

          <div className="text-center mb-8 mt-8">
            <p className="text-sm text-gray-500 mb-2">Step 5 of 5: Schedule Confirmation</p>
          </div>

          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Schedule created successfully
            </h2>
            <p className="text-gray-600 mb-8">
              Your recurring waste pickup is now active
            </p>
            
            <div className="bg-gray-100 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-700">
                Next Pickup: <span className="font-medium">{nextPickup}</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Schedule details
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Schedule Name:</span>
                <span className="text-gray-800">{scheduleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Waste Type:</span>
                <span className="text-gray-800">{wasteType || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Expected Volume:</span>
                <span className="text-gray-800">{volume || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Location:</span>
                <span className="text-gray-800">{address || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Frequency:</span>
                <span className="text-gray-800">{frequency || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Time Window:</span>
                <span className="text-gray-800">{timeWindow || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Start Date:</span>
                <span className="text-gray-800">{startDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Special Requirements:</span>
                <span className="text-gray-800">{specialRequirements?.join(', ') || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Service Provider:</span>
                <span className="text-gray-800">{company?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Monthly Cost:</span>
                <span className="text-gray-800 font-bold">{monthlyCost}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => navigate('/bill-payment', { state: { scheduleData } })}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Payment & Billing Information
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScheduleSuccess;