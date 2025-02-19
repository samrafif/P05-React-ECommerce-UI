import React, { useContext, useState } from "react";
import { FaUserCircle, FaShoppingCart, FaHeart } from "react-icons/fa";
import UwU from "../assets/Frame13.png";

import { GlobalContext } from "../globalContext";
import { getAssetUrl } from "../APIController";

const DropdownMenu = ({ setUser }) => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={() => setUser(null)}>
          <a href="#">Logout</a>
        </li>
        <li>
          <a href="/user">Settings</a>
        </li>
      </ul>
    </div>
  );
};

const HeaderBrand = ({ user, setUser }) => {
  const { setQuery } = useContext(GlobalContext);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-24 w-auto" src={UwU} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <input
            placeholder="Search..."
            className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
            onChange={(p) => setQuery(p.target.value.toLowerCase())}
          />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center">
          <a href="/cart" className="text-base/6 font-semibold text-gray-900">
            <span className="flex items-center gap-1">
              <FaShoppingCart size={24} />
            </span>
          </a>
          <a href="#" className="text-base/6 font-semibold text-gray-900">
            <span className="flex items-center gap-1">
              <FaHeart size={24} />
            </span>
          </a>

          <div
            className="menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a href="/user" className="text-base/6 font-semibold text-gray-900">
              <span className="flex items-center gap-1">
                {user.profile_photo ? (
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={getAssetUrl(user.profile_photo)}
                    style={{ width: "auto", height: "40px" }}
                    alt=""
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </span>
            </a>
            {/* <DropdownMenu /> */}
            {isDropdownVisible && <DropdownMenu setUser={setUser} />}
          </div>
        </div>
      </nav>
      {/* <div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6"></div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default HeaderBrand;
