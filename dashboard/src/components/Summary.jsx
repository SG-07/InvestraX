const Summary = () => {
  return (
    <>
      <div className="mb-5">
        <h6 className="text-[1.5rem] font-medium text-gray-700 mb-5">Hi, User!</h6>
        <hr className="border-none bg-gray-300 h-[1px] mb-[5%]" />
      </div>

      {/* Equity Section */}
      <div className="pb-[2%]">
        <span className="flex items-center mb-[2%]">
          <p className="text-[1.2rem] font-light">Equity</p>
        </span>

        <div className="w-1/2 flex items-center justify-evenly">
          <div className="mr-5">
            <h3 className="text-[2.5rem] font-light text-gray-700">3.74k</h3>
            <p className="text-sm text-gray-500">Margin available</p>
          </div>

          <hr className="border-l-[0.6px] border-gray-200 h-[70px]" />

          <div className="ml-5">
            <p className="text-sm text-gray-500 mb-2 whitespace-nowrap">
              Margins used <span className="text-[0.9rem] text-gray-600 ml-[5%]">0</span>
            </p>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              Opening balance <span className="text-[0.9rem] text-gray-600 ml-[5%]">3.74k</span>
            </p>
          </div>
        </div>

        <hr className="border-none bg-gray-300 h-[1px] mt-5 mb-[5%]" />
      </div>

      {/* Holdings Section */}
      <div className="pb-[2%]">
        <span className="flex items-center mb-[2%]">
          <p className="text-[1.2rem] font-light">Holdings (13)</p>
        </span>

        <div className="w-1/2 flex items-center justify-evenly">
          <div className="mr-5">
            <h3 className="text-[2.5rem] font-light text-green-600">
              1.55k <small className="text-sm text-green-600">+5.20%</small>
            </h3>
            <p className="text-sm text-gray-500">P&amp;L</p>
          </div>

          <hr className="border-l-[0.6px] border-gray-200 h-[70px]" />

          <div className="ml-5">
            <p className="text-sm text-gray-500 mb-2 whitespace-nowrap">
              Current Value <span className="text-[0.9rem] text-gray-600 ml-[5%]">31.43k</span>
            </p>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              Investment <span className="text-[0.9rem] text-gray-600 ml-[5%]">29.88k</span>
            </p>
          </div>
        </div>

        <hr className="border-none bg-gray-300 h-[1px] mt-5 mb-[5%]" />
      </div>
    </>
  );
};

export default Summary;
