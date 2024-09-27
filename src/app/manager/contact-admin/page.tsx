"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/utils";
import toast from "react-hot-toast";
import { handleErrors } from "@/app/utils/handleErrors";
import ManagerLayout from "@/app/components/ManagerLayout/ManagerLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";

interface UserData {
  id: string;
  username: string;
  email: string;
}

interface AdminData {
  user: UserData;
  branch: string | null;
}

const ContactAdminPage = () => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedAdminUsername, setSelectedAdminUsername] = useState(""); // To store selected admin's username
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Fetch list of admins on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${baseUrl}/admins/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setAdmins(response.data.admins);
        console.log(response.data.admins);
      })
      .catch((err) => {
        setError("Failed to fetch admins.");
      });
  }, []);

  const handleAdminChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const adminId = e.target.value;
    const admin = admins.find((admin) => admin.user.id === adminId);
    setSelectedAdmin(adminId);
    setSelectedAdminUsername(admin ? admin.user.username : ""); // Set the selected admin's username
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      admin: selectedAdmin,
      message: message,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${baseUrl}/contact-admin/`, payload, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSuccess("Message sent successfully!");
      setSelectedAdmin("");
      setMessage("");
      toast.success(
        `Message sent successfully to ${selectedAdminUsername} admin`
      );
    } catch (error) {
      handleErrors(error);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManagerLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Contact Admin
          </h2>

          {/* Success or Error Message */}
          {success && (
            <div className="mb-4 text-green-600 bg-green-100 p-2 rounded text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-2 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Admin Selection */}
            <div className="mb-4">
              <label htmlFor="admin" className="block text-gray-700">
                Select Admin
              </label>
              <select
                id="admin"
                value={selectedAdmin}
                onChange={handleAdminChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Choose an admin...
                </option>
                {Array.isArray(admins) && admins.length > 0 ? (
                  admins.map((admin) => (
                    <option key={admin.user.id} value={admin.user.id}>
                      {admin.user.username}
                    </option>
                  ))
                ) : (
                  <option disabled>No admins available</option>
                )}
              </select>
            </div>

            {/* Message Input */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`p-2 rounded-md w-full ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default withAuth(ContactAdminPage, ["manager"]);
