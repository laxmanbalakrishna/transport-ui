"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import { baseUrl } from "@/app/utils";

interface ContactAttempt {
  admin: string;
  user: string;
  message: string;
  created_at: string;
}

const ContactAttempts = () => {
  const [attempts, setAttempts] = useState<ContactAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
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
        setAttempts(response.data);
      } catch (error) {
        console.error("Error fetching contact attempts:", error);
      }
    };
    fetchContactAttempts();
  }, []);

  const filteredAttempts = attempts.filter((attempt) => {
    const matchSearchTerm = attempt.user
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchDate =
      !selectedDate ||
      dayjs(attempt.created_at).format("YYYY-MM-DD") === selectedDate;
    return matchSearchTerm && matchDate;
  });

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
        <h2 className="text-2xl font-semibold mb-6">Contact Attempts</h2>

        {/* Search and Date Filter */}
        <div className="mb-6 flex space-x-4">
          <input
            type="text"
            placeholder="Search by Manager Name"
            className="border p-3 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className="border p-3 rounded w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {currentRecords.length === 0 ? (
          <p>No contact attempts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-teal-600 uppercase text-sm">
                  <th className="p-4 border w-1/3">Manager Name</th>
                  <th className="p-4 border w-1/3">Message</th>
                  <th className="p-4 border w-1/3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((attempt, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 border">
                      <strong className="text-gray-800">Manager:</strong>{" "}
                      {attempt.user}
                    </td>
                    <td className="p-4 border">
                      <strong className="text-gray-800">Message:</strong>{" "}
                      {attempt.message}
                    </td>
                    <td className="p-4 border">
                      <strong className="text-gray-800">Created At:</strong>{" "}
                      {dayjs(attempt.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactAttempts;
