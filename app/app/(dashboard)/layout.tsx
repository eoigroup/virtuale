import React, { ReactNode } from "react";
import Providers from "./providers";
import DashboardLayout from "./dash-layout";

const DashLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  );
};

export default DashLayout;
