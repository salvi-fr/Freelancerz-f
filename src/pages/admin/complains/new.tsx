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
import { ToastContainer } from "react-toastify";
  import {
    createComplain
  } from 'redux/actions/complain'
import TextArea from "@component/textarea/TextArea";
const NewComplain = () => {
    const router = useRouter();
  const dispatch = useDispatch()

  const {error:complainError=null}= useSelector((state) => state.complain)
  const {createComplainSuccess=false}= useSelector((state) => state.complain)
  const {createComplainloading=false}= useSelector((state) => state.complain)
  const [file,setFile]=useState(null)
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
console.log(foundError)
  useEffect(() => {
    if(complainError && !firstUpdate.current){
        setFoundError(complainError)
      }
  }, [complainError])
useEffect(() => {
  if(createComplainSuccess && !firstUpdate.current){
    firstUpdate.current=true
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/complains");
    }
    
  }
}, [createComplainSuccess])

  const handleFormSubmit = async (values) => {
    console.log("form submitting now ")
    firstUpdate.current=false
    if(file){
      const avatarUrl= await uploadImageFirebase(file,`Complain`)
        values.avatar=avatarUrl
      }
    try {
      let v ={...values}
      await dispatch(createComplain(v))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };


  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="New Complain"
        from="Admin"
        button={
          <Link href="/admin/complains">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to complains
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

              <Button type="submit" variant="contained" color="primary" disabled= { createComplainloading}>
              {createComplainloading && <Spinner  />}
                Create Complain
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
  complain_avatar: "",
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description:  yup.string(),
  complain_avatar: yup.string()
});

NewComplain.layout = AdminDashboardLayout;

export default  NewComplain;