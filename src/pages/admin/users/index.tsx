import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Button from "@component/buttons/Button";

const CoursesList = () => {
  return (
    <div>
      <DashboardPageHeader title="Your Courses" iconName="box"  from="Admin"
      button={
        <Link href="/admin/courses/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create Course
            </Button>
          </a>
        </Link>}/>

      {courses.map((item,ind) => (
        <Link href={`/admin/courses/${item._id}`} key={ind}>
          <TableRow
            as="a"
            href={`/admin/courses/${item._id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
              <span>{item.name}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
                <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                  <Small color="primary.main">Urgent</Small>
                </Chip>
                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                  <Small color="success.main">Open</Small>
                </Chip>
                <SemiSpan className="pre" m="6px">
                  {format(new Date('2020-10-12'), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">{item.type}</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            
              <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/admin/courses/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/admin/courses/edit/${item._id}`}
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
          </Typography>
            </Hidden>
          </TableRow>
        </Link>
      ))}

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

CoursesList.layout = AdminDashboardLayout;

export default CoursesList;

const courses= [
  {
  _id: 1,
  name: 'Introduction to hematology',
  status: 'Open',
  date: '2020-10-12',
  type: 'Website Problem',
}
,
{
  _id: 2,
  name: 'Introduction to hematology',
  status: 'Open',
  date: '2020-10-12',
  type: 'Website Problem',
},
{
  _id: 3,
  name: 'Introduction to hematology',
  status: 'Open',
  date: '2020-10-12',
  type: 'Website Problem',
},
{
  _id: 4,
  name: 'Introduction to hematology',
  status: 'Open',
  date: '2020-10-12',
  type: 'Website Problem',

}]
