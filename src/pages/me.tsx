import React, { useEffect,useLayoutEffect,useRef } from "react";
import Container from "@component/Container";
import { useRouter } from "next/router";
import { useAppContext } from "@context/app/AppContext";
import DefaultLayout from "../components/layout/DefaultLayout";
const MePage = () => {
const { loginWithToken,state:{auth} } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    firstUpdate.current = false;
    console.log("just cart in signup ",auth)
      if(auth.isAuthenticated){
          if(auth.user?.userTypeId === 3){
            router.push("/admin/dashboard");
          }
          else if (auth.user?.userTypeId ===1){
            router.push("/developer/dashboard"); 
          }

          else if (auth.user?.userTypeId ===2){
            router.push("/client/dashboard"); 
          }
      }
      else if (typeof window !== "undefined") {
        const access = window.localStorage.getItem('accessToken')
        if(access) {
          loginWithToken()
          }
          else{
            router.push("/login");
          } 
      }
      else{
        router.push("/login");
      } 
      
  }, [])

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if(auth.isAuthenticated){
      if(auth.user?.userTypeId === 3){
        router.push("/admin/dashboard");
      }
      else if (auth.user?.userTypeId ===1){
        router.push("/developer/dashboard"); 
      }

      else if (auth.user?.userTypeId ===2){
        router.push("/client/dashboard"); 
      }
    } else if(firstUpdate.current){
        if (typeof window !== "undefined") {
            const access = window.localStorage.getItem('accessToken')
            if(access) {
              loginWithToken()
              }
              else{
                router.push("/login");
              }
          }
          else{
            router.push("/login");
          }
    }
  });

  
  return (
    <Container mt="2rem">
      <p>loading</p>
    </Container>
  );
};
 MePage.Layout = DefaultLayout;

export default MePage;