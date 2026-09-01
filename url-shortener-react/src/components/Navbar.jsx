import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../ContextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { token, setToken } = useStoreContext();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-slate-900 z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">

        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-3xl text-white italic">
            Linklytics
          </h1>
        </Link>

        {/* Navigation */}
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center
          sm:static absolute left-0 top-[62px]
          sm:shadow-none shadow-md
          ${
            navbarOpen
              ? "h-fit sm:pb-0 pb-5"
              : "h-0 overflow-hidden"
          }
          transition-all duration-200
          sm:h-fit
          bg-slate-900
          sm:w-fit w-full
          sm:flex-row flex-col
          px-4 sm:px-0`}
        >
          {/* Home */}
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${
                path === "/"
                  ? "text-white font-semibold"
                  : "text-gray-400"
              } hover:text-white transition-colors duration-150`}
              to="/"
              onClick={() => setNavbarOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* About */}
          <li className="font-medium transition-all duration-150">
            <Link
              className={`${
                path === "/about"
                  ? "text-white font-semibold"
                  : "text-gray-400"
              } hover:text-white transition-colors duration-150`}
              to="/about"
              onClick={() => setNavbarOpen(false)}
            >
              About
            </Link>
          </li>

          {token && (
            <li className="font-medium transition-all duration-150">
              <Link
                className={`${path === "/dashboard" ? "text-white font-semibold" : "text-gray-400"} hover:text-white transition-colors duration-150`}
                to="/dashboard"
                onClick={() => setNavbarOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* Signup */}
          {!token && (
            <Link
              to="/register"
              onClick={() => setNavbarOpen(false)}
            >
              <li className="bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:bg-rose-800 transition-all duration-150">
                SignUp
              </li>
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={onLogOutHandler}
              className="bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:bg-rose-800 transition-all duration-150"
            >
              LogOut
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
