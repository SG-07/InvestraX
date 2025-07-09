import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-10 mt-16 mb-16">
      <div className="flex flex-wrap -mx-4 items-center">
        {/* Heading and Description */}
        <div className="w-full text-center px-4 text-3xl">
          {/* Animated Heading with Underline */}
          <div className="relative inline-block mt-10">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              InvestraX Products
            </motion.h2>

            {/* Animated underline below heading */}
            <span className="absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse rounded-full"></span>
          </div>

          {/* Subheading Text */}
          <p className="text-gray-600 text-xl mt-6">
            Sleek, modern, and intuitive trading platforms
          </p>
        </div>
        <hr className="border-t-2 border-gray-300 my-6 w-full mt-25 mb-5" />

      </div>
    </div>
  );
}

export default Hero;
