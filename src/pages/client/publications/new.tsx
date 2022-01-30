import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import InstructorDashboardLayout from "@component/layout/DashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {uploadFileFirebase, uploadImageFirebase, useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import firebaseStorage from "lib/firebaseCloudStorage";
import Spinner from "@component/Spinner";

  import {
    createPublication
  } from 'redux/actions/publication'
  import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
  import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";
import { ToastContainer } from "react-toastify";

const NewPublication = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const [avatarFile,setAvatarFile]=useState(null)
  const [pdfFile,setPdfFile]=useState(null)
  const {error:publicationError=null}= useSelector((state) => state.publication)
  const {createPublicationSuccess=false}= useSelector((state) => state.publication)
  const {createPublicationloading=false}= useSelector((state) => state.publication)
 const [content, setContent] = useState(null)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  console.log(foundError)
  useEffect(() => {
    if(publicationError && !firstUpdate.current){
        setFoundError(publicationError)
      }
  }, [publicationError])
useEffect(() => {
  if(createPublicationSuccess){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/instructor/publications");
    }
    
  }
}, [createPublicationSuccess])

  const handleFormSubmit = async (values) => {
    console.log("before submitting")
    if(avatarFile){
      const avatarUrl= await uploadImageFirebase(avatarFile,`Publications`)
        values.avatar=avatarUrl
      }
      if(pdfFile){
        const pdfUrl= await uploadFileFirebase(pdfFile,`Publications`)
        values.pdf_url=pdfUrl
        }
    try {
     
      await dispatch(createPublication({...values,content}))
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
        from="Instructor"
        title="New Publication"
        button={
          <Link href="/instructor/publications">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to publications
            </Button>
          </Link>
        }
      />

      <Card1>
        <RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert content here..."
            />
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
                    <TextField
                      name="pdf_url_name"
                      label="Upload Publication PDF file"
                      type="file"
                      accept="application/pdf,application/vnd.ms-excel"
                      fullwidth
                      // onBlur={handleBlur}
                      onChange={(a) => {
                        console.log(a)
                        setPdfFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.pdf_url_name || ""}
                      errorText={touched.pdf_url_name && errors.pdf_url_name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="publication_avatar"
                      label="Upload Cover Image"
                      accept="image/png, image/gif, image/jpeg"
                      type='file'
                      fullwidth
                      // onBlur={handleBlur}
                      onChange={(a) => {
                        console.log(a.target.files[0])
                        console.log(errors)
                        setAvatarFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.publication_avatar || ""}
                      errorText={touched.publication_avatar && errors.publication_avatar}
                    />
                  </Grid>
                
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!content || createPublicationloading}>
              {createPublicationloading && <Spinner  />}
                Create Publication 
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
  title: "",
  description: "",
  pdf_url_name: "",
  publication_avatar: "",
  tags:null,
};

const checkoutSchema = yup.object().shape({
  title:yup.string().required("required"),
  description:yup.string(),
  pdf_url_name: yup.string("is not valid string").required("required"),
  publication_avatar: yup.string("is not valid string ").required("required"),
  // tags:yup.string(),
});

NewPublication.layout = InstructorDashboardLayout;

export default  NewPublication;