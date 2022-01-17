import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
// import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H4 } from "@component/Typography";
import collectionDatabase from "@data/collections-database";
import useWindowSize from "@hook/useWindowSize";
import Link from "next/link";
import React, { useEffect, useState,useRef } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getOpenCategories
} from '../../redux/actions/categories'
const Categories: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();
  const {categories=null}= useSelector((state) => state.category)
  const {error:categoryError=null}= useSelector((state) => state.category)
  const [categoriesData, setCategoriesData]= useState([])
  const [foundError,setFoundError]= useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  console.log(foundError)
  useEffect(() => {
    dispatch(getOpenCategories())
    firstUpdate.current = false
}, [dispatch])
  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);
  useEffect(() => {
    if(categoryError && !firstUpdate.current){
      setFoundError(categoryError)
    }
    
  }, [categoryError])

  useEffect(() => {
   
    if (categories && categories.data) {
      
      setCategoriesData(categories.data)
  
    }
    
  }, [categories])
  return (
    <CategorySectionCreator
    iconName="categories"
    title="Course Collections"
      seeMoreLink="/courses/all"
    >
      <Box my="-0.25rem">
        <Carousel totalSlides={9} visibleSlides={visibleSlides}>
          {categoriesData.map((item, ind) => (
            <Box py="0.25rem" key={ind}  >
              <Card p="1rem" height={250}>
                <Link href={`/collections/${item.url}`}>
                  <a>
                    <HoverBox borderRadius={8} mb="0.5rem">
                      <LazyImage
                        // src={item.imgUrl}
                        src={item.avatar? item.avatar :"https://via.placeholder.com/150"}
                        width="200"
                        height="150"
                        layout="fixed"
                        alt={item.title}
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                      {item.title}
                    </H4>
                  </a>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};
export default Categories;
