import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import { H3, SemiSpan } from "../Typography";
import { CardWrapper} from "./style";
import {IEvent} from 'types'

export interface EventCardProps {
    event: IEvent
}

const ShopCard1: React.FC< EventCardProps > = (
  { 
event}) => {
  return (
    <CardWrapper overflow="hidden" coverImgUrl={event.avatar? event.avatar: "/assets/images/banners/banner-6.png"}>
      <Box className="black-box" p="17px 30px 56px">
        <H3 fontWeight="600" mb="8px">
          {event.title}
        </H3>

        <Box mb="13px">
          <Rating size="small" value={4 || 0} outof={5} color="warn" />
        </Box>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="15px" mt="5px">
            map-pin-2
          </Icon>
          <SemiSpan color="white" ml="12px">
            {event.description}
          </SemiSpan>
        </FlexBox>

        <FlexBox>
          <Icon defaultcolor="currentColor" size="15px" mt="4px">
          alarm-clock
          </Icon>
          <SemiSpan color="white" ml="12px">
            from: { new Date(event.happen_from).toISOString().substring(0, 16)}
          </SemiSpan>
          
        </FlexBox>
        <FlexBox>
          <Icon defaultcolor="currentColor" size="15px" mt="4px">
          alarm-clock
          </Icon>
          
          <SemiSpan color="white" ml="12px">
             to: { new Date(event.happen_to).toISOString().substring(0, 16)}
          </SemiSpan>
        </FlexBox>
      </Box>

      <FlexBox pl="30px" pr="18px" justifyContent="space-between">
         
        
        {event.avatar?  <>
          <Avatar
          src={event.avatar}
          size={64}
          mt="-32px"
          border="4px solid"
          borderColor="gray.100"
        />
        <Link href={event.avatar}> <a>
            <IconButton size="small" my="0.25rem">
              <Icon defaultcolor="auto">arrow-long-right</Icon>
            </IconButton>
          </a>
        </Link>
          </> :null
        }
        {/* <Link href={event.avatar}> */}
         
      </FlexBox>
    </CardWrapper>
  );
};

export default ShopCard1;