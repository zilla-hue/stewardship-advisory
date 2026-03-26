import { useState } from "react";
import type { FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";
import PageSEO from "../lib/seo";

const INQUIRY_TOPICS = [
  "Institutional Communications Strategy",
  "Reputation Advisory",
  "Stakeholder Engagement",
  "Crisis Communications",
  "I-TRUST Framework",
  "General Inquiry",
];

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xkopnqrj");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const validateAndSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address";
    if (!message.trim()) errs.message = "Message is required";
    if (Object.keys(errs).length > 0) {
      setClientErrors(errs);
      return;
    }
    setClientErrors({});
    handleSubmit(e);
  };

  const seo = (
    <PageSEO
      title="Contact"
      description="Get in touch with Stewardship Advisory. We welcome inquiries from institutions and leaders seeking independent strategic counsel."
      path="/contact"
    />
  );

  if (state.succeeded) {
    return (
      <>
        {seo}
        <section className="bg-white text-[#0A1628] py-24 md:py-32 min-h-screen">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 md:px-12"
          >
            <motion.h2 variants={fadeUp} className="text-4xl font-serif mb-6">
              Message received
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#0A1628]/70 font-light">
              Thank you for reaching out. We will be in touch shortly.
            </motion.p>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      {seo}
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
        <motion.form
          variants={fadeUp}
          onSubmit={validateAndSubmit}
          noValidate
          className="max-w-2xl space-y-6"
        >
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            />
            {clientErrors.name && (
              <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            />
            {clientErrors.email && (
              <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>
            )}
            <ValidationError
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Organisation */}
          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-medium mb-1"
            >
              Organisation
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            />
          </div>

          {/* Inquiry Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-1">
              Inquiry Topic
            </label>
            <select
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            >
              <option value="">Select a topic</option>
              {INQUIRY_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628] resize-none"
            />
            {clientErrors.message && (
              <p className="text-red-500 text-sm mt-1">
                {clientErrors.message}
              </p>
            )}
          </div>

          {/* Form-level Formspree error */}
          <ValidationError
            errors={state.errors}
            className="text-red-500 text-sm"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={state.submitting}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0A1628] text-white font-medium hover:bg-[#0A1628]/90 transition-colors disabled:opacity-60"
          >
            {state.submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      </motion.div>
    </section>
    </>
  );
};

export default ContactPage;
