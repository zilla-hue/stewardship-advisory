import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#0A1628] text-white flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center mb-16 md:mb-20"
        >
          <img
            src="/image/stewardship-logo.png"
            alt="Stewardship Advisory"
            className="h-24 md:h-32 w-auto object-contain opacity-90"
          />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-[1.1] tracking-tight"
            >
              Institutional Counsel.
              <br />
              <span className="text-white/60">Public Trust.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12"
            >
              We support leaders and organisations whose responsibilities place
              them in the public eye, helping them communicate decisions that are
              understood, credible, and stable.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                onClick={() =>
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-[#0A1628] transition-colors"
              >
                Learn More
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
