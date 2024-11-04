// src/app/components/AdminLayout.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import BranchCreationModal from "@/app/components/BranchCreationModal/BranchCreationModal";
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
  FaPowerOff,
} from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { logout } from "@/app/reduxToolKit/auth/authSlice";
import { useAppDispatch } from "@/app/reduxToolKit/store";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Check login status and fetch the username from local storage
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
        <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
        <div>
          <button
            onClick={openModal}
            className="p-2 bg-blue-600 text-white rounded-md flex items-center space-x-2"
          >
            <MdOutlineCreateNewFolder size={20} />
            <span> Create New Branch</span>
          </button>
          {/* {isModalOpen && <BranchCreationModal onClose={closeModal} />} */}
          {isModalOpen && (
            <>
              {/* Overlay to cover background content */}
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

              {/* Modal */}
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <BranchCreationModal onClose={closeModal} />
                </div>
              </div>
            </>
          )}
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/home"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/home") ? "bg-teal-500" : "hover:bg-gray-700"
                }`}
              >
                <FaHome size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/register"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/register")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaUserPlus size={20} />
                <span>Register Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-users"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/manage-users")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaUsers size={20} />
                <span>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-branches"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/manage-branches")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaBuilding size={20} />
                <span>Manage Branches</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reports"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/reports")
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
                href="/admin/contact-attempts"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/contact-attempts")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                <FaEnvelope size={20} />
                <span>ContactedAttemptsList</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  isActive("/admin/settings")
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

export default withAuth(AdminLayout, ["admin"]);
