import React, { useEffect, useState } from "react";
import { IJob } from "types";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan, Small } from "../Typography";
import { IntroWrapper } from "./style";
import { Chip } from "@component/Chip";
import { format } from "date-fns";
import { useAppContext } from "@context/app/AppContext";
import { createApplication ,getApplications} from "@redux/actions/application";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
export interface jobProps {
    job: IJob
}

const JobIntroCard: React.FC<jobProps> = ({job}) => {
  const dispatch = useDispatch()
  const router = useRouter();
  useEffect(() => {
    console.log(user)
    dispatch(getApplications(job.id))
  }, [dispatch])
  const { applications = null, error: applicationError = null,createApplicationFailed,createApplicationSuccess } 
  = useSelector((state) => state.application)
  const { state:{auth:{isAuthenticated,user}} } = useAppContext();
  const [loading,setLoading]= useState(false)
    let avatar= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
let canUserApply=isAuthenticated && user.userTypeId===1

useEffect(() => {
  if(createApplicationFailed && loading){
    toast.error(applicationError, {
      icon: "😨"
    });
    setLoading(false)  
    // router.reload()
  }
}, [createApplicationFailed])


  useEffect(() => {
    if(createApplicationSuccess && loading){
      toast.success("successfully updated", {
        icon: "🚀",
        position: "top-right",
  autoClose: 5000
      });
      setLoading(false)
      if(router.query.redirect){
        
        router.push(`/${router.query.redirect}`);
      }else{
        router.push("/me");
      }
      
    }
  }, [createApplicationSuccess,loading])

  useEffect(() => {
    if (applications && applications.data && applications.data.length) {
      if(user && user.id){
        
        applications.data.map((a)=>{
          if(a.users.email===user.email){
            canUserApply=false
            return 0
          }
          
        })

      }
    }

  }, [applications])

 

const HandleApply=()=>{
  try{
    setLoading(true)
    dispatch(createApplication({id:job.id}))
  }catch(e){
    console.log(e)
    setLoading(false)
  }
  
    

}
   
  return (
    <IntroWrapper mb="32px" pb="20px" overflow="hidden" coverImgUrl={avatar}>
      <Box className="cover-image" height="100px"  />

      <FlexBox mt="-64px" px="30px" flexWrap="wrap">

        <Box className="description-holder" flex="1 1 0">
          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="3px"
            mb="22px"
          >
            <Box
            //   bg="secondary.main"
              borderRadius="4px"
              p="4px 16px"
              display="inline-block"
              my="8px"
            >
              <H3 fontWeight="600" color="gray.100">
                {job.title}
              </H3>
            </Box>
          </FlexBox>

          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="20px" m="6px">
            dollar
          </Icon>
          <SemiSpan m="6px">
            <strong>{ job.price } Rwf</strong>
          </SemiSpan>
        </FlexBox>

              <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
          bag
          </Icon>
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main"> {job.yearsOfExperience} Year of experience required</Small>
              </Chip>
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           categories
          </Icon>
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main"><strong> Type: </strong>{job.jobType}</Small> 
              </Chip>
        </FlexBox>
              <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           grid
          </Icon>
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main"><strong> Status: </strong> {job.status}</Small>
              </Chip>
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           alarm-clock
          </Icon>
          <SemiSpan className="pre" m="6px">
          <strong> Start Date:</strong> {format(new Date(job.startDate), "MMM dd, yyyy")}
                </SemiSpan>
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           watch
          </Icon>
          <SemiSpan className="pre" m="6px">
                 <strong> End Date:</strong> {format(new Date(job.endDate), "MMM dd, yyyy")}
                </SemiSpan>
        </FlexBox>
        {job.stacks && 
                <>
                {job.stacks.map((stack,ind) => (
                  <Chip p="0.25rem 1rem" bg="primary.light" m="6px" key={ind}>
                  <Small color="primary.main">{stack.tech}</Small>
                </Chip>
                ))
                }
                </>
                }
            </Box>

           {canUserApply&& 
           <Button variant="outlined" color="primary" my="12px"
           onClick={HandleApply} disabled={loading}
         >
           Apply
           </Button>
           }

           {!isAuthenticated&&
            <Button variant="outlined" color="primary" my="12px"
            // ref={`/me`}
          >
            Login to Apply
            </Button>
            }
            {isAuthenticated && !canUserApply &&
             <Button variant="outlined" color="primary" my="12px" disabled
             
           >
             Only developer can apply
             </Button>
            }
              
           

          </FlexBox>
        </Box>
      </FlexBox>
      <ToastContainer autoClose={2000} />
    </IntroWrapper>
  );
};


export default JobIntroCard;
