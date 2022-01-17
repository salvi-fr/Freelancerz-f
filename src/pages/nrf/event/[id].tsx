import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DefaultLayout from "@component/layout/DefaultLayout";
import EventIntroCard from "@component/activities/Event";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import {
    getEvent
  } from '@redux/actions/event'
import { SemiSpan } from "@component/Typography";

const EventView = () => {
    const router = useRouter();
    const dispatch = useDispatch()
   const {
      query: { id },
    } = useRouter();
  const {error:eventError=null}= useSelector((state) => state.event)
  const {event:fechedEvent=null}= useSelector((state) => state.event)
  const [eventMock, setEventMock]=useState(null)
  const [loading , setLoading]= useState(true)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)


  useEffect(() => {
setLoading(true)
dispatch(getEvent(id as string ))
    firstUpdate.current = false
  }, [dispatch])


  useEffect(() => {
    if(eventError && !firstUpdate.current){
        setFoundError(eventError)
      }
      setLoading(false)
      console.log(foundError,router)
  }, [eventError])

  useEffect(() => {
    
    if(fechedEvent){
      setEventMock({...fechedEvent
        
      })
      setLoading(false)
      }
  }, [fechedEvent])


  return (
    <div>
        {loading && <div>Loading...</div>}
       {eventMock &&  
       <div>
      <EventIntroCard event={eventMock} />
      <Grid container spacing={6}>
      <FlexBox  p="30px" flexWrap="wrap" alignContent="center" >
      <SemiSpan color="text.muted" ml="12px" flexWrap="wrap">

      <div dangerouslySetInnerHTML={{__html: eventMock.content}}></div>
                </SemiSpan>
                 </FlexBox>
      
      </Grid>
      </div>
}
    </div>
  );
};
EventView.layout = DefaultLayout;

export default EventView;
