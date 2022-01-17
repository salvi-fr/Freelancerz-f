import React, { useEffect } from "react";
import Container from "../../components/Container";
import DefaultLayout from "@component/layout/NRFLayout";
import { useRouter } from "next/router";
const SalePage2 = () => {
  const router = useRouter();
  useEffect(() => {
        router.push("/nrf/article");
      
  }, [])
  return (
    <Container mt="2rem">
       loading
    </Container>
  );
};

SalePage2.layout = DefaultLayout;

export default SalePage2;