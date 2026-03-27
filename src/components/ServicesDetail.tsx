import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const services = [
  {
    title: "Institutional Positioning & Strategic Communications Advisory",
    description:
      "We support organisations and high-profile leaders in defining and projecting credible strategic narratives aligned with their long-term objectives.",
    relevance:
      "Particularly relevant for institutions undergoing growth, reform, leadership change or market repositioning.",
    items: [
      "Executive visibility and thought leadership positioning",
      "Institutional messaging architecture",
      "Stakeholder communication strategy",
      "Strategic media engagement frameworks",
      "Narrative alignment during organisational transitions",
    ],
  },
  {
    title: "Government Engagement & Policy Navigation Strategy",
    description:
      "We design structured engagement pathways that help organisations interact effectively with regulatory bodies, public institutions and development stakeholders.",
    relevance:
      "Ensures that engagement efforts are deliberate, credible and aligned with national development priorities.",
    items: [
      "Government stakeholder mapping",
      "Policy intelligence briefings",
      "Engagement sequencing strategy",
      "Partnership positioning for public sector programmes",
      "Advisory on navigating regulatory perception risk",
    ],
  },
  {
    title: "Reputation Risk & Perception Management Advisory",
    description:
      "In an era where public sentiment evolves rapidly, we help leaders and organisations anticipate and manage perception exposure.",
    relevance:
      "The objective is not merely crisis response, but sustained credibility resilience.",
    items: [
      "Reputation risk diagnostics",
      "Crisis anticipation frameworks",
      "Stakeholder sentiment analysis",
      "Strategic response advisory",
      "Leadership communication calibration",
    ],
  },
  {
    title: "Development Finance & Strategic Partnership Advisory",
    description:
      "We advise institutions seeking to position for funding access, programme collaboration and scale opportunities within development ecosystems.",
    relevance:
      "Access to capital is often influenced by institutional trust signals and stakeholder alignment.",
    items: [
      "Alignment advisory for multilateral and intervention funding windows",
      "Institutional positioning for blended finance opportunities",
      "Strategic partnership architecture",
      "Programme visibility and credibility strategy",
    ],
  },
  {
    title: "Executive Strategic Counsel",
    description:
      "For senior decision-makers requiring confidential, high-level advisory support, we offer retained strategic counsel engagements.",
    relevance:
      "Designed for leaders operating in high-stakes environments where decisions carry broad institutional implications.",
    items: [
      "Ongoing strategic thinking partnership",
      "Scenario interpretation and decision framing",
      "Influence landscape insight",
      "Leadership positioning guidance",
    ],
  },
];

const engagementModels = [
  "Structured advisory retainers",
  "Project-based strategic interventions",
  "Executive strategy sessions",
  "Institutional positioning audits",
];

const ServicesDetail = () => {
  return (
    <>
      {/* Services Header */}
      <section className="bg-white text-[#0A1628] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
                Our Services
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-3xl mb-20">
              <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                Advisory for complex influence environments.
              </h1>
              <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                At Stewardship Advisory Co, our services are designed to support
                leaders and institutions operating in complex influence
                environments where credibility, policy alignment and stakeholder
                perception directly impact outcomes. We provide structured
                advisory interventions that enable clients to anticipate risk,
                unlock opportunity and sustain institutional trust.
              </p>
            </motion.div>

            {/* Service Cards */}
            <div className="space-y-16">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="border-t border-[#0A1628]/10 pt-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div>
                      <span className="text-sm font-mono text-[#0A1628]/30 mb-4 block">
                        0{i + 1}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif leading-tight mb-6">
                        {service.title}
                      </h2>
                      <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <p className="text-[#0A1628]/50 font-light leading-relaxed italic">
                        {service.relevance}
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-4">
                        {service.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-[#0A1628]/70 font-light"
                          >
                            <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-600/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagement Approach */}
      <section className="bg-[#0A1628] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white/40">
                Engagement Approach
              </span>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif leading-tight mb-6">
                  Tailored to reflect your operating context.
                </h2>
                <p className="text-lg text-white/50 font-light leading-relaxed">
                  Each engagement is tailored to reflect the client's operating
                  context, leadership priorities and strategic horizon.
                </p>
              </div>
              <div>
                <p className="text-white/40 text-sm uppercase tracking-widest mb-6 font-bold">
                  Our work is typically delivered through
                </p>
                <ul className="space-y-4">
                  {engagementModels.map((model, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-lg text-white/70 font-light border-b border-white/10 pb-4"
                    >
                      <span className="text-amber-400/60 font-mono text-sm">
                        0{i + 1}
                      </span>
                      {model}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing Signal */}
      <section className="bg-white text-[#0A1628] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl font-serif leading-relaxed text-[#0A1628]/80"
            >
              We partner with institutions that recognise that strategic
              stewardship of influence, credibility and stakeholder trust is
              essential for sustainable impact.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#0A1628]/50 font-light leading-relaxed mt-6"
            >
              Our role is to provide the insight, structure and strategic
              discipline required to navigate complexity with confidence.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesDetail;
