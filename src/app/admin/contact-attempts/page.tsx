"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import { baseUrl } from "@/app/utils";
import toast from "react-hot-toast";
import { handleErrors } from "@/app/utils/handleErrors";
import withAuth from "@/app/components/WithAuth/WithAuth";

interface ContactAttempt {
  admin: string;
  user: string;
  message: string;
  created_at: string;
  id: number; // Add ID for deletion
}

const ContactAttempts = () => {
  const [attempts, setAttempts] = useState<ContactAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const recordsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchContactAttempts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin-contact-attempts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAttempts(response.data.contact_attempts);
        setTotalCount(response.data.count);
      } catch (error) {
        console.error("Error fetching contact attempts:", error);
      }
    };
    fetchContactAttempts();
  }, []);

  const deleteContactAttempt = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${baseUrl}/delete-contact-attempt/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Contact attempt deleted successfully.");
        setAttempts(attempts.filter((attempt) => attempt.id !== id));
        setTotalCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      handleErrors(error);
      console.error("Error deleting contact attempt:", error);
    }
  };

  // Sort the records by date in descending order (most recent first)
  const filteredAttempts = attempts
    .filter((attempt) => {
      const matchSearchTerm = attempt.user
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchDate =
        !selectedDate ||
        dayjs(attempt.created_at).format("YYYY-MM-DD") === selectedDate;
      return matchSearchTerm && matchDate;
    })
    .sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at))); // Sort by date in descending order

  const totalPages = Math.ceil(filteredAttempts.length / recordsPerPage);
  const currentRecords = filteredAttempts.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-6 text-teal-700">
          Contact Attempts
        </h2>

        {/* Display the total count */}
        <div className="bg-teal-100 border-l-4 border-teal-500 text-teal-900 p-4 mb-6">
          <p className="text-lg font-semibold">
            Total Contact Attempts:{" "}
            <span className="text-1xl font-bold text-white bg-red-500 px-4 py-2 rounded-lg">
              {totalCount}
            </span>
          </p>
        </div>

        {/* Search and Date Filter */}
        <div className="mb-6 flex space-x-4">
          <div className="w-full">
            <label className="block text-gray-600 mb-2">
              Search by Manager Name
            </label>
            <input
              type="text"
              placeholder="Search by Manager Name"
              className="border p-3 rounded w-full outline-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-600 mb-2">Filter by Date</label>
            <input
              type="date"
              className="border p-3 rounded w-full outline-teal-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {currentRecords.length === 0 ? (
          <div className="text-center p-6 text-gray-500">No results found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-50 text-teal-600 uppercase text-sm">
                  <th className="p-4 border border-teal-100 w-1/4">
                    Manager Name
                  </th>
                  <th className="p-4 border border-teal-100 w-1/2">Message</th>
                  <th className="p-4 border border-teal-100 w-1/6">
                    Created At
                  </th>
                  <th className="p-4 border border-teal-100 w-1/12">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-teal-50">
                    <td className="p-4 border border-teal-100">
                      <strong className="text-gray-800">Manager:</strong>{" "}
                      {attempt.user}
                    </td>
                    <td className="p-4 border border-teal-100">
                      <strong className="text-gray-800">Message:</strong>{" "}
                      {attempt.message}
                    </td>
                    <td className="p-4 border border-teal-100">
                      <strong className="text-gray-800">Created At:</strong>{" "}
                      {dayjs(attempt.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="p-4 border border-teal-100 text-center">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteContactAttempt(attempt.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredAttempts.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <button
              className="px-4 py-2 bg-teal-200 rounded hover:bg-teal-300"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-teal-200 rounded hover:bg-teal-300"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(ContactAttempts, ["admin"]);
