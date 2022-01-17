import FlexBox from "@component/FlexBox";
import NRFLayout from "@component/layout/NRFLayout";
import Pagination from "@component/pagination/Pagination";
import { H4, SemiSpan } from "@component/Typography";
import React, { useState, useRef, useEffect } from "react";
import PublicationsCard from "@component/activities/Articles";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import {
  getPublications
} from 'redux/actions/publication'
const limit = 8

const PublicationsList = () => {

  const { publications = null } = useSelector((state) => state.publication)
  const { error: publicationError = null } = useSelector((state) => state.publication)
  const [publicationsData, setCoursesData] = useState([])
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)
  const [foundError, setFoundError] = useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPublications())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if (publicationError && !firstUpdate.current) {
      setFoundError(publicationError)
    }

  }, [publicationError])
  console.log(foundError)
  useEffect(() => {
    if (publications && publications.data) {
      setCoursesData(publications.data)
    }

  }, [publications])

  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)
  }

  return (
    <div>
      {publicationsData && publicationsData.length > 0 ?
        <>
          <PublicationsCard articles={publicationsData} />
          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {publicationsData.length} Publications</SemiSpan>
            <Pagination pageCount={publicationsData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
        </> : <div className="text-center"> <H4>No publications found</H4></div>}
    </div>
  );
};

PublicationsList.layout = NRFLayout;

export default PublicationsList;