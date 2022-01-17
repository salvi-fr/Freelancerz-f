import { Chip } from "@component/Chip";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { CSSProperties } from "styled-components";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import { H5, SemiSpan } from "../Typography";
import { StyledProductCard9 } from "./CardStyle";

export interface ProductCard9Props {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  off?: number;
  rating?: number;
  subcategories?: Array<{
    title: string;
    url: string;
  }>;
  [key: string]: unknown;
  // className?: string;
  // style?: CSSProperties;
  // imgUrl: string;
  // title: string;
  // price: number;
  // off: number;
  // rating?: number;
  // subcategories?: Array<{
  //   title: string;
  //   url: string;
  // }>;
}

const ProductCard9: React.FC<ProductCard9Props> = ({
  imgUrl,
  title,
  price,
  off,
  subcategories,
  rating,
  ...props
}) => {
  const [cartAmount, setCartAmount] = useState(0);

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      console.log(amount);

      if (amount >= 0) setCartAmount(amount);
    },
    []
  );

  return (
    <StyledProductCard9 overflow="hidden" width="100%" {...props}>
      <Grid container spacing={1}>
        <Grid item md={3} sm={4} xs={12}>
          <Box position="relative">
            {off && (
              <Chip
                position="absolute"
                bg="primary.main"
                color="primary.text"
                fontSize="10px"
                fontWeight="600"
                p="5px 10px"
                top="10px"
                right="10px"
              >
                {off}% free
              </Chip>
            )}
          </Box>
        </Grid>

        <Grid item md={8} sm={8} xs={12}>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            height="100%"
            p="1rem"
          >

            <Link href="/product/34324321">
              <a>
                <H5 fontWeight="600" my="0.5rem">
                  {title}
                </H5>
              </a>
            </Link>
            <H5 fontWeight="600" my="0.5rem">
                  {title}
                </H5>

            <FlexBox mt="0.5rem" mb="1rem" alignItems="center">
              <H5 fontWeight={600} color="primary.main" mr="0.5rem">
                ${price?.toFixed(2)}
              </H5>
              {off && (
                <SemiSpan fontWeight="600">
                  <del>${(price - (price * off) / 100).toFixed(2)}</del>
                </SemiSpan>
              )}
            </FlexBox>

            <Hidden up="sm">
              <FlexBox
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row-reverse"
                height="30px"
              >
                

                <FlexBox alignItems="center" flexDirection="row-reverse">
                  <Button
                    variant="outlined"
                    color="primary"
                    padding="5px"
                    size="none"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartAmount + 1)}
                  >
                    <Icon variant="small">plus</Icon>
                  </Button>

            
                </FlexBox>
              </FlexBox>
            </Hidden>
          </FlexBox>
        </Grid>
        </Grid>
       
    </StyledProductCard9>
  );
};

ProductCard9.defaultProps = {
  title:
    "Apple iPhone 5 Unlocked 16GB 8MP Used Cell-Phone-16gbIOS Used Refurbished 100%Factory Used",
  imgUrl: "/assets/images/products/macbook.png",
  off: 50,
  price: 450,
  rating: 0,
  subcategories: [
    {
      title: "Bike",
      url: "/#",
    },
    {
      title: "Ducati",
      url: "/#",
    },
    {
      title: "Motors",
      url: "/#",
    },
  ],
};

export default ProductCard9;