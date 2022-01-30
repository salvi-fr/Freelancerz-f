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
import { uploadImageFirebase, useSelector } from 'utils/utils'
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Spinner from "@component/Spinner";
import {
  createJob
} from '@redux/actions/jobs'
import Select from "@component/Select";
import MultipleSelect from '@component/multipleSelect';
import { toast, ToastContainer } from "react-toastify";
import TextArea from "@component/textarea/TextArea";
import { stackCategories,jobTypeCategories, } from "@data/categories";

const JobEditor = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { error: jobError = null } = useSelector((state) => state.job)
  const {createJobSuccess=false, createJobFailed=false}= useSelector((state) => state.job)
  const [loading , setLoading]= useState(false)

  useEffect(() => {
    if(createJobFailed && loading){
      toast.error(jobError, {
        icon: "😨"
      });
      setLoading(false)  
      // router.reload()
    }
  }, [createJobFailed])
useEffect(() => {
  if(createJobSuccess && loading){
    toast.success("successfully updated", {
      icon: "🚀",
      position: "top-right",
autoClose: 5000
    });
    setLoading(false)
    if(router.query.redirect){
      
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/jobs");
    }
    
  }
}, [createJobSuccess,loading])

  

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
     
      values.tag = values.stacks? values.stacks.map((item) => { return item.value }).toString():null
      values.jobType = values.type? values.type.value:null
      values.yearsOfExperience= values.yearsOfExperience.toString()
      const { stacks, type, ...rest } = values
      console.log(rest)
      await dispatch(createJob(rest))
      
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
      

    }
  };


  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled"
        title="Add new course"
        from="Admin"
        button={
          <Link href="/admin/courses">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Jobs
            </Button>
          </Link>
        }
      />
      <Card1>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
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
                      errorText={touched.title && errors.title}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="price"
                      label="Price"
                      type="number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price || ""}
                      errorText={touched.price && errors.price}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="yearsOfExperience"
                      label="years of experience"
                      type="number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.yearsOfExperience || ""}
                      errorText={touched.yearsOfExperience && errors.yearsOfExperience}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="startDate"
                      label="From"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.startDate || ""}
                      errorText={touched.startDate && errors.startDate}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="endDate"
                      label="To"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.endDate || ""}
                      errorText={touched.endDate && errors.endDate}
                    />
                  </Grid>
                
                <Grid item md={6} xs={12}>
                    <Select
                      label="Type"
                      placeholder="Select job type"
                      options={jobTypeCategories}
                      value={values.type|| ""}
                      onChange={(t) => {
                        setFieldValue("type", t);
                      }}
                      errorText={touched.type && errors.type}
                    />
                  </Grid>
                
                  <Grid item md={6} xs={12}>
                    <MultipleSelect
                      label="Tags"
                      placeholder="Select Stacks"
                      options={stackCategories}
                      value={values.stacks || ""}
                      onChange={(s) => {
                        setFieldValue("stacks", s);
                      }}
                      errorText={touched.stacks && errors.stacks}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
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

              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading && <Spinner />}
                Create Job
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
  type: "",
  stacks: null,
  yearsOfExperience: "",
  price: null,
  startDate: "",
  endDate: "",
};
const formSchema = yup.object().shape({
  title: yup.string().required("${path} is required"),
  stacks: yup.array().required("${path} is required"),
  type: yup.string().required("${path} is required"),
  price: yup.number().required("${path} is required"),
  startDate: yup.string().required("${path} is required"),
  endDate: yup.string().required("${path} is required"),
  yearsOfExperience: yup.number().required("${path} is required"),
  description: yup.string().required("${path} is required"),

});


JobEditor.layout = AdminDashboardLayout;

export default JobEditor;