import ConnectingLines from "../components/ConnectingLines.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import Sidebar from "../components/navigation.jsx";
import { useSchedule } from "../context/ScheduleContext";

import { toast } from "sonner";

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

const Preview = () => {
  const { scheduleData, updateScheduleData } = useSchedule();
  const navigate = useNavigate();
  const { companySlug } = scheduleData || {};
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (companySlug && companies[companySlug]) {
      setSelectedCompany(companies[companySlug]);
    }
  }, [companySlug]);

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

  if (!selectedCompany) {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-x-hidden">
            <Sidebar />
            <main className="flex-1 pt-20 p-6 md:p-8 lg:p-12 overflow-y-auto flex items-center justify-center">
                <p className="text-gray-600">No company data provided.</p>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 pt-20 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            <ConnectingLines currentStep={4} onLineClick={handleLineClick} />

            <div className="mt-12 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedCompany.name}</h1>
                        <p className="text-3xl font-bold text-green-600 mt-2">{selectedCompany.price}</p>
                        <div className="flex items-center gap-3 mt-3 text-sm">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-bold text-gray-800">{selectedCompany.rating}</span>
                            </div>
                            <span className="text-gray-500">({selectedCompany.reviews} reviews)</span>
                            <span className="text-gray-500">&bull;</span>
                            <span className="text-gray-600">{selectedCompany.distance}</span>
                            <span className="text-gray-500">&bull;</span>
                            <span className="text-gray-600">{selectedCompany.experience} experience</span>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                        const companyData = {
                            companySlug: companySlug,
                            company: selectedCompany,
                        };
                        updateScheduleData(companyData);
                        navigate("/success");
                        }}
                        className="w-full sm:w-auto bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    >
                        Select this Collector
                    </button>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Provider Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-600">Estimated Time of Arrival (ETA)</p>
                            <p className="text-gray-800">{selectedCompany.eta}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-600">Vehicle Type</p>
                            <p className="text-gray-800">{selectedCompany.vehicle}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg col-span-1 sm:col-span-2">
                            <p className="font-semibold text-gray-600">Specializes In</p>
                            <p className="text-gray-800">{selectedCompany.specializes}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => toast.info("Full profile view is not available yet.")}
                        className="w-full sm:w-auto flex-1 bg-white border border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        View Full Profile
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
                        Message Provider
                    </button>
                </div>
            </div>

            <div className="mt-12 flex justify-between">
                <button
                    onClick={() => navigate("/service")}
                    className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Providers</span>
                </button>
                <button
                    onClick={() => {
                        const companyData = {
                            companySlug: companySlug,
                            company: selectedCompany,
                        };
                        updateScheduleData(companyData);
                        navigate("/success");
                        }}
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

export default Preview;