import Avatar from "@component/avatar/Avatar";
import Card from "@component/Card";
import VendorAnalyticsChart from "@component/dashboard/VendorAnalyticsChart";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Typography, { H1, H5, Paragraph } from "@component/Typography";
import React,{useEffect,useRef} from "react";
import OperatorDashboarLayout from "@component/layout/OperatorDashboardLayout";
import { useDispatch } from "react-redux";
import {useSelector} from 'utils/utils'
import {
  getStats
} from 'redux/actions/stats'


const Dashboard = () => {
  const dispatch = useDispatch();
  const {stats} = useSelector((state) => state.stat);
  const firstUpdate = useRef(true);
  useEffect(() => {
    dispatch(getStats())
    firstUpdate.current = false
  }, [dispatch])
  return (
    <div>
      <DashboardPageHeader title="Dashboard" iconName="bag_filled"  from="Operator"/>
{stats && 
<>
<Grid container spacing={6}>
 
    <Grid item lg={4} md={4} sm={6} xs={12} >
      <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
        <H5 color="text.muted" mb="8px">
        Published courses
          
        </H5>
        <H1 color="gray.700" mb="4px" lineHeight="1.3">
        {stats.totalActiveCourse}
        </H1>
        <Paragraph color="text.muted">courses on market now</Paragraph>
      </Typography>
    </Grid>
     <Grid item lg={4} md={4} sm={6} xs={12} >
     <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
       <H5 color="text.muted" mb="8px">
       Active student
       </H5>
       <H1 color="gray.700" mb="4px" lineHeight="1.3">
         {stats.totalStudent}
       </H1>
       <Paragraph color="text.muted"> Students enrolled in your courses</Paragraph>
     </Typography>
   </Grid>
    <Grid item lg={4} md={4} sm={6} xs={12}>
    <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
      <H5 color="text.muted" mb="8px">
      Active Instructors
      </H5>
      <H1 color="gray.700" mb="4px" lineHeight="1.3">
        {stats.totalInstructor}
      </H1>
      <Paragraph color="text.muted">Instructors activelly publishing courses</Paragraph>
    </Typography>
  </Grid>
   <Grid item lg={4} md={4} sm={6} xs={12} >
   <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
     <H5 color="text.muted" mb="8px">
     Earnings (before taxes)
     </H5>
     <H1 color="gray.700" mb="4px" lineHeight="1.3">
       {stats.totalPayment}
     </H1>
     <Paragraph color="text.muted"> after associated vendor fees</Paragraph>
   </Typography>
 </Grid>
  <Grid item lg={4} md={4} sm={6} xs={12} >
  <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
    <H5 color="text.muted" mb="8px">
    Your balance
    </H5>
    <H1 color="gray.700" mb="4px" lineHeight="1.3">
      {stats.totalPayment}
    </H1>
    <Paragraph color="text.muted">Will be processed on Feb 15, 202</Paragraph>
  </Typography>
</Grid>
 

  <Grid item lg={8} xs={12}>
    <Card p="20px 30px">
      <H5 mb="1.5rem">Sales</H5>
      <VendorAnalyticsChart />
    </Card>
  </Grid>

</Grid>
</>
 
}
    
    </div>
  );
};



Dashboard.layout = OperatorDashboarLayout;

export default Dashboard;
