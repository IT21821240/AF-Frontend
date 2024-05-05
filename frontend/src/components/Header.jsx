import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaTimes, FaBars } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/logo.jpg";

const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const { isLoggedIn , logout} = useAuth();
    const navigate = useNavigate();

    const Navbar = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "APOD",
        link: "/Apod",
      },
      {
        name: "Mars",
        link: "/Mars",
      },
      {
        name: "Earth",
        link: "/Earth",
      },
      {
        name: "EPIC",
        link: "/Epic",
      },
    ];

    const handleLogout = () => {
      console.log("Logging out...");
      try {
        logout();
        toast.success("Logged Out successfully.");
        navigate('/');
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const closeNavbar = () => {
      setNavbar(false);
    };

    return (
      <>
        <nav className="w-full h-auto bg-gray-800 lg:px-24 md:px-16 sm:px-14 px-12 py-2 shadow-md">
          <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
            {/* Navbar logo & toggle button section */}
            <div>
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                {/* Logo section */}
                <Link to="/" className="flex items-center" onClick={closeNavbar}>
                  <img src={logo} alt="Space Spectra Logo" className="h-8 mr-2" />
                  <span className="text-3xl text-orange-500 font-semibold tracking-[0.1rem]">
                    Space Spectra
                  </span>
                </Link>
                {/* Toggle button section  (we will do it later) */}
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <FaTimes
                        className="text-gray-400 cursor-pointer"
                        size={24}
                      />
                    ) : (
                      <FaBars
                        className="text-gray-400 cursor-pointer"
                        size={24}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
  
            {/* Navbar menu items section */}
            <div
              className={`flex justify-between items-center md:block ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="list-none lg:flex md:flex sm:block block gap-x-5 gap-y-16">
                {Navbar.map((item, index) => (
                  <li key={index} onClick={closeNavbar}>
                    <Link
                      to={item.link}
                      className="text-gray-400 text-[1.15rem] font-medium tracking-wider hover:text-gray-200 ease-out duration-700"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {isLoggedIn ? (
                  <li onClick={closeNavbar}>
                    <button className="text-white bg-orange-500 rounded-lg py-2 px-5" onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <li onClick={closeNavbar}>
                    <Link to="/register" className="text-white bg-orange-500 rounded-lg py-2 px-5">
                      Register/Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
};

export default Header;
