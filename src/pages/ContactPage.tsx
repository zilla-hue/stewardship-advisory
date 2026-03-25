import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const ContactPage = () => {
  return (
    <section className="bg-white text-[#0A1628] py-24 md:py-32 min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <motion.div variants={fadeUp} className="mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
            Contact
          </span>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-serif mb-8 leading-tight"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-lg text-[#0A1628]/70 font-light leading-relaxed mb-12 max-w-2xl"
        >
          We welcome inquiries from institutions and leaders seeking independent
          strategic counsel. Reach out to begin a conversation.
        </motion.p>
        <motion.div variants={fadeUp}>
          <p className="text-[#0A1628]/70 font-light mb-2">Email</p>
          <a
            href="mailto:info@stewardshipadvisory.com"
            className="text-lg font-medium hover:text-[#0A1628]/70 transition-colors"
          >
            info@stewardshipadvisory.com
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactPage;
