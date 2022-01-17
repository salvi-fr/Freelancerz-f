import React from "react";
import { IEvent, IUser } from "types";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import FlexBox from "../FlexBox";
import { H2, H4, SemiSpan } from "../Typography";
import { IntroWrapper } from "./style";
import { format } from "date-fns";
export interface EventProps {
    event: IEvent
}

const EventIntroCard: React.FC<EventProps> = ({event}) => {
    let avatar= event?.avatar? event.avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
   let author = event?.created_by? event.created_by as IUser : null
   let author_avatar = author?.avatar? author.avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  return (
    <IntroWrapper mb="32px" pb="20px" overflow="hidden" coverImgUrl={avatar}>
      <Box className="cover-image" height="202px"  />

      <FlexBox mt="-64px" px="30px" flexWrap="wrap">
        <Avatar
          src={author_avatar}
          size={120}
          mr="37px"
          border="4px solid"
          borderColor="gray.100"
        />

        <Box className="description-holder" flex="1 1 0">
          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            mt="3px"
            mb="22px"
          >
            <Box
            //   bg="secondary.main"
              borderRadius="4px"
              p="4px 16px"
              display="inline-block"
              my="8px"
              mb="10px"
            >
              <H2 fontWeight="600" color="gray.100">
                {event.title}
              </H2>

              <H4 fontWeight="600" color="gray.100">
                {event.description}
              </H4>

              <SemiSpan color="text.muted" ml="12px">
                {author?.firstName ? `created by ${author.firstName}  on ${format(new Date(event.createdAt), "dd MMMM, yyyy")}`:
                 `created on ${format(new Date(event.createdAt), "dd MMMM, yyyy")}`}
                </SemiSpan>
            </Box>
          </FlexBox>

          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
           

          </FlexBox>
        </Box>
      </FlexBox>
    </IntroWrapper>
  );
};


export default EventIntroCard;
