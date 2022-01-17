
import { CardWrapper} from "./style";
import {ICourse} from 'types'
import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan } from "../Typography";

export interface CourseCardProps {
    course: ICourse
}

const CourseCard: React.FC<CourseCardProps> = ({ 
    course}) => {
        let avatar= course?.avatar? course.avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  return (
    <CardWrapper overflow="hidden" coverImgUrl={avatar}>
      <Box className="black-box" p="17px 30px 56px">
        <H3 fontWeight="600" mb="8px">
          {course.title} 
        </H3>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="15px" mt="5px">
            comment
          </Icon>
          <SemiSpan color="white" ml="12px">
            {course.description.slice(0,80)} ...
          </SemiSpan>
        </FlexBox>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="15px" mt="5px">
            dollar
          </Icon>
          <SemiSpan color="white" ml="12px">
            {parseInt(course.price)>0? course.price +'$': "Free"}
          </SemiSpan>
        </FlexBox>

        <FlexBox>
          <Icon defaultcolor="currentColor" size="15px" mt="4px">
            box
          </Icon>
          <SemiSpan color="white" ml="12px">
            {course.modules && course.modules.length>0? course.modules.length : 0 } modules 
          </SemiSpan>
        </FlexBox>
      </Box>

      <FlexBox pl="30px" pr="18px" justifyContent="space-between">
      {avatar? 
          <Avatar
          src={avatar}
          size={64}
          mt="-32px"
          border="4px solid"
          borderColor="gray.100"
        />:null}
        <Link href={`/courses/view/${course._id}`}>
          <a>
            <IconButton size="small" my="0.25rem">
              <Icon defaultcolor="auto">arrow-long-right</Icon>
            </IconButton>
          </a>
        </Link>
      </FlexBox>
    </CardWrapper>
  );
};

export default CourseCard;


