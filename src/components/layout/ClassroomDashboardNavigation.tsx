import Box from "@component/Box";
import { useRouter } from "next/router";
import React from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const AdminDashboardNavigation = ({navs}) => {
  const {
    pathname
    
  } = useRouter(); 



  return (
    <DashboardNavigationWrapper px="0px" py="1.5rem" color="gray.900">
      
      {navs.map((item,index) => (
        <StyledDashboardNav
          isCurrentPath={pathname.includes(item.href)}
          href={item.href}
          key={index}
          px="1.5rem"
          mb="1.25rem"
        >
          <FlexBox alignItems="center">
            <Box className="dashboard-nav-icon-holder">
              <Icon variant="small" defaultcolor="currentColor" mr="10px">
                {item.iconName}
              </Icon>
            </Box>
            <span>{item.title}</span>
          </FlexBox>
        </StyledDashboardNav>
      ))}

    </DashboardNavigationWrapper>
  );
};

export default AdminDashboardNavigation;

