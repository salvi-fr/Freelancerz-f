import React, { useEffect,useLayoutEffect,useRef } from "react";
import Container from "@component/Container";
import { useRouter } from "next/router";
import { useAppContext } from "@context/app/AppContext";
import DefaultLayout from "../components/layout/DefaultLayout";
const RefreshPage = () => {
    const { refreshToken,state:{auth} } = useAppContext();
  const router = useRouter();
  const firstUpdate = useRef(true);
  useEffect(() => {
    firstUpdate.current = false;
    if (typeof window !== "undefined") {
        const refresh = window.localStorage.getItem('refreshToken')
        console.log("refresh token",refresh)
        if(refresh) {
            refreshToken()
          }
          else{
            router.push("/login");
          }
     
      }
      else{
        router.push("/login");
      }   
  }, [])

  useLayoutEffect(() => {
if(firstUpdate.current){
    if (typeof window !== "undefined") {
        const refresh = window.localStorage.getItem('refreshToken')
        console.log("refresh token",refresh)
        if(refresh) {
            refreshToken()
          }
          else{
            router.push("/login");
          }
     
      }
      else{
        router.push("/login");
      }   
}else {
    if(auth.isAuthenticated){
        if(auth.user?.role?.name === 'admin'){
          router.push("/admin/dashboard");
        }
        else if (auth.user?.role?.name ==="instructor"){
          router.push("/instructor/dashboard"); 
        }

        else if (auth.user?.role?.name ==="student"){
          router.push("/student/classroom"); 
        }
    }else{
        router.push("/login");
    }

}
 
    console.log("componentDidUpdateFunction");
  });
  
  return (
    <Container mt="2rem">
       <p>loading</p>
    </Container>
  );
};


export default RefreshPage;