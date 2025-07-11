import { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

export default function WatchList() {
  const chartData = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((s) => s.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
          "rgba(153,102,255,1)",
          "rgba(255,159,64,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex-[0_0_32%] h-full shadow bg-white flex flex-col">
      {/* Sticky Search Header */}
      <div className="border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search eg: infy, gold mcx..."
            className="w-full px-4 py-2 text-sm border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {watchlist.length} / 50
          </span>
        </div>
      </div>

      {/* Scrollable Watchlist */}
      <ul className="flex-1 overflow-y-auto">
        {watchlist.map((stock) => (
          <WatchListItem key={stock.name} stock={stock} />
        ))}
      </ul>

      {/* Doughnut Chart Footer */}
      <div className="p-4 border-t border-gray-200">
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
}

function WatchListItem({ stock }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="relative hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex justify-between items-center px-4 py-2 text-sm font-light">
        <span className={stock.isDown ? "text-red-500" : "text-green-500"}>
          {stock.name}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="w-4 h-4 text-red-500" />
          ) : (
            <KeyboardArrowUp className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm text-gray-800">{stock.price}</span>
        </div>
      </div>
      {showActions && <WatchListActions uid={stock.name} />}
    </li>
  );
}

function WatchListActions({ uid }) {
  const { openBuyWindow } = useContext(GeneralContext);

  return (
    <div className="absolute inset-0 flex justify-end items-center bg-white bg-opacity-75 pr-4 space-x-2">
      <Tooltip title="Buy (B)" placement="top" arrow slots={{ transition: Grow }}>
        <button
          onClick={() => openBuyWindow(uid)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded"
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell (S)" placement="top" arrow slots={{ transition: Grow }}>
        <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded">
          Sell
        </button>
      </Tooltip>

      <Tooltip title="Analytics (A)" placement="top" arrow slots={{ transition: Grow }}>
        <button className="px-2 py-1 border border-gray-300 rounded">
          <BarChartOutlined className="w-4 h-4 text-gray-600" />
        </button>
      </Tooltip>

      <Tooltip title="More" placement="top" arrow slots={{ transition: Grow }}>
        <button className="px-2 py-1 border border-gray-300 rounded">
          <MoreHoriz className="w-4 h-4 text-gray-600" />
        </button>
      </Tooltip>
    </div>
  );
}
