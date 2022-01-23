import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H2, SemiSpan, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState,useRef,useCallback,useEffect } from "react";
import Button from "@component/buttons/Button";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getUsers,deleteUser
} from 'redux/actions/user'
import { useRouter } from "next/router";
import DeleteModel from "@component/modal/DeleteModel";
import { ToastContainer } from "react-toastify";
const limit =10

const UsersList = () => {
     
  const {users=null}= useSelector((state) => state.user)
  const {error:userError=null}= useSelector((state) => state.user)
  const [usersData, setUsersData]= useState([])
  const router = useRouter();
  const [id, setId]= useState(null)
  const [open, setOpen] = useState(false);
  const [foundError,setFoundError]= useState(null)
  const firstUpdate = useRef(true);
  const dispatch = useDispatch()
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(limit)
  
  const onPageChange = (page: number) => {
    setFrom(page * limit)
    setTo(page * limit + limit)
  
  }
  useEffect(() => {
    dispatch(getUsers())
    firstUpdate.current = false
  }, [dispatch])
  console.log(foundError)
  useEffect(() => {
    if(userError && !firstUpdate.current){
      setFoundError(userError)
    }
    
  }, [userError])
  
  useEffect(() => {
    if (users && users.data) {
      setUsersData(users.data)
    }
    
  }, [users])
  
  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(id))
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
      <DashboardPageHeader title="Your Users" iconName="box"  from="Admin"
      // button={
      //   <Link href="/admin/users/new">
      //     <a>
      //       <Button color="primary" bg="primary.light" px="2rem">
      //         Create User
      //       </Button>
      //     </a>
      //   </Link>}
        />
{!usersData.length?<Typography color="text.light" align="center" mt="2rem">No Users</Typography>:
<>
{usersData.slice(from,to).map((item,ind) => (
  <>
        <Link href={`/admin/users/${item._id}`} key={ind}>
          <TableRow
            as="a"
            href={`/admin/users/${item._id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
            <H2>{item.firstName} {item.lastName}</H2>
              <span>{item.email}</span>
              
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
               {item.role.name==="admin" &&
               <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
               <Small color="primary.main">{item.role.name}</Small>
             </Chip>
               } 
                   {item.role.name==="instructor" &&
              <Chip p="0.25rem 1rem" bg="success.light" m="6px">
              <Small color="success.main">{item.role.name}</Small>
            </Chip>
               } 
                    {item.role.name==="instructor" &&
              <SemiSpan m="6px">{item.role.name}</SemiSpan>
               } 
                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                  <Small color="success.main">{item.role.name}</Small>
                </Chip>
                {/* <SemiSpan className="pre" m="6px">
                 created at {format(new Date({item.creeatedAt}), "MMM dd, yyyy")}
                </SemiSpan> */}
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            
              <Typography className="pre" textAlign="center" color="text.muted">
            {/* <Link href={`/admin/users/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/admin/users/edit/${item._id}`}
                color="inherit"
              >
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
            <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton> */}
          </Typography>
            </Hidden>
          </TableRow>
        </Link>
     
          </>
      ))}
         <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {usersData.length} Courses</SemiSpan>
            <Pagination pageCount={usersData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
</>}
      
    </div>
  );
};

UsersList.layout = AdminDashboardLayout;

export default UsersList;
