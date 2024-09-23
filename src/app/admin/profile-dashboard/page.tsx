"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import ProfileEditModal from "./ProfileEditModal";

interface ProfileData {
  user_id: string;
  email: string;
  username: string;
  contact_number: string;
  salary_details?: string | number;
  user_type: string;
  branch?: string;
}

const ProfileDashboardPage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    user_id: "",
    email: "",
    username: "",
    contact_number: "",
    salary_details: "",
    user_type: "",
    branch: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/profile-view/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, []);

  const handleProfileUpdate = async (
    updatedData: Partial<
      Omit<ProfileData, "salary_details" | "user_type" | "branch">
    >
  ) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${baseUrl}/users/update/${profileData.user_id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProfileData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Profile Dashboard
          </h2>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Email
            </label>
            <p className="text-gray-800">{profileData.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Username
            </label>
            <p className="text-gray-800">{profileData.username}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Contact Number
            </label>
            <p className="text-gray-800">{profileData.contact_number}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Salary Details
            </label>
            <p className="text-gray-800">{profileData.salary_details}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              User Type
            </label>
            <p className="text-gray-800">{profileData.user_type}</p>
          </div>

          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </button>

          {isModalOpen && (
            <ProfileEditModal
              profileData={profileData}
              onClose={() => setIsModalOpen(false)}
              onUpdate={handleProfileUpdate}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfileDashboardPage;
