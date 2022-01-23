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
        <H1 className="title" color="white" >Trusted courses</H1>
          <H4 mb="1.35rem" color="white" display="block" >
          Learn anytime with full access. Choose from thousands of expert-led courses now
        </H4>

          <Link href="/courses/all">
            <a>
            <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
           View all courses
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