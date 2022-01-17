import FlexBox from "@component/FlexBox";
import NRFLayout from "@component/layout/NRFLayout";
import Pagination from "@component/pagination/Pagination";
import { H4, SemiSpan } from "@component/Typography";
import React, { useState, useRef, useEffect } from "react";
import TrainingsCard from "@component/activities/Articles";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import {
  getTrainings
} from 'redux/actions/training'
const limit = 8
const TrainingsList = () => {

  const { trainings = null } = useSelector((state) => state.training)
  const { error: trainingError = null } = useSelector((state) => state.training)
  const [trainingsData, setCoursesData] = useState([])
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)
  const [foundError, setFoundError] = useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTrainings())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if (trainingError && !firstUpdate.current) {
      setFoundError(trainingError)
    }

  }, [trainingError])
  console.log(foundError)
  useEffect(() => {
    if (trainings && trainings.data) {
      setCoursesData(trainings.data)
    }

  }, [trainings])
  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)
  }
  return (
    <div>
      {trainingsData && trainingsData.length > 0 ?
        <>
          <TrainingsCard articles={trainingsData.slice(from, to)} />
          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {trainingsData.length} Trainings</SemiSpan>
            <Pagination pageCount={trainingsData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>

        </> : <div className="text-center"> <H4>No trainings found</H4></div>}
    </div>
  );
};

TrainingsList.layout = NRFLayout;

export default TrainingsList;