import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      title: "Institutional Positioning & Strategic Communications",
      items: [
        "Executive visibility and thought leadership positioning",
        "Institutional messaging architecture",
        "Stakeholder communication strategy",
        "Strategic media engagement frameworks",
        "Narrative alignment during organisational transitions",
      ],
    },
    {
      title: "Government & Policy Engagement Strategy",
      items: [
        "Government stakeholder mapping",
        "Policy intelligence briefings",
        "Engagement sequencing strategy",
        "Partnership positioning for public sector programmes",
        "Advisory on navigating regulatory perception risk",
      ],
    },
    {
      title: "Perception Risk & Reputation Architecture",
      items: [
        "Reputation risk diagnostics",
        "Crisis anticipation frameworks",
        "Stakeholder sentiment analysis",
        "Strategic response advisory",
        "Leadership communication calibration",
      ],
    },
    {
      title: "Development Finance & Strategic Partnerships",
      items: [
        "Alignment advisory for multilateral funding windows",
        "Institutional positioning for blended finance opportunities",
        "Strategic partnership architecture",
        "Programme visibility and credibility strategy",
      ],
    },
  ];

  return (
    <section id="services" className="bg-white text-[#0A1628] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
              Core Advisory Pillars
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-serif leading-tight"
            >
              Structured advisory for institutions navigating complexity.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#0A1628]/70 font-light leading-relaxed self-end"
            >
              Our services support leaders and institutions operating in complex
              influence environments where credibility, policy alignment and
              stakeholder perception directly impact outcomes.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="border-t border-[#0A1628]/10"
        >
          {services.map((service, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className="border-b border-[#0A1628]/10"
            >
              <button
                className="w-full py-8 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-mono text-[#0A1628]/30">
                    0{i + 1}
                  </span>
                  <span
                    className={`text-xl md:text-2xl font-serif transition-colors ${openIndex === i ? "text-[#0A1628]" : "text-[#0A1628]/60 group-hover:text-[#0A1628]"}`}
                  >
                    {service.title}
                  </span>
                </div>
                <span className="ml-4 flex-shrink-0 text-[#0A1628]/40">
                  {openIndex === i ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"}`}
              >
                <ul className="pl-16 space-y-3">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
