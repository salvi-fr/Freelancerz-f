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
import { uploadFileFirebase, uploadImageFirebase, useSelector } from 'utils/utils'
import React, { useState, useEffect } from "react";
import Spinner from "@component/Spinner";
import * as yup from "yup";
import {
  updatePublication
} from 'redux/actions/publication'
import { getPublication } from 'redux/actions/publication'
import RichTextEditor from '@component/RichTextEditor/RichTextEditor'
import TextArea from "@component/textarea/TextArea";
import { toast } from "react-toastify";
const EditPublication = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const {
    query: { id },
  } = useRouter();
  console.log(id)
  const { error: publicationError = null } = useSelector((state) => state.publication)
  const { publication: fechedPublication = null } = useSelector((state) => state.publication)
  const [content, setContent] = useState(null)
  const [publicationMock, setPublicationMock] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const { updatePublicationSuccess = false, updatePublicationFailed = false } = useSelector((state) => state.publication)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (updatePublicationFailed && loading) {
      toast.error(publicationError, {
        icon: "😨"
      });
      setLoading(false)
      router.reload()
    }
  }, [updatePublicationFailed])
  useEffect(() => {
    if (updatePublicationSuccess && loading) {
      toast.success("successfully updated", {
        icon: "🚀",
        position: "top-right",
        autoClose: 5000
      });
      setLoading(false)
      if (router.query.redirect) {

        router.push(`/${router.query.redirect}`);
      } else {
        router.push("/admin/publications");
      }
    }
  }, [updatePublicationSuccess, loading])

  useEffect(() => {
    dispatch(getPublication(id as string))
  }, [dispatch])

  useEffect(() => {
    if (fechedPublication) {
      setPublicationMock({ ...fechedPublication })
      setContent(fechedPublication.content)
    }
  }, [fechedPublication])


  const handleFormSubmit = async (values) => {
    setLoading(true)
    if (avatarFile) {
      const avatarUrl = await uploadImageFirebase(avatarFile, `Publications`)
      values.avatar = avatarUrl
    }
    if (pdfFile) {
      const pdfUrl = await uploadFileFirebase(pdfFile, `Publications`)
      values.pdf_url = pdfUrl
    }
    try {
      let { _id, created_by, createdAt, event_avatar, updatedAt, ...rest } = values
      if (content) {
        rest.content = content
      }
      rest = Object.entries(rest).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
      console.log('just about to update', rest)
      await dispatch(updatePublication(id as string, rest))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)

    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit" from="Admin"
        title="Edit publication"
        button={
          <Link href="/admin/publications">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to publications
            </Button>
          </Link>
        }
      />
      {!publicationMock ? <Spinner /> :
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
                        errorText={touched.title && errors.title}
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

                <Button type="submit" variant="contained" color="primary" disabled={!content || loading}>
                  {loading && <Spinner />}
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
  title: yup.string().required("required"),
  description: yup.string().nullable(),
  pdf_url_name: yup.string("is not valid string"),
  publication_avatar: yup.string("is not valid string "),
  // tags:yup.string(),
});
EditPublication.layout = AdminDashboardLayout;

export default EditPublication;