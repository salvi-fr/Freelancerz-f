
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination/Pagination";
import { H2, SemiSpan } from "../Typography";
import { useRouter } from "next/router";
import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import Select from "@component/Select";
import { H5, Paragraph } from "@component/Typography";
import React, { useCallback, useEffect, useState,useRef } from "react";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getOpenCourses
} from '@redux/actions/course'
import {
  getOpenCategories
} from '@redux/actions/categories'
import CourseCard from "@component/activities/CourseCard";
const limit =10



const CoursesList = () => {
    const [view, setView] = useState("grid");
    const [category, setCategory] = useState("all");
    const {courses=null}= useSelector((state) => state.course)
const {error:courseError=null}= useSelector((state) => state.course)
const [coursesData, setCoursesData]= useState([])
const {categories=null}= useSelector((state) => state.category)
const [categoriesData, setCategoriesData]= useState([{ value: "all", label: "all"}])
const [catName, setCatName] =useState("all")
const router = useRouter();
const [foundError,setFoundError]= useState(null)
const firstUpdate = useRef(true);
const[currentPage,setCurrentPage]=useState(1)
const [from,setFrom]=useState(0)
const [to,setTo]=useState(limit)
const dispatch = useDispatch()
console.log(foundError)
useEffect(() => {
  dispatch(getOpenCourses())
  dispatch(getOpenCategories())
  firstUpdate.current = false
}, [dispatch])
useEffect(() => {
  if(courseError && !firstUpdate.current){
    setFoundError(courseError)
  }
  
}, [courseError])

useEffect(() => {
  if (courses && courses.data) {
    setCoursesData(courses.data)
  }
  
}, [courses])

useEffect(() => {
  if (categories && categories.data) {
    setCategoriesData([])
    categories.data.map((item) => {
        setCategoriesData((prevState) => [...prevState, { value: item._id, label: item.title }]);
    })
  }
  
  
}, [categories])

useEffect(() => {
  const params = new URLSearchParams()
  if(catName!=="all"){  params.append("collection", catName)}else {params.delete("collection")}

  router.push(`${router.pathname}/?${params}`);
  
}, [category])

  const onCollectionChange=(e:any)=>{
      setCategory(e.value)
      setCatName(e.label)
  }
const onPageChange=(page:number)=> {
  setFrom(page*limit)
  setTo(page*limit+limit)
  setCurrentPage(page)
 
}

    const toggleView = useCallback(
      (v) => () => {
        setView(v);
      },
      []
    );
  
    return (
      <Box pt="20px">
        <FlexBox
          p="1.25rem"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          mb="55px"
          elevation={5}
          as={Card}
        >
          <div>
            <H5>Sort </H5>
            <Paragraph color="text.muted">{coursesData?.length ? coursesData.length: "0"} results found forcategory  {catName}</Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap">
    
            {categoriesData && categoriesData.length>=1 &&
            <>
            <Paragraph color="text.muted" mr="1rem">
              Collections:
            </Paragraph>
            <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
              <Select
                placeholder="Short by"
                defaultValue={categoriesData[0]}
                options={categoriesData}
                onInputChange={onCollectionChange}
              />
            </Box>
            </>}
            <Paragraph color="text.muted" mr="0.5rem">
              View:
            </Paragraph>
            <IconButton size="small" onClick={toggleView("grid")}>
              <Icon
                variant="small"
                defaultcolor="auto"
                color={view === "grid" ? "primary" : "inherit"}
              >
                grid
              </Icon>
            </IconButton>
            <IconButton size="small" onClick={toggleView("list")}>
              <Icon
                variant="small"
                defaultcolor="auto"
                color={view === "list" ? "primary" : "inherit"}
              >
                menu
              </Icon>
            </IconButton>
          </FlexBox>
        </FlexBox>
        <div>
      <H2 mb="24px">Found Courses</H2>

      <Grid container spacing={6}>
        {coursesData.slice(from,to).map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <CourseCard course={item} />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing {from+1}-{to} of {coursesData.length} courses</SemiSpan>
        <Pagination pageCount={coursesData.length/limit}  onChange={(data) => {
          onPageChange(data)
         
          }} />
      </FlexBox>
    </div>
   
      </Box>

      
    );
  };
  
  
  export default CoursesList;