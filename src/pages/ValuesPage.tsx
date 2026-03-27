import PageSEO from "../lib/seo";
import Values from "../components/Values";

const ValuesPage = () => {
  return (
    <>
      <PageSEO
        title="Who We Work With"
        description="Stewardship Advisory Co partners with government institutions, financial services, corporate organisations, multilateral programmes, and senior executives navigating complex influence environments."
        path="/values"
      />
      <Values />
    </>
  );
};

export default ValuesPage;
