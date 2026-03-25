import { useState, useEffect } from "react";
import { motion } from "motion/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Framework", href: "#framework" },
    { label: "Values", href: "#values" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "bg-[#0A1628]/95 backdrop-blur-md py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 relative z-50">
            <img
              src="/image/logo2.jpeg"
              alt="Stewardship Advisory"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:block px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-[#0A1628] transition-colors"
          >
            Get in Touch
          </button>

          <button
            className="md:hidden text-white relative z-50 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : "-100%",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-40 bg-[#0A1628] pt-24 px-6 pb-12 flex flex-col justify-between md:hidden"
      >
        <div className="flex flex-col space-y-8 text-2xl font-serif text-white">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left hover:text-white/70 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-8 border-t border-white/10">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full py-4 rounded-full border border-white/20 text-white text-lg font-medium hover:bg-white hover:text-[#0A1628] transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
