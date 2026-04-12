import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f2942] text-white pt-10 md:pt-14 pb-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* 🔥 GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* LOGO */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-2 mb-3">
              
              <img
                src="/images/logo.png"
                alt="Vidayanta Logo"
                loading="lazy" // ✅ performance
                className="w-20 md:w-24"
              />

              <h2 className="text-2xl md:text-3xl font-bold text-[#1FA2A6]">
                Vidayanta
              </h2>
            </div>

            <p className="text-gray-300 text-sm">
              Learn. Teach. <span className="text-yellow-400">Grow.</span>
            </p>

            <p className="text-gray-400 text-xs mt-4">
              © {new Date().getFullYear()} Vidayanta
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>

            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3 text-lg">Support</h3>

            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h3 className="font-semibold mb-4 text-lg">
              Start Your Journey
            </h3>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">

              <Link
                to="/request-demo"
                className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition w-full sm:w-auto"
              >
                Request Demo
              </Link>

              <Link
                to="/login" // ✅ fix (important for localhost routing)
                className="bg-teal-500 px-4 py-2 rounded-md font-semibold hover:bg-teal-600 transition w-full sm:w-auto"
              >
                Login
              </Link>

            </div>

            {/* SOCIAL */}
            <div className="flex justify-center md:justify-start gap-4 text-lg text-gray-300">

              <a
                href="https://x.com/vidayanta"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-500"
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.instagram.com/vidayanta_?igsh=MWliN3Boa3o0enFqOQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-500"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/share/1akc5W612N/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-500"
              >
                <FaFacebookSquare />
              </a>

              <a
                href="https://www.linkedin.com/company/113414019"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-500"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

        {/* 🔥 BOTTOM */}
        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-gray-400 text-xs">
          Made with ❤️ by <b className="text-teal-500">NSJB Groups</b> Team
        </div>

      </div>

    </footer>
  );
}