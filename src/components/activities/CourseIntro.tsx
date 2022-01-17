import React from "react";
import { ICourse } from "types";
import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan } from "../Typography";
import { IntroWrapper } from "./style";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
export interface CourseProps {
    course: ICourse
}

const CourseIntroCard: React.FC<CourseProps> = ({course}) => {
    let avatar= course?.avatar? course.avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    const config = {
        public_key: "FLWPUBK_TEST-896c1947871d58a89eee3b638299d873-X",
        tx_ref: "RX1",
        amount: 10,
        currency: "USD",
        country: "US",
        payment_options: " ",
        customer: {
          email: "cornelius@gmail.com",
          phonenumber: "08102909304",
          name: "Flutterwave Developers",
        },
        callback: function (data) { // specified callback function
          console.log(data);
        },
        customizations: {
          title: "My store",
          description: "Payment for items in cart",
          logo: "https://assets.piedpiper.com/logo.png",
        }
      };
    
      const handleFlutterPayment = useFlutterwave(config);
  return (
    <IntroWrapper mb="32px" pb="20px" overflow="hidden" coverImgUrl={avatar}>
      <Box className="cover-image" height="202px"  />

      <FlexBox mt="-64px" px="30px" flexWrap="wrap">
        <Avatar
          src={avatar}
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
            >
              <H3 fontWeight="600" color="gray.100">
                {course.title}
              </H3>
            </Box>
          </FlexBox>

          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>

              <FlexBox color="text.muted" mb="8px" maxWidth="270px">
                <Icon defaultcolor="currentColor" size="15px" mt="5px">
                comment
                </Icon>
                <SemiSpan color="text.muted" ml="12px">
                {course.description} 
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
              <FlexBox color="text.muted" mb="8px">
                <Icon defaultcolor="currentColor" size="15px" mt="4px">
                dollar
                </Icon>
                <SemiSpan color="text.muted" ml="12px">
                {parseInt(course.price)>0? course.price +'$': "Free"}
                </SemiSpan>
              </FlexBox>
            </Box>

           
              <Button variant="outlined" color="primary" my="12px"
              onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                     console.log(response);
                      closePaymentModal() // this will close the modal programmatically
                  },
                  onClose: () => {},
                });
              }}
            >
              {parseInt(course.price)>0? `Buy ${course.price}` +'$': "Enlorr"}
              </Button>
           

          </FlexBox>
        </Box>
      </FlexBox>
    </IntroWrapper>
  );
};


export default CourseIntroCard;
