import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
// import Topbar from "@component/topbar/Topbar";
import Head from "next/head";
import React from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  nrf?:React.ReactChild;
  navbar?: React.ReactChild;
};

const AppLayout: React.FC<Props> = ({
  children,
  navbar,
  nrf,
  title = "HealthEdu Ltd | One stop center for Health Education",
}) => (
  <StyledAppLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    {/* <Topbar /> */}

    <Sticky fixedOn={0}>
      <Header navbar={navbar}/>
    </Sticky>
    {navbar && <div className="section-after-sticky"></div>}
{/* <div className="section-after-sticky"></div> */}
    {/* {navbar && <div className="section-after-sticky">{navbar}</div>} */}
    {nrf && <div className="section-after-sticky">{nrf}</div>}
    {!navbar ? (
      <div className="section-after-sticky">{children}</div>
    ) : (
      children
    )}

    <MobileNavigationBar />
    <Footer />
  </StyledAppLayout>
);

export default AppLayout;
