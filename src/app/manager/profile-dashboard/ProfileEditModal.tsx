import withAuth from "@/app/components/WithAuth/WithAuth";
import React, { useState } from "react";

interface ProfileData {
  user_id: string;
  email: string;
  username: string;
  contact_number: string;
  salary_details?: string | number;
  user_type: string;
  branch?: string;
}

interface EditProfileModalProps {
  profileData: ProfileData;
  onClose: () => void;
  onUpdate: (
    updatedData: Partial<
      Omit<ProfileData, "salary_details" | "user_type" | "branch">
    >
  ) => void;
}

const ProfileEditModal: React.FC<EditProfileModalProps> = ({
  profileData,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Partial<ProfileData>>({
    email: profileData.email,
    username: profileData.username,
    contact_number: profileData.contact_number,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              name="contact_number"
              className="w-full p-2 border rounded"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(ProfileEditModal, ["manager"]);
