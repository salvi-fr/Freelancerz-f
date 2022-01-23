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

import { ToastContainer } from "react-toastify";
  import {
    createLecture
  } from 'redux/actions/lecture'
  import {
    getQuizes
  } from 'redux/actions/quiz'

import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import Select from "@component/Select";


const NewLecture = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const {quizes=null}= useSelector((state) => state.quiz)
  const {error:quizError=null}= useSelector((state) => state.quiz)
  const [quizzesData, setQuizzesData]= useState([])
  const {error:lectureError=null}= useSelector((state) => state.lecture)
  const {createLectureSuccess=false, createLectureFailed=false}= useSelector((state) => state.lecture)
 const [loading ,setLoading]= useState(false)
  useEffect(() => {
    dispatch(getQuizes())
  }, [dispatch])


  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  useEffect(() => {
    if(lectureError && !firstUpdate.current){
        setFoundError(lectureError)
      }
  }, [lectureError])
  const [content, setContent] = useState(
    null
)
useEffect(() => {
  if(createLectureFailed && loading){
    setLoading(false)  
    router.reload()
  }
}, [createLectureFailed])

useEffect(() => {
if(createLectureSuccess && loading){
  setLoading(false)
  if(router.query.redirect){
    
    router.push(`/${router.query.redirect}`);
  }else{
    router.push("/admin/lectures");
  }
  
}
}, [createLectureSuccess])
useEffect(() => {
  if(quizError && !firstUpdate.current){
      setFoundError(quizError)
    }
  else if (quizes && quizes.data) {
      setQuizzesData([])
      quizes.data.map((item) => {
      setQuizzesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
      })
  }
  console.log("found quizes",quizzesData)
}, [quizes])

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
      let v= values
     v.content=content
     v.quiz=v.quiz? v.quiz.value:null
     console.log("value before submit ",v)
      await dispatch(createLecture(v))
      firstUpdate.current = false
      
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };
  // const {
  //   query: { id },
  // } = useRouter();


  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="New Lecture"
        from="Admin"
        button={
          <Link href="/admin/lectures">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to lectures
            </Button>
          </Link>
        }
      />

      <Card1>
    
        

        <RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert content here..."
            />
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

              <Button type="submit" variant="contained" color="primary" disabled={!content || loading}>
               {loading?  "loading":"Create"} 
              </Button>
            </form>
          )}
        </Formik>
       </Card1>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const initialValues = {
  title: "",
  quiz:null,
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  quiz:yup.string().nullable(),
});

NewLecture.layout = AdminDashboardLayout;

export default  NewLecture;