import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const Framework = () => {
  const steps = [
    {
      letter: "I",
      title: "Identity",
      description:
        "Clarifying the institution's purpose, values, and leadership voice.",
      detail:
        "We develop institutional narratives and messaging guidance that defines who the organisation is and what it stands for.",
    },
    {
      letter: "T",
      title: "Transparency",
      description:
        "Addressing information gaps and preventing suspicion.",
      detail:
        "We help organisations communicate decisions clearly and establish appropriate disclosure and communication protocols.",
    },
    {
      letter: "R",
      title: "Relationships",
      description:
        "Mapping and managing stakeholders intentionally.",
      detail:
        "We identify key audiences and design structured engagement strategies for communities, partners, and regulators.",
    },
    {
      letter: "U",
      title: "Understanding",
      description:
        "Making complex decisions understandable to the public.",
      detail:
        "We support leadership messaging, policy explanation, and communication clarity so stakeholders can follow reasoning, not rumours.",
    },
    {
      letter: "S",
      title: "Stability",
      description:
        "Preparing leadership for pressure and crisis.",
      detail:
        "We develop crisis communication protocols, spokesperson preparation, and response strategies for sensitive situations.",
    },
    {
      letter: "T",
      title: "Trust",
      description:
        "Measuring perception and strengthening confidence.",
      detail:
        "We assess stakeholder sentiment and provide ongoing advisory guidance to sustain credibility over time.",
      isOutcome: true,
    },
  ];

  return (
    <section
      id="framework"
      className="bg-[#0A1628] text-white py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-white/40">
              Our Advisory Framework
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            The I-TRUST Model
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-white/50 font-light max-w-2xl mx-auto"
          >
            Institutional Trust &amp; Reputation Structuring Toolkit — a structured
            method designed to strengthen institutional credibility and
            stakeholder confidence.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              variants={fadeUp}
              key={i}
              className={`p-8 rounded-2xl border ${step.isOutcome ? "border-amber-400/30 bg-amber-400/5" : "border-white/10 bg-white/[0.02]"}`}
            >
              <div
                className={`text-4xl font-serif mb-4 ${step.isOutcome ? "text-amber-400" : "text-white/20"}`}
              >
                {step.letter}
              </div>
              <h3 className="text-xl font-medium mb-2">
                {step.title}
                {step.isOutcome && (
                  <span className="text-xs font-bold tracking-widest uppercase text-amber-400/60 ml-3">
                    Outcome
                  </span>
                )}
              </h3>
              <p className="text-white/60 font-light text-sm mb-4">
                {step.description}
              </p>
              <p className="text-white/40 font-light text-sm leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Framework;
