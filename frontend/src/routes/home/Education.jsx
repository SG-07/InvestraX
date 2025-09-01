import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Education() {
  return (
    <div className="max-w-7xl mx-auto px-20 mt-16 mb-20">
      <div className="flex flex-wrap -mx-4 items-center">
        {/* Left: Award Image */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <img
            src="/media/images/education.svg"
            alt="Image of Education book on Trading"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Right: Text and Features */}
        <div className="w-full md:w-1/2 px-4 justify-items-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Free and open market education
          </h1>

          <p className="mb-6">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <Link to="/underconstruction"
            className="text-blue-400 font-semibold inline-flex items-center gap-2 hover:underline mb-5"
          >
            Varisty
            <ArrowRightIcon className="w-5 h-5" /> </Link>
          

          <p className=" mb-6">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <Link to="/underconstruction"
            className="text-blue-400 font-semibold inline-flex items-center gap-2 hover:underline mb-5"
          >
            Trading Q&A
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;
