import PageSEO from "../lib/seo";
import Hero from "../components/Hero";
import About from "../components/About";
import VisionMission from "../components/VisionMission";
import Services from "../components/Services";
import Framework from "../components/Framework";
import Values from "../components/Values";
import CTA from "../components/CTA";

const HomePage = () => {
  return (
    <>
      <PageSEO
        title="Stewardship Advisory | Institutional Communications & Reputation Advisory"
        description="Stewardship Advisory is an institutional communications and reputation advisory practice supporting leaders and organisations whose responsibilities place them in the public eye."
        path="/"
        isHome={true}
      />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <Framework />
      <Values />
      <CTA />
    </>
  );
};

export default HomePage;
