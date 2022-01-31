import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import DashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextArea from "@component/textarea/TextArea";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IJob } from "types";
import Icon from "@component/icon/Icon";
import { H3,H5, SemiSpan, Small } from "@component/Typography";
import { Chip } from "@component/Chip";
import { useAppContext } from "@context/app/AppContext";
import { approveApplication ,getApplications} from "@redux/actions/application";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import {
getJob
} from '@redux/actions/jobs'
import TableRow from "@component/TableRow";

const ViewJob = () => {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const dispatch = useDispatch()
 
 

  const {error:jobError=null}= useSelector((state) => state.job)
  const {job:fechedJob=null}= useSelector((state) => state.job)
  const [jobMock, setJobMock]=useState(null)
  const { applications = null, error: applicationError = null,updateApplicationFailed,updateApplicationSuccess } 
  = useSelector((state) => state.application)
  const { state:{auth:{isAuthenticated,user}} } = useAppContext();
  const [loading,setLoading]= useState(false)
  const [applicationData,setApplictationData]=useState([])
    let avatar= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
let canUserApply=isAuthenticated && user.userTypeId===1
const [appId, setId]=useState()

useEffect(() => {
  console.log(user)
  dispatch(getApplications(id as string))
  dispatch(getJob(id as string ))
}, [dispatch])

useEffect(() => {
  if(updateApplicationFailed && loading){
    toast.error(applicationError, {
      icon: "😨"
    });
    setLoading(false)  
    // router.reload()
  }
}, [updateApplicationFailed])


  useEffect(() => {
    if(updateApplicationSuccess && loading){
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
  }, [updateApplicationSuccess,loading])

  useEffect(() => {
    if (applications && applications.data && applications.data.length) {
     setApplictationData(applications.data)
    }
  }, [applications])

 

const HandleApprove=(appid:string)=>{
  try{
    setLoading(true)
    console.log(appid)
    dispatch(approveApplication( appid as string))
  }catch(e){
    console.log(e)
    setLoading(false)
  }
  
    

}

  return (
    <div>
      <DashboardPageHeader
        iconName="support"
        title="Support Ticket"
        from="Admin"
        button={
          <Link href="/admin/jobs">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Jobs
            </Button>
          </Link>
        }
      />
{fechedJob &&
  <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <H3 fontWeight="600" mt="0px" mb="0px">
              {fechedJob.title}
            </H3>
            <Box borderRadius="10px" bg="gray.200" p="1rem" mt="1rem">
              {fechedJob.description}
            </Box>
            <Box>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="20px" m="6px">
            dollar
          </Icon>
          <SemiSpan m="6px">
            <strong>{ fechedJob.price } Rwf</strong>
          </SemiSpan>
        </FlexBox>

              <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
          bag
          </Icon>
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main"> {fechedJob.yearsOfExperience} Year of experience required</Small>
              </Chip>
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           categories
          </Icon>
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main"><strong> Type: </strong>{fechedJob.jobType}</Small> 
              </Chip>
        </FlexBox>
              <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           grid
          </Icon>
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main"><strong> Status: </strong> {fechedJob.status}</Small>
              </Chip>
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           alarm-clock
          </Icon>
          <SemiSpan className="pre" m="6px">
          <strong> Start Date:</strong> {format(new Date(fechedJob.startDate), "MMM dd, yyyy")}
                </SemiSpan>
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="20px" m="6px">
           watch
          </Icon>
          <SemiSpan className="pre" m="6px">
                 <strong> End Date:</strong> {format(new Date(fechedJob.endDate), "MMM dd, yyyy")}
                </SemiSpan>
        </FlexBox>
        {fechedJob.stacks && 
                <>
                {fechedJob.stacks.map((stack,ind) => (
                  <Chip p="0.25rem 1rem" bg="primary.light" m="6px" key={ind}>
                  <Small color="primary.main">{stack.tech}</Small>
                </Chip>
                ))
                }
                </>
                }


            </Box>
              
          </FlexBox>
}
{applicationData && 
<div>
<H5 fontWeight="600" mt="0px" mb="0px">
          Applications
        </H5>
  {applicationData.map((item, ind) => (
    <FlexBox mb="30px" key={ind}>
      <Avatar src={avatar} mr="1rem" />
      <Box>
        <H5 fontWeight="600" mt="0px" mb="0px">
          {item.users.firstName}
        </H5>
        <SemiSpan>
          {format(new Date(item.createdAt), "hh:mm:a | dd MMM yyyy")}
        </SemiSpan>
        <Box borderRadius="10px" bg="gray.200"  mt="1rem">
        <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
          Recommendation
          </Small>
          <span>{item.recommendation}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Status
          </Small>
          <span>{item.status}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Github
          </Small>
          <span>{item.users.githubUsername}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            LinkedIn
          </Small>
          <span>{item.users.linkedIn}</span>
        </FlexBox>
        
       
      </TableRow>
        </Box>
        <Button variant="outlined" color="primary" my="12px"
          
           onClick={() => {
            setId(item.id)
            HandleApprove(item.id)
          }}
          disabled={loading}
         >
           {item.status=="pending"? "approve": "Reject"}
           </Button>
      </Box>
      
    </FlexBox>
  ))}
  </div>
}
    

      <Divider mb="2rem" bg="gray.300" />

      <TextArea
        placeholder="Write your message here..."
        rows={8}
        borderRadius={8}
        fullwidth
        mb="1.5rem"
      />

      <Button
        variant="contained"
        color="primary"
        ml="auto"
       
      >
        Post message
      </Button>
    </div>
  );
};


ViewJob.layout = DashboardLayout;

export default ViewJob;
