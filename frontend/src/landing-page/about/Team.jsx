import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function Team() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">People</h1>
          <hr className="border-t-2 border-gray-300 w-24 mx-auto" />
        </div>

        {/* Content */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Image */}
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src="/media/images/Satyam.jpg"
              alt="Founder - Satyam"
              className="w-60 h-60 object-cover rounded-full shadow-lg filter grayscale"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Meet the Founder</h2>

            <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
              <p>
                Satyam Gangwar founded <span className="font-semibold text-blue-700">InvestraX</span> with a mission
                to make investing simpler, educational, and more accessible for everyone. With a background in robotics
                and a strong passion for technology, he transitioned into full-stack development to build tools that
                empower financial learning and decision-making.
              </p>
              <p>
                He has led national-level teams in competitions like <span className="font-medium">Robocon 2023</span>{" "}
                and has consistently ranked among the top 10 in innovation challenges like{" "}
                <span className="font-medium">MHRD SAMADHAN 2020</span>. His blend of engineering, leadership, and tech
                makes InvestraX a product built with heart and precision.
              </p>
              <p>
                When he’s not coding or designing systems, you’ll find him in the gym, playing video games, or reading
                Indian mythology.
              </p>

              {/* Social Icons */}
              <div className="flex justify-center md:justify-start gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/satyamgangwar/" // ← Replace with actual LinkedIn
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 text-xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/SG-07" // ← Replace with actual GitHub
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black text-xl"
                >
                  <FaGithub />
                </a>
                <a
                  href="mailto:gangwar.satyam01@gmail.com" // ← Replace with your preferred email
                  className="text-red-600 hover:text-red-800 text-xl"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Team;
