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
  getEvents,deleteEvent
} from 'redux/actions/event'
import { useRouter } from "next/router";
import DeleteModel from "@component/modal/DeleteModel";
import { ToastContainer } from "react-toastify";
const limit = 10
const EventsList = () => {
     
  const {events=null}= useSelector((state) => state.event)
  const {error:eventError=null}= useSelector((state) => state.event)
  const [eventsData, setCoursesData]= useState([])
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
      await dispatch(deleteEvent(id))
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
    dispatch(getEvents())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(eventError && !firstUpdate.current){
      setFoundError(eventError)
    }
    
  }, [eventError])
  
  useEffect(() => {
    if (events && events.data) {
      setCoursesData(events.data)
    }
    
  }, [events])

  return (
    <div>
      <DashboardPageHeader title="Events" iconName="box"  from="Admin"
      button={
        <Link href="/admin/events/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create event
            </Button>
          </a>
        </Link>}/>
{eventsData && eventsData.length > 0?
<>
      {eventsData.slice(from,to).map((item,ind) => (
        
          <TableRow
          key={ind}
            // as="a"
            // href={`/admin/events/${item._id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
            <H4 >{item.title}</H4>
              <span>{item.description}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
              { (item.happen_fromformat && ((format(new Date(item.happen_from), "MMM dd, yyyy")) < (format(Date.now(), "MMM dd, yyyy") )) ) ?
                <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                  <Small color="primary.main">Happened at {format(new Date(item.happen_from), "MMM dd, yyyy")}</Small>
                </Chip>: <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Happening at {format(new Date(item.happen_from), "MMM dd, yyyy")}</Small> </Chip>}
                
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
            <Link href={`/admin/events/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/admin/events/edit/${item._id}`}
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
            <SemiSpan>Showing {from + 1}-{to} of {eventsData.length} Events</SemiSpan>
            <Pagination pageCount={eventsData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
      </>:<div className="text-center"> <H4>No events found</H4></div>}
      <ToastContainer autoClose={2000} />
      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
      message="after deleting this event  you won't see it again "/>
    
    </div>
  );
};

EventsList.layout = AdminDashboardLayout;

export default EventsList;