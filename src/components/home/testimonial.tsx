import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H5, Span } from "@component/Typography";
import React from "react";
import styled from "styled-components";
import { deviceSize } from "utils/constants";
import testimonialDatabase from "@data/testimonial-database";

export const SectionWrapper = styled.div`
  .quote {
    position: absolute;

    & > div {
      height: 4rem;
      width: 4rem;
    }
  }
  .quote-open {
    left: 0;
    top: 0;
  }
  .quote-close {
    right: 0;
    bottom: 0;
  }

  .quote-content {
    padding: 3.5rem 6rem;
  }

  .avatar {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
    margin-right: 2.5rem;
    transform: rotate(-15deg);
  }

  .carousel-card {
    position: relative;
    padding: 2.25rem 5rem;
  }

  @media only screen and (max-width: ${deviceSize.sm}px) {
    .carousel-card {
      padding: 1rem 1rem;
    }
    .quote {
      & > div {
        height: 2rem;
        width: 2rem;
      }
    }
    .content {
      padding: 1.25rem 3rem;
    }
  }
`;
const Testimonial: React.FC = () => {
  return (
    <Box mb="3rem">

    <SectionWrapper>
      <Box m="3rem">
        <Carousel
          totalSlides={testimonialDatabase.length}
          visibleSlides={1}
          showDots={true}
          spacing="0px"
          arrowButtonColor="inherit"
          showArrowOnHover={true}
        >
          {testimonialDatabase.map((_item,index) => (
            <Box p="0.25rem" key={index}>
              <Card className="carousel-card">
                <FlexBox
                  className="quote-content"
                  position="relative"
                  flexWrap="wrap"
                >
                  <Icon className="quote quote-open">quote-open</Icon>
                  <Avatar
                    className="avatar"
                    src={_item.imgUrl}
                    // size={64}
                  />
                  <Box maxWidth="410px">
                    <Span color="gray.700">
                      {_item.description}
                    </Span>
                    <H5 mt="0.5rem" fontWeight="700">
                    {_item.name}
                    </H5>
                  </Box>
                  <Icon className="quote quote-close">quote-close</Icon>
                </FlexBox>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </SectionWrapper>  
  </Box>
  );
};

export default Testimonial;