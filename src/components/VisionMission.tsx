import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const beliefs = [
  "Influence is a responsibility before it is an advantage",
  "Reputation is an institutional asset that must be actively managed",
  "Policy intelligence is a commercial and political differentiator",
  "Strategic communication is a leadership function, not a support function",
  "Sustainable impact requires structured stewardship of trust",
];

const VisionMission = () => {
  return (
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
              Our Strategic Philosophy
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-serif leading-tight mb-16 max-w-3xl"
          >
            We believe
          </motion.h2>

          <div className="space-y-0">
            {beliefs.map((belief, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border-t border-white/10 py-6 md:py-8"
              >
                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed pl-8 md:pl-12 relative">
                  <span className="absolute left-0 top-0 text-amber-400/60 font-serif text-2xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {belief}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
