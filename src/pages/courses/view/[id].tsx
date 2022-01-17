import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DefaultLayout from "@component/layout/DefaultLayout";
import CourseIntroCard from "@component/activities/CourseIntro";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import {
    getCourse
  } from 'redux/actions/course'
import { SemiSpan,H4 } from "@component/Typography";

const CourseView = () => {
    const router = useRouter();
    const dispatch = useDispatch()
   const {
      query: { id },
    } = useRouter();
  const {error:courseError=null}= useSelector((state) => state.course)
  const {course:fechedCourse=null}= useSelector((state) => state.course)
  const [courseMock, setCourseMock]=useState(null)
  const [loading , setLoading]= useState(true)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)


  useEffect(() => {
setLoading(true)
dispatch(getCourse(id as string ))
    firstUpdate.current = false
  }, [dispatch])


  useEffect(() => {
    if(courseError && !firstUpdate.current){
        setFoundError(courseError)
      }
      setLoading(false)
      console.log(foundError,router)
  }, [courseError])

  useEffect(() => {
    
    if(fechedCourse){
      setCourseMock({...fechedCourse
        
      })
      setLoading(false)
      }
  }, [fechedCourse])


  return (
    <div>
        {loading && <div>Loading...</div>}
       {courseMock &&  
       <div>
      <CourseIntroCard course={courseMock} />
      <Grid container spacing={6}>
      <FlexBox  p="30px" flexWrap="wrap" alignContent="center" >
          <H4>Course curriculum</H4>
      <SemiSpan color="text.muted" ml="12px" flexWrap="wrap">

      <div dangerouslySetInnerHTML={{__html: courseMock.curriculum}}></div>
                </SemiSpan>
                 </FlexBox>
      
      </Grid>
      </div>
}
    </div>
  );
};
CourseView.layout = DefaultLayout;

export default CourseView;
