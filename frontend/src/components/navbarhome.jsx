import { useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ stable active check
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  // ✅ reusable scroll
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ✅ FIXED (localhost scroll issue)
  const goToHowItWorks = useCallback(() => {
    if (location.pathname === "/") {
      scrollToSection("howitworks");
    } else {
      navigate("/");
      setTimeout(() => scrollToSection("howitworks"), 200);
    }
    setMenu(false);
  }, [location.pathname, navigate, scrollToSection]);

  const goToFeature = useCallback(() => {
    if (location.pathname === "/") {
      scrollToSection("features");
    } else {
      navigate("/");
      setTimeout(() => scrollToSection("features"), 200);
    }
    setMenu(false);
  }, [location.pathname, navigate, scrollToSection]);

  return (
    <>
      <nav className="fixed top-0 z-50 bg-[#0f2942]/90 backdrop-blur-md text-white px-6 py-3 flex justify-between items-center shadow-md w-full">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenu(true)}
            className="text-2xl md:hidden"
          >
            <GiHamburgerMenu />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              loading="lazy"
              alt="Vidayanta Logo"
              className="w-20 h-10"
            />
            <h1 className="hidden md:block text-3xl font-semibold text-[#14b8a6]">
              Vidayanta
            </h1>
          </Link>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex gap-8 font-semibold">
          <Link to="/" className={`${isActive("/") ? "text-[#2dd4bf]" : ""} hover:text-[#5eead4]`}>
            Home
          </Link>
          <button onClick={goToHowItWorks} className="hover:text-[#5eead4]">
            How it Works
          </button>
          <button onClick={goToFeature} className="hover:text-[#5eead4]">
            Features
          </button>

          

          <Link to="/pricing" className={`${isActive("/pricing") ? "text-[#2dd4bf]" : ""} hover:text-[#5eead4]`}>
            Pricing
          </Link>

          <Link to="/about" className={`${isActive("/about") ? "text-[#2dd4bf]" : ""} hover:text-[#5eead4]`}>
            About
          </Link>

          <Link to="/contact" className={`${isActive("/contact") ? "text-[#2dd4bf]" : ""} hover:text-[#5eead4]`}>
            Contact
          </Link>
        </div>

        {/* RIGHT */}
        <Link to="/login">
          <button className="bg-[#14b8a6] px-5 py-2 rounded-md font-semibold hover:bg-[#0d9488] transition">
            Login
          </button>
        </Link>
      </nav>

      {/* ✅ FIX */}
      <div className="w-full h-[1px] bg-[#1fa2a6]"></div>

      {/* MOBILE MENU */}
      {menu && (
        <div className="fixed inset-0 z-50 flex">

          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenu(false)}
          ></div>

          {/* SIDEBAR */}
          <div className="relative w-64 bg-[#1f2937] h-full p-6 shadow-lg transition-transform duration-300">

            <button
              onClick={() => setMenu(false)}
              className="text-white text-2xl mb-6"
            >
              <RxCross2 />
            </button>

            <h1 className="text-2xl font-bold text-[#14b8a6] mb-6">
              Vidayanta
            </h1>

            <ul className="space-y-5 font-semibold flex flex-col">

              <Link to="/" onClick={() => setMenu(false)}
                className={isActive("/") ? "text-[#2dd4bf]" : ""}
              >
                Home
              </Link>

              <button onClick={goToHowItWorks} className="text-left">
                How it Works
              </button>

              <button onClick={goToFeature} className="text-left">
                Features
              </button>

              <Link to="/pricing" onClick={() => setMenu(false)}
                className={isActive("/pricing") ? "text-[#2dd4bf]" : ""}
              >
                Pricing
              </Link>

              <Link to="/about" onClick={() => setMenu(false)}
                className={isActive("/about") ? "text-[#2dd4bf]" : ""}
              >
                About
              </Link>

              <Link to="/contact" onClick={() => setMenu(false)}
                className={isActive("/contact") ? "text-[#2dd4bf]" : ""}
              >
                Contact
              </Link>

            </ul>

          </div>
        </div>
      )}
    </>
  );
}