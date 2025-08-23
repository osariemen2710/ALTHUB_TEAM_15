import ConnectingLines from "../components/ConnectingLines.jsx";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import Sidebar from "../components/navigation.jsx";

const SpecialRequirements = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const options = [
    { type: "Heavy Items requiring special handling" },
    { type: "May contain hazardous materials" },
    { type: "Prefer quiet collection (no loud noises)" },
    { type: "Pre-sorted waste (no mixing required)" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [accessInstructions, setAccessInstructions] = useState("");

  const toggleSelect = (type) => {
    setSelectedOptions((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleNext = () => {
    const specialData = {
      specialRequirements: selectedOptions,
      accessInstructions: accessInstructions,
    };
    navigate("/service", {
      state: { scheduleData: { ...location.state.scheduleData, ...specialData } },
    });
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
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ConnectingLines currentStep={4} onLineClick={handleLineClick} />

          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-2">Step 4 of 5</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8">
              Special Requirements
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Access Instructions</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-800">Please provide clear access instructions.</p>
                      <p className="text-sm text-green-700">e.g., Gate code, apartment number, location of bins.</p>
                    </div>
                  </div>
                  <textarea
                    value={accessInstructions}
                    onChange={(e) => setAccessInstructions(e.target.value)}
                    className="mt-3 w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                    rows="4"
                    placeholder="Enter instructions here..."
                  ></textarea>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Special Handling Options</h3>
                <div className="space-y-3">
                  {options.map((option, index) => {
                    const type = option.type;
                    const isSelected = selectedOptions.includes(type);

                    return (
                      <div
                        key={index}
                        onClick={() => toggleSelect(type)}
                        className={`border rounded-lg p-4 flex items-center gap-4 transition cursor-pointer ${
                          isSelected
                            ? "border-green-500 bg-green-50 shadow-sm"
                            : "border-gray-300 bg-white hover:border-green-400"
                        }`}
                      >
                        <div className={`h-6 w-6 flex items-center justify-center rounded-full border-2 transition-colors flex-shrink-0 ${ isSelected ? "bg-green-600 border-green-600" : "bg-white border-gray-300" }`}>
                          {isSelected && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm sm:text-base flex-1 text-gray-700">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <button
              onClick={() => navigate("/waste")}
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
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

export default SpecialRequirements;