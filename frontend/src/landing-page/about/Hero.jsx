function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-10 mt-16 mb-16">
      <div className="flex flex-wrap -mx-4 items-start">
        
        {/* Tag Line */}
        <div className="w-full px-4">
          <h1 className="text-base md:text-4xl font-semibold text-gray-900 mb-10">
            We reimagined investing for the modern investor.
            <br />
            <br />
            With transparent pricing and intelligent tools, we're leading a new wave of financial empowerment.
          </h1>

          <hr className="border-t-2 border-gray-300 my-6 w-full mt-5 mb-5" />
        </div>

        {/* Left Column */}
        <div className="w-full md:w-1/2 px-4 mt-5">
          <p className="text-md font-medium text-gray-700 mb-6">
            InvestraX was founded with a clear mission — to empower the next generation of investors by making smart investing accessible, secure, and affordable. We started with a bold idea: remove the complexity and cost barriers that keep individuals from building real wealth.
          </p>

          <p className="text-md font-medium text-gray-700 mb-6">
            Backed by clean design, transparent pricing, and technology-first thinking, InvestraX is more than just a platform — it’s a movement toward financial independence.
          </p>

          <p className="text-md font-medium text-gray-700 mb-6">
            Thousands of forward-thinking users choose InvestraX to trade, invest, and grow. From equity and mutual funds to F&O and gold — our intuitive ecosystem supports every ambition.
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 mt-5">
          <p className="text-md font-medium text-gray-700 mb-6">
            Beyond tools, we believe in education and community. Our knowledge hub and investor-first initiatives are designed to help you learn, explore, and make confident decisions — whether you're just starting or scaling up.
          </p>

          <p className="text-md font-medium text-gray-700 mb-6">
            We’re also building for the long term. Through partnerships, innovation, and constant improvement, we aim to grow alongside India's evolving investment culture.
          </p>

          <p className="text-md font-medium text-gray-700 mb-6">
            And this is just the beginning. Discover our journey, explore what drives us, and be part of a smarter, more empowered investing future with InvestraX.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
