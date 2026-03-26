import PageSEO from "../lib/seo";
import Values from "../components/Values";

const ValuesPage = () => {
  return (
    <>
      <PageSEO
        title="Values"
        description="The core values that guide Stewardship Advisory: integrity, independence, discretion, and commitment to institutional legitimacy."
        path="/values"
      />
      <Values />
    </>
  );
};

export default ValuesPage;
