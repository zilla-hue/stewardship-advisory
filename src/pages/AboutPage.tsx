import PageSEO from "../lib/seo";
import About from "../components/About";
import VisionMission from "../components/VisionMission";

const AboutPage = () => {
  return (
    <>
      <PageSEO
        title="About"
        description="Independent strategic counsel for institutional leaders. Stewardship Advisory combines governance awareness, stakeholder insight, and structured communication guidance."
        path="/about"
      />
      <About />
      <VisionMission />
    </>
  );
};

export default AboutPage;
