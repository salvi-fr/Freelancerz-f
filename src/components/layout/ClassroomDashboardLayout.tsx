import React from "react";
import Navbar from "../navbar/dashboardNavbar";
import AppLayout from "./AppLayout";

const ClassroomDashboardLayout: React.FC = ({ children }) =>{ 
  
  
  return (
  <AppLayout navbar={<Navbar />}>
          {children}
  </AppLayout>
)}

export default ClassroomDashboardLayout;
