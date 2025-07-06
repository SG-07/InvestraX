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
                <a href="/#">Open Demat Account</a>
              </li>
              <li>
                <a href="/#">Minor Demat Account</a>
              </li>
              <li>
                <a href="/#">NRI Demat Account</a>
              </li>
              <li>
                <a href="/#">Fund Transfer</a>
              </li>
              <li>
                <a href="/#">
                  Referral Program <span className="text-teal-600 text-xs">New</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Company
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="/#">About</a>
              </li>
              <li>
                <a href="/#">Philosophy</a>
              </li>
              <li>
                <a href="/#">
                  Careers <span className="text-teal-600 text-xs">New</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Support
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="/#">Help Center</a>
              </li>
              <li>
                <a href="/#">Privacy Policy</a>
              </li>
              <li>
                <a href="/#">Conditions</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-700 font-large font-bold mb-3">
              Contact Us
            </p>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="/#">XXX XXXX, Floor 4, San Francisco, CA</a>
              </li>
              <li>
                <a href="/#">contact@company.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
