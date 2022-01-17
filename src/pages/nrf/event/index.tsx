import FlexBox from "@component/FlexBox";
import NRFLayout from "@component/layout/NRFLayout";
import Pagination from "@component/pagination/Pagination";
import { H2, H4, SemiSpan } from "@component/Typography";
import React, { useState, useRef, useEffect } from "react";
// import EventsCard from "@component/activities/Articles";
import EventsCard from "@component/activities/EventCard";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import {
  getEvents
} from 'redux/actions/event'
import Grid from "@component/grid/Grid";
const limit = 8
const EventsList = () => {

  const { events = null } = useSelector((state) => state.event)
  const { error: eventError = null } = useSelector((state) => state.event)
  const [eventsData, setCoursesData] = useState([])
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)
  const [foundError, setFoundError] = useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEvents())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if (eventError && !firstUpdate.current) {
      setFoundError(eventError)
    }

  }, [eventError])
  console.log(foundError)
  useEffect(() => {
    if (events && events.data) {
      setCoursesData(events.data)
    }

  }, [events])

  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)

  }
  return (
    <div>
      <H2 mb="24px">All Events</H2>
      {eventsData && eventsData.length > 0 ?
        <>
          <Grid container spacing={6}>
            {eventsData.map((item, ind) => (

              <Grid item lg={4} sm={6} xs={12} key={ind} >
                <EventsCard event={item} />
              </Grid>

            ))}

          </Grid>

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
        </> : <div className="text-center"> <H4>No events found</H4></div>}



      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
       
      </FlexBox>
    </div>
  );
};

EventsList.layout = NRFLayout;

export default EventsList;