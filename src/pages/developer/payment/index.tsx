import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import StudentDashboardLayout from "@component/layout/DeveloperDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import DeleteModel from "@component/modal/DeleteModel";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H4, SemiSpan, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { deletePayment, getPayments } from 'redux/actions/payment';
import { useSelector } from 'utils/utils';

const PaymentsList = () => {
     
  const {payments=null}= useSelector((state) => state.payment)
  const {error:paymentError=null}= useSelector((state) => state.payment)
  const [paymentsData, setCoursesData]= useState([])
  const router = useRouter();
  const [id, setId]= useState(null)
  const [open, setOpen] = useState(false);


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
      setCoursesData(payments.data)
    }
    
  }, [payments])

  return (
    <div>
      <DashboardPageHeader title="Your Payments" iconName="box"  from="Student"/>
{paymentsData && paymentsData.length > 0?
<>
      {paymentsData.map((item,ind) => (
        
          <TableRow
          key={ind}
            // as="a"
            // href={`/admin/payments/${item._id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
            <H4 >{item.title}</H4>
              <span>{item.description}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
              {!item.activated && 
                <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                  <Small color="primary.main">Not Activated</Small>
                </Chip>}
                {item.activated && 
                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Activated</Small>
              </Chip>}
                <SemiSpan className="pre" m="6px">
                  {format(new Date(item.updatedAt), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">{item.type}</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            
              <Typography className="pre" textAlign="center" color="text.muted">
            {/* <Link href={`/admin/payments/edit/${item._id}`}>
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
            </Link> */}
       
            {/* <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton> */}
          </Typography>
            </Hidden>
          </TableRow>
       
      ))}
      </>:<div className="text-center"> <H4>No payments found</H4></div>}
      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data);
          }}
        />
      </FlexBox>
    </div>
  );
};

PaymentsList.layout = StudentDashboardLayout;

export default PaymentsList;

