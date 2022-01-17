import React from "react";
import FlexBox from "@component/FlexBox";
import Login from "@component/sessions/Login";


const LoginPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Login />
    </FlexBox>
  );
};

export default LoginPage;
