"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[] = []
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(true);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userRole =
      typeof window !== "undefined"
        ? localStorage.getItem("user_type")?.toLowerCase() // Convert to lowercase
        : null;

    useEffect(() => {
      if (!token) {
        // router.push("/login"); // Redirect to login page if not authenticated
        setHasAccess(false);
        setIsLoading(false);
      } else if (userRole && !allowedRoles.includes(userRole)) {
        // router.push(`/${userRole}/home`); // Redirect to lowercase URL based on user role
        setHasAccess(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }, [token, userRole, router, allowedRoles]);

    if (isLoading) {
      return <p>Loading...</p>; // Or a spinner/placeholder while redirecting
    }

    if (!hasAccess) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
          <div className="bg-white p-10 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 text-center">
            <FaLock size={60} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-red-500 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {token
                ? "You do not have the necessary permissions to view this page."
                : "You are not authenticated. Please log in or return to the homepage."}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  const route =
                    userRole === "installed user" ? "installed-user" : userRole;
                  token ? router.push(`/${route}/home`) : router.push(`/`);
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-300 ease-in-out"
              >
                {token ? "Go to Home Page" : "Go to Homepage"}
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-all duration-300 ease-in-out"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
