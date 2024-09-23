"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/app/utils";
import toast from "react-hot-toast";
import { handleErrors } from "@/app/utils/handleErrors";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const VehicleRegistrationForm: React.FC = () => {
  const [branches, setBranches] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    owner_name: "",
    contact_number: "",
    vehicle_class: "",
    registration_number: "",
    insurance_details: "",
    branch_id: "",
    status: "Active",
  });
  const [statusOptions] = useState([
    "Active",
    "Inactive",
    "Under Maintenance",
    "Emergency",
  ]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch branches for dropdown
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    // Ensure contact number is prefixed with '+'
    const formattedContactNumber = value.startsWith("+") ? value : `+${value}`;
    setFormData((prevState) => ({
      ...prevState,
      contact_number: formattedContactNumber,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${baseUrl}/installations/create/`,
        {
          ...formData,
          contact_number: formData.contact_number.startsWith("+")
            ? formData.contact_number
            : `+${formData.contact_number}`,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("New Vehicle Registration successful");
        console.log("Vehicle registered successfully:", response.data);
        // Handle successful registration, e.g., redirect or show a success message
        router.push("/admin/home");
      })
      .catch((error) => {
        handleErrors(error);
        setError("Failed to register vehicle");
        console.error("Error registering vehicle:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Register New Vehicle
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Owner Name
          </label>
          <input
            type="text"
            name="owner_name"
            placeholder="Enter Owner Name"
            value={formData.owner_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Number
          </label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Number
          </label>
          <PhoneInput
            country={"us"}
            value={formData.contact_number}
            placeholder="Enter Contact Number"
            onChange={handlePhoneChange}
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
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Vehicle Class
          </label>
          <select
            name="vehicle_class"
            value={formData.vehicle_class}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Vehicle</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Bus">Bus</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Registration Number
          </label>
          <input
            type="text"
            name="registration_number"
            placeholder="Enter Registration Number"
            value={formData.registration_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Insurance Details
          </label>
          <input
            type="text"
            name="insurance_details"
            placeholder="Enter Insurance Details"
            value={formData.insurance_details}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Branch
          </label>
          <select
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select branch</option>
            {branches.map(({ id, name }) => (
              <option key={id} value={id}>
                {id} - {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleRegistrationForm;
