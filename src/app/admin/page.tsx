"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import Link from "next/link";
import BranchCreationModal from "./branch/page";

const AdminDashboard = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
        <div>
          <h1>Admin Dashboard</h1>
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
                className="block p-2 hover:bg-gray-700 rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/admin/register"
                className="block p-2 hover:bg-gray-700 rounded-md"
              >
                Register Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-users"
                className="block p-2 hover:bg-gray-700 rounded-md"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reports"
                className="block p-2 hover:bg-gray-700 rounded-md"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="block p-2 hover:bg-gray-700 rounded-md"
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
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome, Admin</h1>
        <p className="mb-6">
          This is your dashboard where you can manage users, view reports, and
          handle system settings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistics Cards */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Total Users</h3>
            <p className="mt-2 text-3xl">150</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Installations This Month</h3>
            <p className="mt-2 text-3xl">45</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Revenue</h3>
            <p className="mt-2 text-3xl">$12,300</p>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Suggestions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Optimize user registration flow for quicker onboarding.</li>
            <li>Implement detailed reports for vehicle installations.</li>
            <li>Add additional security features for account management.</li>
            <li>
              Expand admin management options to cover more system settings.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
