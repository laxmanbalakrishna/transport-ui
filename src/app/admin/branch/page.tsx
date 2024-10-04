// src/app/components/BranchCreationModal.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import { handleErrors } from "@/app/utils/handleErrors";
import withAuth from "@/app/components/WithAuth/WithAuth";

// interface BranchCreationModalProps {
//   onClose: () => void;
// }

const BranchCreationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  // const BranchCreationModal = ({ onClose }: { onClose: () => void }) => {
  const [branchName, setBranchName] = useState("");
  const [branchLocation, setBranchLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}/branches/`,
        {
          name: branchName,
          location: branchLocation,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Branch created successfully");
      onClose(); // Close the modal
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Create New Branch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="branchName"
              className="block text-sm font-medium text-gray-700"
            >
              Branch Name
            </label>
            <input
              type="text"
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter branch name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="branchLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Branch Location
            </label>
            <input
              type="text"
              id="branchLocation"
              value={branchLocation}
              onChange={(e) => setBranchLocation(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter branch location"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export your component wrapped with the HOC
export default withAuth(BranchCreationModal, ["admin"]) as React.FC<{
  onClose: () => void;
}>;
