import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Card from "../Card";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link/NavLink";

export const DashboardNavigationWrapper = styled(Card)`
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 64px);
    box-shadow: none;
    overflow-y: auto;
  }
`;

export const StyledDashboardNav = styled(NavLink)<{ isCurrentPath?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid;
  color: ${({ isCurrentPath }) =>
    isCurrentPath ? getTheme("colors.primary.main") : "inherit"};
  border-left-color: ${({ isCurrentPath }) =>
    isCurrentPath ? getTheme("colors.primary.main") : "transparent"};

  .dashboard-nav-icon-holder {
    color: ${getTheme("colors.gray.600")};
  }

  :hover {
    border-left-color: ${getTheme("colors.primary.main")};

    .dashboard-nav-icon-holder {
      color: ${getTheme("colors.primary.main")};
    }
  }
`;

export const StyledDashboardPageTitle = styled(FlexBox)``;


const StyledNavbar = styled.div`
  position: relative;
  height: 60px;
  background: ${getTheme("colors.body.paper")};
  box-shadow: ${getTheme("shadows.regular")};

  .nav-link {
    font-size: 14px;
    margin-right: 32px;
    cursor: pointer;
    :hover {
      color: ${getTheme("colors.primary.main")};
    }
  }
  .nav-link:last-child {
    margin-right: 0px;
  }

  .root-child {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 5;
  }
  .root:hover {
    .root-child {
      display: block;
    }
  }

  .child {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 5;
  }
  .parent:hover > .child {
    display: block;
  }

  .dropdown-icon {
    color: ${getTheme("colors.text.muted")};
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

export default StyledNavbar;