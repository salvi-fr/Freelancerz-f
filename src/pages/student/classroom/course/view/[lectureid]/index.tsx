import Grid from "@component/grid/Grid";
import ClassroomDashboardLayout from "@component/layout/ClassroomDashboardLayout";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import React, { useState, useRef, useEffect } from "react";
import {
  getCourse
} from 'redux/actions/course'
import { ILecture,IQuiz, IModuleLecture } from "types";
import Hidden from "@component/hidden/Hidden";
import Container from "@component/Container";
import ClassroomDashboardNavigation from "@component/layout/ClassroomDashboardNavigation";
import Link from "next/link";
import Typography, { H4, H6 } from "@component/Typography";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Box from "@component/Box";
import CheckBox from "@component/CheckBox";
import Radio from "@component/radio/Radio";
import {getModule} from 'redux/actions/module'
import { createLectureView } from "redux/actions/lectureView";

const EditCourse = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const {
    query: { courseid, moduleid, lectureid },
  } = useRouter();
  const { course: fechedCourse = null } = useSelector((state) => state.course)
  const {module: fetchedModule = null} = useSelector((state) => state.module)

  const [loading, setLoading] = useState(true)

  const [courseNavigations, setCourseNavigations] = useState([])
  const firstUpdate = useRef(true);
  const [currentLecture, setCurrentLecture] = useState(null)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuizCopy, setCurrentQuizCopy] = useState(null)
  const [foundError, setFoundError] = useState(null)

console.log(foundError)
  useEffect(() => {
    console.log(loading)
    setLoading(true)
    if (!courseid || !moduleid || !lectureid) {
      router.push("/student/classroom")
    }else{
        console.log("some ids are here", courseid, moduleid, lectureid)
    dispatch(getCourse(courseid as string))
    dispatch(getModule(moduleid as string))
    firstUpdate.current = false}
  }, [dispatch])


  useEffect(()=>{
      if (fetchedModule && fetchedModule.lectures) {
       
            let cl = fetchedModule.lectures as IModuleLecture[]
            if (cl && cl.length) {
              const lecNav=  cl.map((lecture, count) => {
                let cll = lecture.lecture as ILecture
                return {
                  title: cll.title ? cll.title : `lecture ${count + 1}`,
                  href: `${cll._id} ?courseid=${courseid}&moduleid=${moduleid}`,
                  param: `?lecture=${cll._id}`,
                  iconName: "box",
                }

              })
              setCourseNavigations(lecNav)

            }
          }
  }, [fetchedModule])

  useEffect(() => {
    if (lectureid) {
    dispatch(createLectureView({lecture:lectureid as string}))
   if(fetchedModule  && fetchedModule.lectures && fetchedModule.lectures.length){
console.log("fetchedModule.lectures",fetchedModule.lectures)
     let currentLec=fetchedModule.lectures.map((lec) =>
     lec.lecture as ILecture
   ).find(a => a._id === lectureid)
    setCurrentLecture(currentLec)
    let currentQs= currentLec.quiz? currentLec.quiz as IQuiz : null 
    if(currentQs){
      console.log("currentQs",currentQs)
      console.log('current quiz ',currentQuiz)
      console.log('current lecture ',currentLecture)
      setCurrentQuizCopy(currentQs)
      currentQs.answers.forEach((ans) => {ans.is_answer = false})
      setCurrentQuiz( currentQs)
      
    }else {
      setCurrentQuizCopy(null)
      setCurrentQuiz( null)
    }
    
 
     }
    }
  }, [lectureid])

  const handleIsAnswer= async (index)=>{
    try {
      let cq= currentQuiz as IQuiz
      if(cq?.type=="SINGLE"){
        cq.answers?.map((a,i)=>{
          if(a.is_answer=true && i!=index && cq.answers[index].is_answer==false){
            a.is_answer=false
          }
        })
      }
      
      cq.answers[index].is_answer=!cq.answers[index].is_answer
      console.log("cq",cq)
      await setCurrentQuiz(cq)
console.log('current quiz',currentQuiz)
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  }

  const handleIsSubmitQuiz= async ()=>{

    // check if currentQuiz.ansewers  and currentQuizCopy.answers  are same
    
     

    var eq = await JSON.stringify(currentQuiz) === JSON.stringify(currentQuizCopy); 
if(eq){
  console.log("quiz is same")
}
}
  


  return (

    <div>
      <Container my="2rem">
        <Grid container spacing={6}>
          <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            {courseNavigations.length > 0 && <ClassroomDashboardNavigation navs={courseNavigations} />}
          </Hidden>
          <Grid item lg={9} xs={12}>
            <DashboardPageHeader
            from="Student"
              iconName="credit-card_filled"
              title={fechedCourse ? fechedCourse.title : "no"}
              button={
                <Link href={`/student/classroom/course/${courseid}/?module=${moduleid}`}>
                  <Button color="primary" bg="primary.light" px="2rem">
                    Back to course modules list
                  </Button>
                </Link>
              }
            />
            <Card1>
              {currentLecture ?

                <Typography color="text.muted">
                  <H4 >
                    {currentLecture.title}
                  </H4>
                  <div dangerouslySetInnerHTML={{ __html: currentLecture.content }}></div>
                  {currentQuiz &&
                  <Grid item lg={9} xs={12} >
                 
                      <Typography  color="text.muted"> {currentQuiz.title}</Typography>
                      {currentQuiz.answers.map((item, index) => (
                        <FlexBox
                          px="1rem"
                          py="0.5rem"
                          flexWrap="wrap"
                          alignItems="center"
                          key={index}
                        >
                          <FlexBox flex="2 2 260px" m="6px" alignItems="center">

                            <Box ml="20px">

                              <FlexBox alignItems="center">
                                {currentQuiz.type != 'SINGLE' && <CheckBox
                                  mb="1.75rem"
                                  name="isAnswer"
                                  color="secondary"
                                  checked={item.is_answer}
                                  onChange={() => {
                                    handleIsAnswer(index)
                                  }}
                                  label={
                                    <FlexBox>
                                      <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                                        {item.answer}
                                      </H6>
                                    </FlexBox>
                                  }
                                />}

                                {currentQuiz.type == 'SINGLE' && <Radio
                                  mb="1.75rem"
                                  name="isAnswer"
                                  color="secondary"
                                  checked={item.is_answer}
                                  onChange={() => {
                                    handleIsAnswer(index)
                                  }}
                                  label={
                                    <FlexBox>
                                      <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                                        {item.answer}
                                      </H6>
                                    </FlexBox>
                                  }
                                />}
                              </FlexBox>
                            </Box>
                          </FlexBox>
                        </FlexBox>
                      ))} 
                       <Button color="primary" bg="primary.light" px="2rem" onClick={handleIsSubmitQuiz}>
                    Submit
                  </Button>                
                    </Grid>
                  }
                </Typography> : <Typography textAlign="center" color="text.muted"> no lecture found</Typography>
              }
            </Card1>
          </Grid>
        </Grid>
      </Container>


    </div>

  )
};


EditCourse.layout = ClassroomDashboardLayout;

export default EditCourse;