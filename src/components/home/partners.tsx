import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H4,H3 } from "@component/Typography";
import partnersDatabase from "@data/partner-database";
import useWindowSize from "@hook/useWindowSize";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "../Container";

const Categories: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);
  }, [width]);

  return (
    <Container mb="2rem"
    >

<H3 textAlign="center" fontSize="25px" mb="2rem" lineHeight="1.2">
        Our Partners 
      </H3>
      <Box my="-0.25rem"  >
        <Carousel totalSlides={9} visibleSlides={visibleSlides}>
          {partnersDatabase.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <Card p="1rem">
                <Link href={item.webUrl}>
                  <a target="_blank" href={item.webUrl} rel="noreferrer">
                    <HoverBox borderRadius={8} mb="0.5rem">
                      <LazyImage
                        src={item.imgUrl}
                        width="70px"
                        height="70px"
                        layout="responsive"
                        alt={item.title}
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem" height='50px'>
                      {item.title}
                    </H4>
                  </a>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};
export default Categories;