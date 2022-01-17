
import DefaultLayout from "../components/layout/DefaultLayout";
import Categories from '@component/home/categories'
import Welcome from '@component/home/welcome'
import Service from '@component/home/service'
import BeforeService from '@component/home/beforeService'
import Stats from '@component/home/stats'
import Subscribe from '@component/home/subscribe'
import Testimonial from '@component/home/testimonial'
import Partners from '@component/home/partners'
const IndexPage = () => {
  return (
    <main>
      <Welcome />
      <Categories />
      <BeforeService />
      <Service />
      <Stats />
      <Testimonial />
     <Partners />
      <Subscribe />
    </main>
  );
};

IndexPage.layout = DefaultLayout;

export default IndexPage;
