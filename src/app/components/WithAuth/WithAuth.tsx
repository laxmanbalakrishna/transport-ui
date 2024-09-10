// src/app/components/WithAuth/WithAuth.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!token) {
        router.push("/login"); // Redirect to login page if not authenticated
      } else {
        setIsLoading(false);
      }
    }, [token, router]);

    if (isLoading) {
      return <p>Loading...</p>; // Or a spinner/placeholder while redirecting
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
