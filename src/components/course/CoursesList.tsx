// import courses from "@data/course-database";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import CourseListCard from "@component/cards/CourseListCard";
import CourseGridCard from "@component/cards/CourseGridCard";
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
} from '../../redux/actions/course'
import {
  getOpenCategories
} from '../../redux/actions/categories'
import CourseCard from "@component/activities/CourseCard";




let s="name=jeean&jean=name & name=jean"
s = s.substring(s.indexOf("&"));
s = s.substring(0, s.indexOf("="));
console.log("subscrting here",s)


const CoursesList = () => {
    const [view, setView] = useState("grid");
    const [category, setCategory] = useState("all");
    const [level, setLevel] = useState("all");
    const[priceRange,setPriceRange]=useState("all");
    const {courses=null}= useSelector((state) => state.course)
const {error:courseError=null}= useSelector((state) => state.course)
const [coursesData, setCoursesData]= useState([])
const {categories=null}= useSelector((state) => state.category)
const [categoriesData, setCategoriesData]= useState([])
const [catName, setCatName] =useState("all")
const router = useRouter();
const [foundError,setFoundError]= useState(null)
const firstUpdate = useRef(true);
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
  console.log("found courses",courses)
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
  console.log("found categories",categoriesData)
  
}, [categories])

useEffect(() => {
  const params = new URLSearchParams()
  if(catName!=="all"){  params.append("collection", catName)}else {params.delete("collection")}
  if(level!=="all"){ params.append("level", level)} else {params.delete("level")}
  if(priceRange!=="all"){ params.append("priceRange", priceRange)} else {params.delete("priceRange")}
  router.push(`${router.pathname}/?${params}`);
  
}, [category,level,priceRange])

  const onCollectionChange=(e:any)=>{
      setCategory(e.value)
      setCatName(e.label)
      console.log("on toggle categories data",categoriesData)
  }
  const onPriceChange=(e:any)=>{
      setPriceRange(e.value)
}
const onLevelChange=(e:any)=>{
    setLevel(e.value)
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
            <Paragraph color="text.muted">48 results found{s}</Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap">
            <Paragraph color="text.muted" mr="1rem">
             Price:
            </Paragraph>
            <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
              <Select
                placeholder="Short by"
                defaultValue={priceOptions[0]}
                options={priceOptions}
                onChange={onPriceChange}
              />
            </Box>
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
            <Paragraph color="text.muted" mr="1rem">
              Level:
            </Paragraph>
            <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
              <Select
                placeholder="Short by"
                defaultValue={levelOptions[0]}
                options={levelOptions}
                onInputChange={onLevelChange}
              />
            </Box>
  
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
      <H2 mb="24px">Courses</H2>

      <Grid container spacing={6}>
        {coursesData.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <CourseCard {...item} />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing 1-9 of 300 Shops</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
        <Grid container spacing={6}>
  
          <Grid item lg={12} xs={12}>
          <div>
        {view === "grid" ? (
        <Grid container spacing={6}>
        {coursesData.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <CourseGridCard  {...item} />
          </Grid>
        ))}

      </Grid>
         ):(
          coursesData.map((item, ind) => (
                <CourseListCard mb="1.25rem" key={ind} {...item} />
              ))
         ) }
      

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing 1-13 of 50 Courses</SemiSpan>
        <Pagination pageCount={10} />
      </FlexBox>
    </div>
          </Grid>
        </Grid>
      </Box>

      
    );
  };
  
  
  const priceOptions = [
      { label: "all", value: "all" },
      { label: "free", value: "Relevance" },
      { label: "200-400 $", value: "200-400 $" },
      { label: "400-600 $", value: "400-600 $" },
      { label: "600-20000 $", value: "600-20000 $" },
    ];
  
    const levelOptions = [
      { label: "all", value: "all" },
      { label: "Beginner", value: "Beginner" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Expert", value: "Expert" }
    ];
  
  export default CoursesList;