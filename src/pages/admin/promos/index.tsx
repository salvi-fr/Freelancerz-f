import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import AdminDashboardLayout from "@component/layout/AdminDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small, H4 } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState,useRef,useEffect, useCallback } from "react";
import Button from "@component/buttons/Button";
// import { useRouter } from "next/router";
import { useDispatch } from 'react-redux'
import {useSelector} from 'utils/utils'
import {
  getPromos,deletePromo
} from 'redux/actions/promo'
import { useRouter } from "next/router";
import DeleteModel from "@component/modal/DeleteModel";
const limit =10
const PromosList = () => {
   
    const {promos=null}= useSelector((state) => state.promo)
const {error:promoError=null}= useSelector((state) => state.promo)
const [promosData, setPromosData]= useState([])
// const {categories=null}= useSelector((state) => state.category)
// const [categoriesData, setCategoriesData]= useState([])
const router = useRouter();
const [id, setId]= useState(null)
const [open, setOpen] = useState(false);
const [from, setFrom] = useState(0)
const [to, setTo] = useState(limit)

const onPageChange = (page: number) => {
  setFrom(page * limit)
  setTo(page * limit + limit)

}
const handleDelete = async () => {
  try {
    await dispatch(deletePromo(id))
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
useEffect(() => {
  dispatch(getPromos())
  firstUpdate.current = false
}, [dispatch])
console.log(foundError)
useEffect(() => {
  if(promoError && !firstUpdate.current){
    setFoundError(promoError)
  }
  
}, [promoError])

useEffect(() => {
  if (promos && promos.data) {
    setPromosData(promos.data)
  }
  
}, [promos])

  return (
    <div>
      <DashboardPageHeader title="All Promos" iconName="box" from="Admin"
      
      button={
        <Link href="/admin/promos/new">
          <a>
            <Button color="primary" bg="primary.light" px="2rem">
              Create Promo
            </Button>
          </a>
        </Link>
      }/>
{ promosData && promosData.length>0? <>
      {promosData.slice(from,to).map((item,ind) => (
     
          <TableRow
          key={ind}
            // as="a"
            // href={`/admin/promos/${item._id}`}
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
                <SemiSpan m="6px">{item.type}</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
            <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/admin/promos/edit/${item._id}`}>
              <Typography
                as="a"
                href={`/admin/promos/edit/${item._id}`}
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
            <IconButton size="small" >
              <Icon variant="small" defaultcolor="currentColor">
              arrow-right
              </Icon>
            </IconButton>
          </Typography>
            </Hidden>
          </TableRow>
        
      ))}
        <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <SemiSpan>Showing {from + 1}-{to} of {promosData.length} Promos</SemiSpan>
            <Pagination pageCount={promosData.length / limit} onChange={(data) => {
              onPageChange(data)
            }} />
          </FlexBox>
      </> :<div className="text-center"> <H4>No promo found</H4></div>}
      <DeleteModel open={open} onYes={handleDelete} onNo={toggleDialog} onClose={toggleDialog}
      message="after deleting this promo  you won't see it again "/>
    
    </div>
  );
};

PromosList.layout = AdminDashboardLayout;

export default PromosList;

