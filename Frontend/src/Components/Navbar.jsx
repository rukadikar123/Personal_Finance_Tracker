import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import axios from "axios";
import { setLogout } from "../Redux/authSlice";
import { toast } from "react-toastify";

function Navbar({ setMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // get current user from Redux

  let { user } = useSelector((state) => state?.auth);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // Function to handle "Add Transaction" click
  const handleClick = () => {
    setMode({ mode: "add", data: null });
  };

  // Function to handle logout
  const onLogout = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        { withCredentials: true }
      );
      dispatch(setLogout()); // update Redux state
      toast.success("Logged out successfull!");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="shadow-md sticky w-full top-0 z-50 bg-white border-b border-gray-200">
      <div className=" max-w-7xl mx-auto md:px-0 md:py-4 py-2 px-4 flex justify-between items-center">
        {/* App Name */}
        <h2 className="md:text-3xl text-xl font-bold transition duration-200 cursor-pointer  tracking-tight">
          Finance Tracker
        </h2>
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6 font-semibold text-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-400 font-semibold underline"
                  : "text-black hover:text-yellow-300"
              }  rounded text-md`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/addOrEdit"
            onClick={handleClick}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-400 font-semibold underline"
                  : "text-black hover:text-yellow-300"
              }  rounded text-md`
            }
          >
            Add Transaction
          </NavLink>
          {/* User avatar initials */}
          {user && (
            <p className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center ">
              {user?.name[0]}
            </p>
          )}
          {/* Logout button */}
          {user && (
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </nav>
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#FF385C] hover:text-[#e11d48] transition duration-200"
        >
          {isMenuOpen ? <IoMdClose /> : <IoIosMenu />}
        </button>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col w-full items-start px-4 py-1 font-medium bg-white  shadow-lg transition-all duration-300">
          <div className="flex flex-col space-y-2 w-full items-start">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-yellow-400 font-semibold underline"
                    : "text-black hover:text-yellow-300"
                }  rounded text-md`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/addOrEdit"
              onClick={handleClick}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-yellow-400 font-semibold underline"
                    : "text-black hover:text-yellow-300"
                }   rounded text-md`
              }
            >
              Add Transaction
            </NavLink>
            {/* User avatar initials */}
            {user && (
              <p className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center ">
                {user?.name[0]}
              </p>
            )}
            {/* Mobile logout button */}
            {user && (
              <button onClick={onLogout} className=" rounded-full">
                <IoMdLogOut size={22} />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
