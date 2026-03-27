import { Building2, Landmark, Briefcase, Globe, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const Values = () => {
  const audiences = [
    {
      icon: Landmark,
      title: "Government & Public Institutions",
      description:
        "Government leaders and public institutions navigating policy, governance and stakeholder expectations.",
    },
    {
      icon: Building2,
      title: "Financial Institutions",
      description:
        "Financial institutions and development finance actors seeking credibility and strategic positioning.",
    },
    {
      icon: Briefcase,
      title: "Corporate Organisations",
      description:
        "Corporate organisations navigating regulatory or reputational complexity in high-stakes environments.",
    },
    {
      icon: Globe,
      title: "Foundations & Multilateral Programmes",
      description:
        "Foundations, multilateral programmes and impact-driven initiatives building sustainable partnerships.",
    },
    {
      icon: UserCircle,
      title: "Executives & Policy Influencers",
      description:
        "High-profile executives and policy influencers requiring confidential strategic counsel.",
    },
  ];

  return (
    <section id="values" className="bg-white text-[#0A1628] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
              Who We Work With
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-serif max-w-3xl mx-auto leading-tight"
          >
            We partner with leaders and institutions prepared to build enduring
            value.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {audiences.map((audience, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className="border-t border-[#0A1628]/10 pt-8"
            >
              <audience.icon className="w-6 h-6 text-[#0A1628]/30 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-medium mb-3">{audience.title}</h3>
              <p className="text-[#0A1628]/60 font-light leading-relaxed">
                {audience.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
