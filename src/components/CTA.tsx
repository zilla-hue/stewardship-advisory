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
        <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
          We help institutions communicate with clarity, credibility, and care.
        </h2>
        <p className="text-lg text-white/50 font-light mb-12 max-w-2xl mx-auto">
          If your organisation faces decisions that affect public confidence,
          we'd welcome the opportunity to talk.
        </p>
        <a
          href="mailto:info@stewardshipadvisory.com"
          className="inline-flex items-center px-10 py-5 rounded-full border border-white/20 text-base font-medium hover:bg-white hover:text-[#0A1628] transition-colors"
        >
          Start a Conversation
          <ArrowRight className="ml-3 w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;
