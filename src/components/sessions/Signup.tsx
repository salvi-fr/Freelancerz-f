import { useFormik } from "formik";
import Link from "next/link";
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";
import {
  // Login,
  // RefreshToken,
  Signup
} from '../../redux/actions/auth'
import {
  getRoles
} from '../../redux/actions/role'
import Select from "@component/Select";
const SignupC: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const { roles=null}= useSelector((state) => state.role)

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  // const {refreshAuthloading=false}= useSelector((state) => state.auth)
  // const {refreshAuthSuccess=false}= useSelector((state) => state.auth)
  // const {refreshAuthFailed=false}= useSelector((state) => state.auth)
  const {signupAuthSuccess=false}= useSelector((state) => state.auth)
  const {error:authError=null}= useSelector((state) => state.auth)
  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  const [roleCategories,setRoleCategories]= useState([])

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

useEffect(() => {
  if (firstUpdate.current) {
    dispatch(getRoles())
    firstUpdate.current = false
  }
  if(authError && !firstUpdate.current){
    setFoundError(authError)
  }
  
}, [authError])
useEffect(() => {
  if (roles.data) {
    setRoleCategories([])
    roles.data.map((item) => {
      if (item.name != "admin" && item.name != "operator") {
        setRoleCategories((prevState) => [...prevState, { value: item._id, label: item.name }]);
      }
      
    })
   
  }
  
}, [roles])
useEffect(() => {
  if(signupAuthSuccess){
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/");
    }
    
  }
}, [signupAuthSuccess])

  const handleFormSubmit = async (values) => {
    try {
      const {re_password,role,aggrement, ...rest} = values
      rest.role = role.value,
      await dispatch(Signup(rest))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <Small textAlign="center" mb="0.5rem">{foundError}</Small>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Create Your Account
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Please fill all forms to continued
        </H5>

       
         <TextField
          mb="0.75rem"
          name="firstName"
          label="First Name"
          placeholder="Ralph "
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName || ""}
          errorText={touched.firstName && errors.firstName}
        />
         <TextField
          mb="0.75rem"
          name="lastName"
          label="Last Name"
          placeholder="Adwards"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName || ""}
          errorText={touched.lastName && errors.lastName}
        />
          <TextField
          mb="0.75rem"
          name="mobileNumber"
          label="Mobile Number"
          placeholder="25078..."
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.mobileNumber || ""}
          errorText={touched.mobileNumber && errors.mobileNumber}
        />
        <TextField
          mb="0.75rem"
          name="email"
          placeholder="exmple@mail.com"
          label="Email or Phone Number"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
        />
                      <Select
                    label="Role"
                    placeholder="Select Roles"
                    options={roleCategories}
                    value={values.role || ""}
                    onChange={(role) => {
                      setFieldValue("role", role);
                    }}
                    errorText={touched.role && errors.role}
                  />
        <TextField
          mb="0.75rem"
          name="password"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          label="Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
        />
        <TextField
          mb="1rem"
          name="re_password"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          label="Confirm Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          errorText={touched.re_password && errors.re_password}
        />

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          checked={values.agreement}
          onChange={handleChange}
          label={
            <FlexBox>
              <SemiSpan>By signing up, you agree to</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Create Account
        </Button>

        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              or
            </Span>
          </FlexBox>
        </Box>

        {/* <FlexBox
          justifyContent="center"
          alignItems="center"
          bg="#3B5998"
          borderRadius={5}
          height="40px"
          color="white"
          cursor="pointer"
          mb="0.75rem"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            facebook-filled-white
          </Icon>
          <Small fontWeight="600">Continue with Facebook</Small>
        </FlexBox>

        <FlexBox
          justifyContent="center"
          alignItems="center"
          bg="#4285F4"
          borderRadius={5}
          height="40px"
          color="white"
          cursor="pointer"
          mb="1.25rem"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Continue with Google</Small>
        </FlexBox> */}
      </form>
      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Already have account?</SemiSpan>
        <Link href="/login">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Log in
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  firstName: "",
	lastName: "",
	mobileNumber: "",
	role: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};
const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const formSchema = yup.object().shape({
  lastName: yup.string().required("${path} is required"),
  mobileNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("${path} is required"),
  role: yup.string().required("${path} is required"),
  firstName: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().matches(passwordRegExp, 'weak password, it must contain special character , upper and lowercase , number and characters').
  required("${path} is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default SignupC;
