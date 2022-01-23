import CategorySectionCreator from "@component/CategorySectionCreator";
import Grid from "@component/grid/Grid";
import React from "react";
import ArticleCard from "@component/cards/ArticleCard";
import { IArticle } from "types";


export interface AllProps {
  articles:IArticle[];
}

const ArticlesCard: React.FC<AllProps> = ({articles}) => {
  if(!articles || articles.length === 0){
    return <div>No Data Found</div>
  }
  return (
    <CategorySectionCreator>
      <Grid container spacing={6} >
      {articles.map((item, ind) => (
        <Grid item  xs={12} md={4}  sm={6} xl={3} key={ind}>
      <ArticleCard item={item }/>
        </Grid>
         ))}
        {/* <Grid item md={6} xs={12}>
        </Grid> */}
      </Grid>
    </CategorySectionCreator>
  );
};





export default ArticlesCard;