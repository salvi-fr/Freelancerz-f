import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DefaultLayout from "@component/layout/DefaultLayout";
import ArticleIntroCard from "@component/activities/ArticleIntro";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import React, { useState,useRef,useEffect } from "react";
import {
    getArticle
  } from '@redux/actions/article'
import { SemiSpan } from "@component/Typography";

const ArticleView = () => {
    const router = useRouter();
    const dispatch = useDispatch()
   const {
      query: { id },
    } = useRouter();
  const {error:articleError=null}= useSelector((state) => state.article)
  const {article:fechedArticle=null}= useSelector((state) => state.article)
  const [articleMock, setArticleMock]=useState(null)
  const [loading , setLoading]= useState(true)

  const firstUpdate = useRef(true);
  const [foundError,setFoundError]= useState(null)


  useEffect(() => {
setLoading(true)
dispatch(getArticle(id as string ))
    firstUpdate.current = false
  }, [dispatch])


  useEffect(() => {
    if(articleError && !firstUpdate.current){
        setFoundError(articleError)
      }
      setLoading(false)
      console.log(foundError,router)
  }, [articleError])

  useEffect(() => {
    
    if(fechedArticle){
      setArticleMock({...fechedArticle
        
      })
      setLoading(false)
      }
  }, [fechedArticle])


  return (
    <div>
        {loading && <div>Loading...</div>}
       {articleMock &&  
       <div>
      <ArticleIntroCard article={articleMock} />
      <Grid container spacing={6}>
      <FlexBox  p="30px" flexWrap="wrap" alignContent="center" >
      <SemiSpan color="text.muted" ml="12px" flexWrap="wrap">

      <div dangerouslySetInnerHTML={{__html: articleMock.content}}></div>
                </SemiSpan>
                 </FlexBox>
      
      </Grid>
      </div>
}
    </div>
  );
};
ArticleView.layout = DefaultLayout;

export default ArticleView;
