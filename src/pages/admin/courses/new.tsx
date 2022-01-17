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
import { useSelector } from 'utils/utils'
import React, { useState, useRef, useEffect } from "react";
import firebaseStorage from "lib/firebaseCloudStorage";
import * as yup from "yup";
import Spinner from "@component/Spinner";
import {
  createCourse
} from 'redux/actions/course'
import {
  getCategories
} from 'redux/actions/categories'
import {
  getModules
} from 'redux/actions/module'
import Select from "@component/Select";
import MultipleSelect from '@component/multipleSelect';
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";

const CourseEditor = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  //   const { roles=null}= useSelector((state) => state.role)
  const { modules: mModules = null } = useSelector((state) => state.module)
  const { categories = null } = useSelector((state) => state.category)

  const { error: categoryError = null } = useSelector((state) => state.category)
  const { error: moduleError = null } = useSelector((state) => state.module)
  // const {refreshAuthloading=false}= useSelector((state) => state.auth)
  // const {refreshAuthSuccess=false}= useSelector((state) => state.auth)
  const { createCourseloading = false } = useSelector((state) => state.course)
  const { signupAuthSuccess = false } = useSelector((state) => state.auth)
  //   const {error:authError=null}= useSelector((state) => state.auth)
  const firstUpdate = useRef(true);
  const [foundError, setFoundError] = useState(null)
  const [categoriesData, setCategoriesData] = useState([])
  const [modulesData, setModulesData] = useState([])
  console.log(foundError)

  const [file, setFile] = useState(null)
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getModules())
    firstUpdate.current = false
  }, [dispatch])
  const [curriculum, setCurriculum] = useState(
    null
  )
  useEffect(() => {
    if (categoryError && !firstUpdate.current) {
      setFoundError(categoryError)
    }
    else if (categories && categories.data) {
      setCategoriesData([])
      categories.data.map((item) => {
        setCategoriesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
      })
    }
  }, [categories])

  useEffect(() => {
    if (moduleError && !firstUpdate.current) {
      setFoundError(moduleError)
    }
    else if (mModules && mModules.data) {
      setModulesData([])
      mModules.data.map((item) => {
        setModulesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
      })
    }
  }, [mModules])
  useEffect(() => {
    if (signupAuthSuccess) {
      if (router.query.redirect) {
        router.push(`/${router.query.redirect}`);
      } else {
        router.push("/");
      }

    }
  }, [signupAuthSuccess])

  const handleFormSubmit = async (values) => {
    try {
      let uploadAvatar = await firebaseStorage
        .ref(
          `/Courses Documents/${values.title} /` +
          file.name
        )
        .put(file);
      let downloadAvatar = await (await uploadAvatar).ref.getDownloadURL();

      values.curriculum = curriculum
      values.avatar = downloadAvatar
      values.modules = values.course_modules.map((item) => { return item.value })
      values.category = values.course_category.value
      const { course_avatar, course_modules, course_category, ...rest } = values
      await dispatch(createCourse(rest))
      router.push("/admin/courses");
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
        iconName="credit-card_filled"
        title="Add new course"
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
        <RichTextEditor
          content={curriculum}
          handleContentChange={(curriculum) => setCurriculum(curriculum)}
          placeholder="insert curriculum here ...."
        />
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

              <Button type="submit" variant="contained" color="primary" disabled={!curriculum || createCourseloading}>
                {createCourseloading && <Spinner />}
                Create Course
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
  course_category: "",
  course_modules: null,
  course_avatar: "",
  price: null,
  activated: false,
};
const formSchema = yup.object().shape({
  title: yup.string().required("${path} is required"),
  course_modules: yup.array(),
  course_category: yup.string().required("${path} is required"),
  price: yup.number().required("${path} is required"),
  activated: yup.bool(),
  course_avatar: yup.string(),
  description: yup.string(),

});


CourseEditor.layout = AdminDashboardLayout;

export default CourseEditor;