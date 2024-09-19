"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";

const OtpSendPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [contactNumber, setContactNumber] = useState<string>(""); // State to store the contact number
  const [userType, setUserType] = useState<string>("Installed User");
  const [loading, setLoading] = useState<boolean>(false);

  const otpSentRef = useRef<boolean>(false); // Track if OTP has been sent

  useEffect(() => {
    const contactNumberParam = searchParams.get("contact_number");
    const userTypeParam = searchParams.get("user_type") || "Installed User";

    if (contactNumberParam) {
      setContactNumber(contactNumberParam);
      setUserType(userTypeParam);
    }
  }, [searchParams]); // Depend on searchParams to set contactNumber and userType

  useEffect(() => {
    // Only call sendOtp if contactNumber and userType are set and OTP hasn't been sent
    if (contactNumber && !otpSentRef.current) {
      sendOtp(contactNumber, userType);
    }
  }, [contactNumber, userType]); // Depend on contactNumber and userType to trigger OTP send

  const sendOtp = async (contactNumber: string, userType: string) => {
    if (otpSentRef.current) return; // Prevent multiple OTP sends

    setLoading(true);

    try {
      const otpSendUrl =
        userType === "Installed User"
          ? `${baseUrl}/installations/send-otp/`
          : `${baseUrl}/user/send-otp/`;

      await axios.post(otpSendUrl, {
        contact_number: `+${contactNumber}`, // Ensure the number has a "+" prefix
      });

      otpSentRef.current = true; // Mark OTP as sent to prevent further sends
      toast.success("OTP sent successfully!");

      router.push(
        `/otpLoginPage/otpVerify?contact_number=${encodeURIComponent(
          contactNumber
        )}&user_type=${encodeURIComponent(userType)}`
      );
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
          Sending OTP...
        </h1>
        {loading && <p>Sending OTP to {contactNumber}...</p>}
      </div>
    </div>
  );
};

export default OtpSendPage;
