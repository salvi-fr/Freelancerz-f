
import { JobCardWrapper} from "./style";
import {IJob} from 'types'
import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan, Small } from "../Typography";
import { Chip } from "@component/Chip";
import { format } from "date-fns";

export interface JobCardProps {
    Job: IJob
}

const JobCard: React.FC<JobCardProps> = ({ 
    Job}) => {
        let avatar=  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  return (
    <JobCardWrapper overflow="hidden" coverImgUrl={avatar}>
      <Box className="black-box" p="17px 30px 56px">
        <H3 fontWeight="600" mb="8px">
          {Job.title} 
        </H3>
        <span>{Job.description.slice(1,200)} ...</span>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="15px" mt="5px">
            dollar
          </Icon>
          <SemiSpan  ml="12px">
            { Job.price }
          </SemiSpan>
        </FlexBox>

        <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Status: {Job.status}</Small>
              </Chip>
          
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">{Job.jobType}</Small> 
              </Chip>
       
       
        
        <FlexBox>

        
          <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                <Small color="success.main">Year of experience: {Job.yearsOfExperience}</Small>
              </Chip>
         
        </FlexBox>
        <FlexBox>
         
          <SemiSpan className="pre" m="6px">
                  Start Date: {format(new Date(Job.startDate), "MMM dd, yyyy")}
                </SemiSpan>
         
        </FlexBox>
        <FlexBox>
          <SemiSpan color="white" ml="12px">
          <SemiSpan className="pre" m="6px">
                  End Date: {format(new Date(Job.endDate), "MMM dd, yyyy")}
                </SemiSpan>
          </SemiSpan>
        </FlexBox>
        

              

              
              
                
                <SemiSpan m="6px">{Job.type}</SemiSpan>
                {Job.stacks && 
                <>
                {Job.stacks.map((stack,ind) => (
                  <Chip p="0.25rem 1rem" bg="primary.light" m="6px" key={ind}>
                  <Small color="primary.main">{stack.tech}</Small>
                </Chip>
                ))
                }
                </>
                }
      </Box>

      <FlexBox pl="30px" pr="18px" justifyContent="space-between">
     
      <div></div>
        <Link href={`/jobs/view/${Job.id}`}>
          <a>
            <IconButton size="small" my="0.25rem">
              <Icon defaultcolor="auto">arrow-long-right</Icon>
            </IconButton>
          </a>
        </Link>
      </FlexBox>
    </JobCardWrapper>
  );
};

export default JobCard;


