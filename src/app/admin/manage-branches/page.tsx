"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import { useRouter } from "next/navigation";
import { handleErrors } from "@/app/utils/handleErrors";

interface Branch {
  id: number;
  name: string;
  location: string;
}

const BranchManagementPage = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const router = useRouter();

  const fetchBranches = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/branches/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const branchesData = response.data || [];
      setBranches(branchesData);
      setFilteredBranches(
        branchesData.filter((branch: Branch) =>
          branch.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setLoading(false);
    } catch (error) {
      handleErrors(error);
      toast.error("Failed to fetch branches.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [searchTerm]);

  useEffect(() => {
    setFilteredBranches(
      branches.filter((branch) =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [branches, searchTerm]);

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${baseUrl}/branches/`,
        { name, location },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success("Branch created successfully");
      fetchBranches();
      setName("");
      setLocation("");
    } catch (error) {
      handleErrors(error);
      toast.error("Failed to create branch.");
    }
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    if (currentBranch) {
      try {
        await axios.patch(
          `${baseUrl}/branches/${currentBranch.id}/`,
          {
            name,
            location,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        toast.success("Branch updated successfully");
        fetchBranches();
        setIsEditing(false);
        setName("");
        setLocation("");
        setCurrentBranch(null);
      } catch (error) {
        handleErrors(error);
        toast.error("Failed to update branch.");
      }
    }
  };

  const handleDelete = async (branchId: number) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await axios.delete(`${baseUrl}/branches/${branchId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        toast.success("Branch deleted successfully");
        fetchBranches();
      } catch (error) {
        handleErrors(error);
        toast.error("Failed to delete branch.");
      }
    }
  };

  const handleEditClick = (branch: Branch) => {
    setIsEditing(true);
    setName(branch.name);
    setLocation(branch.location);
    setCurrentBranch(branch);
  };

  const indexOfLastBranch = currentPage * itemsPerPage;
  const indexOfFirstBranch = indexOfLastBranch - itemsPerPage;
  const currentBranches = filteredBranches.slice(
    indexOfFirstBranch,
    indexOfLastBranch
  );

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`p-2 ${
          currentPage === 1 ? "text-gray-500" : "text-blue-500"
        }`}
      >
        First
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 ${
          currentPage === 1 ? "text-gray-500" : "text-blue-500"
        }`}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`p-2 ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "text-blue-500"
            }`}
          >
            {number}
          </button>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 ${
          currentPage === totalPages ? "text-gray-500" : "text-blue-500"
        }`}
      >
        Next
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2 ${
          currentPage === totalPages ? "text-gray-500" : "text-blue-500"
        }`}
      >
        Last
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Branch Management</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by branch name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2 w-1/12 text-left">ID</th>
              <th className="border-b p-2 w-3/12 text-left pl-12">
                <span className="ml-4">Name</span>
              </th>
              <th className="border-b p-2 w-4/12 text-left pl-8">
                <span className="ml-3">Location</span>
              </th>
              <th className="border-b p-2 w-4/12 text-left">
                <span className="ml-8">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBranches.map((branch) => (
              <tr key={branch.id}>
                <td className="border-b p-2 text-left">{branch.id}</td>
                <td className="border-b p-2 text-left pl-12">{branch.name}</td>
                <td className="border-b p-2 text-left pl-8">
                  {branch.location}
                </td>
                <td className="border-b p-2 text-left">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditClick(branch)}
                      className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
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

        {renderPagination()}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Branch" : "Create Branch"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isEditing ? handleEdit() : handleCreate();
            }}
          >
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update Branch" : "Create Branch"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BranchManagementPage;
