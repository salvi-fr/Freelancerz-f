import { useFormik } from "formik";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import * as yup from "yup";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";
import {
    Signup
} from '../../redux/actions/auth'
import {roleCategories, stackCategories} from '@data/categories'
import MultipleSelect from "@component/multipleSelect";
interface SignupProps {
    role?: string
}
const SignupC: React.FC<SignupProps> = ({ role }) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const { signupAuthSuccess = false } = useSelector((state) => state.auth)
    const { error: authError = null } = useSelector((state) => state.auth)
    const[loading,setLoading] = useState(false)
    const [foundError, setFoundError] = useState(null)

    const togglePasswordVisibility = () => {
        setPasswordVisibility((visible) => !visible);
    };

    useEffect(() => {
        setLoading(false)
        if (authError && loading) {
            setFoundError(authError)
        }
        

    }, [authError])
    
    useEffect(() => {
        if (signupAuthSuccess && loading) {
            setLoading(false)
            if (router.query.redirect) {
                router.push(`/${router.query.redirect}`);
            } else {
                router.push("/");
            }

        }
    }, [signupAuthSuccess])

    const handleFormSubmit = async (values) => {
        try {
            setLoading(true)
            const { re_password,stack,githubUsername, ...rest } = values
            rest.stackId= stack? stack.map(item => item.value).toString():null,
            rest.githubUsername = githubUsername? githubUsername.replace("@", ""):null,
            rest.userTypeId = roleCategories.find((item) => item.label == role).value
                await dispatch(Signup(rest))
        } catch (e) {
            setLoading(false)
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
                    name="phoneNumber"
                    label="Mobile Number"
                    placeholder="25078..."
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber || ""}
                    errorText={touched.phoneNumber && errors.phoneNumber}
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
                <TextField
                    mb="0.75rem"
                    name="githubUsername"
                    label="Github Username (Start with @)"
                    placeholder="Adwards"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.githubUsername|| ""}
                    errorText={touched.githubUsername && errors.githubUsername}
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
    <MultipleSelect
    mb="1rem"
                      label="Stack"
                      placeholder="Select Stacks"
                      options={stackCategories}
                      value={values.stack || ""}
                      onChange={(s) => {
                        setFieldValue("stack", s);
                      }}
                      errorText={touched.stack && errors.stack}
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
                    disabled={loading}
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
                <Span color="text.muted"  px="1rem">
                            or
                        </Span>
                        
                <Link href="/">
                    <a>
                        <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                            Go to Home page
                        </H6>
                    </a>
                </Link>
            </FlexBox>
        </StyledSessionCard>
    );
};

const initialValues = {
	stack: null,
    firstName: "",
    lastName: "",
    githubUsername: "",
    proffession: "",
    degree: "",
    reguratory: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false,
};
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const githuUR=/\B@(?!.*(-){2,}.*)[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\b/ig
const formSchema = yup.object().shape({
    githubUsername: yup.string().matches(githuUR, "Github username is not valid"),
    lastName: yup.string().required("${path} is required"),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("${path} is required"),
    stack: yup.array(),
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
