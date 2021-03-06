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
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import * as yup from "yup";
  import {
    updatePayment,getPayment
  } from 'redux/actions/payment'
import Spinner from "@component/Spinner";
import { getOpenCourses } from "@redux/actions/jobs";
import { getUsers } from "@redux/actions/user";
import { ICourse, IUser } from "types";
import Select from "@component/Select";
import { toast } from "react-toastify";
const EditPayment = () => {
    const router = useRouter();
  const dispatch = useDispatch()
 const {
    query: { id },
  } = useRouter();
  console.log(id)
  const {error:paymentError=null}= useSelector((state) => state.payment)
  const {payment:fechedPayment=null}= useSelector((state) => state.payment)
  const [paymentMock, setPaymentMock]=useState(null)
  const [coursesData , setCoursesData]= useState(null)
  const {courses:mCourses=null}= useSelector((state) => state.course)
  const [usersData , setUsersData]= useState(null)
  const {users=null}=useSelector((state)=> state.user)
  const { updatePaymentSuccess=false,  updatePaymentFailed=false}= useSelector((state) => state.payment)
const [loading , setLoading]= useState(false)
useEffect(() => {
  if( updatePaymentFailed && loading){
    toast.error(paymentError, {
      icon: "😨"
    });
    setLoading(false)  
    router.reload()
  }
}, [ updatePaymentFailed])
useEffect(() => {
if( updatePaymentSuccess && loading){
  toast.success("successfully updated", {
    icon: "🚀",
    position: "top-right",
autoClose: 5000
  });
  setLoading(false)
  if(router.query.redirect){
    
    router.push(`/${router.query.redirect}`);
  }else{
    router.push("/admin/payment");
  } 
}
}, [ updatePaymentSuccess,loading])


  useEffect(() => {
    dispatch(getOpenCourses())
    dispatch(getUsers())
    dispatch(getPayment(id as string))
      }, [dispatch])

  
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
    if(fechedPayment){
      let pC = fechedPayment.course? fechedPayment.course as  ICourse: null
      let pU = fechedPayment.user?fechedPayment.user as IUser:null 
      setPaymentMock({...fechedPayment,
        course:pC? {value: pC._id, label: pC.title }:null,
        user:pU? {value: pU._id, label: pU.email }:null,
        type:fechedPayment.type? {value: fechedPayment.type, label: fechedPayment.type }:null,
        status:  fechedPayment.status? {value: fechedPayment.status, label: fechedPayment.status }:null,
      })
      setLoading(false)
      }
      console.log(paymentMock)
  }, [fechedPayment,usersData,coursesData])


  const handleFormSubmit = async (values) => {
setLoading(true)
    try {
      values.type= values.type? values.type.value:"CASH",
      values.status= values.status? values.status.value:null,
      values.user= values.user? values.user.value:null,
      values.course= values.course? values.course.value:null
     let {_id,created_by,subscribers,createdAt,payment_avatar,updatedAt, ...rest}=values
     
     rest= Object.entries(rest).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
     console.log('just about to update',rest)
      await dispatch(updatePayment(id as string,rest))
    } catch (e) {
      setLoading(false)
      console.log("got error", e)
        
    }
  };

  return (
    <div>
      <DashboardPageHeader
        iconName="edit"
        title="Edit payment" from="Admin"
        button={
          <Link href="/admin/payments">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to payments
            </Button>
          </Link>
        }
      />
     <Card1>
{!paymentMock? <Spinner/>:
<>
   <Formik
   initialValues={paymentMock}
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

       <Button type="submit" variant="contained" color="primary" disabled= { loading}>
       {loading && <Spinner  />}
         Update Payment
       </Button>
     </form>
   )}
 </Formik>
 </>
              }
</Card1>

</div>
);
};


const checkoutSchema = yup.object().shape({
transaction_reference: yup.string().nullable(),
transaction_id: yup.string().nullable(),
amount: yup.number().required("${path} is required"),
course: yup.object().required("${path} is required"),
user: yup.string().required("${path} is required"),
promo:  yup.string().nullable(),
payment: yup.string().nullable(),
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
EditPayment.layout = AdminDashboardLayout;

export default  EditPayment;