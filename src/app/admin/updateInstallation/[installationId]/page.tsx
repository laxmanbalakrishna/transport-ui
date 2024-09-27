"use client";

import React from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import EditInstallationForm from "./EditInstallationForm";
import withAuth from "@/app/components/WithAuth/WithAuth";

const EditInstallationPage = () => {
  const { installationId } = useParams();

  // Check if installationId is available
  if (!installationId) {
    return <p>Loading...</p>;
  }

  return (
    <AdminLayout>
      <EditInstallationForm installationId={Number(installationId)} />
    </AdminLayout>
  );
};

export default withAuth(EditInstallationPage, ["admin"]);
