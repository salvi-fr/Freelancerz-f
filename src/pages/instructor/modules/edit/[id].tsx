import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import InstructorDashboardLayout from "@component/layout/InstructorDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import {
  updateModule,getModule
} from 'redux/actions/module'
import {
  getLectures
} from 'redux/actions/lecture'
import MultipleSelect from "@component/multipleSelect";
import { ILecture, IModuleLecture } from "types";
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";

const EditModule = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  const {error:moduleError=null}= useSelector((state) => state.module)
  const {updateModuleSuccess=false}= useSelector((state) => state.module)
  const { lectures:mLectures=null}= useSelector((state) => state.lecture)
  const {module:mModule=null}= useSelector((state) => state.module)
  const [lecturesData, setLecturesData] = useState([])
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  const [moduleMock, setModuleMock]=useState(null)
  const [loading , setLoading]= useState(true)
  useEffect(() => {
    dispatch(getLectures())
    dispatch(getModule(id as string))
    firstUpdate.current = false  
    }, [dispatch])
 
    useEffect(() => {
      if(mModule && mLectures){
        let mL = mModule.lectures? mModule.lectures as IModuleLecture[]: null
     
        setModuleMock({...mModule, 
          lectures:mL? lecturesData.filter(function(array_el){
            return mL.filter(function(anotherOne_el){
              let found = anotherOne_el.lecture as ILecture
               return  found._id as string == array_el.value;
            }).length == 0
         }):[],})
         console.log("module mock",moduleMock)
        setLoading(false)
        }
    }, [mModule,mLectures])
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
  console.log(foundError)
  useEffect(() => {
    if(moduleError && !firstUpdate.current){
        setFoundError(moduleError)
      }
  }, [moduleError])

useEffect(() => {
  if(updateModuleSuccess){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/instructor/modules");
    }
    
  }
}, [updateModuleSuccess])
  


  const handleFormSubmit = async (values) => {
    try {
      let {_id,created_by,createdAt,updatedAt, ...rest}=values
      rest.lectures=rest.lectures.map((item,ind)=>{return {lecture:item.value,rank:ind}})
    
      await dispatch(updateModule(id as string,rest))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  return (
    <div>
        <DashboardPageHeader
        iconName="edit"
        title="New Course Module" from="Instructor"
        button={
          <Link href="/instructor/events">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Modules
            </Button>
          </Link>
        }
      />
{!moduleMock || loading? <p>Loading</p>:
      <Card1>
     

        <Formik
          initialValues={moduleMock}
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
}
    </div>
  );
};


const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().nullable(),
  lectures: yup.array().required("required"),
});
EditModule.layout = InstructorDashboardLayout;

export default  EditModule;