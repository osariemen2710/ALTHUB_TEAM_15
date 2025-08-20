import ConnectingLines from "../components/ConnectingLines.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const ServiceProvider = () => {
  const navigate = useNavigate();

  const companies = {
    "green-earth": {
      name: "Green Earth Recycling",
      price: "₦2,600",
      rating: 4.8,
      reviews: 127,
      distance: "2.3km away incl. disposal",
      experience: "5 years experience",
      eta: "15 minutes",
      vehicle: "Small Truck",
      specializes: "General, E-Waste, Recycling, Organic",
    },
    "eco-cycle": {
      name: "EcoCycle Waste Management",
      price: "₦3,100",
      rating: 4.9,
      reviews: 142,
      distance: "1.8km away incl. disposal",
      experience: "6 years experience",
      eta: "12 minutes",
      vehicle: "Medium Van",
      specializes: "General, Recycling",
    },
    "clean-city": {
      name: "Clean City Disposal",
      price: "₦2,900",
      rating: 4.7,
      reviews: 110,
      distance: "3.0km away incl. disposal",
      experience: "4 years experience",
      eta: "20 minutes",
      vehicle: "Large Truck",
      specializes: "General, Organic",
    },
    "waste-away": {
      name: "Waste Away Services",
      price: "₦2,450",
      rating: 4.6,
      reviews: 98,
      distance: "2.5km away incl. disposal",
      experience: "3 years experience",
      eta: "18 minutes",
      vehicle: "Small Truck",
      specializes: "General, E-Waste",
    },
    "planet-protect": {
      name: "Planet Protectors Inc.",
      price: "₦3,500",
      rating: 4.9,
      reviews: 150,
      distance: "1.5km away incl. disposal",
      experience: "7 years experience",
      eta: "10 minutes",
      vehicle: "Electric Van",
      specializes: "General, Recycling, Organic",
    },
  };

  const [selectedCompany, setSelectedCompany] = useState("");

  const toggleSelect = (type) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(type)
          ? prev.filter((t) => t !== type) // remove if already selected
          : [...prev, type] // add if not selected
    );
  };
  return (
    <div className="bg-white min-h-screen font-robotoFlex flex flex-col lg:flex-row">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <ConnectingLines currentStep={4} />

        <p className="mt-8 sm:mt-8 text-center sm:text-left px-4 sm:mx-12 lg:mx-32 text-sm sm:text-base">
          Step 4 of 5: Choose Schedule Type
        </p>

        <div className="flex flex-col sm:flex-row justify-between px-4 sm:ml-12 gap-4">
          <div className="mt-6 flex-1">
            <h1 className="font-semibold text-lg sm:text-2xl mb-4">
              Choose Your Service Provider
            </h1>
            <p className="text-sm sm:text-base">
              Select a collector for your recurring waste pickup schedule
            </p>
          </div>
          <button
            onClick={() => navigate("/select")}
            className="w-full sm:w-64 h-12 sm:h-18 bg-[#228B22] text-white rounded-lg hover:bg-green-600 mt-4 sm:mt-6 text-sm sm:text-base"
          >
            Select this Collector
          </button>
        </div>

        <div className="p-4 sm:p-6 px-4 sm:ml-6">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="border border-gray-300 rounded-sm p-2 sm:p-3 w-full sm:w-84 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          >
            <option value="">Select waste company</option>
            {Object.entries(companies).map(([key, company]) => (
              <option key={key} value={key}>
                {company.name}
              </option>
            ))}
          </select>

          {selectedCompany && (
            <div className="mt-6">
              <h1 className="text-xl sm:text-2xl font-semibold">
                {companies[selectedCompany].name}
                <span className="font-normal ml-2 sm:ml-3 block sm:inline text-lg sm:text-xl">
                  {companies[selectedCompany].price}
                </span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-18 mt-5">
                <p className="flex items-center gap-2 sm:gap-5 text-gray-700 text-sm sm:text-base">
                  <Star className="w-4 h-4 text-yellow-400 fill-[#EBC435]" />
                  {companies[selectedCompany].rating}
                  <span className="text-md font-semibold sm:text-sm text-gray-500">
                    ({companies[selectedCompany].reviews} reviews)
                  </span>
                </p>
                <p className="list-item text-sm sm:text-base">
                  {companies[selectedCompany].distance}
                </p>
                <p className="list-item text-sm sm:text-base">
                  {companies[selectedCompany].experience}
                </p>
              </div>

              <div className="mt-4 sm:m-5 space-y-3 sm:space-y-4 font-medium text-base sm:text-lg">
                <p>ETA: {companies[selectedCompany].eta}</p>
                <p>Vehicle: {companies[selectedCompany].vehicle}</p>
                <p>Specializes: {companies[selectedCompany].specializes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 px-4 sm:ml-12 gap-4">
          <button
            onClick={() =>
              navigate("/preview", { state: { companySlug: selectedCompany } })
            }
            className="px-4 sm:px-6 py-2 rounded-lg  bg-white border border-[#228B22] text-gray-800 hover:bg-green-700 hover:text-white text-sm sm:text-base"
          >
            View Profile
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 sm:px-12 py-3 sm:py-4 bg-white border border-[#228B22] text-gray-800 rounded-lg hover:bg-[#228B22] hover:text-white text-sm sm:text-base"
          >
            Customer Reviews
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 sm:px-12 py-3 sm:py-4 bg-white border border-[#228B22] text-gray-800 rounded-lg hover:bg-[#228B22] hover:text-white text-sm sm:text-base"
          >
            Message
          </button>
        </div>
        <div className="mt-8 flex flex-row justify-between gap-4 mx-4 sm:mx-8 lg:mx-12">
          <div
            onClick={() => navigate("/special")}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>

          <div
            onClick={() => navigate("/preview", { state: { companySlug } })}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceProvider;
