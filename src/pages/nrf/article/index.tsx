import FlexBox from "@component/FlexBox";
import NRFLayout from "@component/layout/NRFLayout";
import Pagination from "@component/pagination/Pagination";
import { H4, SemiSpan} from "@component/Typography";
import React, { useState,useRef,useEffect } from "react";
import ArticlesCard from "@component/activities/Articles";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getArticles
} from 'redux/actions/article'
const limit =8

const ArticlesList = () => {
     
  const {articles=null}= useSelector((state) => state.article)
  const {error:articleError=null}= useSelector((state) => state.article)
  const [articlesData, setCoursesData]= useState([])

  const [foundError,setFoundError]= useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  const [from,setFrom]=useState(0)
const [to,setTo]=useState(limit)
  useEffect(() => {
    dispatch(getArticles())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(articleError && !firstUpdate.current){
      setFoundError(articleError)
    }
    
  }, [articleError])
  console.log(foundError)
  useEffect(() => {
    if (articles && articles.data) {
      setCoursesData(articles.data)
    }
    
  }, [articles])

  const onPageChange=(page:number)=> {
    setFrom(page*limit)
    setTo(page*limit+limit)
   
  }
  return (
    <div>
   
{articlesData && articlesData.length > 0?
<>
<ArticlesCard articles={articlesData.slice(from,to)}/>
<FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing {from+1}-{to} of {articlesData.length} Articles</SemiSpan>
        <Pagination pageCount={articlesData.length/limit}  onChange={(data) => {
          onPageChange(data)
          }} />
      </FlexBox>
      
      </>:<div className="text-center"> <H4>No articles found</H4></div>}

    </div>
  );
};

ArticlesList.layout = NRFLayout;

export default ArticlesList;