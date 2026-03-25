import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import Services from "./components/Services";
import Framework from "./components/Framework";
import Values from "./components/Values";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#0A1628] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Services />
        <Framework />
        <Values />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
