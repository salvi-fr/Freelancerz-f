import React from "react";
import Card from "../Card";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import { H4, SemiSpan } from "../Typography";

const Service: React.FC = () => {
  return (
    <div className="service" >
    <Container mb="70px" mt="40px">
      <Grid container spacing={6}>
        {serviceList.map((item, ind) => (
          <Grid item lg={4} md={4} xs={12} key={ind}>
            <FlexBox
              as={Card}
              flexDirection="column"
              alignItems="center"
              p="3rem"
              height="100%"
              borderRadius={8}
              boxShadow="border"
              hoverEffect
            >
              <FlexBox
                justifyContent="center"
                alignItems="center"
                borderRadius="300px"
                bg="gray.200"
                size="64px"
              >
                <Icon color="secondary" size="1.75rem">
                  {item.iconName}
                </Icon>
              </FlexBox>
              <H4 mt="20px" mb="10px" textAlign="center">
                {item.title}
              </H4>
              <SemiSpan textAlign="center">
              {item.description}
              </SemiSpan>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
      {/* </Card> */}
    </Container>
    </div>
  );
};

const serviceList = [
  {
    iconName: "categories",
    title: "Trusted Courses",
    description:'Our Courses are delivered trusted instructors, they are prepared by those Experienced and licensed Health Professionals.'
  },
  {
    iconName: "credit",
    title: "Tools For Professionals",
    description:'With the current platform, we provide you with accredited contents to healthcare Professionals in general.'
  },
  {
    iconName: "shield",
    title: "Our Certificates",
    description:'Our web application delivers certificates of completion to successful applicants who score 80% and above in evaluation from different.'
  },
];

export default Service;
