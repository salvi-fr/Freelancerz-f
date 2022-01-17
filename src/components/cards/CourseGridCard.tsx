import LazyImage from '@component/LazyImage';
import { useAppContext } from '@context/app/AppContext';
import { CartItem } from '@reducer/cartReducer';
import Link from 'next/link';
import React, { useCallback} from 'react';
import { CSSProperties } from 'styled-components';
import Box from '../Box';
import Button from '../buttons/Button';
import { CardProps } from '../Card';
import { Chip } from '../Chip';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
import { H3, SemiSpan } from '../Typography';
import { StyledProductCard1 } from './CardStyle';

export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  off?: number;
  rating?: number;
  id?: string | number;
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

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  title,
  price,
  off,
  rating,
  ...props
}) => {


  const { state, dispatch } = useAppContext();
  const cartItem: CartItem = state.cart.cartList.find((item) => item.id === id);


  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: 'CHANGE_CART_AMOUNT',
        payload: {
          name: title,
          qty: amount,
          price,
          imgUrl,
          id,
        },
      });
    },
    []
  );

  return (
    <StyledProductCard1 {...props}>
      <div className="image-holder">
        {!!off && (
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
            {off}% off
          </Chip>
        )}

        <Link href={`/product/${id}`}>
          <a>
            <LazyImage
              src={imgUrl}
              width="auto"
              height="150px"
              // layout="responsive"
              alt={title}
            />
          </a>
        </Link>
      </div>
      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb="10px"
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>
  

            <FlexBox alignItems="center" mt="10px">
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                ${(price - (price * off) / 100).toFixed(2)}
              </SemiSpan>
              {!!off && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>{price?.toFixed(2)}</del>
                </SemiSpan>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
            // width="100px"
            mr="0.5rem"
          >
            {/* <div className="add-cart"> */}
            <Button
            
              variant="outlined"
              color="primary"
              padding="3px"
              size="none"
              borderColor="primary.light"
              onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
             More
              <Icon variant="small" >arrow-right</Icon>
            </Button>

          </FlexBox>
        </FlexBox>
      </div>

    </StyledProductCard1>
  );
};

ProductCard1.defaultProps = {
  id: '324321',
  title: 'KSUS ROG Strix G15',
  imgUrl: '/assets/images/products/macbook.png',
  off: 50,
  price: 450,
  rating: 0,
};

export default ProductCard1;