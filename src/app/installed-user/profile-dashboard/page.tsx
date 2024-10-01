"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import withAuth from "@/app/components/WithAuth/WithAuth";
import InstalledUserLayout from "@/app/components/InstalledUserLayout/InstalledUserLayout";

interface Branch {
  id: number;
  name: string;
  location: string;
}

interface ProfileData {
  id: string;
  owner_name: string;
  contact_number: string;
  vehicle_class: string;
  user_type: string;
  branch?: Branch;
}

const ProfileDashboardPage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: "",
    owner_name: "",
    contact_number: "",
    vehicle_class: "",
    user_type: "",
    branch: undefined,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/installations/installedUser/profile-view/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

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

  return (
    <InstalledUserLayout>
      <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Profile Dashboard
          </h2>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Username
            </label>
            <p className="text-gray-800">{profileData.owner_name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Contact Number
            </label>
            <p className="text-gray-800">{profileData.contact_number}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Vehicle Type
            </label>
            <p className="text-gray-800">{profileData.vehicle_class}</p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              Branch
            </label>
            <p className="text-gray-800">
              {profileData.branch?.name}-{profileData.branch?.location}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1 text-gray-700">
              User Type
            </label>
            <p className="text-gray-800">{profileData.user_type}</p>
          </div>
        </div>
      </div>
    </InstalledUserLayout>
  );
};

export default withAuth(ProfileDashboardPage, ["installed user"]);
