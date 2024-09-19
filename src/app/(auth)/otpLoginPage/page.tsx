"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";

const OtpLoginPage = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [userType, setUserType] = useState("Installed User"); // Default user type
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contactNumber || contactNumber.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      // Redirect to the appropriate OTP send page based on userType
      const otpSendUrl = `/otpLoginPage/otpSend?user_type=${encodeURIComponent(
        userType
      )}&contact_number=${encodeURIComponent(contactNumber)}`;

      router.push(otpSendUrl);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          OTP Login
        </h1>

        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700"
            >
              User Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 p-2 w-full border border-blue-400 rounded-md"
            >
              <option value="Installed User">Installed User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <PhoneInput
              country={"us"}
              value={contactNumber}
              onChange={(phone) => setContactNumber(phone)}
              inputProps={{
                name: "contact_number",
                required: true,
                autoFocus: false,
              }}
              enableSearch={true}
              containerClass="w-full"
              inputClass="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your contact number"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpLoginPage;
