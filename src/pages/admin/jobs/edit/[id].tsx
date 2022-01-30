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
import React, { useState,useEffect } from "react";
import * as yup from "yup";
import { format } from "date-fns";
  import {
    updateJob,getJob
  } from '@redux/actions/jobs'
  import Select from "@component/Select";
import MultipleSelect from '@component/multipleSelect';
import Spinner from "@component/Spinner";
import TextArea from "@component/textarea/TextArea";
import { toast } from "react-toastify";
import { stackCategories,jobTypeCategories, } from "@data/categories";
const EditJob = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  const {error:jobError=null}= useSelector((state) => state.job)
  const {job:fechedJob=null}= useSelector((state) => state.job)
  const [jobMock, setJobMock]=useState(null)

const { updateJobSuccess=false,  updateJobFailed=false}= useSelector((state) => state.job)
const [loading , setLoading]= useState(false)
useEffect(() => {
  if( updateJobFailed && loading){
    toast.error(jobError, {
      icon: "😨"
    });
    setLoading(false)  
    // router.reload()
  }
}, [ updateJobFailed])
useEffect(() => {
if( updateJobSuccess && loading){
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
}, [ updateJobSuccess,loading])

  useEffect(() => {
    dispatch(getJob(id as string ))
  }, [dispatch])

  useEffect(() => {
    if(fechedJob){
      setJobMock({...fechedJob, 
        startDate: fechedJob.startDate? new Date(fechedJob.startDate).toISOString().substring(0, 10):null,
        endDate: fechedJob.endDate? new Date(fechedJob.endDate).toISOString().substring(0, 10): null,
        type: jobTypeCategories.find((item) => item.value === fechedJob.jobType),
        stacks:fechedJob.stackId? stackCategories.filter(function(array_el){
          return fechedJob.stackId.split(",").filter(function(anotherOne_el){
             return  anotherOne_el == array_el.value;
          }).length == 0
       }):[],
      })
          
      }
      console.log(jobMock)
  }, [fechedJob])


  const handleFormSubmit = async (values) => {
    setLoading(true)
    try {
      values.tag = values.stacks? values.stacks.map((item) => { return item.value }).toString():null
      values.jobType = values.type? values.type.value:null
      values.yearsOfExperience= values.yearsOfExperience.toString()
     let {stacks, type,createdAt,jobOwner,updatedAt,clientId, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
   console.log(rest)
      await dispatch(updateJob(rest))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        
    }
  };

  return (
  
    <div>
      
      <DashboardPageHeader
        iconName="credit-card_filled"
        title="Edit Job"
        from="Admin"
        button={
          <Link href="/admin/jobs">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Jobs
            </Button>
          </Link>
        }
      />
      <Card1>
      {!jobMock? <p>Loading</p>:
      <>
        <Formik
          initialValues={jobMock}
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

              <Button type="submit" variant="contained" color="primary" disabled={ loading }>
              {loading && <Spinner  />}
                Update Job
              </Button>
            </form>
          )}
        </Formik>
        </>}
      </Card1>

    </div>
                  
  );
};


const formSchema = yup.object().shape({
  title: yup.string().required("${path} is required"),
  stacks: yup.array().nullable(),
  type: yup.string().nullable(),
  price: yup.number().required("${path} is required"),
  startDate: yup.string().required("${path} is required"),
  endDate: yup.string().required("${path} is required"),
  yearsOfExperience: yup.number().required("${path} is required"),
  description: yup.string().nullable(),

});

EditJob.layout = AdminDashboardLayout;

export default  EditJob;