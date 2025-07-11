import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <>
      <div className="w-full text-right flex items-center justify-end">
        <p className="text-sm text-gray-400 mr-2">
          Instant, zero-cost fund transfers with UPI
        </p>
        <Link className="text-white bg-green-600 hover:bg-green-400 px-5 py-2 rounded-sm mx-1 text-sm">
          Add funds
        </Link>
        <Link className="text-white bg-blue-600 hover:bg-blue-400 px-5 py-2 rounded-sm mx-1 text-sm">
          Withdraw
        </Link>
      </div>

      <div className="w-full flex items-center justify-between mt-[5%]">
        <div className="basis-[48%] text-left">
          <span className="flex items-center mb-[2%]">
            <p className="text-[1.2rem] font-light">Equity</p>
          </span>

          <div className="border border-gray-300 px-[8%] py-[5%]">
            {[
              ["Available margin", "4,043.10", true],
              ["Used margin", "3,757.30", false],
              ["Available cash", "4,043.10", false],
              "hr",
              ["Opening Balance", "4,043.10"],
              ["Opening Balance", "3736.40"],
              ["Payin", "4064.00"],
              ["SPAN", "0.00"],
              ["Delivery margin", "0.00"],
              ["Exposure", "0.00"],
              ["Options premium", "0.00"],
              "hr",
              ["Collateral (Liquid funds)", "0.00"],
              ["Collateral (Equity)", "0.00"],
              ["Total Collateral", "0.00"],
            ].map((item, index) =>
              item === "hr" ? (
                <hr
                  key={index}
                  className="border-none bg-gray-300 h-[0.5px] mb-[5%]"
                />
              ) : (
                <div
                  key={index}
                  className="flex items-center justify-between mb-[5%]"
                >
                  <p className="text-base text-gray-500">{item[0]}</p>
                  <p
                    className={`text-[1.5rem] ${
                      item[2] ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {item[1]}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="basis-[48%] text-center px-[8%]">
          <p className="mb-[10%] text-gray-400">
            You don't have a commodity account
          </p>
          <Link className="text-white bg-blue-600 hover:bg-blue-400 px-5 py-2 rounded-sm text-sm">
            Open Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Funds;
