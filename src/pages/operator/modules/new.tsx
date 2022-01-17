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
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import MultipleSelect from '@component/multipleSelect';
  import {
    createModule
  } from 'redux/actions/module'
  import {
    getLectures
  } from 'redux/actions/lecture'
  import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";

const NewModule = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const {error:moduleError=null}= useSelector((state) => state.module)
  const {createModuleSuccess=false}= useSelector((state) => state.module)
  const { lectures:mLectures=null}= useSelector((state) => state.lecture)
  const [lecturesData, setLecturesData] = useState([])

  useEffect(() => {
    dispatch(getLectures())
    if(!createModuleSuccess){
      firstUpdate.current = false 
    }
     
    }, [dispatch])

  useEffect(() => {
    if(moduleError && !firstUpdate.current){
        setFoundError(moduleError)
      }
    else if (mLectures && mLectures.data) {
      setLecturesData([])
        mLectures.data.map((item) => {
        setLecturesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
    }
    console.log("found lectures",lecturesData)
  }, [mLectures])

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  console.log(foundError)
  useEffect(() => {
    if(moduleError && !firstUpdate.current){
        setFoundError(moduleError)
      }
  }, [moduleError])

  const handleFormSubmit = async (values) => {
    try {
      
      let v= values
      v.lectures=v.lectures.map((item,ind)=>{return {lecture:item.value,rank:ind}})
     
      await dispatch(createModule(v))
      firstUpdate.current = true
      router.push("/operator/modules");
    } catch (e) {
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
        title="New Course Module" from="Operator"
        button={
          <Link href="/operator/modules">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Modules
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
            setFieldValue,
            handleSubmit,
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
                  <MultipleSelect
                    label="Lectures"
                    placeholder="Select Lectures"
                    options={lecturesData}
                    value={values.lectures || ""}
                    onChange={(l) => {
                      setFieldValue("lectures", l);
                    }}
                    errorText={touched.lectures && errors.lectures}
                  />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" >
                Create Module
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const initialValues = {
  title: "",
  description: "",
  lectures: null,
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string(),
  lectures: yup.array().required("required"),
});

NewModule.layout = OperatorDashboardLayout;

export default  NewModule;