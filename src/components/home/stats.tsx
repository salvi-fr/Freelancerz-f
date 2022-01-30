import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H3, SemiSpan } from "@component/Typography";
import React from "react";

const Stats: React.FC = () => {
  return (
    <FlexBox
      mb="3.75rem"
      p="1rem"
      border="1px solid"
      borderColor="gray.400"
      borderRadius={8}
      flexWrap="wrap"
    >
      {serviceList.map((item) => (
        <FlexBox alignItems="center" p="1rem" mx="auto" key={item.title}>
          <Icon size="42px" mr="0.87rem">
            {item.iconName}
          </Icon>
          <Box>
            <H3 lineHeight="1.3">{item.title}</H3>
            <SemiSpan color="text.muted">{item.subtitle}</SemiSpan>
          </Box>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const serviceList = [
  {
    title: "Jobs",
    subtitle: "245",
    iconName: "shield",
  },
  {
    title: "Developers",
    subtitle: "56767",
    iconName: "user",
  },

  {
    title: "Clients",
    subtitle: "2455",
    iconName: "credit-card-2",
  }
];

export default Stats;
