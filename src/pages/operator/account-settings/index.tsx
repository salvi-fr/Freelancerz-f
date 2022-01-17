import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import OperatorDashboardLayout from "@component/layout/OperatorDashboardLayout";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import React, { useState,useRef,useEffect } from "react";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import * as yup from "yup";
import {
  getMe,updateUser
} from 'redux/actions/user'

// import { useRouter } from "next/router";
 

const AccountSettings = () => {
  // const router = useRouter();
  const {profile=null}= useSelector((state) => state.user)
  const {error:ProfileError=null}= useSelector((state) => state.user)
  const {updateUserSuccess=false}= useSelector((state) => state.user)
  const [myProfileData, setMyProfileData]= useState(null)
// const [image , setImage]=useState(null)
  const [foundError,setFoundError]= useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  console.log(foundError)
  useEffect(() => {
    dispatch(getMe())
    firstUpdate.current = false
  }, [dispatch])

//   const uploadFile = async e => {
//     console.log("Uploading....")
//     const files = e.target.files;
//     const data = new FormData();
//     data.append('file', files[0]);
//     data.append('upload_preset', 'BillingRestro');

//     const res = await fetch('https://api.cloudinary.com/v1_1/dxkxvfo2o/image/upload', {
//         method: 'POST',
//         body: data
//     });

//     const file = await res.json();
//     setImage({ image: file.secure_url })
// }
  useEffect(() => {
    if(ProfileError && !firstUpdate.current){
      setFoundError(ProfileError)
    }
    
  }, [ProfileError])
  
  useEffect(() => {
    if (profile) {
      setMyProfileData(profile)
    }
    console.log(myProfileData)
  }, [profile])
  const handleFormSubmit = async (values) => {
    const {avatar,...rest}= values
    try {
     
      await dispatch(updateUser(myProfileData._id,rest))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  useEffect(() => {
    if(updateUserSuccess && !firstUpdate.current){
      dispatch(getMe())
    }
  }, [updateUserSuccess])

  return (
    <div>
      <DashboardPageHeader  from="Operator" title="Account" iconName="settings_filled" />

      <Card1 p="24px 30px">
        <Box
          borderRadius="10px"
          overflow="hidden"
          height="173px"
          mb="1.5rem"
          position="relative"
          style={{
            background:
              "url(/assets/images/banners/banner-10.png) center/cover",
          }}
        >
          <Box
            display="flex"
            alignItems="flex-end"
            position="absolute"
            bottom="20px"
            left="24px"
          >
            <Avatar
              src="/assets/images/faces/propic(9).png"
              size={80}
              border="4px solid"
              borderColor="gray.100"
            />

            <Box ml="-20px" zIndex={1}>
              <label htmlFor="profile-image">
                <Button
                  as="span"
                  size="small"
                  bg="gray.300"
                  color="secondary"
                  height="auto"
                  p="6px"
                  borderRadius="50%"
                >
                  <Icon>camera</Icon>
                </Button>
              </label>
            </Box>
            <Hidden>
              <input
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
                id="profile-image"
                accept="image/*"
                type="file"
              />
            </Hidden>
          </Box>

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
{profile && 
        <Formik
          initialValues={profile}
          validationSchema={accountSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            // setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName || ""}
                      errorText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName || ""}
                      errorText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      disabled
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ""}
                      errorText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="mobileNumber"
                      label="Phone"
                      fullwidth
                      type="tel"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobileNumber || ""}
                      errorText={touched.mobileNumber && errors.mobileNumber}
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <Select
                      label="Country"
                      options={countryList}
                      value={values.country || "US"}
                      errorText={touched.country && errors.country}
                      onChange={(country) => {
                        setFieldValue("country", country);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="city"
                      label="City"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city || ""}
                      errorText={touched.city && errors.city}
                    />
                  </Grid> */}
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
        }
      </Card1>
    </div>
  );
};


const accountSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  avatar: yup.string(),
  mobileNumber: yup.string().required("required"),
});

AccountSettings.layout = OperatorDashboardLayout;

export default AccountSettings;
