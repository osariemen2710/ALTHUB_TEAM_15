import ConnectingLines from "../components/ConnectingLines.jsx";
import CardGrid from "../components/CardGrid.jsx";
import { useNavigate } from "react-router-dom";

const CreateSchedule = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/dates");
  };

  return (
    <div className="bg-white font-roboto min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 font-roboto p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl  font-robotoFlex sm:text-2xl font-bold text-gray-800 mb-2 ml-12">
          Create Regular Pickup Schedule
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base ml-12 ">
          Set up recurring waste collections that fit your routine
        </p>
        <ConnectingLines currentStep={1} />

        <p className="mt-8 sm:mt-12 text-left px-4 sm:ml-10 sm:mx-8 lg:mx-32 text-sm sm:text-base">
          Step 3 of 5: Choose Schedule Type
        </p>

        <div className="mt-10 ml-12">
          <h5 className="font-semibold text-lg sm:text-2xl mb-4">
            Collection Frequency
          </h5>
          <CardGrid onCardClick={handleCardClick} />
        </div>
      </main>
    </div>
  );
};

export default CreateSchedule;
