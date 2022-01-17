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
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
  import {
    updateArticle,getArticle
  } from 'redux/actions/article'
  import firebaseStorage from "lib/firebaseCloudStorage";
  import Spinner from "@component/Spinner";
  import DropZone from "@component/DropZone";
  import TextArea from "@component/textarea/TextArea";
const NewArticle = () => {
  const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();

  const { article: fechedArticle=null}= useSelector((state) => state.article)
  const {error:articleError=null}= useSelector((state) => state.article)
  const {updateArticleloading=false}= useSelector((state) => state.article)
  const {updateArticleSuccess=false}= useSelector((state) => state.article)
 const [file,setFile]=useState(null)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
//   const [categoriesData,setCategoriesData]= useState([])
//   const [isNewArticle,setIsNewArticle]= useState(true)
const [articleMock, setArticleMock]=useState(null)
const [loading , setLoading]= useState(true)
console.log(foundError)
  useEffect(() => {
    if(articleError && !firstUpdate.current){
        setFoundError(articleError)
        console.log("got error", articleError)
      }
  }, [articleError])

  const [content, setContent] = useState(
    null
)
useEffect(() => {
  if(fechedArticle){
    setArticleMock({...fechedArticle})
    setContent(fechedArticle.content)
    setLoading(false)
    }
}, [fechedArticle])
useEffect(() => {
  dispatch(getArticle(id as string ))
  firstUpdate.current = false
}, [dispatch])
useEffect(() => {
  if(updateArticleSuccess && !firstUpdate.current){
    if(router.query.redirect){
        // firstUpdate.current=true
      router.push(`/${router.query.redirect}`);
    }else{
       
      router.push("/operator/articles");
    }
    
  }
}, [updateArticleSuccess])
useEffect(() => {
  if(updateArticleSuccess && !firstUpdate.current){
    if(router.query.redirect){
        // firstUpdate.current=true
      router.push(`/${router.query.redirect}`);
    }else{
       
      router.push("/operator/articles");
    }
    
  }
}, [updateArticleSuccess])

  const handleFormSubmit = async (values) => {
    if(file){
    let uploadAvatar = await  firebaseStorage
    .ref(
      `/Article Documents/` +
        file.name
    )
    .put(file);
    let downloadAvatar = await (await uploadAvatar).ref.getDownloadURL();
    values.avatar=downloadAvatar
    }else 
  values.avatar=null
    
    try {
      let {_id,created_by,createdAt,updatedAt, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
      await dispatch(updateArticle(_id ,rest))
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
        from="Operator"
        title="Add new article"
        button={
          <Link href="/operator/articles">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to articles
            </Button>
          </Link>
        }
      />
{loading || !articleMock?<Spinner/>:
      <Card1>
      <RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert content here..."
            />
        <Formik
          initialValues={articleMock}
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
                      name="description"
                      label="Description"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description || ""}
                      errorText={touched.description && errors.description}
                    />
                  </Grid>

                  <Grid item xs={12}>
                  <DropZone
                    onChange={(files) => {
                      console.log(files);
                    }}
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
                      name="content"
                      label="tags"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.content || ""}
                      errorText={touched.content && errors.content}
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
                        console.log(a.target.files[0])
                        setFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.article_avatar}
                      errorText={touched.article_avatar && errors.article_avatar}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled={!content || updateArticleloading}>
                {updateArticleloading ? <Spinner /> : "Create Article"}
                
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
}
    </div>
  );
};

  const formSchema = yup.object().shape({
    title: yup.string().required("${path} is required"),
    content: yup.string().required("${path} is required"),
    activated: yup.bool().nullable(),
    avatar: yup.string().nullable(),
    description: yup.string().nullable(),

  });


  NewArticle.layout = OperatorDashboardLayout;

export default NewArticle;