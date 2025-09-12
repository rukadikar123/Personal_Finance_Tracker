import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow-md sticky w-full top-0 z-50 bg-white border-b border-gray-200">
      <div className=" max-w-7xl mx-auto md:px-0 md:py-4 py-2 px-4 flex justify-between items-center">
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
            to="/add"
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
          <p className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center ">
            SR
          </p>
          {/* {user ? (
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <button>Login</button>
            )} */}
        </nav>
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
          <div className="flex flex-col space-y-1 w-full items-start">
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
              to="/add"
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
            <p className=" h-6 w-6 rounded-full bg-slate-400 flex items-center text-xs justify-center ">
              SR
            </p>
             {/* {user ? (
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            ) : (
              <button>Login</button>
            )} */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
