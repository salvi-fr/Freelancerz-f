import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";

import Select from "@component/Select";
import Divider from "@component/Divider";
import {getLecture, updateLecture} from 'redux/actions/lecture'
import {getQuizes} from 'redux/actions/quiz'
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import { IQuiz } from "types";
import { toast, ToastContainer } from "react-toastify";

const EditQuiz = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
const {error:lectureError=null}= useSelector((state) => state.lecture);
  const {lecture:fechedLecture=null}= useSelector((state) => state.lecture)
  const [content, setContent] = useState(
    null
)
const {quizes=null}= useSelector((state) => state.quiz)
const [quizzesData, setQuizzesData]= useState([])
  const [lectureMock, setLectureMock]=useState(null)
  
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  const {updateLectureSuccess=false, updateLectureFailed=false}= useSelector((state) => state.lecture)
  const [loading , setLoading]= useState(false)
  useEffect(() => {
    if(updateLectureFailed && loading){
      toast.error(lectureError, {
        icon: "😨"
      });
      setLoading(false)  
      router.reload()
    }
  }, [updateLectureFailed])
useEffect(() => {
  if(updateLectureSuccess && loading){
    toast.success("successfully updated", {
      icon: "🚀",
      position: "top-right",
autoClose: 5000
    });
    setLoading(false)
    if(router.query.redirect){
      
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/lectures");
    }
    
  }
}, [updateLectureSuccess])
  useEffect(() => {
    dispatch(getQuizes())
    dispatch(getLecture(id as string ))
    firstUpdate.current = false
  }, [dispatch])
 

  

  useEffect(() => {
    if (quizes && quizes.data) {
        setQuizzesData([])
        quizes.data.map((item) => {
        setQuizzesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
    }
   
  }, [quizes])


  useEffect(() => {
    if(updateLectureFailed && loading){
      toast.error(lectureError, {
        icon: "😨"
      });
      setLoading(false)  
      router.reload()
    }
  }, [updateLectureFailed])
useEffect(() => {
  if(updateLectureSuccess && loading){
    toast.success("successfully updated", {
      icon: "🚀",
      position: "top-right",
autoClose: 5000
    });
    setLoading(false)
    if(router.query.redirect){
      
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/lectures");
    }
    
  }
}, [updateLectureSuccess])

  useEffect(() => {
    if(fechedLecture){
      setContent(fechedLecture.content)
      const lC=fechedLecture.quiz?  fechedLecture.quiz as IQuiz : null
      setLectureMock({...fechedLecture, quiz: lC? quizzesData.find(type => type.value === lC._id):null})
      }
  }, [fechedLecture,quizzesData])

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
      let {_id,created_by,createdAt,updatedAt,quiz, ...rest}=values
      rest.quiz=quiz.value? quiz.value:null
      await dispatch(updateLecture(id as string,rest))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  return (
    <div>
      <ToastContainer position="top-right"
autoClose={5000} />
      <DashboardPageHeader
        iconName="edit"
        title="Edit lecture" from="Admin"
        button={
          <Link href="/admin/lectures">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to lectures
            </Button>
          </Link>
        }
      />

      <Card1>
      {!lectureMock? <p>Loading</p>:
<>
<RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert content here..."
            />
        <Formik
          initialValues={lectureMock}
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
            <Box mb="30px" mt="30px">
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
                  label="Quiz"
                  placeholder="Select Quiz"
                  options={quizzesData}
                  value={values.quiz || ""}
                  onChange={(q) => {
                    setFieldValue("quiz", q);
                  }}
                  errorText={touched.quiz && errors.quiz}
                />
                </Grid>
                
              </Grid>
            </Box>

              <Button type="submit" variant="contained" color="primary" disabled={ loading} onClick ={() => {
            handleFormSubmit(values)
          }}>
                {loading? "Loading":"Save changes"}
              </Button>
            </form>
          )}
        </Formik>
        </>
         }
        <Divider bg="gray.300" m="0.5rem" />
        
      </Card1>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
  quiz_type: yup.object().required("Quiz type is required"),
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  answer: yup.string().nullable(),
  answers: yup.array().required("required"),
});
const quizTypes =[
  {value:'MULTIPLE' , label:'Multiple Choice'},
   {value:'SINGLE',label:'Single Choice'},
   {value:'NONE',label:'None'},
   {value:'COMPLETE',label:'Essay'}
  ]
EditQuiz.layout = AdminDashboardLayout;

export default  EditQuiz;