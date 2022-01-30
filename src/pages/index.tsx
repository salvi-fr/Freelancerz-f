
import DefaultLayout from "../components/layout/DefaultLayout";
import Categories from '@component/home/categories'
import Welcome from '@component/home/welcome'
import Service from '@component/home/service'
import BeforeService from '@component/home/beforeService'
import Stats from '@component/home/stats'
import Subscribe from '@component/home/subscribe'
import Testimonial from '@component/home/testimonial'
import Partners from '@component/home/partners'
import BecomeInstructor from  '@component/home/client'  
const IndexPage = () => {
  return (
    <main>
      <Welcome />
      <Service />
      <Stats />
     <BecomeInstructor />
    </main>
  );
};

IndexPage.layout = DefaultLayout;

export default IndexPage;
