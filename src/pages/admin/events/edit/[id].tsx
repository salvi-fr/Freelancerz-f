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
  import {
    updateEvent,getEvent
  } from 'redux/actions/event'
import Spinner from "@component/Spinner";
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import TextArea from "@component/textarea/TextArea";
import { toast } from "react-toastify";
const EditEvent = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
 
  const {error:eventError=null}= useSelector((state) => state.event)
  const {event:fechedEvent=null}= useSelector((state) => state.event)
  const [eventMock, setEventMock]=useState(null)
  const firstUpdate = useRef(true);
  const [file,setFile]=useState(null)
  const [content,setContent] = useState(null)
  const { updateEventSuccess=false,  updateEventFailed=false}= useSelector((state) => state.event)
const [loading , setLoading]= useState(false)
useEffect(() => {
  if( updateEventFailed && loading){
    toast.error(eventError, {
      icon: "😨"
    });
    setLoading(false)  
    router.reload()
  }
}, [ updateEventFailed])
useEffect(() => {
if( updateEventSuccess && loading){
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
}, [ updateEventSuccess,loading])

  useEffect(() => {
    console.log(id)
    dispatch(getEvent(id as string ))
  }, [dispatch])

  useEffect(() => {
    if(fechedEvent){
      setEventMock({...fechedEvent,
        happen_from:fechedEvent.happen_from? new Date(fechedEvent.happen_from).toISOString().substring(0, 16):null,
        happen_to:fechedEvent.happen_to?new Date(fechedEvent.happen_to).toISOString().substring(0, 16):null})
      setContent(fechedEvent.content)
      }
      console.log("just fetched event",eventMock)
  }, [fechedEvent])


  const handleFormSubmit = async (values) => {
    setLoading(true)  
    if(file){
      if(file){
        const avatarUrl= await uploadImageFirebase(file,`Events`)
        values.avatar=avatarUrl
        }
      }
    try {
     let {_id,created_by,subscribers,createdAt,event_avatar,updatedAt, ...rest}=values
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
     console.log('just about to update',rest)
      await dispatch(updateEvent(id as string,rest))
    } catch (e) {
      console.log("got error", e)
      setLoading(false)  
    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="Edit event"
        from="Admin"
        button={
          <Link href="/admin/events">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to events
            </Button>
          </Link>
        }
      />
     <Card1>
{!eventMock?<Spinner/>:
<>
<RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert content here..."
            />
   <Formik
   initialValues={eventMock}
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
               onChange={(a) => {
                 setFile(a.target.files[0])
                 handleChange(a)
               }}
               value={values.event_avatar}
               errorText={touched.event_avatar && errors.event_avatar}
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
        
         </Grid>
       </Box>

       <Button type="submit" variant="contained" color="primary" disabled= {!content || loading}>
       {loading && <Spinner  />}
         Update Event
       </Button>
     </form>
   )}
 </Formik>
 </>
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
event_avatar: yup.string().nullable()
});

EditEvent.layout = AdminDashboardLayout;

export default  EditEvent;