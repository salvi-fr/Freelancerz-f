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
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";

  import {
    createArticle
  } from '@redux/actions/application'

const NewArticle = () => {
    const router = useRouter();
  const dispatch = useDispatch()

  const {error:articleError=null}= useSelector((state) => state.article)
  const {createArticleSuccess=false}= useSelector((state) => state.article)
 

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  console.log(foundError)
  useEffect(() => {
    if(articleError && !firstUpdate.current){
        setFoundError(articleError)
      }
  }, [articleError])
useEffect(() => {
  if(createArticleSuccess){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/operator/articles");
    }
    
  }
}, [createArticleSuccess])

  const handleFormSubmit = async (values) => {
    try {
     
      await dispatch(createArticle(values))
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
        title="New Event"
        from="Operator"
        button={
          <Link href="/operator/events">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to events
            </Button>
          </Link>
        }
      />

      <Card1>
      <Box
          borderRadius="10px"
          overflow="hidden"
          height="173px"
          mb="1.5rem"
          position="relative"
          style={{
            background:
              "url(https://via.placeholder.com/150",
          }}
        >
        

          <Box
            display="flex"
            alignItems="flex-end"
            position="absolute"
            top="20px"
            right="24px"
          >
            <label htmlFor="cover-image">
              <Button
                as="span"
                size="small"
                bg="primary.light"
                color="secondary"
                height="auto"
                p="6px"
                borderRadius="50%"
              >
                <Icon color="primary">camera</Icon>
              </Button>
            </label>
            <Hidden>
              <input
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
                id="cover-image"
                accept="image/*"
                type="file"
              />
            </Hidden>
          </Box>
        </Box>

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
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="description"
                      label="Description"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description || ""}
                      errorText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="happen_from"
                      label="From"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.happen_from || ""}
                      errorText={touched.happen_from && errors.happen_from}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="happen_to"
                      label="To"
                      type="date"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.happen_to || ""}
                      errorText={touched.happen_to && errors.happen_to}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="content"
                      label="Content"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.content|| ""}
                      errorText={touched.content && errors.content}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  contact: "",
  birth_date: "",
};

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup.string().required("required"),
  birth_date: yup.date().required("invalid date"),
});

NewArticle.layout = OperatorDashboardLayout;

export default  NewArticle;