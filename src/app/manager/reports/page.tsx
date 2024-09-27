"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/app/utils";
import ManagerLayout from "@/app/components/ManagerLayout/ManagerLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";

interface Branch {
  id: number;
  name: string;
  location: string;
}

interface VehicleInstallation {
  id: number;
  owner_name: string;
  contact_number: string;
  vehicle_class: string;
  registration_number: string;
  insurance_details: string;
  datetime_installed: string;
  status: string;
  branch: Branch;
  installation_count: number;
}

const ReportsPage = () => {
  const [recentInstallation, setRecentInstallation] =
    useState<VehicleInstallation | null>(null);
  const [branchRecentInstallation, setBranchRecentInstallation] =
    useState<VehicleInstallation | null>(null);
  const [branchId, setBranchId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch recent vehicle installation
  const fetchRecentInstallation = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get<VehicleInstallation>(
        `${baseUrl}/installations/recent-vehicle/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setRecentInstallation(response.data);
    } catch (error) {
      console.error("Error fetching recent installations:", error);
    }
  };

  // Fetch branch ID based on the user token
  const fetchBranchIdFromToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Assuming there's an API that returns the user's profile with the branch info
      const response = await axios.get(`${baseUrl}/profile-view/`, {
        headers: { Authorization: `Token ${token}` },
      });

      // Assuming the response contains branch id
      const userBranchId = response.data.branch_id;
      setBranchId(userBranchId);
    } catch (error) {
      console.error("Error fetching branch ID from token:", error);
    }
  };

  // Fetch recent vehicle installation
  const fetchBranchRecentInstallation = async (branchId: number) => {
    const token = localStorage.getItem("token");
    if (!token || !branchId) return;

    // Only make the request if branchRecentInstallation has a valid branch and ID
    try {
      const response = await axios.get<VehicleInstallation>(
        `${baseUrl}/installations/recent-installation/${branchId}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setBranchRecentInstallation(response.data);
    } catch (error) {
      console.error("Error fetching recent installations:", error);
    }
  };

  // Fetch recent installation and branch ID
  useEffect(() => {
    const loadData = async () => {
      await fetchRecentInstallation(); // Fetch recent vehicle installations
      await fetchBranchIdFromToken(); // Fetch branch ID based on token
    };
    loadData();
  }, []);

  // Once branchId is set, fetch branch recent installations
  useEffect(() => {
    if (branchId) {
      fetchBranchRecentInstallation(branchId);
    }
  }, [branchId]);

  // Set loading to false once all data is fetched
  useEffect(() => {
    if (recentInstallation && branchRecentInstallation) {
      setLoading(false);
    }
  }, [recentInstallation, branchRecentInstallation]);

  if (loading) return <div>Loading reports...</div>;

  return (
    <ManagerLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Installation Reports</h1>

        {/* Recent Installation Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Recent Vehicle Installation
          </h2>
          {recentInstallation ? (
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-teal-400">
                  <th className="px-4 py-2 border font-semibold">Owner Name</th>
                  <th className="px-4 py-2 border font-semibold">
                    Vehicle Class
                  </th>
                  <th className="px-4 py-2 border font-semibold">
                    Registration Number
                  </th>
                  <th className="px-4 py-2 border font-semibold">Branch</th>
                  <th className="px-4 py-2 border font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={recentInstallation.id}
                  style={{ backgroundColor: "#d1e7fd" }}
                >
                  <td className="px-4 py-2 border">
                    <span className="ml-16">
                      {recentInstallation.owner_name}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-12">
                      {recentInstallation.vehicle_class}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-16">
                      {recentInstallation.registration_number}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-12">
                      {recentInstallation.branch.name}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-8 text-white bg-red-500 px-2 py-1 rounded">
                      {recentInstallation.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No recent installation found.</p>
          )}
        </section>

        {/* Branch Recent Installation Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Branch Recent Vehicle Installation
          </h2>
          {branchRecentInstallation ? (
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-teal-400">
                  <th className="px-4 py-2 border font-semibold">Owner Name</th>
                  <th className="px-4 py-2 border font-semibold">
                    Vehicle Class
                  </th>
                  <th className="px-4 py-2 border font-semibold">
                    Registration Number
                  </th>
                  <th className="px-4 py-2 border font-semibold">Branch</th>
                  <th className="px-4 py-2 border font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={branchRecentInstallation.id}
                  style={{ backgroundColor: "#d1e7fd" }}
                >
                  <td className="px-4 py-2 border">
                    <span className="ml-16">
                      {branchRecentInstallation.owner_name}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-12">
                      {branchRecentInstallation.vehicle_class}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-16">
                      {branchRecentInstallation.registration_number}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-12">
                      {branchRecentInstallation.branch.name}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="ml-8 text-white bg-red-500 px-2 py-1 rounded">
                      {branchRecentInstallation.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No Branch recent installation found.</p>
          )}
        </section>
      </div>
    </ManagerLayout>
  );
};

export default withAuth(ReportsPage, ["manager"]);
