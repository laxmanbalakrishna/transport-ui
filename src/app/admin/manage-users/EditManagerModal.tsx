import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleErrors } from "@/app/utils/handleErrors";
import toast from "react-hot-toast";

// Define the type for the manager prop (matching manage-users/page.tsx)
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
  };
}

interface Branch {
  id: number;
  name: string;
  location: string;
}

interface EditManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: Manager | null; // Allow manager to be null initially
  baseUrl: string; // Add baseUrl prop to dynamically pass API base URL
  onUpdate: () => void; // Callback to refresh or update the parent component data
}

const EditManagerModal: React.FC<EditManagerModalProps> = ({
  isOpen,
  onClose,
  manager,
  baseUrl,
  onUpdate,
}) => {
  const [username, setUsername] = useState(manager?.user.username || "");
  const [email, setEmail] = useState(manager?.user.email || "");
  const [branchId, setBranchId] = useState(manager?.branch?.id || "");
  const [salaryDetails, setSalaryDetails] = useState(
    manager?.user.salary_details || ""
  );
  const [branches, setBranches] = useState<Branch[]>([]); // Branches state

  // Fetch branch data on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/branches/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBranches(response.data); // Set branch data
      } catch (error) {
        handleErrors(error);
        toast.error("Error fetching branches");
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (manager) {
      setUsername(manager.user.username);
      setEmail(manager.user.email);
      setBranchId(manager.branch?.id || "");
      setSalaryDetails(manager.user.salary_details || "");
    }
  }, [manager]);

  const handleSave = async () => {
    if (!manager) return; // Guard against null manager

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${baseUrl}/users/update/${manager.user.id}/`, // Adjust API endpoint
        {
          username,
          email,
          branch: branchId,
          salary_details: salaryDetails,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Manager  Updated successfully");
      onUpdate(); // Call the onUpdate callback to refresh the manager list in the parent component
      onClose(); // Close modal after saving
    } catch (error) {
      handleErrors(error);
      console.error("Failed to update manager:", error);
    }
  };

  if (!isOpen || !manager) return null; // Don't render modal if not open or no manager selected

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Manager</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Branch</label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select a Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name} - {branch.location}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Salary</label>
          <input
            type="number" // Changed to number for decimal values
            step="any" // Allows decimal values
            value={salaryDetails}
            onChange={(e) => setSalaryDetails(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-teal-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditManagerModal;
