import HoverBox from "@component/HoverBox";
import LazyImage from "@component/LazyImage";
import { H2 } from "@component/Typography";
import Link from "next/link";
import React from "react";

export interface CollectionsCardProps {
  imgUrl: string;
  title: string;
  url: string;
}

const CollectionsCard: React.FC<CollectionsCardProps> = ({
  imgUrl,
  title,
  url,
}) => {
  return (
    <Link href={url}>
      <a>
        <HoverBox borderRadius={8} mb="0.1rem">
          <LazyImage
            src={imgUrl}
            width="100%"
            height="auto"
            layout="responsive"
            alt={title}
          />
        </HoverBox>
        <H2 fontWeight="600" fontSize="14px" mb="0.25rem">
          {title}
        </H2>
      </a>
    </Link>
  );
};

export default CollectionsCard;
