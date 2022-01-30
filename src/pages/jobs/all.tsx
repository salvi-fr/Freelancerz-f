
// import NavbarLayout from "@component/layout/NavbarLayout";
import React from "react";
import AllJobs from "@component/job/all";
import Container from "@component/Container";
import DefaultLayout from "@component/layout/DefaultLayout";
const Jobs = () => {

  return (
    <Container my="3rem">
      <AllJobs/>
    </Container>
   );
};

  Jobs.layout = DefaultLayout;

 export default Jobs

