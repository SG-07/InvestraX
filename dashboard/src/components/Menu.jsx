import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const baseMenuClass = "text-sm font-normal text-gray-700 hover:text-orange-500";
  const activeMenuClass = "text-sm font-normal text-orange-500";

  return (
    <div className="flex-[0_0_68%] h-full px-5 py-2 box-border flex items-center justify-between">
      <img src="InvestraX_logo.svg" alt="logo" className="w-[50px] h-auto" />
      <div className="flex items-center justify-evenly">
        <ul className="list-none flex items-center">
          <li className="mr-8">
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : baseMenuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li className="mr-8">
            <Link to="/stocks" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : baseMenuClass}>
                Stocks
              </p>
            </Link>
          </li>
          <li className="mr-8">
            <Link to="/orders" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : baseMenuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li className="mr-8">
            <Link to="/holdings" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : baseMenuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li className="mr-8">
            <Link to="/positions" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : baseMenuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li className="mr-8">
            <Link to="/funds" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : baseMenuClass}>
                Funds
              </p>
            </Link>
          </li>
        </ul>

        <hr className="border-l border-gray-200 h-[30px] mx-4" />

        <div
          className="flex items-center justify-evenly ml-5 cursor-pointer group"
          onClick={handleProfileClick}
        >
          <div className="w-[30px] h-[30px] text-center relative text-[0.7rem] font-normal text-purple-400 flex justify-center items-center rounded-full bg-pink-100 mr-2">
            ZU
          </div>
          <p className="text-sm font-light text-gray-700 group-hover:text-orange-500">
            USERID
          </p>
        </div>

      </div>
    </div>
  );
};

export default Menu;
