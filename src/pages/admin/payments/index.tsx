import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small ,H4} from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState,useRef,useEffect, useCallback} from "react";
import Button from "@component/buttons/Button";
// import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getPayments,deletePayment
} from 'redux/actions/payment'
import { useRouter } from "next/router";
import DeleteModel from "@component/modal/DeleteModel";
import { IPayment } from "types";
import { ToastContainer } from "react-toastify";
const limit =10
const PaymentsList = () => {
     
  const {payments=null}= useSelector((state) => state.payment)
  const {error:paymentError=null}= useSelector((state) => state.payment)
  const [paymentsData, setCoursesData]= useState([])
  const router = useRouter();
  const [id, setId]= useState(null)
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)

  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)

  }
  const handleDelete = async () => {
    try {
      await dispatch(deletePayment(id))
      setOpen((open) => !open);
      router.reload()
    } catch (e) {
  
      console.log("got error", e,foundError)
        setFoundError(e.message)
        
    }
    
  }
   
  
    const toggleDialog = useCallback(() => {
      setOpen((open) => !open);
    }, []);
  const [foundError,setFoundError]= useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  console.log(foundError)
  useEffect(() => {
    dispatch(getPayments())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(paymentError && !firstUpdate.current){
      setFoundError(paymentError)
    }
    
  }, [paymentError])
  
  useEffect(() => {
    if (payments && payments.data) {
      setCoursesData(payments.data as IPayment[])
    }
    
  }, [payments])

  return (
    <div>
      <DashboardPageHeader title="Payments" iconName="box"  from="Admin"
      button={
        <Link href="/admin/payments/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create payment
            </Button>
          </a>
        </Link>}/>
{paymentsData && paymentsData.length > 0?
<>
      {paymentsData.slice(from,to).map((item,ind) => (
        
          <TableRow
          key={ind}
            // as="a"
            // href={`/admin/payments/${item._id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
            <H4 >{item.slug}</H4>
              <span>Reference: {item.transaction_reference}</span>
              <br/>
              <span>Transaction Id: {item.transaction_id}</span>
              <br/>
              <SemiSpan m="6px">Course: {item.course.title}</SemiSpan>
              <br/>
              <SemiSpan m="6px">User: {item.user.firstName}</SemiSpan>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">

              
                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">{item.status}</Small>
              </Chip>
                <SemiSpan className="pre" m="6px">
                  Last updated {format(new Date(item.updatedAt), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">{item.type}</SemiSpan>
                <SemiSpan m="6px">amount: {item.amount}</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            
              <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/admin/payments/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/admin/payments/edit/${item._id}`}
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small"
             onClick={() => {
              setId(item._id)
              toggleDialog()
            }}
             >
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
            <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
          </Typography>
            </Hidden>
          </TableRow>
       
      ))}
        <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {paymentsData.length} Payments</SemiSpan>
            <Pagination pageCount={paymentsData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
      </>:<div className="text-center"> <H4>No payments found</H4></div>}
      <ToastContainer autoClose={2000} />
      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
      message="after deleting this payment  you won't see it again "/>
      
    </div>
  );
};

PaymentsList.layout = AdminDashboardLayout;

export default PaymentsList;