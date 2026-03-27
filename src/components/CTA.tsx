import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const CTA = () => {
  return (
    <section
      id="contact"
      className="bg-[#0A1628] text-white py-32 md:py-48 text-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <p className="text-sm text-white/40 font-light mb-8 tracking-wide uppercase">
          Strategic stewardship is no longer optional
        </p>
        <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
          The difference between visibility and legitimacy. Between access and influence. Between activity and impact.
        </h2>
        <p className="text-lg text-white/50 font-light mb-12 max-w-2xl mx-auto">
          Stewardship Advisory Co supports leaders who are prepared to think
          beyond immediate outcomes and build enduring institutional value.
        </p>
        <a
          href="mailto:info@stewardshipadvisory.com"
          className="inline-flex items-center px-10 py-5 rounded-full border border-white/20 text-base font-medium hover:bg-white hover:text-[#0A1628] transition-colors cursor-pointer"
        >
          Start a Conversation
          <ArrowRight className="ml-3 w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
