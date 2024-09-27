"use client";

import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/app/utils";
import toast from "react-hot-toast";
import { handleErrors } from "@/app/utils/handleErrors";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import withAuth from "@/app/components/WithAuth/WithAuth";

const SettingsPage = () => {
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}/change-password/`,
        passwordForm,
        {
          headers: {
            Authorization: `Token ${token}`, // Include token if required
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");
        setPasswordForm({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      }
    } catch (error) {
      handleErrors(error);
      console.error("Error updating password", error);
      // alert(`Error: ${error.response?.data?.error || "Something went wrong"}`);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Settings Page
        </h1>

        {/* Change Password Form */}
        <form
          onSubmit={handlePasswordChange}
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Change Password
          </h2>
          <div className="mb-4 relative">
            <label className="block text-lg font-bold mb-2 text-gray-700">
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              className="border p-2 w-full rounded"
              placeholder="Enter Old Password "
              value={passwordForm.old_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  old_password: e.target.value,
                })
              }
              required
            />
            <div
              className="absolute right-2 top-10 cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-lg font-bold mb-2 text-gray-700">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              className="border p-2 w-full rounded"
              placeholder="Enter New Password "
              value={passwordForm.new_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  new_password: e.target.value,
                })
              }
              required
            />
            <div
              className="absolute right-2 top-10 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-lg font-bold mb-2 text-gray-700">
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="border p-2 w-full rounded"
              placeholder="Enter Confirm Password "
              value={passwordForm.confirm_password}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirm_password: e.target.value,
                })
              }
              required
            />
            <div
              className="absolute right-2 top-10 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default withAuth(SettingsPage, ["admin"]);
