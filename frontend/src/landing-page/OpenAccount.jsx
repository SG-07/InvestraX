import React from 'react';

function OpenAccount() {
    return ( 
        <div className="max-w-3xl mx-auto text-center mt-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Open a InvestraX account
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mb-5">
          Get Started for Free
        </button>
      </div>
     );
}

export default OpenAccount;