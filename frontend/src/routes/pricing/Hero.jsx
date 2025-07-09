function Hero() {
  return (
    <>
      {/* Section Heading */}
      <div className="max-w-3xl mx-auto text-center mt-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Charges
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          List of all charges and taxes
        </p>
      </div>

      {/* Cards in one row on desktop */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Card 1 */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <img
              src="/media/images/pricing-eq.svg"
              alt="₹0"
              className="w-64 h-64 mb-4 object-contain"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Free equity delivery
            </h2>
            <p className="text-md font-medium text-gray-500 mt-4 px-4">
              All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <img
              src="/media/images/other-trades.svg"
              alt="₹20"
              className="w-64 h-64 mb-4 object-contain"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Intraday and F&O trades
            </h2>
            <p className="text-md font-medium text-gray-500 mt-4 px-4">
              Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity. ₹20 flat on all option trades.
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <img
              src="/media/images/pricing-eq.svg"
              alt="₹0"
              className="w-64 h-64 mb-4 object-contain"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              Free direct MF
            </h2>
            <p className="text-md font-medium text-gray-500 mt-4 px-4">
              All direct mutual fund investments are absolutely free — ₹0 commissions and DP charges.
            </p>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 my-6 w-full mt-15" />
      </div>
    </>
  );
}

export default Hero;


