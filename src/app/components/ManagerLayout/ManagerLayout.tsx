// src/app/components/AdminLayout.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import withAuth from "../WithAuth/WithAuth";
import { HandleLogout } from "@/app/utils/authUtils";
import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check login status and fetch the username from local storage
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    // If token exists, user is logged in
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    // Check auth status on component mount
    checkAuthStatus();

    // Listen for storage changes to detect logout across tabs
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener("storage", handleStorageChange);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // This runs once on component mount

  const handleLogout = async () => {
    await HandleLogout(router);

    // Clear localStorage and update state immediately
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("username");

    // Update state to reflect logged out status
    setIsLoggedIn(false);
    setUsername(null);

    // Trigger storage event manually to notify other tabs or components
    window.dispatchEvent(new Event("storage"));

    // Redirect to login page after logout
    router.push("/login");
  };

  // Function to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-6 ">
        <div className="px-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            <span>Manager Dashboard</span>
          </h2>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/manager/home"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/manager/home")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaHome size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/manager/compare-branches"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/manager/compare-branches")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaBuilding size={20} />
                <span>Compare Branches</span>
              </Link>
            </li>
            <li>
              <Link
                href="/manager/reports"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/manager/reports")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaChartBar size={20} />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                href="/manager/contact-admin"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/manager/contact-admin")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaEnvelope size={20} />
                <span>Contact-Admin</span>
              </Link>
            </li>
            <li>
              <Link
                href="/manager/settings"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/manager/settings")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaCog size={20} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full text-left p-2 bg-red-600 rounded-md hover:bg-red-700"
              >
                <FaSignOutAlt size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default withAuth(ManagerLayout, ["manager"]);
