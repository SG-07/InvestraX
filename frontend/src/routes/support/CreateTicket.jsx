import {
  PlusCircleIcon,
  UserCircleIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  InboxIcon,
  WalletIcon ,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const linkStyle = "text-md font-medium text-blue-400 mt-2 px-4 hover:text-gray-400";

function CreateTicket() {
  return (
    <>
      {/* Section Heading */}
      <div className="max-w-3xl mx-auto text-center mt-10 px-4">
        <h3 className="text-2xl font-semibold text-gray-600 mb-10">
          To create a ticket, select a relevant topic
        </h3>
      </div>

      {/* Cards Container */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Column 1 */}
          <Card title="Account Opening" icon={<PlusCircleIcon className="w-6 h-6 text-gray-700" />}>
            <Link to="/underconstruction" className={linkStyle}>Resident individual</Link>
            <Link to="/underconstruction" className={linkStyle}>Minor</Link>
            <Link to="/underconstruction" className={linkStyle}>Non Resident Indian (NRI)</Link>
            <Link to="/underconstruction" className={linkStyle}>Company, Partnership, HUF and LLP</Link>
          </Card>

          {/* Column 2 */}
          <Card title="Your InvestraX Account" icon={<UserCircleIcon className="w-6 h-6 text-gray-700" />}>
            <Link to="/underconstruction" className={linkStyle}>Your Profile</Link>
            <Link to="/underconstruction" className={linkStyle}>Account modification</Link>
            <Link to="/underconstruction" className={linkStyle}>Client Master Report (CMR) and DP</Link>
            <Link to="/underconstruction" className={linkStyle}>Nomination</Link>
            <Link to="/underconstruction" className={linkStyle}>Transfer and conversion of securities</Link>
          </Card>

          {/* Column 3 */}
          <Card title="Kite" icon={<ChartBarIcon className="w-6 h-6 text-gray-700" />}>
            <Link to="/underconstruction" className={linkStyle}>IPO</Link>
            <Link to="/underconstruction" className={linkStyle}>Trading FAQs</Link>
            <Link to="/underconstruction" className={linkStyle}>Margin Trading Facility (MTF)</Link>
            <Link to="/underconstruction" className={linkStyle}>Charts and orders</Link>
            <Link to="/underconstruction" className={linkStyle}>Alerts and Nudges</Link>
            <Link to="/underconstruction" className={linkStyle}>General</Link>
          </Card>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-8">
          <Card title="Funds" icon={<WalletIcon  className="w-6 h-6 text-gray-700" />}>
            <Link to="/underconstruction" className={linkStyle}>Add money</Link>
            <Link to="/underconstruction" className={linkStyle}>Withdraw money</Link>
            <Link to="/underconstruction" className={linkStyle}>Add bank accounts</Link>
            <Link to="/underconstruction" className={linkStyle}>eMandates</Link>
          </Card>

          <Card title="Console" icon={<InboxIcon className="w-6 h-6 text-gray-700" />}>
            <Link to="/underconstruction" className={linkStyle}>Portfolio</Link>
            <Link to="/underconstruction" className={linkStyle}>Corporate actions</Link>
            <Link to="/underconstruction" className={linkStyle}>Funds statement</Link>
            <Link to="/underconstruction" className={linkStyle}>Reports</Link>
            <Link to="/underconstruction" className={linkStyle}>Profile</Link>
            <Link to="/underconstruction" className={linkStyle}>Segments</Link>
          </Card>

          <Card title="Coin" icon={<CurrencyRupeeIcon className="w-6 h-6 text-gray-700" />}>
            <Link to="/underconstruction" className={linkStyle}>Mutual funds</Link>
            <Link to="/underconstruction" className={linkStyle}>National Pension Scheme (NPS)</Link>
            <Link to="/underconstruction" className={linkStyle}>Your Profile</Link>
            <Link to="/underconstruction" className={linkStyle}>Fixed Deposit (FD)</Link>
            <Link to="/underconstruction" className={linkStyle}>Features on Coin</Link>
            <Link to="/underconstruction" className={linkStyle}>Payments and Orders</Link>
            <Link to="/underconstruction" className={linkStyle}>General</Link>
          </Card>
        </div>
      </div>
    </>
  );
}

// Reusable card component
function Card({ title, icon, children }) {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center text-center mt-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default CreateTicket;
