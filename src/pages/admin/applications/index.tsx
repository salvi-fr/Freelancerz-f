import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small, H4 } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "@component/buttons/Button";

import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import {
  getApplications, deleteApplication
} from '@redux/actions/application'
import { useRouter } from "next/router";
import DeleteModel from "@component/modal/DeleteModel";
import { ToastContainer } from "react-toastify";
const limit = 10


const ApplicationsList = () => {

  const { applications = null } = useSelector((state) => state.application)
  const { error: applicationError = null } = useSelector((state) => state.application)
  const [applicationsData, setCoursesData] = useState([])
  const router = useRouter();
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false);
  const [foundError, setFoundError] = useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)

  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)

  }
  useEffect(() => {
    dispatch(getApplications())
    firstUpdate.current = false
  }, [dispatch])

  useEffect(() => {
    if (applicationError && !firstUpdate.current) {
      setFoundError(applicationError)
    }
    console.log(foundError)
  }, [applicationError])


  useEffect(() => {
    if (applications && applications.data) {
      setCoursesData(applications.data)
    }

  }, [applications])
  const handleDelete = async () => {
    try {
      await dispatch(deleteApplication(id))
      setOpen((open) => !open);
      router.reload()
    } catch (e) {

      console.log("got error", e, foundError)
      setFoundError(e.message)

    }

  }


  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);
  return (
    <div>
      <DashboardPageHeader title="Your Applications" iconName="box" from="Admin"
        button={
          <Link href="/admin/applications/new">
            <a>
              <Button color="primary" bg="primary.light" px="2rem">
                Create application
              </Button>
            </a>
          </Link>} />
      {applicationsData && applicationsData.length > 0 ?
        <>
          {applicationsData.slice(from, to).map((item, ind) => (
            // <Link href={`/admin/applications/${item._id}`} key={ind}>
            <TableRow
              // as="a"
              // href={`/admin/applications/${item._id}`}
              key={ind}
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
                    Last updated {format(new Date(item.updatedAt), "MMM dd, yyyy")}
                  </SemiSpan>
                  <SemiSpan m="6px">{item.type}</SemiSpan>
                </FlexBox>
              </div>

              <Hidden flex="0 0 0 !important" down={769}>

                <Typography className="pre" textAlign="center" color="text.muted">
                  <Link href={`/admin/applications/edit/${item._id}`}>
                    <Typography
                      as="a"
                      href={`/admin/applications/edit/${item._id}`}
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
            // </Link>
          ))}

          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {applicationsData.length} Application</SemiSpan>
            <Pagination pageCount={applicationsData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
        </> : <div className="text-center"> <H4>No applications found</H4></div>}
        <ToastContainer autoClose={2000} />
      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
        message="after deleting this application you wont see it again " />


    </div>
  );
};

ApplicationsList.layout = AdminDashboardLayout;

export default ApplicationsList;
