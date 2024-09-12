"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";

const OtpLoginPage = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    // Trim the contact number to remove any extra spaces
    const trimmedContactNumber = contactNumber.trim();

    try {
      const response = await axios.post(`${baseUrl}/user/send-otp/`, {
        contact_number: trimmedContactNumber,
      });

      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        router.push(
          `/otplogin/otp-verify?contact_number=${encodeURIComponent(
            trimmedContactNumber
          )}`
        ); // Redirect to OTP verification form
      }
    } catch (error: any) {
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
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your contact number"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpLoginPage;
