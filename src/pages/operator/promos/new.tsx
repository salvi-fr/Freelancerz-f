import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import OperatorDashboardLayout from "@component/layout/OperatorDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import Spinner from "@component/Spinner";
import {
    createPromo
  } from 'redux/actions/promo'

  import {
    getCourses
  } from 'redux/actions/course'
  import {
    getEvents
  } from 'redux/actions/event'
  import {
    getTrainings
  } from 'redux/actions/training'
import MultipleSelect from '@component/multipleSelect';
import DropZone from "@component/DropZone";

const CourseEditor = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const { trainings:mTrainings=null}= useSelector((state) => state.training)
  const { events:mEvents=null}= useSelector((state) => state.event)
  const { courses:mCourses=null}= useSelector((state) => state.course)

  const {createPromoloading=false}= useSelector((state) => state.promo)
  const {createPromoSuccess=false}= useSelector((state) => state.promo)
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  const [coursesData,setCoursesData]= useState([])
  const [trainingsData,setTrainingsData]= useState([])
  const [eventsData,setEventsData]= useState([])
 
  console.log(foundError)
  useEffect(() => {
  dispatch(getEvents())
  dispatch(getCourses())
  dispatch(getTrainings())
  firstUpdate.current = false  
  }, [dispatch])

  useEffect(() => {
     if (mTrainings && mTrainings.data) {
      setTrainingsData([])
        mTrainings.data.map((item) => {
          setTrainingsData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
    }
  }, [mTrainings])

  useEffect(() => {
   
     if (mCourses && mCourses.data) {
      setCoursesData([])
        mCourses.data.map((item) => {
        setCoursesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
    }
  }, [mCourses])

  useEffect(() => {
    if (mEvents && mEvents.data) {
      setEventsData([])
        mEvents.data.map((item) => {
        setEventsData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
    }
  }, [mEvents])

useEffect(() => {
  if(createPromoSuccess){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/operator/promos");
    }
    
  }
}, [createPromoSuccess])

  const handleFormSubmit = async (values) => {
    try {
      console.log(values)
      values.trainings=values.promo_trainings? values.promo_trainings.map((item)=>{return item.value}): null
      values.courses=values.promo_courses.map((item)=>{return item.value})
      values.events=values.promo_events? values.promo_events.map((item)=>{return item.value}): null
      console.log(values)
      const  {promo_avatar,promo_events,promo_courses,promo_trainings,...rest}= values 
      await dispatch(createPromo(rest))
      router.push("/operator/promos");
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

//   const {
//     query: { id },
//   } = useRouter();


  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled" from="Operator"
        title="Add new promo"
        button={
          <Link href="/operator/promos">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Promos
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
                      name="percentage"
                      label="Percentage"
                      fullwidth
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.percentage || ""}
                      errorText={touched.percentage && errors.percentage}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="valid_from"
                      label="Valid From"
                      type="datetime-local"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.valid_from|| ""}
                      errorText={touched.valid_from && errors.valid_from}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="valid_until"
                      label="Valid Until"
                      type="datetime-local"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.valid_until|| ""}
                      errorText={touched.valid_until && errors.valid_until}
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
                    label="Courses"
                    placeholder="Select Courses"
                    options={coursesData}
                    value={values.promo_courses || ""}
                    onChange={(courses) => {
                      setFieldValue("promo_courses", courses);
                    }}
                    errorText={touched.promo_courses && errors.promo_courses}
                  />
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <MultipleSelect
                    label="Events"
                    placeholder="Select Events"
                    options={eventsData}
                    value={values.promo_events || ""}
                    onChange={(events) => {
                      setFieldValue("promo_events", events);
                    }}
                    errorText={touched.promo_events && errors.promo_events}
                  />
                  </Grid>
                
                  <Grid item md={6} xs={12}>
                  <MultipleSelect
                    label="Trainings"
                    placeholder="Select Trainings"
                    options={trainingsData}
                    value={values.promo_trainings || ""}
                    onChange={(trainings) => {
                      setFieldValue("promo_trainings", trainings);
                    }}
                    errorText={touched.promo_trainings && errors.promo_trainings}
                  />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={ createPromoloading }>
              {createPromoloading && <Spinner  />}
                Create Course
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};
const percentageRegex= /^100(\.0{0,2})? *%?$|^\d{1,2}(\.\d{1,2})? *%?$/
const initialValues = {
    title: "",
    percentage:"",
    promo_courses: null,
    promo_trainings: null,
    valid_from: "",
    valid_until: "",
    promo_events: null,
    description: "",
    activated: false,
  };
  const formSchema = yup.object().shape({
    percentage: yup.string().matches(percentageRegex, 'Percentage is invali , It must be between 1-100'),
    title: yup.string().required("${path} is required"),
    promo_courses: yup.array(),
    promo_trainings: yup.array().nullable(),
    valid_from: yup.date().required("${path} is required"),
    valid_until: yup.date().required("${path} is required"),
    promo_events: yup.array().nullable(),
    activated: yup.bool(),
    description: yup.string(),

  });


CourseEditor.layout = OperatorDashboardLayout;

export default CourseEditor;