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
import Select from "@component/Select";
import { complainCategories } from "@data/categories";
import { useAppContext } from "@context/app/AppContext";
const NewComplain = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const { state:{auth:{isAuthenticated,user}} } = useAppContext();
  const {error:complainError=null}= useSelector((state) => state.complain)
  const {createComplainSuccess=false}= useSelector((state) => state.complain)
  const {createComplainloading=false}= useSelector((state) => state.complain)
const [ loading , setLoading]= useState(false)
  const [foundError,setFoundError]= useState(null)
console.log(foundError)
  useEffect(() => {
    if(complainError && loading){
      setLoading(false)
        setFoundError(complainError)
      }
  }, [complainError])
useEffect(() => {
  if(createComplainSuccess && loading){
    setLoading(true)
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/complains");
    }
    
  }
}, [createComplainSuccess])

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
      console.log(values)
      const { 
        ... rest}= values
        rest.complaint_typeId= parseInt(rest.complaint_typeId.value)
        rest.complainer= user.email
      await dispatch(createComplain(rest))
    } catch (e) {
      setLoading(false)
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
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px" mt="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                <Grid item md={6} xs={12}>
                    <TextField
                      label="Complainee"
                      name="complainee"
                      fullwidth
                      placeholder="Type complainee email"
                      type="email"
                      value={values.complainee|| ""}
                      onBlur={handleBlur}
                     onChange={handleChange}
                      errorText={touched.complainee && errors.complainee}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Select
                      label="Type"
                      placeholder="Select complaint type"
                      options={complainCategories}
                      value={values.complaint_typeId|| ""}
                      onChange={(t) => {
                        setFieldValue("complaint_typeId", t);
                      }}
                      errorText={touched.complaint_typeId && errors.complaint_typeId}
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

              <Button type="submit" variant="contained" color="primary" disabled= { loading}>
              {loading && <Spinner  />}
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
    complainee: "",
    description:"", 
    complaint_typeId: null
};

const checkoutSchema = yup.object().shape({
    complainee: yup.string().required("required"),
    description:yup.string().required("required"),
    complaint_typeId:yup.string().required("required")
});

NewComplain.layout = AdminDashboardLayout;

export default  NewComplain;