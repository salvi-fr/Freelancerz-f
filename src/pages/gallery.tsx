import Link from "next/link";
import Layout from "../components/layout/AppLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
const AboutPage = () => (
  // <Layout title="About | Next.js + TypeScript Example">
  <>
    <h1>Gallery</h1>
    <p>This is the Gallery page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    </>
  // </Layout>
);
AboutPage.layout = DefaultLayout;
export default AboutPage;