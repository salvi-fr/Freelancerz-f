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
import { createApplication ,getApplications} from "@redux/actions/application";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import {
  updateJob,getJob
} from '@redux/actions/jobs'

const ViewJob = () => {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const dispatch = useDispatch()
 
 

  const {error:jobError=null}= useSelector((state) => state.job)
  const {job:fechedJob=null}= useSelector((state) => state.job)
  const [jobMock, setJobMock]=useState(null)
  const { applications = null, error: applicationError = null,createApplicationFailed,createApplicationSuccess } 
  = useSelector((state) => state.application)
  const { state:{auth:{isAuthenticated,user}} } = useAppContext();
  const [loading,setLoading]= useState(false)
  const [applicationData,setApplictationData]=useState([])
    let avatar= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
let canUserApply=isAuthenticated && user.userTypeId===1

useEffect(() => {
  console.log(user)
  dispatch(getApplications(id as string))
  dispatch(getJob(id as string ))
}, [dispatch])

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
     setApplictationData(applications.data)
    }
  }, [applications])

 

const HandleApply=()=>{
  try{
    setLoading(true)
    dispatch(createApplication({id:id as string}))
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
}
{applicationData && 
<div>
<H5 fontWeight="600" mt="0px" mb="0px">
          Applications
        </H5>
  {applicationData.map((item, ind) => (
    <FlexBox mb="30px" key={ind}>
      <Avatar src={item.imgUrl} mr="1rem" />
      <Box>
        <H5 fontWeight="600" mt="0px" mb="0px">
          {item.users.firstName}
        </H5>
        <SemiSpan>
          {format(new Date(item.createdAt), "hh:mm:a | dd MMM yyyy")}
        </SemiSpan>
        <Box borderRadius="10px" bg="gray.200" p="1rem" mt="1rem">
          {item.text}
        </Box>
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

const messageList = [
  {
    imgUrl: "/assets/images/faces/face-7.jpg",
    name: "Esther Howard",
    date: "2020-12-14T08:39:58.219Z",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum velit amet, aliquam massa tellus. Condimentum sit at pharetra, congue. Sit mattis amet nec pharetra odio. Interdum lorem vestibulum et amet et duis placerat. Ac mattis massa duis mi tellus sed. Mus eget in fames urna, ornare nunc, tincidunt tincidunt interdum. Amet aliquet pharetra rhoncus scelerisque pulvinar dictumst at sit. Neque tempor tellus ac nullam. Etiam massa tempor eu risus fusce aliquam.",
  },
  {
    imgUrl: "/assets/images/faces/10.jpg",
    name: "Ralph Edwards",
    date: "2021-01-05T05:39:58.219Z",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum velit amet, aliquam massa tellus. Condimentum sit at pharetra, congue. Sit mattis amet nec pharetra odio. Interdum lorem vestibulum et amet et duis placerat.",
  },
  {
    imgUrl: "/assets/images/faces/face-7.jpg",
    name: "Esther Howard",
    date: "2021-01-14T08:39:58.219Z",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nunc, lectus mi ornare. Bibendum proin euismod nibh tellus, phasellus.",
  },
];

ViewJob.layout = DashboardLayout;

export default ViewJob;
