import React from "react";
import Container from "../Container";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import Navbar from "../navbar/dashboardNavbar";
import StudentDashboardNavigation from "./DeveloperDashboardNavigation";
import AppLayout from "./AppLayout";

const StudentDashboardLayout: React.FC = ({ children }) => (
  <AppLayout navbar={<Navbar />}>
    <Container my="2rem">
      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <StudentDashboardNavigation />
        </Hidden>
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default StudentDashboardLayout;
