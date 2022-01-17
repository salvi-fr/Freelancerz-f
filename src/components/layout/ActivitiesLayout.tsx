import Head from "next/head";
import React from "react";
import Divider from "../Divider";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigationBar from "../mobile-navigation/MobileNavigationBar";
// import ActivitiesNavbar from "../navbar/ActivitiesNavBar";
// import Sticky from "../sticky/Sticky";
// import Topbar from "../topbar/Topbar";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
};

const ActivitiesLayout: React.FC<Props> = ({
  children,
  title = "Healthedu ltd  NLF | Activities ",
}) => {
  return (
    <StyledAppLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Topbar /> */}
      <Header />
      <Divider />
      {/* <Sticky fixedOn={0}>
        <ActivitiesNavbar categoryList={categoryList} />
      </Sticky> */}
      <div className="section-after-sticky">{children}</div>
      <MobileNavigationBar />
      <Footer />
    </StyledAppLayout>
  );
};

// const categoryList = [
//     {
//         url: "",
//         title: "All",
//       },
//   {
//     url: "article",
//     title: "Article",
//   },
//   {
//     url: "training",
//     title: "Trainings ",
//   },
//   {
//     url: "event",
//     title: "Evemts",
//   },
//   {
//     icon: "report",
//     title: "Repors",
//   }
// ];

export default ActivitiesLayout;