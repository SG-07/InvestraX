import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <section className="pt-24 bg-white px-10 mb-5">
      {/* Hero Image */}
      <div className="max-w-5xl max-h-fit mx-auto">
        <img
          src="/media/images/homeHero.png"
          alt="Hero image"
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Text and Button */}
      <div className="max-w-3xl mx-auto text-center mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Empower Your Financial Journey
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          InvestraX helps you simulate, learn, and grow your investment
          strategies in a safe, educational environment.
        </p>

        <button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mb-5">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;
