"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleErrors } from "@/app/utils/handleErrors";
import BranchCreationModal from "@/app/components/BranchCreationModal/BranchCreationModal";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { baseUrl } from "@/app/utils";
// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL || "";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [branch, setBranch] = useState("");
  const [salaryDetails, setSalaryDetails] = useState("");
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/branches/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setBranches(response.data);
      } catch (error) {
        toast.error("Failed to fetch branches.");
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure contact number is prefixed with '+'
    const formattedContactNumber = contactNumber.startsWith("+")
      ? contactNumber
      : `+${contactNumber}`;

    console.log("Form data:", {
      email,
      username,
      password,
      contact_number: formattedContactNumber,
      user_type: userType,
      branch,
      salary_details: parseFloat(salaryDetails),
    });
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}/register/`,
        {
          email,
          username,
          password,
          contact_number: formattedContactNumber,
          user_type: userType,
          branch,
          salary_details: parseFloat(salaryDetails),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Registration successful");
      router.push("/admin/home");
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <AdminLayout>
      {" "}
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Register User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-blue-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600">
              Contact Number
            </label>
            <PhoneInput
              country={"us"} // Default country
              value={contactNumber}
              onChange={(phone) => setContactNumber(phone)} // Update contact number
              inputProps={{
                name: "contact_number",
                required: true,
                autoFocus: false,
              }}
              enableSearch={true} // Optional: Enables search in the dropdown
              containerClass="w-full"
              inputClass="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-blue-600"
            >
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select user type</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Normal User">Normal User</option>
            </select>
          </div>

          {userType !== "Admin" && (
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-blue-600"
              >
                Branch
              </label>
              <div className="flex items-center space-x-2">
                <select
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select branch</option>
                  {branches.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {id} - {name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={openModal}
                  className="p-2 bg-blue-600 text-white rounded-md"
                >
                  Create New Branch
                </button>
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="salaryDetails"
              className="block text-sm font-medium text-blue-600"
            >
              Salary Details
            </label>
            <input
              type="text"
              id="salaryDetails"
              placeholder="Enter Salary Details"
              value={salaryDetails}
              onChange={(e) => setSalaryDetails(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        {isModalOpen && <BranchCreationModal onClose={closeModal} />}
      </div>
    </AdminLayout>
  );
};

export default withAuth(RegistrationForm, ["admin"]);
