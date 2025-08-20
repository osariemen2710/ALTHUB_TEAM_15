import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderPinwheel, Trash2, Paintbrush, BatteryFull } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const WasteTypes = () => {
  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [errors, setErrors] = useState({});

  const options = [
    {
      type: "General Waste",
      icon: <Trash2 className="w-6 h-6 text-gray-600" />,
      items: ["Regular Household trash"],
    },
    {
      type: "Recycling",
      icon: <LoaderPinwheel className="w-6 h-6 text-gray-600" />,
      items: ["Paper", "Plastic", "Glass", "Metal"],
    },
    {
      type: "Organic Waste",
      icon: <Paintbrush className="w-6 h-6 text-gray-600" />,
      items: ["Food scraps", "Garden waste"],
    },
    {
      type: "E-Waste",
      icon: <BatteryFull className="w-6 h-6 text-gray-600" />,
      items: ["Electronics", "Batteries"],
    },
  ];

  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    if (selected.length === 0) {
      newErrors.wasteTypes = "Please select at least one waste type";
    }

    if (!selectedMeasurement) {
      newErrors.volume = "Please select expected volume";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleSelect = (type) => {
    setSelected((prev) => {
      const newSelected = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];

      if (newSelected.length > 0) {
        setErrors((prevErrors) => ({ ...prevErrors, wasteTypes: undefined }));
      }

      return newSelected;
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row">
      <main className="font-robotoFlex flex-1 p-4 sm:p-6 lg:p-8">
        <fieldset className="space-y-10">
          <legend className="text-xl sm:text-2xl font-semibold mb-4 ml-4 sm:ml-8 lg:ml-12">
            {" "}
            Waste Types(Select all that apply)
          </legend>

          {options.map(({ type, icon, items }) => {
            const isSelected = selected.includes(type);
            return (
              <div
                key={type}
                className={`border-[1px] border-[#A1A1AA] rounded-lg p-3 sm:p-4 mx-4 sm:mx-8 lg:mx-12 flex w-auto sm:w-3/4 lg:w-2/4 h-auto flex-col sm:flex-row sm:items-start gap-4 sm:gap-4 transition 
                  ${
                    isSelected
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-white"
                  }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(type)}
                  className="hidden"
                />
                <div
                  onClick={() => toggleSelect(type)}
                  className={`h-8 w-5 sm:h-6 sm:w-6 flex mt-2 sm:mt-6 items-center justify-center rounded-full border-2 cursor-pointer transition-colors flex-shrink-0
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

                {/* Icon */}
                <div className="flex-shrink-0 ml-0 sm:ml-4">{icon}</div>

                {/* Waste Info */}
                <div className="flex-1 mr-0 sm:mr-18">
                  <h3 className="font-medium text-base sm:text-lg">{type}</h3>
                  <span className="text-xs sm:text-sm text-gray-600 mt-1 block">
                    {items.join(", ")}
                  </span>
                </div>
              </div>
            );
          })}
          {errors.wasteTypes && (
            <p className="mt-2 text-sm text-red-500 ml-4 sm:ml-8 lg:ml-12">
              {errors.wasteTypes}
            </p>
          )}
        </fieldset>

        <div className="mt-8 mx-4 sm:mx-8 lg:mx-12">
          <label className="block mb-3 text-2xl font-semibold">
            Expected Volume
          </label>
          <select
            value={selectedMeasurement}
            onChange={(e) => {
              setSelectedMeasurement(e.target.value);
              setErrors((prev) => ({ ...prev, volume: undefined }));
            }}
            className={`border rounded-sm p-2 sm:p-3 w-full sm:w-3/4 lg:w-2/4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base ${
              errors.volume ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select size</option>
            <option value="small">Small (1-2 Bags)</option>
            <option value="medium">Medium (3-5 Bags)</option>
            <option value="large">Large(6-8 Bags)</option>
          </select>
          {errors.volume && (
            <p className="mt-1 text-red-500 text-sm">{errors.volume}</p>
          )}

          {selectedMeasurement && (
            <p className="mt-4 text-base sm:text-lg font-medium text-gray-800">
              Selected Volume: {selectedMeasurement}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-row justify-between gap-4 mx-4 sm:mx-8 lg:mx-12">
          <div
            onClick={() => navigate("/dates")}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>

          <div
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                navigate("/special");
              }
            }}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WasteTypes;
