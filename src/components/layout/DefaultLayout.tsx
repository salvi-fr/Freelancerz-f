import React from "react";
import Navbar from "../navbar/dashboardNavbar";
import AppLayout from "./AppLayout";

const DefaultLayout: React.FC = ({ children }) => (
  <AppLayout navbar={<Navbar />}>
    <div >
   
          {children}
       
    </div>
  </AppLayout>
);

export default DefaultLayout;