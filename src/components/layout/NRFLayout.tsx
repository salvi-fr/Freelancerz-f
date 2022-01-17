import React from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import NRF from "../navbar/NRFNavbar";
import Navbar from "../navbar/dashboardNavbar";
import AppLayout from "./AppLayout";

const AdminDashboardLayout: React.FC = ({ children }) => (
  <AppLayout navbar={<Navbar />} nrf={<NRF/>}>
    <Container my="2rem">
      <Grid container spacing={6}>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default AdminDashboardLayout;