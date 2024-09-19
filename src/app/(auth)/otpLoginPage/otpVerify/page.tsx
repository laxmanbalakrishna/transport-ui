"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "@/app/utils";

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [contactNumber, setContactNumber] = useState<string>("");
  const [userType, setUserType] = useState<string>("Installed User");

  useEffect(() => {
    const rawContactNumber = (searchParams.get("contact_number") || "").trim();
    const userTypeFromQuery = searchParams.get("user_type") || "Installed User";
    setContactNumber(
      rawContactNumber.startsWith("+")
        ? rawContactNumber
        : `+${rawContactNumber}`
    );
    setUserType(userTypeFromQuery);
  }, [searchParams]);

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let otpVerifyUrl: string;

      if (userType === "Installed User") {
        otpVerifyUrl = `${baseUrl}/installations/verify-otp/`;
      } else {
        otpVerifyUrl = `${baseUrl}/user/verify-otp/`;
      }

      const response = await axios.post(otpVerifyUrl, {
        contact_number: contactNumber,
        otp: otp.trim(),
      });

      console.log("OTP Verification Response:", response.data);

      if (response.status === 200) {
        const { token, user_type, username } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("username", username);

        // Notify the application about the login state change
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
          case "Installed User":
            router.push("/installedUser");
            break;
          default:
            router.push("/");
            break;
        }
      }
    } catch (error) {
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
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerifyPage;

// "use client";

// import React, { useState, useEffect, FormEvent } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { baseUrl } from "@/app/utils";

// const OtpVerifyPage = () => {
//   const [otp, setOtp] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [contactNumber, setContactNumber] = useState<string>("");
//   const [userType, setUserType] = useState<string>("InstalledUser");

//   useEffect(() => {
//     const rawContactNumber = (searchParams.get("contact_number") || "").trim();
//     const userTypeFromQuery = searchParams.get("user_type") || "InstalledUser";
//     setContactNumber(
//       rawContactNumber.startsWith("+")
//         ? rawContactNumber
//         : `+${rawContactNumber}`
//     );
//     setUserType(userTypeFromQuery);
//   }, [searchParams]);

//   const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let otpVerifyUrl: string;

//       if (userType === "Installed User") {
//         otpVerifyUrl = `${baseUrl}/installations/verify-otp/`;
//       } else {
//         otpVerifyUrl = `${baseUrl}/user/verify-otp/`;
//       }

//       // Step 1: Verify OTP
//       const response = await axios.post(otpVerifyUrl, {
//         contact_number: contactNumber,
//         otp: otp.trim(),
//       });

//       if (response.status === 200) {
//         let { token, user_type, username } = response.data;

//         // Step 2: Handle Installed User case where `user_type` and `username` may not be present
//         if (userType === "Installed User") {
//           // Fetch installation data based on contact number
//           const installationsResponse = await axios.get(
//             `${baseUrl}/installations/`
//           );

//           const installedUsers = installationsResponse.data.installations;
//           const user = installedUsers.find(
//             (installation: any) => installation.contact_number === contactNumber
//           );

//           if (user) {
//             username = user.owner_name; // Use `owner_name` as username
//             user_type = "Installed User"; // Manually set user_type
//           } else {
//             throw new Error("User not found");
//           }
//         }

//         // Store token, user_type, and username in localStorage
//         localStorage.setItem("token", token);
//         localStorage.setItem("user_type", user_type);
//         localStorage.setItem("username", username);

//         // Notify the application about the login state change
//         window.dispatchEvent(new Event("login"));

//         toast.success("OTP verified successfully!");

//         // Redirect based on user type
//         switch (user_type) {
//           case "Admin":
//             router.push("/admin/home");
//             break;
//           case "Manager":
//             router.push("/manager");
//             break;
//           case "InstalledUser":
//             router.push("/installedUser");
//             break;
//           default:
//             router.push("/");
//             break;
//         }
//       }
//     } catch (error) {
//       toast.error("OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Verify OTP
//         </h1>

//         <form onSubmit={handleVerifyOtp} className="space-y-6">
//           <div>
//             <label
//               htmlFor="otp"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Enter OTP
//             </label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter the OTP"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={loading}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OtpVerifyPage;
