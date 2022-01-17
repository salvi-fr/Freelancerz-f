import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import OperatorDashboardLayout from "@component/layout/OperatorDashboardLayout";
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
    updateComplain,getComplain
  } from 'redux/actions/complain'
  import firebaseStorage from "lib/firebaseCloudStorage";
import Spinner from "@component/Spinner";
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";
const EditComplain = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  console.log(id)
  const {error:complainError=null}= useSelector((state) => state.complain)
  const {complain:fechedComplain=null}= useSelector((state) => state.complain)
  const {updateComplainSuccess=false}= useSelector((state) => state.complain)
  const {updateComplainloading =false}= useSelector((state) => state.complain)
  const {getComplainloading=false}= useSelector((state) => state.complain)
  const [complainMock, setComplainMock]=useState(null)
  const [loading , setLoading]= useState(true)

  const firstUpdate = useRef(true);
  const [file,setFile]=useState(null)
  const [foundError,setFoundError]= useState(null)
  useEffect(() => {
    dispatch(getComplain(id as string ))
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(complainError && !firstUpdate.current){
        setFoundError(complainError)
      }
      console.log(foundError)
  }, [complainError])

  useEffect(() => {
    if(fechedComplain){
      setComplainMock({...fechedComplain})
      setLoading(false)
      }
      console.log(complainMock)
  }, [fechedComplain])

useEffect(() => {
  if(updateComplainSuccess && !loading){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/operator/complains");
    }
    
  }
}, [updateComplainSuccess])

  const handleFormSubmit = async (values) => {
    if(file){
      const avatarUrl= await uploadImageFirebase(file,`Complain`)
        values.avatar=avatarUrl
      }
    try {
     let {_id,created_by,createdAt,complain_avatar,updatedAt, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
     console.log('just about to update',rest)
      await dispatch(updateComplain(id as string,rest))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="Edit complain"
        from="Operator"
        button={
          <Link href="/operator/complains">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to complains
            </Button>
          </Link>
        }
      />
     <Card1>

{loading || getComplainloading || !complainMock ?<Spinner/>:
<>
   <Formik
   initialValues={complainMock}
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
               name="complain_avatar"
               label="Cover  Image"
               fullwidth
               accept="image/png, image/gif, image/jpeg"
               type="file"
               onChange={(a) => {
                 setFile(a.target.files[0])
                 handleChange(a)
               }}
               value={values.complain_avatar}
               errorText={touched.complain_avatar && errors.complain_avatar}
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

       <Button type="submit" variant="contained" color="primary" disabled= {updateComplainloading}>
       {updateComplainloading && <Spinner  />}
         Update Complain
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
complain_avatar: yup.string().nullable()
});

EditComplain.layout = OperatorDashboardLayout;

export default  EditComplain;