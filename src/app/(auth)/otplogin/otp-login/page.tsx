"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const OtpLoginPageContent = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Trim any extra spaces
    const trimmedContactNumber = contactNumber.trim();

    // Check if the contact number is valid before proceeding
    if (!trimmedContactNumber || trimmedContactNumber.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/user/send-otp/`, {
        contact_number: `+${trimmedContactNumber}`,
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
            {/* <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your contact number"
            /> */}
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

const OtpLoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpLoginPageContent />
    </Suspense>
  );
};

export default OtpLoginPage;
