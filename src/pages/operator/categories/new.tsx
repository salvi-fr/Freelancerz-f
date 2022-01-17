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
import { uploadImageFirebase, useSelector } from 'utils/utils'
import React, { useState, useRef, useEffect } from "react";
import * as yup from "yup";
import Spinner from "@component/Spinner";
import {
  createCategory
} from 'redux/actions/categories'
import TextArea from "@component/textarea/TextArea";


const CategoryEditor = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const { createCategoryloading = false } = useSelector((state) => state.category)
  const { signupAuthSuccess = false } = useSelector((state) => state.auth)
  const firstUpdate = useRef(true);
  const [foundError, setFoundError] = useState(null)
  const [loading,setLoading ]= useState(false)
  const [file, setFile] = useState(null)
  useEffect(() => {
    firstUpdate.current = false
  }, [dispatch])

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
    setLoading(true)
    try {
        const avatarUrl= await uploadImageFirebase(file,`Categories`)
        values.avatar=avatarUrl
      const { category_avatar, ...rest } = values
      await dispatch(createCategory(rest))
      setLoading(false)
      router.push("/operator/categories");
    } catch (e) {
      console.log("got error", e)
      setFoundError(e.message)

    }
  };



  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled" from="Operator"
        title="Add new category"
        button={
          <Link href="/operator/categories">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Categories
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
                      name="category_avatar"
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
                      value={values.category_avatar}
                      errorText={touched.category_avatar && errors.category_avatar}
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

              <Button type="submit" variant="contained" color="primary" disabled={loading || createCategoryloading}>
                {createCategoryloading && <Spinner />}
                Create Category
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
  category_avatar: "",
  activated: false,
};
const formSchema = yup.object().shape({
  title: yup.string().required("${path} is required"),
  activated: yup.bool(),
  category_avatar: yup.string(),
  description: yup.string(),

});


CategoryEditor.layout = OperatorDashboardLayout;

export default CategoryEditor;