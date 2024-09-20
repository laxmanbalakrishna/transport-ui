// "use client";

// import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseUrl } from "@/app/utils";

// interface Branch {
//   id: number;
//   name: string;
//   location: string;
// }

// interface VehicleInstallation {
//   id: number;
//   owner_name: string;
//   contact_number: string;
//   vehicle_class: string;
//   registration_number: string;
//   insurance_details: string;
//   datetime_installed: string;
//   status: string;
//   branch: Branch;
// }

// const ReportsPage = () => {
//   const [recentInstallation, setRecentInstallation] =
//     useState<VehicleInstallation | null>(null);
//   const [branchWiseInstallations, setBranchWiseInstallations] = useState<
//     VehicleInstallation[]
//   >([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch recent vehicle installation
//   const fetchRecentInstallation = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get<VehicleInstallation>(
//         `${baseUrl}/installations/recent-vehicle/`,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setRecentInstallation(response.data);
//     } catch (error) {
//       console.error("Error fetching recent installations:", error);
//     }
//   };

//   // Fetch branch-wise recent installations
//   const fetchBranchWiseInstallations = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get<VehicleInstallation[]>(
//         `${baseUrl}/installations/branch-wise-recent-vehicle/`,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setBranchWiseInstallations(response.data);
//     } catch (error) {
//       console.error("Error fetching branch-wise installations:", error);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         fetchRecentInstallation(),
//         fetchBranchWiseInstallations(),
//       ]);
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   if (loading) return <div>Loading reports...</div>;

//   return (
//     <AdminLayout>
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Installation Reports</h1>

//         {/* Recent Installation Section */}
//         <section className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">
//             Recent Vehicle Installation
//           </h2>
//           {recentInstallation ? (
//             <table className="min-w-full bg-white shadow-md rounded">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 border">Owner Name</th>
//                   <th className="px-4 py-2 border">Vehicle Class</th>
//                   <th className="px-4 py-2 border">Registration Number</th>
//                   <th className="px-4 py-2 border">Branch</th>
//                   <th className="px-4 py-2 border">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr key={recentInstallation.id}>
//                   <td className="px-4 py-2 border">
//                     {recentInstallation.owner_name}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {recentInstallation.vehicle_class}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {recentInstallation.registration_number}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {recentInstallation.branch.name}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {recentInstallation.status}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           ) : (
//             <p>No recent installation found.</p>
//           )}
//         </section>

//         {/* Branch-wise Installations Section */}
//         <section>
//           <h2 className="text-xl font-semibold mb-2">
//             Branch-wise Recent Installations
//           </h2>
//           {branchWiseInstallations.length === 0 ? (
//             <p>No installations available for branches.</p>
//           ) : (
//             branchWiseInstallations.map((vehicle) => (
//               <div
//                 key={vehicle.branch.id}
//                 className="mb-6 p-4 bg-gray-100 rounded-lg shadow"
//               >
//                 <h3 className="text-lg font-semibold mb-2">
//                   {vehicle.branch.name} ({vehicle.branch.location})
//                 </h3>
//                 <table className="min-w-full bg-white shadow-md rounded mb-4">
//                   <thead>
//                     <tr>
//                       <th className="px-4 py-2 border">Owner Name</th>
//                       <th className="px-4 py-2 border">Vehicle Class</th>
//                       <th className="px-4 py-2 border">Registration Number</th>
//                       <th className="px-4 py-2 border">Status</th>
//                       <th className="px-4 py-2 border">Installed Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr key={vehicle.id}>
//                       <td className="px-4 py-2 border">{vehicle.owner_name}</td>
//                       <td className="px-4 py-2 border">
//                         {vehicle.vehicle_class}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         {vehicle.registration_number}
//                       </td>
//                       <td className="px-4 py-2 border">{vehicle.status}</td>
//                       <td className="px-4 py-2 border">
//                         {new Date(vehicle.datetime_installed).toLocaleString()}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             ))
//           )}
//         </section>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ReportsPage;

"use client";

import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables, TooltipItem } from "chart.js";
import { baseUrl } from "@/app/utils";

