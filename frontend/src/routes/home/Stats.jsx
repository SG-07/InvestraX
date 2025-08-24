import { ArrowRightIcon } from "@heroicons/react/24/outline";

function Stats() {
  return (
    <div className="max-w-7xl mx-auto px-10 mt-16 mb-16">
      <div className="flex flex-wrap -mx-4 items-center">
        {/* Right: Award Image */}
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Trust with confidence
          </h1>

          <h2 className="text-2xl font-semibold text-gray-700 mt-6">
            Customer-first always
          </h2>

          <p className="text-md font-medium text-gray-500 mb-6">
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores
            of equity investments and contribute to 15% of daily retail exchange
            volumes in India.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            No spam or gimmicks
          </h2>

          <p className="text-md font-medium text-gray-500 mb-6">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like. Our
            philosophies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            The Zerodha universe
          </h2>

          <p className="text-md font-medium text-gray-500 mb-6">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            Do better with money
          </h2>

          <p className="text-md font-medium text-gray-500 mb-6">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>

        {/* Left: Text and Features */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 justify-items-center">
          <img
            src="/media/images/ecosystem.png"
            alt="Eco System"
            className="w-full max-w-md mx-auto"
          />

          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <a
              className="text-blue-400 font-semibold inline-flex items-center gap-2 hover:underline"
              href=""
            >
              Explore Our Products <ArrowRightIcon className="w-5 h-5" />
            </a>

            <a
              className="text-blue-400 font-semibold inline-flex items-center gap-2 hover:underline"
              href=""
            >
              Try Kite Demo
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
