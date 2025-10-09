import ConnectingLines from "../components/ConnectingLines.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Toaster, toast } from "sonner";
import Sidebar from "../components/navigation.jsx";
import { useSchedule } from "../context/ScheduleContext";

const ServiceProvider = () => {
  const navigate = useNavigate();
  const { scheduleData, updateScheduleData } = useSchedule();

  const companies = {
    "green-earth": {
      name: "Green Earth Recycling",
      price: "₦2,600",
      rating: 4.8,
      reviews: 127,
      distance: "2.3km away",
      experience: "5 years",
      eta: "15 minutes",
      vehicle: "Small Truck",
      specializes: "General, E-Waste, Recycling, Organic",
    },
    "eco-cycle": {
      name: "EcoCycle Waste Management",
      price: "₦3,100",
      rating: 4.9,
      reviews: 142,
      distance: "1.8km away",
      experience: "6 years",
      eta: "12 minutes",
      vehicle: "Medium Van",
      specializes: "General, Recycling",
    },
    "clean-city": {
      name: "Clean City Disposal",
      price: "₦2,900",
      rating: 4.7,
      reviews: 110,
      distance: "3.0km away",
      experience: "4 years",
      eta: "20 minutes",
      vehicle: "Large Truck",
      specializes: "General, Organic",
    },
    "waste-away": {
      name: "Waste Away Services",
      price: "₦2,450",
      rating: 4.6,
      reviews: 98,
      distance: "2.5km away",
      experience: "3 years",
      eta: "18 minutes",
      vehicle: "Small Truck",
      specializes: "General, E-Waste",
    },
    "planet-protect": {
      name: "Planet Protectors Inc.",
      price: "₦3,500",
      rating: 4.9,
      reviews: 150,
      distance: "1.5km away",
      experience: "7 years",
      eta: "10 minutes",
      vehicle: "Electric Van",
      specializes: "General, Recycling, Organic",
    },
  };

  const [selectedCompany, setSelectedCompany] = useState(scheduleData.companySlug || "");

  const handleSelectCollector = () => {
    if (selectedCompany) {
      const companyData = {
        companySlug: selectedCompany,
        company: companies[selectedCompany],
      };
      updateScheduleData(companyData);
      navigate("/success");
    } else {
      // TODO: Show an error to the user
    }
  };

  const handleViewProfile = () => {
    if (selectedCompany) {
      const companyData = {
        companySlug: selectedCompany,
        company: companies[selectedCompany],
      };
      updateScheduleData(companyData);
      navigate("/preview");
    }
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
        <Toaster />
        <div className="max-w-4xl mx-auto">
          <ConnectingLines currentStep={4} onLineClick={handleLineClick} />

          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-2">Step 4 of 5</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              Choose Service Provider
            </h2>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Select a collector
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose a provider for your recurring waste pickup.
                  </p>
                </div>
                <button
                  onClick={handleSelectCollector}
                  disabled={!selectedCompany}
                  className="w-full sm:w-auto bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Select this Collector
                </button>
              </div>

              <div className="mt-6">
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                >
                  <option value="">-- Select a waste company --</option>
                  {Object.entries(companies).map(([key, company]) => (
                    <option key={key} value={key}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCompany && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {companies[selectedCompany].name}
                      </h4>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {companies[selectedCompany].price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold text-gray-800">{companies[selectedCompany].rating}</span>
                      <span className="text-sm text-gray-500">({companies[selectedCompany].reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-600">Distance</p>
                      <p className="text-gray-800">{companies[selectedCompany].distance}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-600">Experience</p>
                      <p className="text-gray-800">{companies[selectedCompany].experience}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-600">ETA</p>
                      <p className="text-gray-800">{companies[selectedCompany].eta}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-600">Vehicle</p>
                      <p className="text-gray-800">{companies[selectedCompany].vehicle}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg col-span-2 sm:col-span-1">
                      <p className="font-semibold text-gray-600">Specializes In</p>
                      <p className="text-gray-800">{companies[selectedCompany].specializes}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleViewProfile}
                      className="w-full sm:w-auto flex-1 bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => toast.info("No customer reviews yet.")}
                      className="w-full sm:w-auto flex-1 bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Customer Reviews
                    </button>
                    <button
                      onClick={() => toast.info("Messaging is not available yet.")}
                      className="w-full sm:w-auto flex-1 bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <button
              onClick={() => navigate("/special")}
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleSelectCollector}
              disabled={!selectedCompany}
              className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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

export default ServiceProvider;