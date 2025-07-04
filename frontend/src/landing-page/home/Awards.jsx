

function Awards() {
    return (
        <div className="max-w-7xl mx-auto px-10 mt-16 mb-20">
            <div className="flex flex-wrap -mx-4 items-center">
                
                {/* Left: Award Image */}
                <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                    <img src="/media/images/largestBroker.svg" alt="Largest Broker Award" className="w-full max-w-md mx-auto" />
                </div>

                {/* Right: Text and Features */}
                <div className="w-full md:w-1/2 px-4">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                        InvestraX — Investing Made Ambitious 🚀
                    </h1>

                    <p className="text-lg font-medium text-gray-700 mb-6">
                        Thousands of forward-thinkers explore the future of investing with InvestraX — your next-gen platform for:
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm columns-2">
                        <ul className="space-y-3 text-gray-700 leading-relaxed">
                            {[
                                "Futures & Options",
                                "Stocks & IPO Access",
                                "Direct Mutual Funds",
                                "Currency Markets",
                                "Bonds & Gold",
                                "Community Insights & Learning"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 hover:text-blue-600 transition-colors duration-200">
                                    <span className="text-green-600 text-xl">✔</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Awards;
