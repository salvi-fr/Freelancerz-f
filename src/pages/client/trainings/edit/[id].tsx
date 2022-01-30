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
import {uploadImageFirebase, useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import Icon from "@component/icon/Icon";

import {getTraining,updateTraining  } from 'redux/actions/training'
import DropZone from "@component/DropZone";
import RichTextEditor from "@component/RichTextEditor/RichTextEditor";
import TextArea from "@component/textarea/TextArea";
import Spinner from "@component/Spinner";

const EditTraining  = () => {
  const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  console.log(id)
  const {error:trainingError=null}= useSelector((state) => state.training )
  const {training :fechedTraining =null}= useSelector((state) => state.training )
  const {updateTrainingSuccess=false}= useSelector((state) => state.training )
  const {updateTrainingloading =false}= useSelector((state) => state.training )
  const {getTrainingloading=false}= useSelector((state) => state.training )
  const [trainingMock, setTrainingMock]=useState(null)
  const [loading , setLoading]= useState(true)

  const firstUpdate = useRef(true);
  const [file,setFile]=useState(null)
  const [foundError,setFoundError]= useState(null)
  const [content,setContent] = useState(null)
  useEffect(() => {
    dispatch(getTraining (id as string ))
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(trainingError && !firstUpdate.current){
        setFoundError(trainingError)
      }
      console.log(foundError)
  }, [trainingError])

  useEffect(() => {
    if(fechedTraining ){
      setTrainingMock({...fechedTraining ,
        happen_from:fechedTraining.happen_from? new Date(fechedTraining.happen_from).toISOString().substring(0, 16):null,
        happen_to:fechedTraining.happen_to?new Date(fechedTraining.happen_to).toISOString().substring(0, 16):null})
      setContent(fechedTraining .content)
      setLoading(false)
      }
      console.log(trainingMock)
      setLoading(false)
  }, [fechedTraining ])

useEffect(() => {
  if(updateTrainingSuccess && !loading){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/instructor/trainings");
    }
    
  }
}, [updateTrainingSuccess])

  const handleFormSubmit = async (values) => {
    if(file){
      if(file){
        const avatarUrl= await uploadImageFirebase(file,`Publications`)
        values.avatar=avatarUrl
        }
      }
    try {
     let {_id,created_by,subscribers,createdAt,training_avatar,updatedAt, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
     console.log('just about to update',rest)
      await dispatch(updateTraining (id as string,rest))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="Edit training "
        from="Instructor"
        button={
          <Link href="/instructor/trainings">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to training es
            </Button>
          </Link>
        }
      />

      <Card1>
      {loading || !trainingMock? <p>Loading</p>:
      <div>
   <RichTextEditor
   content={content}
   handleContentChange={(content) => setContent(content)}
   placeholder="insert content here..."
/>
        <Formik
          initialValues={trainingMock}
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
                    <TextField
                      name="training_avatar"
                      label="Cover Image jpeg/png/jpg/gif"
                      fullwidth
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      onChange={(a) => {
                        setFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.training_avatar}
                      errorText={touched.training_avatar && errors.training_avatar}
                    />
                  </Grid>
                
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="happen_from"
                      label="From"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.happen_from || ""}
                      errorText={touched.happen_from && errors.happen_from}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="happen_to"
                      label="To"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.happen_to || ""}
                      errorText={touched.happen_to && errors.happen_to}
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
              </Box>
              <Button type="submit" variant="contained" color="primary" disabled={!content || updateTrainingloading }>
              {updateTrainingloading && <Spinner  />}
                Update training
              </Button>
            </form>
          )}
        </Formik>
        </div>
         }
        
        
      </Card1>
    </div>
  );
};


const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description:  yup.string().nullable(),
  happen_from:  yup.date().required("invalid date"),
  happen_to:  yup.date().required("invalid date"),
  training_avatar: yup.string().required("required")
});
EditTraining .layout = InstructorDashboardLayout;

export default  EditTraining ;