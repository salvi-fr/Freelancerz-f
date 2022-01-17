import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import StudentDashboardLayout from "@component/layout/StudentDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import DeleteModel from "@component/modal/DeleteModel";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H4, SemiSpan, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteTraining, getTrainings } from 'redux/actions/training';
import { useSelector } from 'utils/utils';

const TrainingsList = () => {
     
  const {trainings=null}= useSelector((state) => state.training)
  const {error:trainingError=null}= useSelector((state) => state.training)
  const [trainingsData, setCoursesData]= useState([])
  const router = useRouter();
  const [id, setId]= useState(null)
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await dispatch(deleteTraining(id))
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
  const [foundError,setFoundError]= useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  console.log(foundError)
  useEffect(() => {
    dispatch(getTrainings())
    firstUpdate.current = false
  }, [dispatch])
  useEffect(() => {
    if(trainingError && !firstUpdate.current){
      setFoundError(trainingError)
    }
    
  }, [trainingError])
  
  useEffect(() => {
    if (trainings && trainings.data) {
      setCoursesData(trainings.data)
    }
    
  }, [trainings])

  return (
    <div>
      <DashboardPageHeader title="Your Trainings" iconName="box"  from="Student"
      button={
        <Link href="/admin/trainings/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create training
            </Button>
          </a>
        </Link>}/>
{trainingsData && trainingsData.length > 0?
<>
      {trainingsData.map((item,ind) => (
        
          <TableRow
          key={ind}
            // as="a"
            // href={`/admin/trainings/${item._id}`}
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
                  Last updated {format(new Date(item.updatedAt), "MMM dd, yyyy")}
                </SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            
              <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/admin/trainings/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/admin/trainings/edit/${item._id}`}
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
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
          </Typography>
            </Hidden>
          </TableRow>
        
      ))}
      </>:<div className="text-center"> <H4>No trainings found</H4></div>}
      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
      message="after deleting this training you won't see it again "/>
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

TrainingsList.layout = StudentDashboardLayout;

export default TrainingsList;
