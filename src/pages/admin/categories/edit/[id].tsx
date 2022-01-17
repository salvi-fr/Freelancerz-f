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
import {uploadImageFirebase} from '@utils/utils'
  import {
    updateCategory,getCategory
  } from '@redux/actions/categories'


import Spinner from "@component/Spinner";
import TextArea from "@component/textarea/TextArea";

const EditCategory = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  const {category:fechedCategory=null}= useSelector((state) => state.category)
  const {updateCategoryloading=false}= useSelector((state) => state.category)

  const {updateCategorySuccess=false}= useSelector((state) => state.category)

  const [loading , setLoading]= useState(true)

const [file,setFile]=useState(null)
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)

  useEffect(() => {
    dispatch(getCategory(id as string))
    firstUpdate.current = false
  }, [dispatch])

useEffect(() => {
  if(updateCategorySuccess && !loading){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/admin/categories ");
    }
    
  }
}, [updateCategorySuccess])

useEffect(() => {
  if(fechedCategory){
    setLoading(false)
    console.log("fetched categories",fechedCategory)
  }
  
}, [fechedCategory])

  const handleFormSubmit = async (values) => {
    setLoading(true)
    try {
      if(file){
        const avatarUrl= await uploadImageFirebase(file,`Categories`)
        values.avatar=avatarUrl
      }
      
      const { category_avatar,created_by,createdAt,updatedAt,slug, ...rest } = values
      console.log("values",rest)
      await dispatch(updateCategory(id as string,rest))
      setLoading(false)
      router.push("/admin/categories");
    } catch (e) {
      console.log("got error", e)
      setFoundError(e.message)

    }
  };

  return (
  
    <div>
      
      <DashboardPageHeader
        iconName="credit-card_filled"
        title="Edit Category"
        from="Admin"
        button={
          <Link href="/admin/categories ">
            <Button color="primary" bg="primary.light" px="2rem">
              Back Categories 
            </Button>
          </Link>
        }
      />
      <Card1>
      {!fechedCategory || loading? <p>Loading</p>:
      <>
        <Formik
          initialValues={fechedCategory}
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
                      onChange={(a) => {
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

              <Button type="submit" variant="contained" color="primary" disabled={loading || updateCategoryloading}>
                {updateCategoryloading && <Spinner />}
                Update Category
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
    activated: yup.bool().nullable(),
    category_avatar: yup.string().nullable(),
    description: yup.string().nullable(),

});

EditCategory.layout = AdminDashboardLayout;

export default  EditCategory;