import styled from "styled-components";
import { colors } from "../../utils/themeColors";
import { convertHexToRGB } from "../../utils/utils";
import Card from "../Card";

type WrapperProps = {
  coverImgUrl: string;
};

export const CardWrapper = styled(Card)<WrapperProps>`
  .black-box {
    background-image: linear-gradient(
        to bottom,
        rgba(${convertHexToRGB(colors.gray[900])}, 0.8),
        rgba(${convertHexToRGB(colors.gray[900])}, 0.8)
      ),
      url(${(props) => props.coverImgUrl || "/assets/images/banners/cycle.png"});
    background-size: cover;
    background-position: center;
    color: white;
    height:300px;
  }
`;

export const JobCardWrapper = styled(Card)<WrapperProps>`
  .black-box {
    // color: white;
    height:350px;
  }
`;

export const IntroWrapper = styled(Card)<WrapperProps>`
  .cover-image {
    background-image: linear-gradient(
      to bottom,
      rgba(${convertHexToRGB(colors.gray[900])}, 0.8),
      rgba(${convertHexToRGB(colors.gray[900])}, 0.8)
    ),
    url(${(props) => props.coverImgUrl || "/assets/images/banners/cycle.png"});
    background-size: cover;
    background-position: center;
  }

  .description-holder {
    min-width: 250px;

    @media only screen and (max-width: 500px) {
      margin-left: 0px;
    }
  }
`;