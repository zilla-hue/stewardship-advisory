import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const VisionMission = () => {
  return (
    <section className="bg-[#0A1628] text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Vision */}
          <motion.div
            variants={fadeUp}
            className="border-l-2 border-amber-400/60 pl-8"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 block">
              Vision
            </span>
            <h3 className="text-2xl md:text-3xl font-serif leading-relaxed">
              To become the most trusted advisory firm in Africa for
              institutional credibility, leadership communication, and public
              trust.
            </h3>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={fadeUp}
            className="border-l-2 border-amber-400/60 pl-8"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 block">
              Mission
            </span>
            <h3 className="text-2xl md:text-3xl font-serif leading-relaxed">
              To strengthen the relationship between institutions and the people
              they serve by providing sound judgement, structured communication
              guidance, and thoughtful stakeholder engagement.
            </h3>
            <p className="text-lg text-white/50 font-light mt-6 leading-relaxed">
              Our work helps organisations be understood, trusted, and stable in
              times of both calm and pressure.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
