// src/app/components/AdminLayout.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import BranchCreationModal from "@/app/admin/branch/page";
import withAuth from "../WithAuth/WithAuth";
import { HandleLogout } from "@/app/utils/authUtils";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
        <div>
          <button
            onClick={openModal}
            className="p-2 bg-blue-600 text-white rounded-md"
          >
            Create New Branch
          </button>
          {isModalOpen && <BranchCreationModal onClose={closeModal} />}
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/home"
                className={`block p-2 rounded-md ${
                  isActive("/admin/home") ? "bg-teal-500" : "hover:bg-gray-700"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/admin/register"
                className={`block p-2 rounded-md ${
                  isActive("/admin/register")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Register Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-users"
                className={`block p-2 rounded-md ${
                  isActive("/admin/manage-users")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-branches"
                className={`block p-2 rounded-md ${
                  isActive("/admin/manage-branches")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Manage Branches
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reports"
                className={`block p-2 rounded-md ${
                  isActive("/admin/reports")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/admin/contact-attempts"
                className={`block p-2 rounded-md ${
                  isActive("/admin/contact-attempts")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                ContactedAttemptsList
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`block p-2 rounded-md ${
                  isActive("/admin/settings")
                    ? "bg-teal-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 ">{children}</main>
    </div>
  );
};

export default withAuth(AdminLayout);
