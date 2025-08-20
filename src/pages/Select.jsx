import ConnectingLines from "../components/ConnectingLines.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CircleCheck, ArrowLeft, ArrowRight } from "lucide-react";

const Select = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState(null);

  // Get data from location state (passed from previous steps) or localStorage
  useEffect(() => {
    const getScheduleData = () => {
      // First try to get data from location state (React Router)
      if (location.state?.scheduleData) {
        return location.state.scheduleData;
      }

      // Fallback to localStorage if available
      const storedData = localStorage.getItem("scheduleFormData");
      if (storedData) {
        try {
          return JSON.parse(storedData);
        } catch (error) {
          console.error("Error parsing stored schedule data:", error);
        }
      }

      // If no data found, return null
      return null;
    };

    const data = getScheduleData();
    setScheduleData(data);
  }, [location.state]);

  // Validate required data
  const validateScheduleData = (data) => {
    if (!data) return false;
    const required = ["wasteType", "location", "frequency", "timeWindow"];
    return required.every((field) => data[field]);
  };

  // Handle navigation with loading state
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

  // Generate schedule name based on data
  const generateScheduleName = (data) => {
    if (!data) return "Schedule";
    const wasteType = data.wasteType || "Waste";
    const frequency = data.frequency || "Regular";
    return `${frequency} ${wasteType} Collection`;
  };

  // Calculate next pickup date based on frequency
  const calculateNextPickup = (data) => {
    if (!data?.frequency || !data?.timeWindow) return null;

    const now = new Date();
    const today = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Simple logic for weekly frequencies
    let targetDay = 3; // Default to Wednesday (3)
    if (data.frequency.toLowerCase().includes("monday")) targetDay = 1;
    else if (data.frequency.toLowerCase().includes("tuesday")) targetDay = 2;
    else if (data.frequency.toLowerCase().includes("wednesday")) targetDay = 3;
    else if (data.frequency.toLowerCase().includes("thursday")) targetDay = 4;
    else if (data.frequency.toLowerCase().includes("friday")) targetDay = 5;
    else if (data.frequency.toLowerCase().includes("saturday")) targetDay = 6;
    else if (data.frequency.toLowerCase().includes("sunday")) targetDay = 0;

    // Calculate days until next pickup
    let daysUntil = (targetDay - today + 7) % 7;
    if (daysUntil === 0) daysUntil = 7; // If today is the pickup day, schedule for next week

    const nextPickupDate = new Date(
      now.getTime() + daysUntil * 24 * 60 * 60 * 1000
    );
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = dayNames[nextPickupDate.getDay()];
    const monthName = monthNames[nextPickupDate.getMonth()];
    const day = nextPickupDate.getDate();
    const year = nextPickupDate.getFullYear();

    // Extract start time from timeWindow
    const startTime = data.timeWindow.split("-")[0] || "9:00AM";

    return `${dayName}, ${monthName} ${day}, ${year} at ${startTime}`;
  };

  // Calculate estimated monthly cost (simplified logic)
  const calculateMonthlyCost = (data) => {
    if (!data) return "₦0";

    // Simple pricing logic - you should replace this with your actual pricing
    let baseCost = 2000; // Base cost in Naira

    if (data.wasteType?.toLowerCase().includes("recyclable")) baseCost *= 0.8;
    else if (data.wasteType?.toLowerCase().includes("organic")) baseCost *= 0.9;
    else if (data.wasteType?.toLowerCase().includes("hazardous"))
      baseCost *= 1.5;

    // Weekly frequency
    if (
      data.frequency?.toLowerCase().includes("twice") ||
      data.frequency?.toLowerCase().includes("2")
    ) {
      baseCost *= 2;
    } else if (data.frequency?.toLowerCase().includes("daily")) {
      baseCost *= 4;
    }

    return `₦${Math.round(baseCost).toLocaleString()}`;
  };

  // Show loading state while data is being processed
  if (scheduleData === null) {
    return (
      <div className="bg-white font-roboto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#228B22] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedule data...</p>
        </div>
      </div>
    );
  }

  // Validate component is ready to render
  if (!validateScheduleData(scheduleData)) {
    return (
      <div className="bg-white font-robotoFlex min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Missing schedule information</p>
          <button
            onClick={() => navigate("/dates")}
            className="mt-4 px-4 py-2 bg-[#228B22] text-white rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-robotoFlex min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <ConnectingLines currentStep={5} />

        <p className="mt-8 sm:mt-12 text-center sm:text-left px-4 sm:mx-12 lg:mx-32 text-sm sm:text-base">
          Step 5 of 5: Schedule Confirmation
        </p>

        {/* Success Section */}
        <section
          className="flex flex-col justify-center items-center sm:items-start gap-4 sm:gap-5 px-4 sm:ml-34 mt-8 sm:mt-12"
          aria-labelledby="success-heading"
        >
          <CircleCheck
            className="w-8 h-8 sm:w-10 sm:h-10 text-[#90EE90] bg-[#006400] border-4 sm:border-8 border-[#90EE90] rounded-full sm:ml-38"
            aria-hidden="true"
          />
          <h1
            id="success-heading"
            className="text-2xl sm:text-3xl font-semibold text-center sm:text-left"
          >
            Schedule created successfully
          </h1>
          <p className="text-sm sm:text-md text-center sm:text-left sm:ml-16">
            Your recurring waste pickup is now active
          </p>

          {calculateNextPickup(scheduleData) && (
            <div
              className="border-2 border-[#A1A1AA] bg-white px-6 sm:px-12 py-4 sm:py-6 rounded-md text-sm sm:text-base text-center"
              role="status"
              aria-label="Next pickup information"
            >
              <strong>Next Pickup:</strong> {calculateNextPickup(scheduleData)}
            </div>
          )}
        </section>

        {/* Schedule Details Section */}
        <section
          className="flex flex-col gap-4 sm:gap-5 px-4 sm:ml-34 mt-6 sm:mt-8"
          aria-labelledby="details-heading"
        >
          <h2
            id="details-heading"
            className="text-xl sm:text-2xl font-semibold text-center sm:text-left sm:ml-24 mb-2"
          >
            Schedule Details
          </h2>

          <dl className="space-y-3 sm:space-y-4">
            <div className="text-sm sm:text-base">
              <dt className="font-semibold text-lg sm:text-xl inline">
                Schedule Name
              </dt>
              <dd className="inline">: {generateScheduleName(scheduleData)}</dd>
            </div>

            <div className="text-sm sm:text-base">
              <dt className="font-semibold text-lg sm:text-xl inline">
                Waste Type
              </dt>
              <dd className="inline">: {scheduleData.wasteType || "N/A"}</dd>
            </div>

            <div className="text-sm sm:text-base">
              <dt className="font-semibold text-lg sm:text-xl inline">
                Location
              </dt>
              <dd className="inline">: {scheduleData.location || "N/A"}</dd>
            </div>

            <div className="text-sm sm:text-base">
              <dt className="font-semibold text-lg sm:text-xl inline">
                Frequency
              </dt>
              <dd className="inline">: {scheduleData.frequency || "N/A"}</dd>
            </div>

            <div className="text-sm sm:text-base">
              <dt className="font-semibold text-lg sm:text-xl inline">
                Time Window
              </dt>
              <dd className="inline">: {scheduleData.timeWindow || "N/A"}</dd>
            </div>

            <div className="text-sm sm:text-base">
              <dt className="font-semibold text-lg sm:text-xl inline">
                Monthly Cost
              </dt>
              <dd className="inline">: {calculateMonthlyCost(scheduleData)}</dd>
            </div>
          </dl>
        </section>

        {/* Navigation */}
        <nav className="mt-8 flex flex-row justify-between gap-4 mx-4 sm:mx-8 lg:mx-12">
          <button
            onClick={() => handleNavigation("/preview")}
            disabled={isLoading}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to previous step"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </button>

          <button
            onClick={() => handleNavigation("/create")}
            disabled={isLoading}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go to next step"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </button>
        </nav>
      </main>
    </div>
  );
};

export default Select;
