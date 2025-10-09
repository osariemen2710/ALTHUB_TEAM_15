import { useEffect } from "react";
import ConnectingLines from "../components/ConnectingLines.jsx";
import CardGrid from "../components/CardGrid.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation.jsx";
import { ArrowRight } from "lucide-react";
import { useSchedule } from "../context/ScheduleContext";

const CreateSchedule = () => {
  const navigate = useNavigate();
  const { resetScheduleData } = useSchedule();

  useEffect(() => {
    resetScheduleData();
  }, [resetScheduleData]);

  const handleCardClick = () => {
    navigate("/dates");
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 pt-20 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Create Regular Pickup Schedule
          </h1>
          <p className="text-gray-600 mb-8 text-base">
            Set up recurring waste collections that fit your routine.
          </p>
          
          <ConnectingLines currentStep={1} onLineClick={handleLineClick} />

          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-2">
              Step 1 of 5
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              Collection Frequency
            </h2>
            <CardGrid onCardClick={handleCardClick} />
          </div>
          
          <div className="mt-12 flex justify-end">
            <button
              onClick={handleCardClick}
              className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateSchedule;
