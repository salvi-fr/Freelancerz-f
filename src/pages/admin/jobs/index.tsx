import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small, H4,} from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState,useRef,useCallback,useEffect } from "react";
import Button from "@component/buttons/Button";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getJobs,deleteJob
} from '@redux/actions/jobs'
import { useRouter } from "next/router";
import DeleteModel from "@component/modal/DeleteModel";
import { ToastContainer } from "react-toastify";
const limit =10
const JobsList = () => {
   
    const {jobs=null}= useSelector((state) => state.job)
const {error:jobError=null}= useSelector((state) => state.job)
const [jobsData, setJobsData]= useState([])
const router = useRouter();
const [id, setId]= useState(null)
const [open, setOpen] = useState(false);
const [foundError,setFoundError]= useState(null)
const firstUpdate = useRef(true);
const dispatch = useDispatch()
const [from, setFrom] = useState(0)
const [to, setTo] = useState(limit)

const onPageChange = (page: number) => {
  setFrom(page * limit)
  setTo(page * limit + limit)

}
useEffect(() => {
  dispatch(getJobs("opened"))
  firstUpdate.current = false
}, [dispatch])
console.log(foundError)
useEffect(() => {
  if(jobError && !firstUpdate.current){
    setFoundError(jobError)
  }
  
}, [jobError])

useEffect(() => {
  if (jobs && jobs.data) {
    setJobsData(jobs.data)
  }
  
}, [jobs])

const handleDelete = async () => {
  try {
    await dispatch(deleteJob(id))
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
  return (
    <div>
      <DashboardPageHeader title="All Jobs" iconName="box"from="Admin"
      
      button={
        <Link href="/admin/jobs/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create Job
            </Button>
          </a>
        </Link>
      }/>
{ jobsData && jobsData.length>0? <>
      {jobsData.slice(from,to).map((item,ind) => (
          <TableRow
          key={ind}
            my="1rem"
            padding="15px 24px"
          >
            <div>
              <H4 >{item.title}</H4>
              <span>{item.description.slice(1,300)} ...</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
              <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">{item.jobType}</Small>
              </Chip>

              <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Status: {item.status}</Small>
              </Chip>

              <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Year of experience: {item.yearsOfExperience}</Small>
              </Chip>
              <SemiSpan className="pre" m="6px">
                  Start Date: {format(new Date(item.startDate), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan className="pre" m="6px">
                  End Date: {format(new Date(item.endDate), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">{item.type}</SemiSpan>
                {item.stacks && 
                <>
                {item.stacks.map((stack,ind) => (
                  <Chip p="0.25rem 1rem" bg="primary.light" m="6px" key={ind}>
                  <Small color="primary.main">{stack.tech}</Small>
                </Chip>
                ))
                }
                </>
                }
                 <br/>
                
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/admin/jobs/edit/${item.id}`}>
              <Typography
                as="a"
                href={`/admin/jobs/edit/${item.id}`}
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
              setId(item.id)
              toggleDialog()
            }}
             >
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
            <Link href={`/admin/jobs/view/${item.id}`}>
              <Typography
                as="a"
                href={`/admin/jobs/view/${item.id}`}
                color="inherit"
              >
            <IconButton size="small" >
              <Icon variant="small" defaultcolor="currentColor">
              arrow-right
              </Icon>
            </IconButton>
            </Typography>
            </Link>
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
            <SemiSpan>Showing {from + 1}-{to} of {jobsData.length} Jobs</SemiSpan>
            <Pagination pageCount={jobsData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
      </> :<div className="text-center"> <H4>No job found</H4></div>}
      <ToastContainer autoClose={2000} />
      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
      message="after deleting job you wont see it again "/>
      
    </div>
  );
};

JobsList.layout = AdminDashboardLayout;

export default JobsList;

