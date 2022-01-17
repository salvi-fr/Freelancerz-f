import Grid from "@component/grid/Grid";
import ClassroomDashboardLayout from "@component/layout/ClassroomDashboardLayout";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import { useSelector } from 'utils/utils'
import React, { useState, useRef, useEffect } from "react";
import {
  getCourse
} from 'redux/actions/course'
import Hidden from "@component/hidden/Hidden";
import Container from "@component/Container";
import ClassroomDashboardNavigation from "@component/layout/ClassroomDashboardNavigation";
import IconButton from "@component/buttons/IconButton";
import Link from "next/link";
import Typography, { H4 } from "@component/Typography";
import Icon from "@component/icon/Icon";
import TableRow from "@component/TableRow";
import { ILecture, IModule, IModuleLecture } from "types";
import Button from "@component/buttons/Button";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { Card1 } from "@component/Card1";
import { setModule } from "redux/actions/module";
import { setLecture } from "redux/actions/lecture";

const EditCourse = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const {
    query: { courseid, module },
  } = useRouter();


  const { course: fechedCourse = null } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(true)
  const [moduleLectures, setModuleLectures] = useState([])
  const [courseNavigations, setCourseNavigations] = useState([])
  const firstUpdate = useRef(true);



  useEffect(() => {
    console.log(loading)
    setLoading(true)
    if (!courseid) {
      router.push("/student/classroom")
    }else if(!fechedCourse || fechedCourse._id !== courseid){
    dispatch(getCourse(courseid as string))
    firstUpdate.current = false}
  }, [dispatch])

  useEffect(() => {

    if (fechedCourse) {
      console.log("just got some courses ")
      const cm = fechedCourse?.modules ? fechedCourse.modules as IModule[] : [];
      if (cm && cm.length) {
        var courseNavs = cm.map((module, index) => {
          if (module.lectures && module.lectures.length) {
            let cl = module.lectures as IModuleLecture[]
            if (cl && cl.length) {
              return {
                title: module.title ? `${index + 1} ${module.title}` : `module ${index + 1}`,
                iconName: "box",
                href: `${courseid}?module=${module._id}`,
                param: `?module=${module._id}`,
                child: cl.map((lecture, count) => {
                  let cll = lecture.lecture as ILecture
                  return {
                    title: cll.title ? cll.title : `lecture ${count + 1}`,
                    href: cll._id,
                    iconName: "box",
                  }

                })
              }
            }
          }
          else {
            return {
              title: module.title ? `${index + 1} ${module.title}` : `module ${index + 1}`,
              href: `${courseid}?module=${module._id}`,
              param: `?module=${module._id}`,
              iconName: "box",
            }
          }

        }
        )
        setCourseNavigations(courseNavs)
      }

      if (courseNavs && courseNavs.length) {
        router.push(`${router.pathname.replace("[courseid]", courseid as string)}/${courseNavs[0].param}`);
      }
    }
  }, [fechedCourse])

  useEffect(() => {
    if (module) {
      const cm = fechedCourse?.modules ? fechedCourse.modules as IModule[] : [];
      if (cm.length && cm.find(m => m._id === module)) {
        setModule(cm.find(m => m._id === module))
        let a = cm.find(m => m._id === module)
        if (a.lectures && a.lectures.length) {
          setModuleLectures(a.lectures.map((lec) =>
            lec.lecture
          ))
        }

      }
    }
  }, [module])

  const goToLecture= async (id)=>{
    if (module) {
      const cm = fechedCourse?.modules ? fechedCourse.modules as IModule[] : [];
      if (cm.length && cm.find(m => m._id === module)) {
        await setModule(cm.find(m => m._id === module))
        let a = cm.find(m => m._id === module)
        if (a.lectures && a.lectures.length) {
          await setLecture(a.lectures.map((lec) =>
            lec.lecture as ILecture
          ).find(a => a._id === id))
        }

      }
    }
    router.push('/student/classroom/course/[courseid]/[moduleid]/[lectureid]',`/student/classroom/course/${courseid}/${module}/${id}`)
  
  }


  return (

    <div>
      <Container my="2rem">
        <Grid container spacing={6}>
          <Hidden as={Grid} item lg={3} xs={12} down={1024}>
            {courseNavigations.length && <ClassroomDashboardNavigation navs={courseNavigations} />}
          </Hidden>
          <Grid item lg={9} xs={12}>
            <DashboardPageHeader
              iconName="credit-card_filled" from="Student"
              title={fechedCourse ? fechedCourse.title : ""}
              button={
                <Link href={`/student/classroom`}>
                  <Button color="primary" bg="primary.light" px="2rem">
                    Back Classroom
                  </Button>
                </Link>
              }
            />
            <Card1>
              {moduleLectures.length ?
                <div>
                  {moduleLectures.map((item, key) => (
                    <div key={key}>

                      {/* href={`/student/classroom/course/${courseid}/${module}/${item._id}`} key={key}
                      as={`/student/classroom/course/${courseid}/${module}/${item._id}`} */}
                    
                      <TableRow
                        as="a"
                        // href={`/student/classroom/course/${courseid}/${module}/${item._id}`}
                        my="1rem"
                        padding="15px 24px"
                      >
                        <div>
                          <H4 >{item.title}</H4>
                          <span>{item.description}</span>
                        </div>

                        <Hidden flex="0 0 0 !important" down={769}>
                          <Typography textAlign="center" color="text.muted">
                            <IconButton size="small"
                            onClick={()=>{
                              goToLecture(item._id)
                            }}
                            >
                              <Icon variant="small" defaultcolor="currentColor">
                                arrow-right
                              </Icon>
                            </IconButton>
                          </Typography>
                        </Hidden>
                      </TableRow>
                    </div>
                  ))}
                </div> : <div className="text-center"> <H4>No lectures found for this course module</H4></div>}
            </Card1>
          </Grid>
        </Grid>
      </Container>
    </div>

  )
};


EditCourse.layout = ClassroomDashboardLayout;

export default EditCourse;