import Link from "next/link";
import DefaultLayout from "../components/layout/DefaultLayout";
const AboutPage = () => (
  // <Layout title="About | Next.js + TypeScript Example">
  <>
    <h1>About</h1>
    <p>This is the about page</p>
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
