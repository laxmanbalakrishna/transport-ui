import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import { handleErrors } from "@/app/utils/handleErrors";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import withAuth from "@/app/components/WithAuth/WithAuth";

interface Branch {
  id: number;
  name: string;
  location: string;
}

interface Installation {
  id: number;
  owner_name: string;
  contact_number: string;
  vehicle_class: string;
  registration_number: string;
  insurance_details: string;
  status: string;
  branch: Branch;
  branch_id?: number;
}

const EditInstallationForm = ({
  installationId,
}: {
  installationId: number;
}) => {
  const [installation, setInstallation] = useState<Installation | null>(null);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInstallation = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("No authentication token found.");
          setLoading(false);
          return;
        }

        // Fetch all installations and find the one with the matching ID
        const installationResponse = await axios.get(
          `${baseUrl}/installations/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        console.log("Installation Response:", installationResponse.data); // Debugging line

        // Check if installations data is present
        if (
          installationResponse.data.installations &&
          Array.isArray(installationResponse.data.installations)
        ) {
          const installationData = installationResponse.data.installations.find(
            (inst: Installation) => inst.id === installationId
          );

          if (installationData) {
            setInstallation(installationData);
          } else {
            toast.error("Installation not found.");
          }
        } else {
          toast.error("Unexpected data format for installations.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error); // Debugging line
        toast.error("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchInstallation();
  }, [installationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Prepare the data to be sent in the patch request
      const updatedData = {
        ...installation,
        branch_id: installation?.branch.id,
      };

      await axios.patch(
        `${baseUrl}/installations/update/${installationId}/`,
        updatedData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Installation updated successfully.");
      router.push("/manager/home");
    } catch (error) {
      handleErrors(error);
      toast.error("Failed to update installation.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (installation) {
      setInstallation({
        ...installation,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePhoneChange = (phone: string) => {
    if (installation) {
      setInstallation({
        ...installation,
        contact_number: phone,
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!installation) {
    return <p>Installation not found.</p>;
  }

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Edit Installation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Owner Name:
          </label>
          <input
            type="text"
            name="owner_name"
            value={installation.owner_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Number
          </label>
          <PhoneInput
            country={"us"}
            value={installation.contact_number}
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
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Class:
          </label>
          <select
            name="vehicle_class"
            value={installation.vehicle_class}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Bus">Bus</option>
          </select>
        </div>
        {/* Registration Number (Non-editable and highlighted) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Registration Number:
          </label>
          <input
            type="text"
            name="registration_number"
            value={installation.registration_number}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Insurance Details:
          </label>
          <input
            type="text"
            name="insurance_details"
            value={installation.insurance_details}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            name="status"
            value={installation.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        {/* Branch Name (Directly from Installation, Non-editable and highlighted) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Branch:
          </label>
          <input
            type="text"
            value={installation.branch.name}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></input>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(EditInstallationForm, ["manager"]);
