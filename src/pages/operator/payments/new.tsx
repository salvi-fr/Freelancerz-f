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
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
import {useSelector} from '@utils/utils'
  import {
    createPayment
  } from 'redux/actions/payment'

  import {getOpenCourses} from '@redux/actions/jobs'
  import {getUsers} from '@redux/actions/user'

import Select from "@component/Select";
import DropZone from "@component/DropZone";
import TextArea from "@component/textarea/TextArea";
const NewPayment = () => {
    const router = useRouter();
  const dispatch = useDispatch()

  const {error:paymentError=null}= useSelector((state) => state.payment)
  const {createPaymentSuccess=false}= useSelector((state) => state.payment)
  const {createPaymentloading=false}= useSelector((state) => state.payment)
  const {courses:mCourses=null}= useSelector((state) => state.course)
  const {users=null}=useSelector((state)=> state.user)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)
  const [coursesData, setCoursesData]=useState([])
  const [usersData, setUsersData]=useState([])
  const [loading ,setLoading]=useState(false)
console.log(foundError)

useEffect(() => {
  setLoading(true)
      dispatch(getOpenCourses())
      dispatch(getUsers())
      firstUpdate.current = false
    }, [dispatch])
  useEffect(() => {
    if(paymentError && !firstUpdate.current){
        setFoundError(paymentError)
      }
  }, [paymentError])

  useEffect(() => {
if (mCourses && mCourses.data) {
        setCoursesData([])
        mCourses.data.map((item) => {
        setCoursesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
        })  
    }
  }, [mCourses])

  useEffect(() => {
    if (users && users.data) {
            setUsersData([])
            users.data.map((item) => {
            setUsersData((prevState) => [...prevState, { value: item._id, label: item.email }]);
            })  
        }
      }, [users])

useEffect(() => {
  if(createPaymentSuccess && !firstUpdate.current){
    firstUpdate.current=true
    if(router.query.redirect){
      router.push(`/${router.query.redirect}`);
    }else{
      router.push("/operator/payments");
    }
    
  }
}, [createPaymentSuccess])

  const handleFormSubmit = async (values) => {
    console.log("Just submitting ")
    values.type= values.type? values.type.value:"CASH",
    values.status= values.status? values.status.value:null,
    values.user= values.user? values.user.value:null,
    values.course= values.course? values.course.value:null
    setLoading(true)
    firstUpdate.current=false
    try {
        // let rest = Object.entries(values).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
     
      await dispatch(createPayment(values))
    } catch (e) {
      console.log("got error", e)
        setFoundError(e.message)
        
    }
  };


  return (
    <div>
      <DashboardPageHeader
        iconName="edit" from="Operator"
        title="New Payment"
        button={
          <Link href="/operator/payments">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to payments
            </Button>
          </Link>
        }
      />
      {loading && <p>loading</p>}

      <Card1>

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
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px" mt="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  
                  
                <Grid item md={6} xs={12}>
                    <TextField
                      name="transaction_reference"
                      label="Transaction Reference"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.transaction_reference || ""}
                      errorText={touched.transaction_reference  && errors.transaction_reference }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="transaction_id"
                      label="Transaction Id"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.transaction_id || ""}
                      errorText={touched.transaction_id && errors.transaction_id}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="amount"
                      label="Amount"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.amount || ""}
                      errorText={touched.amount  && errors.amount }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Select
                      label="Course"
                      placeholder="Select course"
                      options={coursesData}
                      defaultValue={coursesData[0]}
                      value={values.course || ""}
                      onChange={(c) => {
                        setFieldValue("course", c);
                      }}
                      errorText={touched.status && errors.status}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Select
                      label="User"
                      placeholder="Select user"
                      options={usersData}
                      defaultValue={usersData[0]}
                      value={values.user || ""}
                      onChange={(u) => {
                        setFieldValue("user",  u);
                      }}
                      errorText={touched.user && errors.user}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Select
                      label="Status"
                      placeholder="Select Status"
                      options={paymentStatus}
                      defaultValue={paymentStatus[0]}
                      value={values.status || ""}
                      onChange={(s) => {
                        setFieldValue("status", s);
                      }}
                      errorText={touched.status && errors.status}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Select
                      label="Type"
                      placeholder="Select payment type"
                      options={paymentType}
                      defaultValue={paymentType[0]}
                      value={values.type|| ""}
                      onChange={(t) => {
                        setFieldValue("type", t);
                      }}
                      errorText={touched.type && errors.type}
                    />
                  </Grid>
                  
                
                
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary" disabled= { createPaymentloading}
                >
                Create Payment
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
      
    </div>
  );
};

const initialValues = {
type:null,
status:null,
transaction_reference:null,
transaction_id: null,
amount: null,
course:"",
promo: null,
event: null,
user: null
};

const checkoutSchema = yup.object().shape({
transaction_reference: yup.string().nullable(),
transaction_id: yup.string().nullable(),
amount: yup.number().required("${path} is required"),
course: yup.object().required("${path} is required"),
user: yup.string().required("${path} is required"),
promo:  yup.string().nullable(),
event: yup.string().nullable(),
status:  yup.string().nullable(),
type:  yup.string().nullable(),

});
const paymentStatus= [
  {label:"REVERTED",
  value:"REVERTED"
},
  {
    label:"AWAIT",
    value:"AWAIT"
  },
  {
    label:"FAILED",
    value:"FAILED"
  },
  {
    label:"SUCCESS",
    value:"SUCCESS"
  }
]

const paymentType= [
  {label:"CASH",
  value:"CASH"
},
  {
    label:"FLUTTERWAVE",
    value:"FLUTTERWAVE"
  },
  {
    label:"COUPON",
    value:"COUPON"
  },
  {
    label:"MOMO",
    value:"MOMO"
  },
  {
    label:"PAYPAL",
    value:"PAYPAL"
  },
  {
    label:"CARD",
    value:"CARD"
  }
]
NewPayment.layout = OperatorDashboardLayout;

export default  NewPayment;