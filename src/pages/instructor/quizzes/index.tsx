import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import InstructorDashboardLayout from "@component/layout/InstructorDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small ,H4} from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState,useRef,useEffect,useCallback } from "react";
import Button from "@component/buttons/Button";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import { useRouter } from "next/router";
import {
  getQuizes, deleteQuiz
} from 'redux/actions/quiz'
import DeleteModel from "@component/modal/DeleteModel";
const limit =10
const QuizzesList = () => {
     
  const {quizes=null}= useSelector((state) => state.quiz)
  const {error:quizError=null}= useSelector((state) => state.quiz)
  const [quizzesData, setCoursesData]= useState([])
  const [foundError,setFoundError]= useState(null)
  const router = useRouter();
  const firstUpdate = useRef(true);
  const [id, setId]= useState(null)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)

  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)

  }
  useEffect(() => {
    dispatch(getQuizes())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(quizError && !firstUpdate.current){
      setFoundError(quizError)
    }
    
  }, [quizError])
  
  useEffect(() => {
    if (quizes && quizes.data) {
      setCoursesData(quizes.data)
    }
    
  }, [quizes])

const handleDelete = async () => {
  try {
    await dispatch(deleteQuiz(id))
    setOpen((open) => !open);
    router.reload()
  } catch (e) {

    console.log("got error", e,foundError)
      setFoundError(e.message)
      
  }
  
}
 

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  return (
    <div>
      <DashboardPageHeader title="Your Quizzes" iconName="box"  from="Instructor"
      button={
        <Link href="/instructor/quizzes/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create quiz
            </Button>
          </a>
        </Link>}/>
{quizzesData && quizzesData.length > 0?
<>
      {quizzesData.slice(from,to).map((item,ind) => (
        // <Link 
        // href={`/instructor/quizzes/${item._id}`}
        //  key={ind}>
          <TableRow
          key={ind}
            // as="a"
            // href={`/instructor/quizzes/${item._id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
            <H4 >{item.title}</H4>
              <span>{item.description}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
              {!item.activated && 
                <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                  <Small color="primary.main">Not Activated</Small>
                </Chip>}
                {item.activated && 
                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Activated</Small>
              </Chip>}
                <SemiSpan className="pre" m="6px">
                  {format(new Date(item.updatedAt), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">{item.type}</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            
              <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/instructor/quizzes/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/instructor/quizzes/edit/${item._id}`}
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small"
             onClick={() => {
              setId(item._id)
              toggleDialog()
            }}
             >
              <Icon variant="small" defaultcolor="currentColor">
                delete
              </Icon>
            </IconButton>
            <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor" >
                    arrow-right
                  </Icon>
                </IconButton>
          </Typography>
            </Hidden>
          </TableRow>
        // </Link>
      ))}
        <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {quizzesData.length} Quizzes</SemiSpan>
            <Pagination pageCount={quizzesData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
      </>:<div className="text-center"> <H4>No quizzes found</H4></div>}

      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
      message="after deleting quiz you wont see it again "/>
      
    </div>
  );
};

QuizzesList.layout = InstructorDashboardLayout;

export default QuizzesList;

