import PageSEO from "../lib/seo";
import ServicesDetail from "../components/ServicesDetail";
import Framework from "../components/Framework";

const ServicesPage = () => {
  return (
    <>
      <PageSEO
        title="Services"
        description="Strategic advisory for institutional positioning, government engagement, reputation architecture, development finance and executive counsel."
        path="/services"
      />
      <ServicesDetail />
      <Framework />
    </>
  );
};

export default ServicesPage;
