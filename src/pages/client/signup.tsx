import { useAppContext } from "@context/app/AppContext";
import React, { useEffect } from "react";
import FlexBox from "@component/FlexBox";
import Signup from "@component/sessions/Signup";

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
      <Signup role={"instructor"}/>
    </FlexBox>
  );
};

export default SignUpPage;
