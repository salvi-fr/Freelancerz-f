import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import InstructorDashboardLayout from "@component/layout/DashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import Icon from "@component/icon/Icon";

  import {
    createQuiz
  } from 'redux/actions/quiz'
import TextArea from "@component/textarea/TextArea";
import Select from "@component/Select";
import { H6 } from "@component/Typography";
import FlexBox from "@component/FlexBox";
import IconButton from "@component/buttons/IconButton";
import Divider from "@component/Divider";
import CheckBox from "@component/CheckBox";
import Radio from "@component/radio/Radio";
import { ToastContainer } from "react-toastify";

const NewQuiz = () => {
    const router = useRouter();
  const dispatch = useDispatch()

  const {error:quizError=null}= useSelector((state) => state.quiz)
  const {createQuizSuccess=false}= useSelector((state) => state.quiz)
 const [quizAnswers, setQuizAnswers]=useState([])
 const [quizNewAnswer,setQuizNewAnswer]=useState("")
const [type,setType]= useState('')
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  
  useEffect(() => {
    if(quizError && !firstUpdate.current){
        setFoundError(quizError)
      }
  }, [quizError])

  useEffect(() => {
firstUpdate.current = true
  }, [dispatch])

useEffect(() => {
  if(createQuizSuccess && !firstUpdate.current){
    if(router.query.redirect){
      
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/instructor/quizzes");
    }
    
  }
}, [createQuizSuccess])
const handleAnswerSubmit = async () => {
  try {
      setQuizAnswers([...quizAnswers,{answer:quizNewAnswer,is_answer:false}])
    setQuizNewAnswer("")
    firstUpdate.current = true
    
  } catch (e) {
    console.log("got error", e)
      setFoundError(e.message)
      
  }
};
const handleIsAnswer= async (index)=>{
  try {
    const newQuizAnswers=[...quizAnswers]
    if(type=="SINGLE"){
      quizAnswers.map((a,i)=>{
        if(a.is_answer=true && i!=index && quizAnswers[index].is_answer==false){
          a.is_answer=false
        }
      })
    }
    
    newQuizAnswers[index].is_answer=!newQuizAnswers[index].is_answer
    setQuizAnswers(newQuizAnswers)
  } catch (e) {
    console.log("got error", e)
      setFoundError(e.message)
      
  }
}
const handleRemoveAnswer= async (index)=>{
  try {
    const newQuizAnswers=[...quizAnswers]
    newQuizAnswers.splice(index,1)
    setQuizAnswers(newQuizAnswers)
  } catch (e) {
    console.log("got error", e)
      setFoundError(e.message)
      
  }
}
  const handleFormSubmit = async (values) => {
    try {
      const { title,description } = values;
      const quiz = {title,description,type,answers:quizAnswers}
     values.answers=quizAnswers
      await dispatch(createQuiz(quiz))
    } catch (e) {

      console.log("got error", e,foundError)
        setFoundError(e.message)
        
    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="New quiz"
        from="Instructor"
        button={
          <Link href="/instructor/quizzes">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to quizes
            </Button>
          </Link>
        }
      />

      <Card1>
      

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="title"
                      label="Title"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title || ""}
                      errorText={touched.title  && errors.title }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <Select
                    label="Quiz type"
                    placeholder="Select Quiz Type"
                    options={quizTypes}
                    value={values.quiz_type || ""}
                    onChange={(t:any) => {
                      setQuizAnswers([])
                      setType(t.value)
                      setFieldValue("answer", null);
                      setFieldValue("quiz_type", t);
                    }}
                    errorText={touched.quiz_type && errors.quiz_type}
                  />
                 
                  </Grid>
                  <Grid item xs={12}>
                  <TextArea
                    name="description"
                    label="Description"
                    placeholder="Description"
                    rows={6}
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description || ""}
                    errorText={touched.description && errors.description}
                  />
                </Grid>
                </Grid>
        
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
             
                <Divider bg="gray.300" m="0.5rem" />
                 
                  {/* <hr></hr> */}
                  <Grid item md={8} xs={12}>
                   {(type=='MULTIPLE' || type=='SINGLE') && 
                   
                      <TextField
                      name="quizNewAnswer"
                      label="Type an answer"
                      fullwidth
                      onChange={(a) => { 
                        setQuizNewAnswer(a.target.value)
                      }}
                      value={quizNewAnswer|| ""}
                    /> 
                   
                } 
                     { type=='COMPLETE' && 
                   
                      <TextArea
                      name="quizNewAnswer"
                      label="Type an answer"
                      fullwidth
                      onChange={(a) => {
                        setQuizNewAnswer(a.target.value)
                      }}
                      value={quizNewAnswer|| ""}
                    /> 
                } 
                </Grid>
                
                </Grid>
     
              </Box>

              <Button  variant="contained" color="secondary" onClick={handleAnswerSubmit} disabled={!quizNewAnswer}>
                Add Answer
              </Button>
           
                <Box py="0.5rem">
          {quizAnswers.map((item,index) => (
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
              {type!='SINGLE' &&    <CheckBox
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

{type=='SINGLE' &&    <Radio
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
  
              <FlexBox flex="0 0 0 !important" m="6px" alignItems="center">
                <IconButton size="small" onClick={()=>{
                  handleRemoveAnswer(index)
                }}>
                  <Icon variant="small">delete</Icon>
                </IconButton>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!quizAnswers.length} onClick ={() => {
            handleFormSubmit(values)
          }}>
                Create Quiz
              </Button>
            </form>
          )}
        </Formik>
        <Divider bg="gray.300" m="0.5rem" />
        
       </Card1>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const initialValues = {
  title: "",
  description: "",
  answers: null,
  quiz_type:"",
  answer:""
};

const checkoutSchema = yup.object().shape({
  quiz_type: yup.object().required("Quiz type is required"),
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  answer: yup.string(),
  answers: yup.array().required("required"),
});
const quizTypes =[
  {value:'MULTIPLE' , label:'Multiple Choice'},
   {value:'SINGLE',label:'Single Choice'},
   {value:'NONE',label:'None'},
   {value:'COMPLETE',label:'Essay'}
  ]
NewQuiz.layout = InstructorDashboardLayout;

export default  NewQuiz;