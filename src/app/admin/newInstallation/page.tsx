// src/app/admin/newInstallation/page.tsx

import React from "react";
import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import withAuth from "@/app/components/WithAuth/WithAuth";
import VehicleRegistrationForm from "./VehicleRegistrationForm";

const NewInstallationPage: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <VehicleRegistrationForm />
      </div>
    </AdminLayout>
  );
};

export default NewInstallationPage;
