// src/app/components/AdminLayout.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BranchCreationModal from "@/app/admin/branch/page";
import withAuth from "../WithAuth/WithAuth";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default withAuth(AdminLayout);
