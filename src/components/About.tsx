import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const About = () => {
  return (
    <section id="about" className="bg-white text-[#0A1628] py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <motion.div variants={fadeUp} className="mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
            About Us
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
              Independent strategic counsel to leadership.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
              Stewardship Advisory is an institutional communications and
              reputation advisory practice that supports leaders and
              organisations whose responsibilities place them in the public eye.
            </p>
            <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
              We work with institutions that must make decisions affecting
              stakeholders, communities, and public confidence. Our role is to
              help leadership think clearly about its responsibilities and
              communicate those decisions in ways that are understood, credible,
              and stable.
            </p>
            <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
              Our approach combines governance awareness, stakeholder insight,
              and structured communication guidance to help organisations
              maintain legitimacy in both routine operations and periods of
              pressure.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
