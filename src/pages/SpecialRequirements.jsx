import ConnectingLines from "../components/ConnectingLines.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SpecialRequirements = () => {
  const navigate = useNavigate();

  const options = [
    { type: "Heavy Items requiring special handling" },
    { type: "May contain hazardous materials" },
    { type: "Prefer quiet collection (no loud noises)" },
    { type: "Pre-sorted waste (no mixing required)" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleSelect = (type) => {
    setSelectedOptions((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="bg-white font-robotoFlex min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <ConnectingLines currentStep={3} />

        {/* Step Title */}
        <p className="mt-8 sm:mt-12 text-left px-4 sm:ml-10 sm:mx-8 lg:mx-32 text-sm sm:text-base">
          Step 3 of 5: Choose Schedule Type
        </p>

        {/* Access Instructions */}
        <div className="mt-6 px-4 sm:ml-8 lg:ml-12">
          <h1 className="font-bold text-xl sm:text-2xl mb-6">
            Specify any special requirements
          </h1>
          <h5 className="sm:text-lg mb-4 font-semibold">Access Instructions</h5>
          <div className="w-full sm:max-w-md border border-[#A1A1AA] p-4 sm:p-6 rounded-lg">
            <p>Gate Code:</p>
            <p>Apartment 5B, 2nd Floor</p>
            <p>Waste bins are kept in the garage</p>
          </div>
        </div>

        {/* Special Handling Options */}
        <div className="mt-6 px-4 sm:ml-8 lg:ml-12">
          <h2 className="font-bold mb-4">Special Handling Options</h2>
          <div className="flex flex-col gap-4 sm:gap-8 w-full">
            {options.map((option, index) => {
              const type = option.type;
              const isSelected = selectedOptions.includes(type);

              return (
                <div
                  key={index}
                  onClick={() => toggleSelect(type)}
                  className={`w-full max-w-full sm:max-w-[590px] h-auto min-h-[60px] sm:h-auto sm:min-h-[80px] flex items-center gap-3 border-1 border-[#A1A1AA] rounded-lg p-3 sm:p-4 cursor-pointer transition
              ${
                isSelected
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-500"
              }`}
                >
                  {/* Hidden actual checkbox for accessibility */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="hidden"
                  />

                  {/* Custom round checkbox */}
                  <div
                    className={`h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full border-2 transition-colors flex-shrink-0
                ${
                  isSelected
                    ? "bg-green-800 border-green-500"
                    : "bg-white border-gray-300"
                }`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Option label */}
                  <span className="text-sm sm:text-base flex-1">{type}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 px-4 sm:ml-12">
          <strong>Selected:</strong> {selectedOptions.join(", ") || "None"}
        </div>

        <div className="mt-8 flex flex-row justify-between gap-4 mx-4 sm:mx-8 lg:mx-12">
          <div
            onClick={() => navigate("/waste")}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>

          <div
            onClick={() => navigate("/service")}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpecialRequirements;
