
import Button from "@component/buttons/Button";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import StudentDashboardLayout from "@component/layout/StudentDashboardLayout";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H4, SemiSpan, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { getCourses, setCourse } from 'redux/actions/course';
import { useSelector } from 'utils/utils';
const CoursesList = () => {
  const router = useRouter();
  const { courses = null } = useSelector((state) => state.course)
  const { error: courseError = null } = useSelector((state) => state.course)
  const [coursesData, setCoursesData] = useState([])
  const [foundError, setFoundError] = useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCourses())
    firstUpdate.current = false
  }, [dispatch])
  console.log(foundError)
  useEffect(() => {
    if (courseError && !firstUpdate.current) {
      setFoundError(courseError)
    }

  }, [courseError])

const GoToCourse= async (id)=>{
  let course = coursesData.find(course=>course._id===id)
  await dispatch(setCourse(course))
  router.push('/student/classroom/course/[id]',`/student/classroom/course/${id}`)

}


  useEffect(() => {
    if (courses && courses.data) {
      setCoursesData(courses.data)
    }

  }, [courses])

  return (
    <div>
      <DashboardPageHeader title="Your Courses" iconName="box" from="Student"

      />
      {coursesData && coursesData.length > 0 ? <>
        {coursesData.map((item, ind) => (

          <TableRow
            key={ind}
            my="1rem"
            padding="15px 24px"
          >
            <div>
              <H4 >{item.title}</H4>
              <span>{item.description}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
                {!item.activated &&
                  <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                    <Small color="primary.main">ongoing </Small>
                  </Chip>}
                {item.activated &&
                  <div>
                    <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                      <Small color="success.main">Completed </Small>
                    </Chip>
                    <Link href={`/student/classroom/course/${item._id}/?module=none`}>
                      <a>
                        <Chip p="0.25rem 1rem" bg="success.main" m="6px">
                          <Small color="success.text">View Certificate </Small>
                        </Chip>
                      </a>
                    </Link>
                  </div>}

                <SemiSpan className="pre" m="6px">
                  Last visited {format(new Date(item.updatedAt), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">{item.type}</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>

              <Typography className="pre" textAlign="center" color="text.muted">

                {/* <Link href={`/student/classroom/course/${item._id}`} >
                  <a>
                    <Button color="primary" bg="primary.light" px="2rem">
                      {item.activated ? "Program home" : "Continue Leeraning "}
                    </Button>
                  </a>
                </Link> */}

               
                    <Button color="primary" bg="primary.light" px="2rem" 
                     onClick={() => {
                      GoToCourse(item._id)
                    }}
                    // onClick={GoToCourse(item._id)}
                    >
                      {item.activated ? "Program home" : "Continue Leeraning "}
                    </Button>
                  
              </Typography>
            </Hidden>
          </TableRow>


        ))}
      </> : <div className="text-center"> <H4>You have no courses yet browser free courses</H4></div>}
      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data);
          }}
        />
      </FlexBox>
    </div>
  );
};

CoursesList.layout = StudentDashboardLayout;

export default CoursesList;