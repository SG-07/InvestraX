import React from "react";

function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16 mb-20">
      <div className="flex flex-wrap -mx-4 items-center">
        {/* Left: Pricing Text */}
        <div className="w-full md:w-1/2 px-4 mb-10 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Unbeatable pricing
          </h1>

          <p className="text-md font-medium text-gray-500 mb-6">
            We pioneered the concept of discount broking and price <br />
            transparency in India. Flat fees and no hidden charges.
          </p>
        </div>

        {/* Right: Pricing Icons with Text Below */}
        <div className="w-full md:w-1/2 px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-10">
            {/* ₹0 - Free account opening */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/media/images/pricing-eq.svg"
                alt="₹0"
                className="w-20 h-20 mb-2"
              />
              <p className="text-xs text-gray-600 leading-tight">
                Free account <br /> opening
              </p>
            </div>

            {/* ₹0 - Free equity delivery */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/media/images/pricing-eq.svg"
                alt="₹0"
                className="w-20 h-20 mb-2"
              />
              <p className="text-xs text-gray-600 leading-tight">
                Free equity delivery <br /> and direct mutual funds
              </p>
            </div>

            {/* ₹20 - Intraday and F&O */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/media/images/other-trades.svg"
                alt="₹20"
                className="w-20 h-20 mb-2"
              />
              <p className="text-xs text-gray-600 leading-tight">
                Intraday <br /> and F&O
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