Chart.register(...registerables);

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
  const [branchWiseInstallations, setBranchWiseInstallations] = useState<
    VehicleInstallation[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [branchCounts, setBranchCounts] = useState<{
    [key: string]: { count: number; details: VehicleInstallation[] };
  }>({});

  // Fetch recent vehicle installation
  const fetchRecentInstallation = async () => {
    const token = localStorage.getItem("token");
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

  // Fetch branch-wise recent installations
  const fetchBranchWiseInstallations = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get<VehicleInstallation[]>(
        `${baseUrl}/installations/branch-wise-recent-vehicle/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setBranchWiseInstallations(response.data);
      calculateBranchCounts(response.data);
    } catch (error) {
      console.error("Error fetching branch-wise installations:", error);
    }
  };

  // Calculate the count of installations per branch
  const calculateBranchCounts = (vehicles: VehicleInstallation[]) => {
    const counts: {
      [key: string]: { count: number; details: VehicleInstallation[] };
    } = {};
    vehicles.forEach((vehicle) => {
      const branchName = vehicle.branch.name;
      if (!counts[branchName]) {
        counts[branchName] = { count: 0, details: [] };
      }
      counts[branchName].count += vehicle.installation_count; // Use installation_count to aggregate
      counts[branchName].details.push(vehicle);
    });
    setBranchCounts(counts);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchRecentInstallation(),
        fetchBranchWiseInstallations(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Get dynamic colors based on the number of installations
  const getDynamicColors = () => {
    const installationCounts = Object.values(branchCounts).map(
      (branch) => branch.count
    );
    const uniqueCounts = Array.from(new Set(installationCounts)); // Ensure uniqueness
    const colorMap: { [key: number]: string } = {};

    // Define a palette of vibrant colors
    const vibrantColors = [
      "rgba(255, 99, 132, 0.8)", // Bright Pink
      "rgba(54, 162, 235, 0.8)", // Bright Blue
      "rgba(255, 206, 86, 0.8)", // Bright Yellow
      "rgba(75, 192, 192, 0.8)", // Bright Teal
      "rgba(153, 102, 255, 0.8)", // Bright Purple
      "rgba(255, 159, 64, 0.8)", // Bright Orange
      "rgba(0, 200, 83, 0.8)", // Bright Green
      "rgba(220, 20, 60, 0.8)", // Crimson Red
      "rgba(138, 43, 226, 0.8)", // Blue Violet
      "rgba(255, 69, 0, 0.8)", // Red Orange
    ];

    // Assign a vibrant color based on unique installation counts
    uniqueCounts.forEach((count, index) => {
      colorMap[count] = vibrantColors[index % vibrantColors.length]; // Cycle through colors if more counts
    });

    // Map each installation count to a vibrant color
    return installationCounts.map((count) => colorMap[count]);
  };

  // Prepare chart data
  const getChartData = () => {
    return {
      labels: Object.keys(branchCounts),
      datasets: [
        {
          label: "Number of Installations",
          data: Object.values(branchCounts).map((branch) => branch.count),
          backgroundColor: getDynamicColors(), // Use dynamic colors
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Branch-wise Installations",
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const label = context.dataset.label || "";
            const branchIndex = context.dataIndex;
            const branchName = context.chart.data.labels?.[branchIndex] as
              | string
              | undefined;

            if (branchName && branchCounts[branchName]) {
              const details = branchCounts[branchName].details;
              const detailList = details
                .map(
                  (vehicle) =>
                    `Owner: ${vehicle.owner_name}, Class: ${vehicle.vehicle_class}, Status: ${vehicle.status}, Installed on: ${vehicle.datetime_installed}`
                )
                .join("\n");

              return [`${label}: ${context.raw}`, detailList];
            }
            return [`${label}: ${context.raw}`]; // Fallback if branchName is undefined
          },
        },
      },
    },
  };

  if (loading) return <div>Loading reports...</div>;

  return (
    <AdminLayout>
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

        {/* Branch-wise Installations Chart Section */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Branch-wise Recent Installations
          </h2>
          {branchWiseInstallations.length > 0 ? (
            <Bar data={getChartData()} options={options} />
          ) : (
            <p>No data available for branch-wise installations.</p>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
