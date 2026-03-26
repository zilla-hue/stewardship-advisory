import PageSEO from "../lib/seo";
import Services from "../components/Services";
import Framework from "../components/Framework";

const ServicesPage = () => {
  return (
    <>
      <PageSEO
        title="Services"
        description="Institutional communications strategy, reputation advisory, stakeholder engagement, and crisis communications. Guided by the I-TRUST framework."
        path="/services"
      />
      <Services />
      <Framework />
    </>
  );
};

export default ServicesPage;
