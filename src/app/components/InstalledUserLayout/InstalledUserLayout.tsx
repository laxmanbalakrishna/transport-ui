// src/app/components/AdminLayout.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import withAuth from "../WithAuth/WithAuth";
import { HandleLogout } from "@/app/utils/authUtils";
import { FaHome, FaCog, FaSignOutAlt, FaPowerOff } from "react-icons/fa";
import { logout } from "@/app/reduxToolKit/auth/authSlice";
import { useAppDispatch } from "@/app/reduxToolKit/store";

const InstalledUserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  // // Check login status and fetch the username from local storage
  // const checkAuthStatus = () => {
  //   const token = localStorage.getItem("token");
  //   const storedUsername = localStorage.getItem("username");

  //   // If token exists, user is logged in
  //   if (token) {
  //     setIsLoggedIn(true);
  //     setUsername(storedUsername);
  //   } else {
  //     setIsLoggedIn(false);
  //     setUsername(null);
  //   }
  // };

  // useEffect(() => {
  //   // Check auth status on component mount
  //   checkAuthStatus();

  //   // Listen for storage changes to detect logout across tabs
  //   const handleStorageChange = () => {
  //     checkAuthStatus();
  //   };
  //   window.addEventListener("storage", handleStorageChange);

  //   // Clean up event listener on unmount
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []); // This runs once on component mount

  // const handleLogout = async () => {
  //   await HandleLogout(router);

  //   // Clear localStorage and update state immediately
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user_type");
  //   localStorage.removeItem("username");

  //   // Update state to reflect logged out status
  //   setIsLoggedIn(false);
  //   setUsername(null);

  //   // Trigger storage event manually to notify other tabs or components
  //   window.dispatchEvent(new Event("storage"));

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

  // Function to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-6 ">
        <div className="px-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            <span>Installed User Dashboard</span>
          </h2>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/installed-user/home"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/installed-user/home")
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
                href="/installed-user/settings"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/installed-user/settings")
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
                <FaPowerOff size={20} />
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

export default withAuth(InstalledUserLayout, ["installed user"]);
