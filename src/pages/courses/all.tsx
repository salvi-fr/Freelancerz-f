
// import NavbarLayout from "@component/layout/NavbarLayout";
import React from "react";
import AllCourses from "@component/course/all";
import Container from "@component/Container";
import DefaultLayout from "@component/layout/DefaultLayout";
const Courses = () => {

  return (
    <Container my="3rem">
      <AllCourses/>
    </Container>
   );
};

  Courses.layout = DefaultLayout;

 export default Courses

