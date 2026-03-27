import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../lib/animations";

const AboutDetail = () => {
  return (
    <>
      {/* Who We Are */}
      <section className="bg-white text-[#0A1628] py-24 md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
              Who We Are
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
                Strategic institutional advisory for complex environments.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                Stewardship Advisory Co is a strategic institutional advisory firm
                focused on supporting leaders, organisations and public actors
                navigating complex governance, policy and reputational environments.
              </p>
              <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                We operate from the understanding that leadership today is
                exercised under constant scrutiny, accelerated expectations and
                evolving stakeholder dynamics. In such contexts, strategic clarity,
                disciplined engagement and credibility management are fundamental
                to sustainable impact.
              </p>
              <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                Our work helps clients anticipate shifts, interpret influence
                landscapes and position effectively for long-term institutional
                relevance.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Purpose + Our Approach */}
      <section className="bg-[#0A1628] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          >
            {/* Purpose */}
            <motion.div
              variants={fadeUp}
              className="border-l-2 border-amber-400/60 pl-8"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 block">
                Our Purpose
              </span>
              <h3 className="text-2xl md:text-3xl font-serif leading-relaxed mb-6">
                To strengthen the capacity of institutions and decision-makers to
                lead responsibly, communicate strategically and build enduring
                trust.
              </h3>
              <p className="text-lg text-white/50 font-light leading-relaxed">
                We believe that influence must be guided by stewardship, not
                impulse. That growth must be anchored on legitimacy, not visibility
                alone. And that institutions must be designed to outlive
                personalities and political cycles.
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div
              variants={fadeUp}
              className="border-l-2 border-amber-400/60 pl-8"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 block">
                Our Approach
              </span>
              <h3 className="text-2xl md:text-3xl font-serif leading-relaxed mb-6">
                Grounded in a structured understanding of power dynamics,
                stakeholder psychology and policy ecosystems.
              </h3>
              <div className="space-y-3 text-lg text-white/50 font-light leading-relaxed">
                <p>We combine:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400/60 mt-2 block w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                    Strategic communications intelligence
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400/60 mt-2 block w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                    Institutional positioning frameworks
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400/60 mt-2 block w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                    Government engagement architecture
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400/60 mt-2 block w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                    Perception risk analysis
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400/60 mt-2 block w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                    Development finance alignment insight
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leadership + What Makes Us Different */}
      <section className="bg-white text-[#0A1628] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
                Leadership
              </span>
            </motion.div>
            <motion.div variants={fadeUp} className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <h2 className="text-3xl md:text-4xl font-serif leading-tight">
                  Seasoned strategic communications and public affairs
                  professionals.
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                    Stewardship Advisory Co is led by professionals with experience
                    advising political leaders, financial institutions, corporate
                    organisations and development-focused initiatives.
                  </p>
                  <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                    Our leadership philosophy is rooted in disciplined thinking,
                    ethical influence and measurable strategic outcomes. We
                    understand both the language of policy rooms and the realities
                    of operational execution.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* What Makes Us Different */}
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#0A1628]/40">
                What Makes Us Different
              </span>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <h2 className="text-3xl md:text-4xl font-serif leading-tight">
                  Institutional credibility architecture, not traditional
                  consulting.
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                    We do not merely help organisations communicate. We help them
                    earn the right to be believed.
                  </p>
                  <p className="text-lg text-[#0A1628]/70 font-light leading-relaxed">
                    We do not simply design engagement plans. We build influence
                    pathways aligned with national priorities, stakeholder
                    expectations and leadership vision.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="bg-[#0A1628] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white/40">
                Our Commitment
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-serif leading-tight mb-8"
            >
              Supporting leaders who recognise the responsibility that comes with
              influence.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-white/50 font-light leading-relaxed"
            >
              Our role is not to replace leadership judgement, but to strengthen
              it through insight, structure and strategic foresight. In
              environments where decisions carry economic, social and political
              consequences, thoughtful stewardship becomes a strategic necessity.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutDetail;
