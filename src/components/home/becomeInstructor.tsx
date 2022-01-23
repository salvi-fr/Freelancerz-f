import Box from "@component/Box";
import Card from "@component/Card";
import Link from "next/link";
import Container from "@component/Container";
import React from "react";
import styled from "styled-components";
import { deviceSize } from "utils/constants";
import Button from "../buttons/Button";
import {H4,H1} from "../Typography";
export interface WelcomeProps {}

type CardProps = {
  imgUrl?: string;
};

const StyledCard = styled(Card)<CardProps>`
padding: 100px 78px;
  background:
  linear-gradient(
    90deg,
    rgba(148,146,153,1),
    rgba(148,146,153,1),
    rgba(255, 255, 255, 0)
  ), 
    url(${(props) => props.imgUrl});
  background-size: cover;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    padding: 2rem;
  }
`;

const BeforeService: React.FC<WelcomeProps> = () => {
  return (
    
      <StyledCard
        imgUrl="/assets/health/home/activities.jpg"
        hoverEffect
      >
          <Container>
        <Box >
        <H1 className="title" color="white" >Teach for us </H1>
          <H4 mb="1.35rem" color="white" display="block" >
          If you feel like you want to share the knowledge you have and have what it takes to be one of our amazing instructor, please signup as an instructor
        </H4>

          <Link href="/instructor/signup">
            <a>
            <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
           Become Instructor
        </Button>
            </a>
          </Link>
        </Box>
        </Container>
      </StyledCard>
    // 
  );
};

export default BeforeService;