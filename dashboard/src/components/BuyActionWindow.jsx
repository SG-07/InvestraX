const BuyActionWindow = () => {
  return (
    <div className="w-[40%] h-[63%] bg-gray-100 fixed bottom-0 left-[35%] rounded border border-gray-200 z-[100] cursor-move">
      {/* Header */}
      <div className="w-full bg-blue-600 px-4 py-4 rounded-t">
        <h3 className="text-white text-base font-medium mb-1">
          Buy Stock <span className="text-xs">(NSE:XYZ)</span>
        </h3>
        <div className="text-white text-sm font-light space-x-4">
          <label className="mr-2 cursor-pointer">
            <input type="radio" name="market" defaultChecked className="mr-1" />
            Market
          </label>
          <label className="mr-2 cursor-pointer">
            <input type="radio" name="market" className="mr-1" />
            Limit
          </label>
          <label className="cursor-pointer">
            <input type="radio" name="market" className="mr-1" />
            SL
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 border-b border-gray-300 flex">
        <button className="py-3 px-4 text-blue-600 text-sm font-normal hover:underline">Regular</button>
        <button className="py-3 px-4 text-blue-600 text-sm font-normal hover:underline">Cover</button>
      </div>

      {/* Order Form */}
      <div className="bg-white p-6 pb-8">
        <label className="text-sm block mb-2">Quantity</label>

        {/* Input Fields */}
        <div className="flex items-center space-x-2 mb-4">
          {/* Quantity */}
          <fieldset className="border border-gray-300 max-w-[120px] px-2 py-1">
            <legend className="text-sm text-gray-600 px-1">Qty</legend>
            <input
              type="number"
              className="w-full py-1 px-2 text-base focus:outline-none"
            />
          </fieldset>

          {/* Trigger Price (disabled) */}
          <fieldset className="border border-gray-300 max-w-[120px] px-2 py-1">
            <legend className="text-sm text-gray-400 px-1">Trigger Price</legend>
            <input
              type="number"
              className="w-full py-1 px-2 text-base focus:outline-none bg-transparent cursor-not-allowed"
              disabled
            />
          </fieldset>
        </div>

        {/* Validity Options */}
        <div className="flex justify-between items-center w-[70%] mb-4">
          <label className="text-sm cursor-pointer">
            <input type="radio" name="validity" defaultChecked className="mr-1" />
            Day <span className="text-gray-400">(valid for the day)</span>
          </label>
          <label className="text-sm cursor-pointer">
            <input type="radio" name="validity" className="mr-1" />
            IOC <span className="text-gray-400">(immediate or cancel)</span>
          </label>
        </div>

        {/* Extra Actions */}
        <div className="flex justify-between text-sm text-blue-600 mb-4 cursor-pointer">
          <span>Set stoploss</span>
          <span>Set target</span>
          <span>Set alerts</span>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center px-5 pt-4">
          <span className="text-sm">Price: ₹300</span>
          <div className="flex space-x-2">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded hover:bg-gray-500 hover:text-white">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-400">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
