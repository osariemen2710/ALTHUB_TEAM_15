import { ArrowLeft, ArrowRight } from "lucide-react";
import ConnectingLines from "../components/ConnectingLines.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/navigation.jsx";

const Dates = () => {
  const navigate = useNavigate();

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNameMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };
  const dayMessages = {
    Monday: "Monday starts the work week fresh!",
    Tuesday: "Tuesday is productive and steady.",
    Wednesday: "Wednesdays have the best availability and pricing!",
    Thursday: "Thursday is almost the weekend.",
    Friday: "Friday means fun is near!",
    Saturday: "Saturday is perfect for adventures.",
    Sunday: "Sunday is a great day to relax.",
  };
  const times = [
    "Morning (8 AM - 12 PM)",
    "Afternoon (12 PM - 4 PM)",
    "Evening (4 PM - 8 PM)",
    "Night (8 PM - 12 AM)",
  ];

  const [selectedDay, setSelectedDay] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    const hasValidDay = checked || selectedDay;
    if (!hasValidDay) {
      newErrors.day = "Please select a collection day";
    }

    if (!selectedTime) {
      newErrors.time = "Please select a preferred time window";
    }

    if (!selectedDate) {
      newErrors.date = "Please select a start date";
    }

    if (!address.trim()) {
      newErrors.address = "Please enter a collection address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle checkbox toggle - FIXED VERSION
  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (newChecked) {
      setSelectedDay("Wed");
    } else {
      setSelectedDay("");
    }

    // Clear any existing day errors
    setErrors((prev) => ({ ...prev, day: undefined }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const frequency = checked
      ? "Every Wednesday"
      : `Every ${dayNameMap[selectedDay]}`;
    const stepData = {
      selectedDay: checked ? "Wed" : selectedDay,
      frequency,
      timeWindow: selectedTime,
      startDate: selectedDate,
      location: address.trim(),
      isWednesdaySpecial: checked,
      completedAt: new Date().toISOString(),
    };

    navigate("/waste", { state: { scheduleData: stepData } });
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
          <ConnectingLines currentStep={2} onLineClick={handleLineClick} />

          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-2">
              Step 2 of 5
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              Choose Schedule Type
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Collection Day(s)</h3>
                <div className="flex flex-wrap gap-3">
                  {allDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        if (!checked) {
                          setSelectedDay(day);
                          setErrors((prev) => ({ ...prev, day: undefined }));
                        }
                      }}
                      className={`px-4 py-3 text-sm rounded-lg border transition-all duration-200 ${
                        selectedDay === day
                          ? "bg-green-600 text-white border-green-600 shadow-sm"
                          : "bg-white text-gray-800 border-gray-300 hover:border-green-500"
                      } ${
                        checked ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                      }`}
                      disabled={checked}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {errors.day && (
                  <p className="mt-2 text-sm text-red-600">{errors.day}</p>
                )}
                <label className="flex items-center text-green-600 space-x-2 mt-4 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  />
                  <span>Special offer: Every Wednesday!</span>
                </label>
                {selectedDay && (
                  <p className="mt-4 text-green-700 bg-green-50 p-3 rounded-lg">
                    {dayMessages[dayNameMap[selectedDay]]}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-base font-medium text-gray-700">Preferred Time Window</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                      setErrors((prev) => ({ ...prev, time: undefined }));
                    }}
                    className={`border rounded-lg px-4 py-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">-- Choose a time --</option>
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-red-600 text-sm">{errors.time}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setErrors((prev) => ({ ...prev, date: undefined }));
                    }}
                    className={`border rounded-lg px-4 py-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-red-600 text-sm">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-gray-700">Collection Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((prev) => ({ ...prev, address: undefined }));
                    }}
                    placeholder="Enter your full address"
                    className={`border rounded-lg px-4 py-3 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-red-600 text-sm">{errors.address}</p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <button
              onClick={() => navigate("/schedule")}
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleSubmit}
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

export default Dates;