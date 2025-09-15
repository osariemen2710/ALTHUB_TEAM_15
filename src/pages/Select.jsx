import ConnectingLines from "../components/ConnectingLines.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircleCheck, ArrowLeft, Home } from "lucide-react";
import Sidebar from "../components/navigation.jsx";

const Select = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState(null);

  // Get data from location state (passed from previous steps) or localStorage
  useEffect(() => {
    const getScheduleData = () => {
      if (location.state?.scheduleData) {
        return location.state.scheduleData;
      }
      const storedData = localStorage.getItem("scheduleFormData");
      if (storedData) {
        try {
          return JSON.parse(storedData);
        } catch (error) {
          console.error("Error parsing stored schedule data:", error);
        }
      }
      return null;
    };

    const data = getScheduleData();
    setScheduleData(data);
  }, [location.state]);

  const validateScheduleData = (data) => {
    if (!data) return false;
    const required = ["wasteType", "location", "frequency", "timeWindow"];
    return required.every((field) => data[field]);
  };

  const handleNavigation = async (path) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      navigate(path);
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

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

  const generateScheduleName = (data) => {
    if (!data) return "Schedule";
    const wasteType = data.wasteType || "Waste";
    const frequency = data.frequency || "Regular";
    return `${frequency} ${wasteType} Collection`;
  };

  const calculateNextPickup = (data) => {
    if (!data?.frequency || !data?.timeWindow) return null;
    const now = new Date();
    const today = now.getDay();
    let targetDay = 3;
    if (data.frequency.toLowerCase().includes("monday")) targetDay = 1;
    else if (data.frequency.toLowerCase().includes("tuesday")) targetDay = 2;
    else if (data.frequency.toLowerCase().includes("wednesday")) targetDay = 3;
    else if (data.frequency.toLowerCase().includes("thursday")) targetDay = 4;
    else if (data.frequency.toLowerCase().includes("friday")) targetDay = 5;
    else if (data.frequency.toLowerCase().includes("saturday")) targetDay = 6;
    else if (data.frequency.toLowerCase().includes("sunday")) targetDay = 0;
    let daysUntil = (targetDay - today + 7) % 7;
    if (daysUntil === 0) daysUntil = 7;
    const nextPickupDate = new Date(now.getTime() + daysUntil * 24 * 60 * 60 * 1000);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = dayNames[nextPickupDate.getDay()];
    const monthName = monthNames[nextPickupDate.getMonth()];
    const day = nextPickupDate.getDate();
    const year = nextPickupDate.getFullYear();
    const startTime = data.timeWindow.split("-")[0] || "9:00AM";
    return `${dayName}, ${monthName} ${day}, ${year} at ${startTime}`;
  };

  const calculateMonthlyCost = (data) => {
    if (!data) return "₦0";
    let baseCost = 2000;
    if (data.wasteType?.toLowerCase().includes("recyclable")) baseCost *= 0.8;
    else if (data.wasteType?.toLowerCase().includes("organic")) baseCost *= 0.9;
    else if (data.wasteType?.toLowerCase().includes("hazardous")) baseCost *= 1.5;
    if (data.frequency?.toLowerCase().includes("twice") || data.frequency?.toLowerCase().includes("2")) {
      baseCost *= 2;
    } else if (data.frequency?.toLowerCase().includes("daily")) {
      baseCost *= 4;
    }
    return `₦${Math.round(baseCost).toLocaleString()}`;
  };

  if (scheduleData === null) {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading schedule data...</p>
            </div>
        </main>
      </div>
    );
  }

  if (!validateScheduleData(scheduleData)) {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-x-hidden">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <p className="text-red-600 text-lg font-semibold">Missing schedule information</p>
                    <p className="text-gray-600 mt-2">It seems some data is missing. Please go back and complete the previous steps.</p>
                    <button
                        onClick={() => navigate("/schedule")}
                        className="mt-6 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Start Over</span>
                    </button>
                </div>
            </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ConnectingLines currentStep={5} onLineClick={handleLineClick} />

          <div className="mt-12 text-center">
            <CircleCheck className="w-16 h-16 text-green-600 bg-green-100 border-8 border-green-50 rounded-full mx-auto" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">
              Schedule Created Successfully!
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Your recurring waste pickup is now active.
            </p>
          </div>

          <div className="mt-8 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Schedule Summary
            </h2>
            
            {calculateNextPickup(scheduleData) && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center mb-6" role="status">
                    <strong>Next Pickup:</strong> {calculateNextPickup(scheduleData)}
                </div>
            )}

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="col-span-1 sm:col-span-2">
                <dt className="font-semibold text-gray-600">Schedule Name</dt>
                <dd className="text-gray-900 text-lg">{generateScheduleName(scheduleData)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Waste Type</dt>
                <dd className="text-gray-900">{scheduleData.wasteType || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Location</dt>
                <dd className="text-gray-900">{scheduleData.location || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Frequency</dt>
                <dd className="text-gray-900">{scheduleData.frequency || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Time Window</dt>
                <dd className="text-gray-900">{scheduleData.timeWindow || "N/A"}</dd>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <dt className="font-semibold text-gray-600">Estimated Monthly Cost</dt>
                <dd className="text-green-600 font-bold text-xl">{calculateMonthlyCost(scheduleData)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleNavigation("/schedule")}
              disabled={isLoading}
              className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Home className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation("/preview")}
              disabled={isLoading}
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>View Provider</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Select;