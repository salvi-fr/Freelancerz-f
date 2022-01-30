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
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
  import {
    createArticle
  } from '@redux/actions/application'
  import Spinner from "@component/Spinner";
import TextArea from "@component/textarea/TextArea";
import { toast, ToastContainer } from "react-toastify";
const NewArticle = () => {
    const router = useRouter();
  const dispatch = useDispatch()
  const {error:articleError=null}= useSelector((state) => state.article)
 const [file,setFile]=useState(null)
 const {createArticleSuccess=false, createArticleFailed=false}= useSelector((state) => state.article)
 const [loading , setLoading]= useState(false)
 useEffect(() => {
   if(createArticleFailed && loading){
     toast.error(articleError, {
       icon: "😨"
     });
     setLoading(false)  
     router.reload()
   }
 }, [createArticleFailed])
useEffect(() => {
 if(createArticleSuccess && loading){
   toast.success("successfully updated", {
     icon: "🚀",
     position: "top-right",
autoClose: 5000
   });
   setLoading(false)
   if(router.query.redirect){
     
     router.push(`/${router.query.redirect}`);
   }else{
     router.push("/admin/articles");
   }
   
 }
}, [createArticleSuccess,loading])
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)

  const [content, setContent] = useState(
    null
)


  const handleFormSubmit = async (values) => {
    setLoading(true)
    if(file){

      const avatarUrl= await uploadImageFirebase(file,`Article`)
        values.avatar=avatarUrl
      }
    values.content= content
      const {tags,...rest}= values
    try {
      await dispatch(createArticle(rest))
      firstUpdate.current=false
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };



  return (
    <div>
      <DashboardPageHeader
        iconName="credit-card_filled"
        title="Add new article"
        button={
          <Link href="/admin/articles">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to articles
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
                      errorText={touched.title && errors.title}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="article_avatar"
                      label="Cover  Image"
                      fullwidth
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      // onBlur={handleBlur}
                      onChange={(a) => {
                        setFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.article_avatar}
                      errorText={touched.article_avatar && errors.article_avatar}
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
                      name="tags"
                      label="tags(nullable and separated with ,)"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tags || ""}
                      errorText={touched.tags && errors.tags}
                    />
                  </Grid>
               
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!content || loading || file }>
                {loading ? <Spinner /> : "Create Article"}
                
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
      tags: "",
      avatar: "",
    activated: false,
  };
  const formSchema = yup.object().shape({
    title: yup.string().required("${path} is required"),
    activated: yup.bool().nullable(),
    avatar: yup.string().nullable(),
    tags: yup.string().nullable(),
    description: yup.string().nullable(),

  });


  NewArticle.layout = AdminDashboardLayout;

export default NewArticle;