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
import {uploadFileFirebase, uploadImageFirebase, useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import firebaseStorage from "lib/firebaseCloudStorage";
import Spinner from "@component/Spinner";
import * as yup from "yup";
  import {
    updatePublication
  } from 'redux/actions/publication'
import {getPublication} from 'redux/actions/publication'
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";
const EditPublication = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  console.log(id)
  const {error:publicationError=null}= useSelector((state) => state.publication)
  const {publication:fechedPublication=null}= useSelector((state) => state.publication)
  const [content, setContent] = useState(null)
  const {updatePublicationSuccess=false}= useSelector((state) => state.publication)
  const {updatePublicationloading=false}= useSelector((state) => state.publication)
  const [publicationMock, setPublicationMock]=useState(null)
  const [loading , setLoading]= useState(true)
  const [avatarFile,setAvatarFile]=useState(null)
  const [pdfFile,setPdfFile]=useState(null)


  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  
  useEffect(() => {
    dispatch(getPublication(id as string ))
    firstUpdate.current = false
  }, [dispatch])

  useEffect(() => {
    if(publicationError && !firstUpdate.current){
        setFoundError(publicationError)
      }
      console.log(foundError)
  }, [publicationError])

  useEffect(() => {
    if(fechedPublication){
      
      setPublicationMock({...fechedPublication })
      setContent(fechedPublication.content)
      setLoading(false)
      }
  }, [fechedPublication])

useEffect(() => {
  if(updatePublicationSuccess && !loading){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/instructor/publications");
    }
    
  }
}, [updatePublicationSuccess])

const handleFormSubmit = async (values) => {
  if(avatarFile){
    const avatarUrl= await uploadImageFirebase(avatarFile,`Publications`)
      values.avatar=avatarUrl
    }
    if(pdfFile){
      const pdfUrl= await uploadFileFirebase(pdfFile,`Publications`)
      values.pdf_url=pdfUrl
      }
  try {
    let {_id,created_by,createdAt,event_avatar,updatedAt, ...rest}=values
     if(content){
       rest.content=content
     }
    rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    console.log('just about to update',rest)
    await dispatch(updatePublication(id as string,rest))
  } catch (e) {
    console.log("got error", e)
      setFoundError(e.message)
      
  }
};

  return (
    <div>
      <DashboardPageHeader
        iconName="edit" from="Instructor"
        title="Edit publication"
        button={
          <Link href="/instructor/publications">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to publications
            </Button>
          </Link>
        }
      />
{loading || updatePublicationloading || !publicationMock ? <Spinner/> :
<Card1>
        <RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert content here..."
            />
        <Formik
          initialValues={publicationMock}
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
                      name="publication_avatar"
                      label="Upload Cover Image"
                      accept="image/png, image/gif, image/jpeg"
                      type='file'
                      fullwidth
                      onChange={(a) => {
                        setAvatarFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.publication_avatar || ""}
                      errorText={touched.publication_avatar && errors.publication_avatar}
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
                
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!content || updatePublicationloading}>
              {updatePublicationloading && <Spinner  />}
                Update Publication 
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
  title:yup.string().required("required"),
  description:yup.string().nullable(),
  pdf_url_name: yup.string("is not valid string"),
  publication_avatar: yup.string("is not valid string "),
  // tags:yup.string(),
});
EditPublication.layout = InstructorDashboardLayout;

export default  EditPublication;