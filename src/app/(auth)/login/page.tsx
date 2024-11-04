// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { HandleLogin } from "@/app/utils/authUtils"; // Import the utility function
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter(); // Use the router here

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     setLoading(true);

//     await HandleLogin(email, password, router); // Pass the router

//     // Clear input fields after login attempt
//     setEmail("");
//     setPassword("");
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-200">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <div className="text-center mb-6">
//           <Image
//             src="/Logo.jpg"
//             alt="B Transport Logo"
//             width={100}
//             height={100}
//             className="mx-auto"
//           />
//           <h1 className="text-2xl font-bold mt-2 text-blue-600">
//             B Transport Company
//           </h1>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
//         >
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {loading ? "Logging In..." : "Log In"}
//           </button>
//         </form>
//         <div className="flex justify-between items-center mb-6">
//           {/* Add OTP-based login link */}
//           <div className="text-left mt-4">
//             <button
//               // onClick={() => router.push("/otplogin/otp-login")}
//               onClick={() => router.push("/otpLoginPage")}
//               className="text-blue-600 underline"
//             >
//               Login with OTP
//             </button>
//           </div>

//           {/* Add Forgot Password link */}
//           <div className="text-right mt-4">
//             <button
//               onClick={() => router.push("/forgot-password")}
//               className="text-blue-600 underline"
//             >
//               Forgot Password
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

// src/app/(auth)/login/page.tsx (Login Page)
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/reduxToolKit/store";
import { login } from "@/app/reduxToolKit/auth/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/reduxToolKit/store";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, token, user_type } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // UseEffect to check for the token and user_type after login
  useEffect(() => {
    // Trigger localStorage event to rerender NavBar
    window.dispatchEvent(new Event("storage"));

    if (token && user_type) {
      // Redirect based on user_type
      switch (user_type) {
        case "Admin":
          router.push("/admin/home");
          break;
        case "Manager":
          router.push("/manager/home");
          break;
        case "Installed User":
          router.push("/installed-user/home");
          break;
        default:
          router.push("/dashboard");
          break;
      }
    }
  }, [token, user_type, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <Image
            src="/Logo.jpg"
            alt="B Transport Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold mt-2 text-blue-600">
            B Transport Company
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-blue-400 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="flex justify-between items-center mb-6">
          {/* Add OTP-based login link */}
          <div className="text-left mt-4">
            <button
              // onClick={() => router.push("/otplogin/otp-login")}
              onClick={() => router.push("/otpLoginPage")}
              className="text-blue-600 underline"
            >
              Login with OTP
            </button>
          </div>

          {/* Add Forgot Password link */}
          <div className="text-right mt-4">
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 underline"
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
