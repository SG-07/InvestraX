import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap md:flex-nowrap items-start gap-10">
        {/* Logo + Company Name - Takes 1/3 width */}
        <div>
          <div className="w-full md:w-1/3 flex items-center gap-3 mb-6 md:mb-0">
            <img
              src="/media/images/InvestraX_logo.svg"
              alt="InvestraX Logo"
              className="h-14 mb-3"
            />
            <p className="text-2xl font-bold text-blue-900">InvestraX</p>
          </div>
          <p>&copy; 2024 - 2025, InvestraX Broking Ltd. All rights reserved.</p>
        </div>

        {/* Navigation Columns - Take remaining 2/3 */}
        <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-gray-800">
          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Account
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link to="/underconstruction">Open Demat Account</Link>
              </li>
              <li>
                <Link to="/underconstruction">Minor Demat Account</Link>
              </li>
              <li>
                <Link to="/underconstruction">NRI Demat Account</Link>
              </li>
              <li>
                <Link to="/underconstruction">Fund Transfer</Link>
              </li>
              <li>
                <Link to="/underconstruction">Referral Program <span className="text-teal-600 text-xs">New</span></Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Company
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link to="/underconstruction">About</Link>
              </li>
              <li>
                <Link to="/underconstruction">Philosophy</Link>
              </li>
              <li>
                <Link to="/underconstruction">Careers <span className="text-teal-600 text-xs">New</span></Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Support
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link to="/underconstruction">Help Center</Link>
              </li>
              <li>
                <Link to="/underconstruction">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/underconstruction">Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Contact Us
            </p>
            
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link to="/underconstruction">XXX XXXX, Floor 4, San Francisco, CA</Link>
              </li>
              <li>
                <Link to="/underconstruction">contact@company.com</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
