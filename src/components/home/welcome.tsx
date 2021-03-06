import Box from "@component/Box";
import Card from "@component/Card";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { deviceSize } from "utils/constants";
import Button from "../buttons/Button";
import Typography from "../Typography";
export interface WelcomeProps {}

type CardProps = {
  imgUrl?: string;
};

const StyledCard = styled(Card)<CardProps>`
padding: 100px 78px;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    ),
    url(${(props) => props.imgUrl});
  background-size: cover;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    padding: 2rem;
  }
`;

const Welcome: React.FC<WelcomeProps> = () => {
  return (
    // <Container>
      <StyledCard
        imgUrl="/assets/images/remote1.jpeg"
        mb="3.75rem"
        pt="3.75rem"
        
        hoverEffect
      >
        <Box maxWidth="100%">
        <h1 className="title">The World&apos;s Work Marketplace for Freelancing</h1>
          <Typography  mb="1.35rem" color="text.muted" display="block">
          Work Anytime Anywhere, for Anyone. Explore the world&apos;s marketplace at your own pace.
        </Typography>

          <Link href="/me">
            <a>
            <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
           Start Today
        </Button>
            </a>
          </Link>
        </Box>
      </StyledCard>
    // </Container>
  );
};

export default Welcome;