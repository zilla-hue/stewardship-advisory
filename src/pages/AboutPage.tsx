import PageSEO from "../lib/seo";
import AboutDetail from "../components/AboutDetail";

const AboutPage = () => {
  return (
    <>
      <PageSEO
        title="About"
        description="Stewardship Advisory Co is a strategic institutional advisory firm supporting leaders and organisations navigating complex governance, policy and reputational environments."
        path="/about"
      />
      <AboutDetail />
    </>
  );
};

export default AboutPage;
