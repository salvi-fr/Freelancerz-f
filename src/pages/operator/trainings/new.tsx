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
import firebaseStorage from "lib/firebaseCloudStorage";
import Spinner from "@component/Spinner";
  import {
    createTraining
  } from 'redux/actions/training'
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";

const NewTraining = () => {
    const router = useRouter();
  const dispatch = useDispatch()

  const {error:trainingError=null}= useSelector((state) => state.training)
  const {createTrainingSuccess=false}= useSelector((state) => state.training)
  const {createTrainingloading=false}= useSelector((state) => state.training)
 const [content, setContent] = useState(null)
 const [file,setFile]=useState(null)
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  console.log(foundError)
  useEffect(() => {
    if(trainingError && !firstUpdate.current){
        setFoundError(trainingError)
      }
  }, [trainingError])
useEffect(() => {
  if(createTrainingSuccess){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/operator/trainings");
    }
    
  }
}, [createTrainingSuccess])

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
      }
    try {
     values.content=content
      await dispatch(createTraining(values))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="New Training"
        from="Operator"
        button={
          <Link href="/operator/trainings">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to trainings
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
                      name="training_avatar"
                      label="Cover Image jpeg/png/jpg/gif"
                      fullwidth
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      onChange={(a) => {
                        setFile(a.target.files[0])
                        handleChange(a)
                      }}
                      value={values.training_avatar}
                      errorText={touched.training_avatar && errors.training_avatar}
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

              <Button type="submit" variant="contained" color="primary" disabled={!content || createTrainingloading }>
              {createTrainingloading && <Spinner  />}
                Creeate training
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
  happen_from: "",
  happen_to: "",
  training_avatar: "",
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description:  yup.string().nullable(),
  happen_from:  yup.date().required("invalid date"),
  happen_to:  yup.date().required("invalid date"),
  training_avatar: yup.string().required("required")
});

NewTraining.layout = OperatorDashboardLayout;

export default  NewTraining;