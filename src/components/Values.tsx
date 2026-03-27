import { Shield, Eye, Anchor, Lightbulb, Heart, Users } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const Values = () => {
  const values = [
    {
      icon: Shield,
      title: "Responsibility",
      description:
        "We recognise that institutions carry consequences beyond themselves. Our guidance prioritises public impact, not only organisational comfort.",
    },
    {
      icon: Eye,
      title: "Integrity",
      description:
        "We provide honest counsel, even when it is difficult. We do not shape facts to suit narratives.",
    },
    {
      icon: Anchor,
      title: "Independence",
      description:
        "Our judgement is not influenced by politics, popularity, or pressure. Clients receive advice, not approval.",
    },
    {
      icon: Lightbulb,
      title: "Clarity",
      description:
        "We translate complex decisions into understandable communication so stakeholders can follow reasoning rather than speculation.",
    },
    {
      icon: Heart,
      title: "Discretion",
      description:
        "We treat client matters with confidentiality and restraint. Trust is built not only by what we say, but by what we protect.",
    },
    {
      icon: Users,
      title: "Stewardship",
      description:
        "We encourage leadership that uses authority carefully, transparently, and with awareness of long-term consequences.",
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
              Our Core Values
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-serif max-w-2xl mx-auto leading-tight"
          >
            We measure success not by publicity, but by improved relationships
            between institutions and the people they serve.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {values.map((value, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className="border-t border-[#0A1628]/10 pt-8"
            >
              <value.icon className="w-6 h-6 text-[#0A1628]/30 mb-6" />
              <h3 className="text-xl font-medium mb-3">{value.title}</h3>
              <p className="text-[#0A1628]/60 font-light leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
