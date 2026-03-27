import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#060E1A] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center mb-8">
              <Link to="/">
                <img
                  src="/image/logo2.jpeg"
                  alt="Stewardship Advisory"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-lg text-white/50 font-light max-w-sm mb-8 leading-relaxed">
              Strategic institutional advisory for leaders and organisations
              navigating complex governance, policy and reputational environments.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">
                Navigation
              </h4>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    What We Do
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    I-TRUST Framework
                  </Link>
                </li>
                <li>
                  <Link to="/values" className="hover:text-white transition-colors">
                    Our Values
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">
                Services
              </h4>
              <ul className="space-y-4 text-sm text-white/50 font-light">
                <li>Strategic Communications</li>
                <li>Policy Engagement</li>
                <li>Reputation Architecture</li>
                <li>Development Finance</li>
                <li>Executive Counsel</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">
                Contact
              </h4>
              <div className="text-sm text-white/50 font-light leading-relaxed">
                <p className="mb-4">
                  <a
                    href="mailto:info@stewardshipadvisory.com"
                    className="hover:text-white transition-colors"
                  >
                    info@stewardshipadvisory.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/30 font-medium">
          <p>
            &copy; {new Date().getFullYear()} Stewardship Advisory. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
