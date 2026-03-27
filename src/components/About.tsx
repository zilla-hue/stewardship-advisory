import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const About = () => {
  return (
    <section id="about" className="bg-white text-[#0A1628] py-24 md:py-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <motion.div variants={fadeUp} className="mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
            Institutional Manifesto
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
              Power must be guided. Influence must be stewarded. Institutions must be trusted.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
              Modern leadership operates in an environment defined by scrutiny,
              volatility and accelerated expectations. Strategic missteps are no
              longer merely operational errors — they are credibility events with
              lasting consequences.
            </p>
            <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
              Stewardship Advisory Co exists to support decision-makers who
              understand that sustainable success is not accidental. It is
              architected through disciplined strategy, calibrated engagement and
              long-term institutional thinking.
            </p>
            <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
              We work at the intersection of governance, perception, policy
              dynamics and stakeholder influence — helping our clients move from
              reactive positioning to strategic leadership.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
