import { useState } from "react";
import Sidebar from "./navigation"; // Assuming this is correctly imported
import { useNavigate } from "react-router-dom";

const reportData = [
  {
    id: '#12345',
    wasteType: 'Hazardous',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/237/50/50', // Placeholder image
    status: 'In review',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Mixed',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/238/50/50',
    status: 'Action Taken',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Organic',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/239/50/50',
    status: 'Cleared',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Organic',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/240/50/50',
    status: 'Action Taken',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Organic',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/241/50/50',
    status: 'In review',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Organic',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/242/50/50',
    status: 'Action Taken',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Hazardous',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/243/50/50',
    status: 'Action Taken',
    reportTime: '11:45AM | 10 May, 225',
  },
  {
    id: '#12345',
    wasteType: 'Hazardous',
    location: '32 Ajala Lane, Lagos',
    media: 'https://picsum.photos/id/244/50/50',
    status: 'Action Taken',
    reportTime: '11:45AM | 10 May, 225',
  },
];

const Report = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl.replace('/50/50', '/400/300')); // Get a larger version for modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'In review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Action Taken':
        return 'bg-red-100 text-red-800';
      case 'Cleared':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/report')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Report History</h1>
          </div>
        </div>

        <p className="text-gray-600 mb-8">
          See all your past reports, pickups, and clean-up activities – and how they’ve contributed to a cleaner community.
        </p>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="min-w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waste Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Media
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((report, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.wasteType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <img
                        src={report.media}
                        alt="Report media"
                        className="h-10 w-10 rounded-md object-cover cursor-pointer"
                        onClick={() => openModal(report.media)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reportTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-b-lg"
          aria-label="Pagination"
        >
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  {/* Heroicon name: solid/chevron-left */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-current="page"
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  {/* Heroicon name: solid/chevron-right */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </nav>

        {/* Image Preview Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal}
          >
            <div className="relative bg-white rounded-lg p-4 max-w-lg mx-auto" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <img src={currentImage} alt="Preview" className="max-w-full h-auto rounded-md" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Report;