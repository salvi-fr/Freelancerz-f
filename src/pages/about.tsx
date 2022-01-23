import Link from "next/link";
import DefaultLayout from "../components/layout/DefaultLayout";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import Button from '@component/buttons/Button';
import { getTheme } from "@utils/utils";
import React from "react";
import styled from "styled-components";


const StyledContent = styled.div`
background-color: ${getTheme("colors.white")};
`;

const AboutPage = () => {
  return (
    <Box mb="7rem" id="#" alignItems="center">
     

      <StyledContent>
        <Grid container spacing={0} 
       backgroundColor="white"
        >
        
        <Grid item lg={6} md={6} sm={12} xs={12}  >
              <Card
              pl="15%" pr="15%"
              // backgroundColor="white"
                as={FlexBox}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="600px"
                boxShadow="none"
              >
               <div>
        <h1 className="title">Who we are </h1>
        <Typography  mb="1.35rem">
        CHIEF EXECUTIVE OFFICER & FOUNDER Jean Damascene BIGIRIMANA is a passionate healthcare provider with Bachelor’s Degree in Physical Therapy, He is a public Health Practitioner (Current Program) and is a researcher with interest in Information communication and technology. He started an Entrepreneur life in 2011 when he created GDA Sabri Entreprise and 2013 when he created Pamelise Ltd, and HealthEdu in 2017. He has undergone through different incubation programmes: Acts of gratitudes, 250Startups and Westerwelle startup haus
        </Typography>
      </div>
              </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
            <Card
              
              >
            <Box
            backgroundColor="white"
      //  mt={4} m={2}
      //  mb={4}
      //  mr={4}
          borderRadius="0px"
          overflow="hidden"
          height="600px"
         
          position="relative"
          style={{
            background:
              "url(/assets/bigirimana.JPG) center/cover",
          }}
        >
          </Box>
          </Card>
            </Grid>
          
        </Grid>
      </StyledContent>
    </Box>
  );
};

AboutPage.layout = DefaultLayout;
export default AboutPage;
