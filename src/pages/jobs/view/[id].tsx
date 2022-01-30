import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DefaultLayout from "@component/layout/DefaultLayout";
import JobIntroCard from "@component/activities/JobIntro";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import {
    getJob
  } from '@redux/actions/jobs'
import { SemiSpan,H4 } from "@component/Typography";

const JobView = () => {
    const router = useRouter();
    const dispatch = useDispatch()
   const {
      query: { id },
    } = useRouter();
  const {error:jobError=null}= useSelector((state) => state.job)
  const {job:fechedJob=null}= useSelector((state) => state.job)
  const [jobMock, setJobMock]=useState(null)
  const [loading , setLoading]= useState(true)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)


  useEffect(() => {
setLoading(true)
dispatch(getJob(id as string ))
    firstUpdate.current = false
  }, [dispatch])


  useEffect(() => {
    if(jobError && !firstUpdate.current){
        setFoundError(jobError)
      }
      setLoading(false)
      console.log(foundError,router)
  }, [jobError])

  useEffect(() => {
    
    if(fechedJob){
      setJobMock({...fechedJob
        
      })
      setLoading(false)
      }
  }, [fechedJob])


  return (
    <div>
        {loading && <div>Loading...</div>}
       {jobMock &&  
       <div>
      <JobIntroCard job={jobMock} />
      <Grid container spacing={6}>
      <H4 ml="50px" >Job Description</H4>
      <FlexBox  p="30px" flexWrap="wrap" alignContent="center" >
          
          <br/>
      <SemiSpan color="text.muted" ml="12px" flexWrap="wrap">

      <div dangerouslySetInnerHTML={{__html: jobMock.description}}></div>
                </SemiSpan>
                 </FlexBox>
      
      </Grid>
      </div>
}
    </div>
  );
};
JobView.layout = DefaultLayout;

export default JobView;
