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
    updateCourse,getCourse
  } from 'redux/actions/course'
  import Select from "@component/Select";
import MultipleSelect from '@component/multipleSelect';
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import {
  getCategories
} from 'redux/actions/categories'
import {
  getModules
} from 'redux/actions/module'
import Spinner from "@component/Spinner";
import { ICategory, IModule } from "types";
import TextArea from "@component/textarea/TextArea";
import { toast } from "react-toastify";

const EditCourse = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  const {error:courseError=null}= useSelector((state) => state.course)
  const {course:fechedCourse=null}= useSelector((state) => state.course)
  const { modules:mModules=null}= useSelector((state) => state.module)
  const { categories=null}= useSelector((state) => state.category)
  const [courseMock, setCourseMock]=useState(null)
 const [categoriesData,setCategoriesData]= useState([])
 const [modulesData,setModulesData]= useState([])
const [file,setFile]=useState(null)
  const firstUpdate = useRef(true);
  const [curriculum, setCurriculum] = useState(
    null
)
const { updateCourseSuccess=false,  updateCourseFailed=false}= useSelector((state) => state.course)
const [loading , setLoading]= useState(false)
useEffect(() => {
  if( updateCourseFailed && loading){
    toast.error(courseError, {
      icon: "😨"
    });
    setLoading(false)  
    router.reload()
  }
}, [ updateCourseFailed])
useEffect(() => {
if( updateCourseSuccess && loading){
  toast.success("successfully updated", {
    icon: "🚀",
    position: "top-right",
autoClose: 5000
  });
  setLoading(false)
  if(router.query.redirect){
    
    router.push(`/${router.query.redirect}`);
  }else{
    router.push("/admin/courses");
  } 
}
}, [ updateCourseSuccess,loading])

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getModules())
    dispatch(getCourse(id as string ))
    firstUpdate.current = false
  }, [dispatch])



  useEffect(() => {
    if (categories && categories.data) {
        setCategoriesData([])
        categories.data.map((item) => {
        setCategoriesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })
        
    }
   
  }, [categories])


  useEffect(() => {
   if (mModules && mModules.data) {
        setModulesData([])
        mModules.data.map((item) => {
        setModulesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        }) 
    } 
  }, [mModules])


  useEffect(() => {
    if(fechedCourse){
      let cC = fechedCourse.category? fechedCourse.category as ICategory: null
      let cM = fechedCourse.modules?fechedCourse.modules as IModule[]:[] 
 
      setCourseMock({...fechedCourse, 
        
        course_modules:cM? modulesData.filter(function(array_el){
          return cM.filter(function(anotherOne_el){
             return anotherOne_el._id as string == array_el.value;
          }).length == 0
       }):[],
       course_category:cC? {value: cC._id, label: cC.title }:null,
        
      })
      setCurriculum(fechedCourse.curriculum)
      }
  }, [fechedCourse,mModules,categories])


  const handleFormSubmit = async (values) => {
    setLoading(true)
    try {
      if(file){

        const avatarUrl= await uploadImageFirebase(file,`Course`)
          values.avatar=avatarUrl
        }
      values.modules=values.course_modules.map((item)=>{return item.value})
      values.category=values.category.value
     let {_id,created_by,createdAt,course_modules,course_category,updatedAt, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
   console.log(rest)
      await dispatch(updateCourse(id as string,rest))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        
    }
  };

  return (
  
    <div>
      
      <DashboardPageHeader
        iconName="credit-card_filled"
        title="Edit Course"
        from="Admin"
        button={
          <Link href="/admin/courses">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Courses
            </Button>
          </Link>
        }
      />
      <Card1>
      {!courseMock? <p>Loading</p>:
      <>
      <RichTextEditor
                content={curriculum}
                handleContentChange={(curriculum) => setCurriculum(curriculum)}
                placeholder="insert curriculum here ...."
            />
        <Formik
          initialValues={courseMock}
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
                      name="course_avatar"
                      label="Cover  Image"
                      fullwidth
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      // onBlur={handleBlur}
                      onChange={(a) => {
                        console.log(a.target.files[0])
                        setFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.course_avatar}
                      errorText={touched.course_avatar && errors.course_avatar}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <Select
                    label="Category"
                    placeholder="Select Category"
                    options={categoriesData}
                    value={values.course_category || ""}
                    onChange={(category) => {
                      console.log(category)
                      setFieldValue("course_category", category);
                    }}
                    errorText={touched.course_category && errors.course_category}
                  />
                  </Grid>
                
                  <Grid item md={6} xs={12}>
                  <MultipleSelect
                    label="Modules"
                    placeholder="Select Modules"
                    options={modulesData}
                    value={values.course_modules || ""}
                    onChange={(module) => {
                      setFieldValue("course_modules", module);
                    }}
                    errorText={touched.course_modules && errors.course_modules}
                  />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!curriculum || loading }>
              {loading && <Spinner  />}
                Update Course
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
  course_modules: yup.array().nullable(),
  course_category: yup.string().required("${path} is required"),
  price: yup.number().required("${path} is required"),
  activated: yup.bool().nullable(),
  course_avatar: yup.string().nullable(),
  description: yup.string().nullable(),

});

EditCourse.layout = AdminDashboardLayout;

export default  EditCourse;