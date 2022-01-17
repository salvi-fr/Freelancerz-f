import Box from "@component/Box";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import CollectionsCard from "../cards/CollectionsCard";
import Card from "@component/Card";
import Grid from "../grid/Grid";

const TopCategories: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator
    iconName="categories"
    title="Top Course Collections"
      seeMoreLink="/collections"
    >
      <Card p="1rem">
        <Grid container spacing={6}>
          {productList.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.title}>
              <CollectionsCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Card>
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={10} visibleSlides={visibleSlides}>
          {productList.map((item, ind) => (
            <Box py="0.25rem" key={ind} >
              <CollectionsCard
                imgUrl={item.imgUrl}
                title={item.title}
                url={item.url}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

const productList = [
  {
    imgUrl: "/assets/images/products/flash-1.png",
    url: "/collections/pharmacy",
    title: "Pharmacy",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
    url: "/collections/first_aid",
    title: "first aid",
  },
  {
    imgUrl: "/assets/images/products/flash-3.png",
    url: "/collections/rehabilitation",
    title: "rehabilitation",
  },
  {
    imgUrl: "/assets/images/products/flash-4.png",
    url: "/collections/pharmacy",
    title: "Pharmacy",
  },
  {
    imgUrl: "/assets/images/products/flash-1.png",
    url: "/collections/nutrotion",
    title: "Nutrition",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
    url: "/collections/medical-imaging",
    title: "Medical Imaging",
  },
  {
    imgUrl: "/assets/images/products/flash-3.png",
    url: "/collections/medical-imaging",
    title: "Medical Imaging",
  },
  {
    imgUrl: "/assets/images/products/flash-4.png",
    url: "/collections/bundle_offer",
    title: "bundle offer",
  },
  {
    imgUrl: "/assets/images/products/flash-1.png",
    url: "/collections/public-health",
    title: "Public Health",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
    url: "/collections/all",
    title: "All collections",
  },
];

export default TopCategories;