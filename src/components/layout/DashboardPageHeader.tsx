import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Sidenav from "../sidenav/Sidenav";
import { H2 } from "../Typography";
import AdminDashboardNavigation from "./AdminDashboardNavigation";
import DeveloperDashboardNavigation from "./DeveloperDashboardNavigation"
import ClientDashboardNavigation from "./ClientDashboardNavigation";
export interface DashboardPageHeaderProps {
  iconName?: string;
  title?: string;
  button?: any;
  from?: string;
}

const DashboardPageHeader: React.FC<DashboardPageHeaderProps> = ({
  iconName,
  title,
  button,
  from
}) => {
  const width = useWindowSize();
  const isTablet = width < 1025;

  return (
    <Box mb="1.5rem" mt="-1rem">
      <FlexBox justifyContent="space-between" alignItems="center" mt="1rem">
        <FlexBox alignItems="center">
          <Icon color="primary">{iconName}</Icon>
          <H2 ml="12px" my="0px" lineHeight="1" whitespace="pre">
            {title}
          </H2>
        </FlexBox>

        {isTablet && (
         <>
         {from && 
          <Sidenav position="left" handle={<Icon mx="1rem">menu</Icon>}>
            
          {from === "Admin" && <AdminDashboardNavigation />}
          {from === "Developer" && <DeveloperDashboardNavigation />}
          {from === "Client" && <ClientDashboardNavigation />}
        </Sidenav>
        }
         </>
         
        )}

        {!isTablet && button}
      </FlexBox>

      {isTablet && !!button && <Box mt="1rem">{button}</Box>}
    </Box>
  );
};

export default DashboardPageHeader;
