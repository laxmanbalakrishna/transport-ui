"use client";

import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import { useRouter } from "next/navigation";

interface Branch {
  id: number;
  name: string;
  location: string;
}

interface Installation {
  id: number;
  owner_name: string;
  contact_number: string;
  vehicle_class: string;
  registration_number: string;
  branch: Branch;
}

const HomePage = () => {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [filterByBranch, setFilterByBranch] = useState("");
  const [count, setCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"owner_name" | "registration_number">(
    "owner_name"
  );

  const recordsPerPage = 2;
  const router = useRouter();
  const userName = localStorage.getItem("username");

  const fetchInstallations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/installations/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setInstallations(response.data.installations);
      setCount(response.data.count);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch installations.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstallations();
  }, []);

  const filteredInstallations = installations
    .filter((installation) => {
      return (
        installation.owner_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filterByClass ? installation.vehicle_class === filterByClass : true) &&
        (filterByBranch ? installation.branch.name === filterByBranch : true)
      );
    })
    // .sort((a, b) => {
    //   return a.owner_name.localeCompare(b.owner_name);
    // });
    .sort((a, b) => {
      if (sortBy === "owner_name") {
        return a.owner_name.localeCompare(b.owner_name);
      } else if (sortBy === "registration_number") {
        return a.registration_number.localeCompare(b.registration_number);
      }
      return 0;
    });

  // Calculate dynamic total pages based on filtered results
  const totalFilteredPages = Math.ceil(
    filteredInstallations.length / recordsPerPage
  );

  // Update totalPages state and reset currentPage if necessary
  useEffect(() => {
    setTotalPages(totalFilteredPages);
    if (currentPage > totalFilteredPages) {
      setCurrentPage(1);
    }
  }, [totalFilteredPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (installationId: number) => {
    router.push(`/admin/updateInstallation/${installationId}`);
  };

  // Function to handle navigation to the new installation page
  const handleInstallNewVehicle = () => {
    router.push("/admin/newInstallation"); // Navigate to the new installation page
  };

  const paginatedInstallations = filteredInstallations.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleDelete = async (installationId: number) => {
    if (window.confirm("Are you sure you want to delete this installation?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${baseUrl}/installations/delete/${installationId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        toast.success("Installation deleted successfully");
        // Reload the installations list or remove the deleted item from state
        router.push("/admin/home");
      } catch (error) {
        toast.error("Failed to delete installation");
      }
    }
  };

  return (
    <AdminLayout>
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600">
            Welcome
          </span>
          ,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
            {userName}
          </span>
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          This is your dashboard where you can manage users, view reports, and
          handle system settings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistics Cards */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-center text-white">
            <h3 className="text-xl font-bold text-yellow-300">
              Total No. of Installations
            </h3>
            {loading ? (
              <p className="mt-2 text-xl text-yellow-300">Loading...</p>
            ) : (
              <p className="mt-2 text-3xl font-semibold text-green-300">
                {count}
              </p>
            )}
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 rounded-lg shadow-lg text-center text-white">
            <h3 className="text-xl font-bold text-yellow-400">
              Installations This Month
            </h3>
            <p className="mt-2 text-3xl font-semibold text-lime-300">45</p>
          </div>

          <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-lg shadow-lg text-center text-white">
            <h3 className="text-xl font-bold text-yellow-200">Revenue</h3>
            <p className="mt-2 text-3xl font-semibold text-green-100">
              $12,300
            </p>
          </div>
        </div>

        {/* <div className="flex mb-4"> */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-blue-600">
              Installed Vehicles
            </h3>
            <button
              onClick={handleInstallNewVehicle}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Install New Vehicle
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by owner name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded flex-1 min-w-[200px]"
          />
          <select
            value={filterByClass}
            onChange={(e) => setFilterByClass(e.target.value)}
            className="p-2 border rounded flex-1 min-w-[200px]"
          >
            <option value="">All Classes</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Bus">Bus</option>
          </select>
          <select
            value={filterByBranch}
            onChange={(e) => setFilterByBranch(e.target.value)}
            className="p-2 border rounded flex-1 min-w-[200px]"
          >
            <option value="">All Branches</option>
            {installations
              .map((installation) => installation.branch.name)
              .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
              .map((branchName) => (
                <option key={branchName} value={branchName}>
                  {branchName}
                </option>
              ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "owner_name" | "registration_number")
            }
            className="p-2 border rounded flex-1 min-w-[200px]"
          >
            <option value="owner_name">Sort by Owner Name</option>
            <option value="registration_number">
              Sort by Registration Number
            </option>
          </select>
        </div>

        {/* <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Installed Vehicles</h3> */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredInstallations.length === 0 ? (
          <p className="text-center text-gray-500">No records found.</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">S.No</th>
                  <th className="border-b p-2">Owner Name</th>
                  <th className="border-b p-2">Contact Number</th>
                  <th className="border-b p-2">Vehicle Class</th>
                  <th className="border-b p-2">Registration Number</th>
                  <th className="border-b p-2">Branch</th>
                  <th className="border-b p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInstallations.map((installation, index) => (
                  <tr key={installation.id}>
                    <td className="border-b p-2">
                      {(currentPage - 1) * recordsPerPage + index + 1}
                    </td>
                    <td className="border-b p-2">{installation.owner_name}</td>
                    <td className="border-b p-2">
                      {installation.contact_number}
                    </td>
                    <td className="border-b p-2">
                      {installation.vehicle_class}
                    </td>
                    <td className="border-b p-2">
                      {installation.registration_number}
                    </td>
                    <td className="border-b p-2">{installation.branch.name}</td>
                    <td className="border-b p-2">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(installation.id)}
                          className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(installation.id)}
                          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* )} */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Previous
              </button>
              <span className="p-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}
        {/* </div> */}
      </main>
    </AdminLayout>
  );
};

export default withAuth(HomePage);
