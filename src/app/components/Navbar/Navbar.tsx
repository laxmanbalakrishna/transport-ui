"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HandleLogout } from "@/app/utils/authUtils";
import Notifications from "@/app/components/Notifications/Notifications";
import { FaUser, FaHome, FaSignOutAlt } from "react-icons/fa";
import { logout } from "@/app/reduxToolKit/auth/authSlice";
import { useAppDispatch } from "@/app/reduxToolKit/store";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Function to update login state from localStorage
  const updateLoginState = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("user_type");
    const userName = localStorage.getItem("username");

    setIsLoggedIn(!!token); // Set logged-in state if token exists
    setUserType(userType || "");
    setUserName(userName || "");
  };

  useEffect(() => {
    // Check login status when the component mounts
    updateLoginState();

    // Listen to changes in localStorage (for login and logout actions)
    window.addEventListener("storage", updateLoginState);

    // Listen for the custom "login" event and update login state immediately
    window.addEventListener("login", updateLoginState);

    const handleClickOutside = (event: MouseEvent) => {
      // Type the event parameter
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("storage", updateLoginState);
      window.removeEventListener("login", updateLoginState);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleLogout = async () => {
  //   await HandleLogout(router);

  //   // Clear localStorage and update state immediately
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user_type");
  //   localStorage.removeItem("username");
  //   setIsLoggedIn(false);

  //   // Redirect to login page after logout
  //   router.push("/login");
  // };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      // Trigger localStorage event to rerender NavBar
      window.dispatchEvent(new Event("storage"));

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image
          src="/Logo.jpg"
          height={50}
          width={100}
          alt="Transport Main Logo"
          quality={100}
          unoptimized
        />
        <Link
          href="/"
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold tracking-wide"
        >
          B Transport Company
          <br />
          <span className="text-sm font-light text-pink-300 block relative ml-10">
            ...Service That Matters
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        <Link href="/about" className="text-white hover:text-gray-400">
          About
        </Link>
        <Link href="/contact" className="text-white hover:text-gray-400">
          Contact Us
        </Link>

        {/* Show Notifications Bell only for admin user */}
        {isLoggedIn && userType === "Admin" && (
          <Notifications token={localStorage.getItem("token") || ""} />
        )}

        {!isLoggedIn ? (
          <Link href="/login" className="text-white hover:text-gray-400">
            Login
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white hover:text-gray-400 focus:outline-none"
            >
              {/* User Avatar */}
              <Image
                src="/Logo.jpg" // Replace with actual user avatar
                height={30}
                width={30}
                alt="User Avatar"
                className="rounded-full mr-2"
              />
              <span className="text-white font-semibold">{userName}</span>
              {/* Dropdown Icon */}
              <svg
                className={`ml-2 h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black border border-gray-300 rounded-md shadow-lg z-50">
                <div className="p-2">
                  <button
                    onClick={() => {
                      // router.push(
                      //   `/${userType.toLowerCase()}/profile-dashboard`
                      // )
                      const route =
                        userType === "Installed User"
                          ? "installed-user"
                          : userType.toLowerCase();
                      router.push(`/${route}/profile-dashboard`);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-teal-100 text-gray-800 transition-colors duration-200"
                  >
                    <FaUser className="mr-2 text-teal-600" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      // router.push(`/${userType.toLowerCase()}/home`)
                      const route =
                        userType === "Installed User"
                          ? "installed-user"
                          : userType.toLowerCase();
                      router.push(`/${route}/home`);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-teal-100 text-gray-800 transition-colors duration-200"
                  >
                    <FaHome className="mr-2 text-teal-600" />
                    <span>Go To HomePage</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-teal-100 text-gray-800 transition-colors duration-200"
                  >
                    <FaSignOutAlt className="mr-2 text-red-600" />
                    <span className="text-red-600">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
