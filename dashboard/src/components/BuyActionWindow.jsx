import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleBuyClick = () => {
    axios.post("http://localhost:8080/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div
      className="absolute bottom-0 left-[35%] w-[40%] h-[63%] bg-gray-100 border border-gray-200 rounded-md z-50 cursor-move"
      id="buy-window"
      draggable="true"
    >
      {/* Inputs Section */}
      <div className="p-6 pb-10 bg-white">
        <div className="flex justify-between mt-4 mb-4">
          {/* Quantity Field */}
          <fieldset className="border border-gray-300 max-w-[120px] mr-2">
            <legend className="ml-2 text-sm px-1">Qty.</legend>
            <input
              type="number"
              id="qty"
              name="qty"
              className="w-full px-3 py-2 text-lg outline-none"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          {/* Price Field */}
          <fieldset className="border border-gray-300 max-w-[120px]">
            <legend className="ml-2 text-sm px-1 text-gray-400">Price</legend>
            <input
              type="number"
              id="price"
              name="price"
              step="0.05"
              className="w-full px-3 py-2 text-lg outline-none"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between items-center px-5 relative top-[10%]">
        <span className="text-sm">Margin required ₹140.65</span>
        <div className="flex space-x-2">
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
            onClick={handleBuyClick}
          >
            Buy
          </Link>
          <Link
            to=""
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-500 hover:text-white"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
