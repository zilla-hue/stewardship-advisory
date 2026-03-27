import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      title: "Leadership Communication",
      items: [
        "Executive positioning and messaging guidance",
        "Speech and statement development",
        "Leadership public communication strategy",
      ],
    },
    {
      title: "Institutional Narrative Development",
      items: [
        "Clarifying organisational purpose and public role",
        "Developing communication frameworks and message architecture",
        "Helping organisations explain decisions and priorities clearly",
      ],
    },
    {
      title: "Stakeholder Engagement Strategy",
      items: [
        "Stakeholder mapping and relationship planning",
        "Community and partner communication guidance",
        "Managing expectations during organisational change",
      ],
    },
    {
      title: "Reputation & Crisis Advisory",
      items: [
        "Identifying communication risks before they escalate",
        "Crisis preparedness and response planning",
        "Real-time advisory during sensitive situations",
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
              What We Do
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-serif leading-tight"
            >
              Structured advisory support for leadership and institutions.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[#0A1628]/70 font-light leading-relaxed self-end"
            >
              We help institutions make better decisions in public and
              communicate them responsibly. Our services cover the full spectrum
              of institutional communication needs.
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
                className="w-full py-8 flex justify-between items-center text-left focus:outline-none group"
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
