import { useAppContext } from "@context/app/AppContext";
import React, { useEffect } from "react";
import FlexBox from "../components/FlexBox";
import Signup from "../components/sessions/Signup";

const SignUpPage = () => {
  const { state } = useAppContext();
  useEffect(() => {
  
  console.log("just cart in signup ",state)
  })
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Signup role={"student"}/>
    </FlexBox>
  );
};

export default SignUpPage;
