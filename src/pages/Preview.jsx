import ConnectingLines from "../components/ConnectingLines.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, ArrowLeft } from "lucide-react";

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
const Preview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { companySlug } = state || {};
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (companySlug && companies[companySlug]) {
      setSelectedCompany(companies[companySlug]);
    }
  }, [companySlug]);

  if (!selectedCompany) {
    return <p>No company data provided.</p>;
  }

  return (
    <div className="bg-white font-roboto min-h-screen flex flex-col lg:flex-row">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <ConnectingLines currentStep={4} />

        <p className="mt-8 sm:mt-12 text-center sm:text-left sm:mx-12 lg:mx-32 text-sm sm:text-base">
          Step 4 of 5: Choose Schedule Type
        </p>

        <div className="p-6">
          <button
            onClick={() =>
              navigate("/select", {
                state: {
                  scheduleData: {
                    wasteType: "General Waste",
                    location: "123 Main Street Lagos",
                    frequency: "Every Wednesday",
                    timeWindow: "9AM-12PM",
                  },
                },
              })
            }
            className="w-64 h-18 bg-[#228B22] text-white rounded-lg hover:bg-green-600 mt-6 float-right"
          >
            Select this Collector
          </button>

          <h1 className="text-2xl font-semibold">
            {selectedCompany.name}
            <span className="font-normal ml-3">{selectedCompany.price}</span>
          </h1>

          <div className="flex flex-row gap-8 mt-5">
            <p className="flex items-center gap-2 text-gray-700">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {selectedCompany.rating}
              <span className="text-sm text-gray-500">
                ({selectedCompany.reviews} reviews)
              </span>
            </p>
            <p>{selectedCompany.distance}</p>
            <p>{selectedCompany.experience}</p>
          </div>

          <div className="mt-5 space-y-2 font-medium text-lg">
            <p>ETA: {selectedCompany.eta}</p>
            <p>Vehicle: {selectedCompany.vehicle}</p>
            <p>Specializes: {selectedCompany.specializes}</p>
          </div>

          <div className="flex flex-row justify-between mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-12 py-4 bg-white border border-[#228B22] rounded-lg hover:bg-[#228B22] hover:text-white"
            >
              View Profile
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-12 py-4 bg-white border border-[#228B22] rounded-lg hover:bg-[#228B22] hover:text-white"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-12 py-4 bg-white border border-[#228B22] rounded-lg hover:bg-[#228B22] hover:text-white"
            >
              Message
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-row justify-between gap-4 mx-4 sm:mx-8 lg:mx-12">
          <div
            onClick={() => navigate("/special")}
            className="p-2 sm:p-3 cursor-pointer inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#228B22]" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
