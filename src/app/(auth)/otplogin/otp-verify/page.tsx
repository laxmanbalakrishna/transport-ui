"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get and format the contact number from URL parameters
  const [contactNumber, setContactNumber] = useState<string>("");

  useEffect(() => {
    const rawContactNumber = (searchParams.get("contact_number") || "").trim();
    // Ensure the contact number starts with '+' if it's not already
    setContactNumber(
      rawContactNumber.startsWith("+")
        ? rawContactNumber
        : `+${rawContactNumber}`
    );
  }, [searchParams]);

  const handleVerifyOtp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure OTP is trimmed
      const response = await axios.post(`${baseUrl}/user/verify-otp/`, {
        contact_number: contactNumber, // Use formatted contact number
        otp: otp.trim(), // Ensure OTP is trimmed
      });

      if (response.status === 200) {
        const { token, user_type, username } = response.data;

        localStorage.setItem("token", token); // Save token
        localStorage.setItem("user_type", user_type); // Save user type
        localStorage.setItem("username", username); // Save username

        // Dispatch a custom event to notify NavBar about login state change
        window.dispatchEvent(new Event("login"));

        toast.success("OTP verified successfully!");

        // Redirect based on user type
        switch (user_type) {
          case "Admin":
            router.push("/admin/home");
            break;
          case "Manager":
            router.push("/manager");
            break;
          case "Normal User":
            router.push("/user");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } catch (error: any) {
      toast.error("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Verify OTP
        </h1>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the OTP"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
