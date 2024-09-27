"use client";

import React from "react";
import { useParams } from "next/navigation";
import EditInstallationForm from "./EditInstallationForm";
import ManagerLayout from "@/app/components/ManagerLayout/ManagerLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";

const EditInstallationPage = () => {
  const { installationId } = useParams();

  // Check if installationId is available
  if (!installationId) {
    return <p>Loading...</p>;
  }

  return (
    <ManagerLayout>
      <EditInstallationForm installationId={Number(installationId)} />
    </ManagerLayout>
  );
};

export default withAuth(EditInstallationPage, ["manager"]);
