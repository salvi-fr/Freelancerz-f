import React, { useCallback, useState } from "react";
import FlexBox from "../FlexBox";
import { H5 } from "../Typography";

export interface ActivitiesNavbarProps {
  categoryList: {
    url: string;
    title: string;
  }[];
  onChange?: (value) => void;
}

const ActivitiesNavbar: React.FC<ActivitiesNavbarProps> = ({
    categoryList,
  onChange,
}) => {
  const [selected, setSelected] = useState(1);

  const handleCategoryClick = useCallback(
    (categoryIndex) => () => {
      setSelected(categoryIndex);
      if (onChange) onChange(categoryList[categoryIndex]);
    },
    []
  );

  return (
    <FlexBox bg="white" overflowX="auto" height="4rem">
      {categoryList.map((item, ind) => (
        <FlexBox
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          minWidth="100px"
          ml={ind === 0 ? "auto" : "unset"}
          mr={ind === categoryList.length - 1 ? "auto" : "unset"}
          bg={ind === selected ? "primary.light" : "transparent"}
          key={ind}
          onClick={handleCategoryClick(ind)}
        >
          <H5
            fontSize="12px"
            textAlign="center"
            color={ind === selected ? "primary.main" : "inherit"}
            fontWeight={ind === selected ? "600" : "400"}
          >
            {item.title}
          </H5>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export default ActivitiesNavbar;