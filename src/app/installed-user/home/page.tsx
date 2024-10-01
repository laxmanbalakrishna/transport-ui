"use client";

import InstalledUserLayout from "@/app/components/InstalledUserLayout/InstalledUserLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleErrors } from "@/app/utils/handleErrors";
import { baseUrl } from "@/app/utils";
import withAuth from "@/app/components/WithAuth/WithAuth";

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
  status: string;
  insurance_details: string;
  datetime_installed: string;
  branch: Branch;
}

const InstalledUserHomePage = () => {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const [installationsPerPage] = useState(5); // Number of installations per page
  const [notification, setNotification] = useState<string | null>(null); // Notification state
  const [count, setCount] = useState(0); // Total count of installations
  const [userName, setUserName] = useState<string | null>(null);

  // Fetch username only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserName = localStorage.getItem("username");
      setUserName(storedUserName); // Set username only after confirming it's client-side
    }
  }, []); // Empty dependency array to run only once after component mounts

  useEffect(() => {
    // Fetch data from the API
    const fetchInstallations = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${baseUrl}/installations/installedUser/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setInstallations(response.data.installations);
        setCount(response.data.count);
        setNotification("You have new installations data!");
        setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
        setLoading(false);
        setLoading(false);
      } catch (err) {
        handleErrors(err);
        console.error(err);
        setError("Failed to fetch installation data");
        setLoading(false);
      }
    };

    fetchInstallations();
  }, []);

  // Filtered installations based on search term
  const filteredInstallations = installations.filter(
    (installation) =>
      installation.vehicle_class
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      installation.registration_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastInstallation = currentPage * installationsPerPage;
  const indexOfFirstInstallation =
    indexOfLastInstallation - installationsPerPage;
  const currentInstallations = filteredInstallations.slice(
    indexOfFirstInstallation,
    indexOfLastInstallation
  );

  const totalPages = Math.ceil(
    filteredInstallations.length / installationsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <InstalledUserLayout>
      <div className="container mx-auto p-6 bg-gray-50">
        {/* Notification Bar */}
        {notification && (
          <div className="bg-teal-500 text-white p-4 mb-4 rounded-lg shadow-lg">
            <p className="text-center font-medium">{notification}</p>
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-6">
          {/* <h1 className="text-4xl font-extrabold text-teal-700">
            Welcome, Installed User
          </h1> */}
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600">
              Welcome
            </span>
            ,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
              {userName || "Installed User"}
            </span>
          </h1>

          <p className="mb-6 text-lg text-gray-700">
            This is your Dashboard where you can view your Installed Vehicles
            Details.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            You have a total of{" "}
            <strong>
              <span className="bg-red-500 text-white px-2 py-1 rounded">
                {count}
              </span>
            </strong>{" "}
            installations
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Vehicle Class or Registration Number"
            className="border border-gray-300 rounded-full p-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow shadow-sm text-gray-700"
          />
        </div>

        {/* Installation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentInstallations.length > 0 ? (
            currentInstallations.map((installation) => (
              <div
                key={installation.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <h2 className="text-2xl font-bold text-teal-600 mb-4">
                  {installation.owner_name}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Vehicle Class:</strong> {installation.vehicle_class}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Registration Number:</strong>{" "}
                  {installation.registration_number}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Contact Number:</strong> {installation.contact_number}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Insurance Details:</strong>{" "}
                  {installation.insurance_details}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Status:</strong> {installation.status}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Branch:</strong> {installation.branch.name},{" "}
                  {installation.branch.location}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Installed On:</strong>{" "}
                  {new Date(
                    installation.datetime_installed
                  ).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No installations found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </InstalledUserLayout>
  );
};

export default withAuth(InstalledUserHomePage, ["installed user"]);
