"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/app/utils";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ManagerLayout from "@/app/components/ManagerLayout/ManagerLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";

interface BranchData {
  branch_name: string;
  total_installations: number;
}

interface CompareData {
  manager_branch: BranchData;
  other_branches: BranchData[];
}

const CompareBranches = () => {
  const [compareData, setCompareData] = useState<CompareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseUrl}/installations/compare-output/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setCompareData(response.data);
      } catch (err) {
        setError("Failed to load branch comparison data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  }

  // Bar Chart Data Setup
  const chartData = {
    labels: [
      compareData?.manager_branch.branch_name,
      ...(compareData?.other_branches?.map((branch) => branch.branch_name) ||
        []),
    ],
    datasets: [
      {
        label: "Total Installations",
        data: [
          compareData?.manager_branch.total_installations,
          ...(compareData?.other_branches.map(
            (branch) => branch.total_installations
          ) || []),
        ],
        backgroundColor: [
          "#4CAF50", // Manager branch (Green)
          "#FFC107", // Other branches (Yellow)
          "#FF5722", // Other branches (Orange)
          "#2196F3", // Other branches (Blue)
          "#9C27B0", // Other branches (Purple)
          "#607D8B", // Other branches (Gray)
        ],
      },
    ],
  };

  return (
    <ManagerLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Branch Installations Comparison
          </h2>

          {/* Bar Chart */}
          <div className="mb-8">
            <Bar data={chartData} />
          </div>

          {/* Manager's Branch */}
          {compareData && (
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                {compareData.manager_branch.branch_name} (Home Branch)
              </h3>
              <div className="text-lg text-gray-700 text-center">
                Installations:{" "}
                <span className="text-3xl font-semibold text-green-600">
                  {compareData.manager_branch.total_installations}
                </span>
              </div>
            </div>
          )}

          {/* Comparison with Other Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {compareData?.other_branches.map((branch) => (
              <div
                key={branch.branch_name}
                className="border border-gray-200 rounded-md p-4 bg-gray-50 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {branch.branch_name}
                </h3>
                <p className="text-lg text-gray-600">
                  Installations:{" "}
                  <span className="text-2xl font-semibold text-green-500">
                    {branch.total_installations}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default withAuth(CompareBranches, ["manager"]);
