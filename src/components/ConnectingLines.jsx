const ConnectingLines = ({ currentStep, onLineClick }) => {
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

  return (
    <div className="flex flex-row items-center w-full px-1 xs:px-2 sm:px-0 overflow-hidden ml-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;

        return (
          <div
            key={step}
            className="relative flex flex-col items-center mt-2 xs:mt-3 sm:mt-4 px-0.5 xs:px-1 sm:px-8 sm:ml-4 lg:ml-8 flex-shrink-0 min-w-[60px] xs:min-w-[80px] sm:w-auto"
          >
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-6 xs:w-8 sm:w-12 lg:w-14 h-6 xs:h-8 sm:h-12 lg:h-14 rounded-full text-xs xs:text-sm sm:text-xl lg:text-2xl cursor-pointer ${
                isActive
                  ? "bg-green-600 text-white border-[1px] border-black"
                  : "bg-gray-300 text-black border-[1px] border-black"
              }`}
              onClick={() => onLineClick(stepNumber)}
            >
              {stepNumber}
            </div>

            {/* Step Label */}
            <span className="mt-0.5 xs:mt-1 sm:mt-2 text-[10px] xs:text-xs sm:text-sm lg:text-md text-center px-0.5 xs:px-1 max-w-[55px] xs:max-w-[70px] sm:max-w-none leading-tight">
              {step}
            </span>

            {index < steps.length - 1 && (
              <div
                className="absolute top-3 xs:top-4 sm:top-6 sm:full lg:top-5 left-full w-2 xs:w-4 sm:w-10 lg:w-12 -translate-x-1/2 h-0.5 bg-gray-300 cursor-pointer hover:bg-green-400 z-10"
                onClick={() => onLineClick(stepNumber + 0.5)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConnectingLines;

/* <div className="flex flex-col sm:flex-row items-center w-full px-2 sm:px-0">
  {steps.map((step, index) => {
    const stepNumber = index + 1;
    const isActive = stepNumber === currentStep;

    return (
      <div
        key={step}
         className="relative flex flex-col items-center mt-3 sm:mt-4 px-2 sm:px-8 sm:ml-4 lg:ml-8 w-full sm:w-auto"
      >
        
        <div
          className={`flex items-center justify-center w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-full text-lg sm:text-xl lg:text-2xl cursor-pointer ${
            isActive
              ? "bg-green-600 text-white border-[1px] border-black"
              : "bg-gray-300 text-black border-[1px] border-black"
          }`}
          onClick={() => onLineClick(stepNumber)}
        >
          {stepNumber}
        </div>

      
        <span className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-md text-center px-1">{step}</span>

       
        {index < steps.length - 1 && (
          <div
            className="absolute top-5 sm:top-6 lg:top-5 left-1/2 sm:left-8 lg:left-22 w-8 sm:w-10 lg:w-12 -translate-x-1/2 sm:translate-x-1/2 h-0.5 bg-gray-300 cursor-pointer hover:bg-green-400"
            onClick={() => onLineClick(stepNumber + 0.5)} // step between steps
          />
        )}
      </div>
    );
  })}
</div>
*/
