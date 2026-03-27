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
        title="Stewardship Advisory Co | Stewarding Influence. Shaping Institutional Trust."
        description="We advise leaders, institutions and high-impact organisations navigating complex policy environments, reputational risk landscapes and transformational growth opportunities."
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
