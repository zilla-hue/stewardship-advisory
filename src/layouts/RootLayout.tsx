import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#0A1628] selection:text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
