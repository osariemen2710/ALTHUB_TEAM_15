import { ArrowLeft, ArrowRight } from "lucide-react";
import ConnectingLines from "../components/ConnectingLines.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      address: address.trim(),
      isWednesdaySpecial: checked,
      completedAt: new Date().toISOString(),
    };

    navigate("/waste", { state: stepData });
  };

  return (
    <div className="bg-white font-roboto min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 p-4 lg:p-8">
        <ConnectingLines currentStep={2} />

        <p className="mt-6 ml-28 text-sm md:text-base">
          Step 2 of 5: Choose Schedule Type
        </p>

        <div className="mt-10 w-full md:w-3/4 lg:w-2/3 ml-14">
          <h5 className="font-semibold text-lg md:text-xl lg:text-2xl mb-3">
            Collection Day(s)
          </h5>

          <div className="flex flex-wrap gap-2 md:gap-14">
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
                className={`px-6 py-4 text-sm md:text-base rounded-lg border transition-colors ${
                  selectedDay === day
                    ? "bg-[#228B22] text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } ${
                  checked ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                disabled={checked}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.day && (
            <p className="mt-2 text-sm text-red-500">{errors.day}</p>
          )}

          <label className="inline-flex items-center text-green-500 space-x-2 mt-4 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
              className="form-checkbox h-4 w-4 text-green-500"
            />
          </label>

          {selectedDay && (
            <p className="mt-4 text-green-500 font-medium">
              {dayMessages[dayNameMap[selectedDay]]}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 ml-14 w-full md:w-3/4 lg:w-2/3 space-y-9"
        >
          {/* Time Window */}
          <div>
            <label className="block mb-3 text-2xl">Preferred Time Window</label>
            <select
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e.target.value);
                setErrors((prev) => ({ ...prev, time: undefined }));
              }}
              className={`border rounded px-4 py-4 w-3/5 md:w-3/5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
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
              <p className="mt-1 text-red-500 text-sm">{errors.time}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-3 text-2xl">Start Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              className={`border rounded px-4 py-4 w-3/5 md:w-3/5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-3 text-2xl">Collection Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors((prev) => ({ ...prev, address: undefined }));
              }}
              placeholder="Enter address here"
              className={`border rounded px-4 py-4 w-3/5 md:w-3/5 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </form>

        <div className="mt-8 flex flex-row justify-between gap-4 mx-4 sm:mx-8 lg:mx-12">
          <button onClick={() => navigate("/")} className="p-2">
            <ArrowLeft className="w-5 h-5 text-[#228B22]" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                navigate("/waste");
              }
            }}
            className="p-2"
          >
            <ArrowRight className="w-5 h-5 text-[#228B22]" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dates;
