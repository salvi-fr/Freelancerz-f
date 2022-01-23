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
import TextArea from "@component/textarea/TextArea";
import { toast } from "react-toastify";

const EditModule = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  const {error:moduleError=null}= useSelector((state) => state.module)
  const { lectures:mLectures=null}= useSelector((state) => state.lecture)
  const {module:mModule=null}= useSelector((state) => state.module)
  const [lecturesData, setLecturesData] = useState([])
  const firstUpdate = useRef(true);
  const [moduleMock, setModuleMock]=useState(null)

  const {updateModuleSuccess=false, updateModuleFailed=false}= useSelector((state) => state.module)
  const [loading , setLoading]= useState(false)
  useEffect(() => {
    if(updateModuleFailed && loading){
      toast.error(moduleError, {
        icon: "😨"
      });
      setLoading(false)  
      router.reload()
    }
  }, [updateModuleFailed,loading])
useEffect(() => {
  if(updateModuleSuccess && loading){
    toast.success("successfully updated", {
      icon: "🚀",
      position: "top-right",
autoClose: 5000
    });
    setLoading(false)
    if(router.query.redirect){
      
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/modules");
    }
    
  }
}, [updateModuleSuccess,loading])
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
  
        }
    }, [mModule,mLectures])
  useEffect(() => {
  if (mLectures && mLectures.data) {
      setLecturesData([])
        mLectures.data.map((item) => {
        setLecturesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
    }
  }, [mLectures])

  


  const handleFormSubmit = async (values) => {
    try {
      setLoading(true)
      let {_id,created_by,createdAt,updatedAt, ...rest}=values
      rest.lectures=rest.lectures.map((item,ind)=>{return {lecture:item.value,rank:ind}})
    
      await dispatch(updateModule(id as string,rest))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        
    }
  };

  return (
    <div>
        <DashboardPageHeader
        iconName="edit"
        title="New Course Module" from="Admin"
        button={
          <Link href="/admin/modules">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Modules
            </Button>
          </Link>
        }
      />
{!moduleMock?  <p>Loading</p>:
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

              <Button type="submit" variant="contained" color="primary" disabled={loading} >
                {loading? "Updating...": "Update"}
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
EditModule.layout = AdminDashboardLayout;

export default  EditModule;