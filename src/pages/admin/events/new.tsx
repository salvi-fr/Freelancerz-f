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
import {uploadImageFirebase, useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import Spinner from "@component/Spinner";
import TextArea from "@component/textarea/TextArea";
  import {
    createEvent
  } from 'redux/actions/event'
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import { toast, ToastContainer } from "react-toastify";
const NewEvent = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const {error:eventError=null}= useSelector((state) => state.event)
  const [file,setFile]=useState(null)
  const [content, setContent] = useState(
    null
)
const { createEventSuccess=false,  createEventFailed=false}= useSelector((state) => state.event)
const [loading , setLoading]= useState(false)
useEffect(() => {
  if( createEventFailed && loading){
    toast.error(eventError, {
      icon: "😨"
    });
    setLoading(false)  
    router.reload()
  }
}, [ createEventFailed])
useEffect(() => {
if( createEventSuccess && loading){
  toast.success("successfully updated", {
    icon: "🚀",
    position: "top-right",
autoClose: 5000
  });
  setLoading(false)
  if(router.query.redirect){
    
    router.push(`/${router.query.redirect}`);
  }else{
    router.push("/admin/events");
  } 
}
}, [ createEventSuccess,loading])

  const handleFormSubmit = async (values) => {
    setLoading(true)
    if(file){
      const avatarUrl= await uploadImageFirebase(file,`Events`)
      values.avatar=avatarUrl
      }
    try {
      let v ={...values , content}
      await dispatch(createEvent(v))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        
    }
  };


  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="New Event" from="Admin"
        button={
          <Link href="/admin/events">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to events
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
                    <TextField
                      name="event_avatar"
                      label="Cover  Image"
                      fullwidth
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      // onBlur={handleBlur}
                      onChange={(a) => {
                        console.log(a.target.files[0])
                        setFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.event_avatar}
                      errorText={touched.event_avatar && errors.event_avatar}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="happen_from"
                      label="From"
                      type="datetime-local"
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
                      type="datetime-local"
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

              <Button type="submit" variant="contained" color="primary" disabled= {!content || loading}>
              {loading && <Spinner  />}
                Create Event
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
  description: "",
  happen_from: "",
  happen_to: "",
  event_avatar: "",
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description:  yup.string(),
  happen_from:  yup.date().required("invalid date"),
  happen_to:  yup.date().required("invalid date"),
  event_avatar: yup.string().required("required")
});

NewEvent.layout = AdminDashboardLayout;

export default  NewEvent;