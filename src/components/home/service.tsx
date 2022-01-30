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
    title: "Hire top developers",
    description:'Hire any developer on our platform by just one click. Explore brilliant developers profiles and hire them to work on your projects.'
  },
  {
    iconName: "credit",
    title: "Get hired as a developer ",
    description:'Get hired as a developer on our platform by just one click. Explore jobs on our platform and put your skills to work.'
  },
  {
    iconName: "shield",
    title: "Brilliant is evenly distributed",
    description:'Brilliant is evenly distributed across the globe. We have a large network of developers and designers who are ready to work on your project.'
  },
];

export default Service;
