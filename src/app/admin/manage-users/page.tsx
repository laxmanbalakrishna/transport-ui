"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import EditManagerModal from "./EditManagerModal"; // Modal component
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import { baseUrl } from "@/app/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleErrors } from "@/app/utils/handleErrors";
import withAuth from "@/app/components/WithAuth/WithAuth";

interface Manager {
  user: {
    id: string;
    username: string;
    email: string;
    date_of_joining?: string;
    salary_details?: number | null;
  };
  branch?: {
    id: number;
    name: string;
    location: string;
  };
}

const ManagerPage = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [managerCount, setManagerCount] = useState<number>(0);
  const [filteredManagers, setFilteredManagers] = useState<Manager[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [managersPerPage] = useState<number>(5); // Managers per page for pagination
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const router = useRouter();

  // Fetch manager and admin data
  useEffect(() => {
    fetchManagerData();
    fetchAdminData();
  }, []);

  const fetchManagerData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/managers/`, {
        headers: { Authorization: `Token ${token}` },
      }); // Adjust API endpoint
      setManagers(response.data.managers);
      setManagerCount(response.data.count);
      setFilteredManagers(response.data.managers); // Update filtered managers

      // Reset pagination if needed
      setCurrentPage(1); // Or any logic to handle pagination reset
    } catch (error) {
      handleErrors(error);
      toast.error("Error fetching Managers");
    }
  };

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/admins/`, {
        headers: { Authorization: `Token ${token}` },
      }); // Adjust API endpoint
      setAdminCount(response.data.count);
    } catch (error) {
      handleErrors(error);
      toast.error("Error fetching Admins");
    }
  };

  // Handle search/filter
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
    const filtered = managers.filter(
      (manager) =>
        manager.user.username
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        manager.user.email
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        (manager.branch &&
          manager.branch.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()))
    );
    setFilteredManagers(filtered);
  };

  // Handle pagination
  const indexOfLastManager = currentPage * managersPerPage;
  const indexOfFirstManager = indexOfLastManager - managersPerPage;
  const currentManagers = filteredManagers.slice(
    indexOfFirstManager,
    indexOfLastManager
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Open edit modal
  const openEditModal = (manager: Manager) => {
    setSelectedManager(manager);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedManager(null);
  };

  const handleDelete = async (managerId: string) => {
    if (!managerId) {
      console.error("Manager ID is undefined");
      return;
    }

    if (window.confirm("Are you sure you want to delete this Manager?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${baseUrl}/user/manager-delete/${managerId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        toast.success("Manager  deleted successfully");
        fetchManagerData(); // Refresh the list of managers
      } catch (error) {
        toast.error("Error deleting manager");
        // handleErrors(error);
      }
    }
  };

  const handleCreateNew = () => {
    router.push("/admin/register");
  };

  // New: Handle update and refresh the manager list after edit
  const handleUpdateAndRefresh = () => {
    fetchManagerData(); // Re-fetch managers after editing
    closeEditModal(); // Close modal after update
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Total Managers</h2>
            <p className="text-4xl">{managerCount}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Total Admins</h2>
            <p className="text-4xl">{adminCount}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, email, or branch"
            className="p-2 border rounded-lg w-full"
          />
        </div>

        {/* Manager List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">List of Managers</h2>
            <button
              onClick={handleCreateNew}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Create New Manager
            </button>
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-b p-2 w-1/12 text-left">Name</th>
                <th className="border-b p-2 w-1/12 text-left pl-24">Email</th>
                <th className="border-b p-2 w-1/12 text-left">
                  <span className="ml-3">Branch</span>
                </th>
                <th className="border-b p-2 w-1/12 text-center pr-14">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentManagers.length > 0 ? (
                currentManagers.map((manager) => (
                  <tr key={manager.user.id} className="border-b">
                    <td className="border-b p-2 w-1/12 text-left">
                      {manager.user.username}
                    </td>
                    <td className="border-b p-2 w-1/12 text-left">
                      {manager.user.email}
                    </td>
                    <td className="border-b p-2 w-1/12 text-left">
                      {manager.branch?.name || "N/A"}
                    </td>
                    <td className="border-b p-2 w-1/12 text-left pr-10">
                      <button
                        className="bg-teal-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => openEditModal(manager)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleDelete(manager.user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4">
            {Array.from(
              {
                length: Math.ceil(filteredManagers.length / managersPerPage),
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>

        {/* Edit Manager Modal */}
        {isEditModalOpen && (
          <EditManagerModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            manager={selectedManager}
            baseUrl={
              process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
            } // Fallback to a default value
            onUpdate={handleUpdateAndRefresh} // Pass refresh callback to modal
          />
        )}
      </div>
    </AdminLayout>
  );
};
export default withAuth(ManagerPage, ["admin"]);
