import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Login from "../sessions/Login";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";
import AUth from "@context/JWTAuthContext";
import Typography from "@component/Typography";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
  navbar?: React.ReactChild;
};

const Header: React.FC<HeaderProps> = ({ className,navbar }) => {
  const { isAuthenticated, user } = React.useContext(AUth);
  

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <Image height="40px" src="/assets/images/logo.jpg" alt="logo" />
            </a>
          </Link>
        </FlexBox>
{navbar&& <FlexBox justifyContent="center"className="section-after-sticky" flex="1 1 0">
          
<div className="section-after-sticky">{navbar}</div>
        </FlexBox>}
        
        <FlexBox className="header-right" alignItems="center">
          {!isAuthenticated? 
          <>
            <Typography
                      as="a"
                      href={`/me`}
                      color="inherit"
                    >
          <IconButton ml="1rem" bg="gray.200" p="8px">
                <Icon size="28px">user</Icon>
              </IconButton>
              </Typography>
              </>:
              <>
              <UserLoginDialog
            handle={
              <IconButton ml="1rem" bg="gray.200" p="8px">
                <Icon size="28px">user</Icon>
              </IconButton>
            }
          >
            <Box>
              <Login />
            </Box>
          </UserLoginDialog>
              </>
          
        }
          
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
