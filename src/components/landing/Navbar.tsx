import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import logo from "../../assets/logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Security", href: "#security" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1f35]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-[#0a1628]/40 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a
          href="#"
          className="flex items-center"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="text-xl font-bold tracking-tight text-gradient-primary relative z-10">
            Proagent
          </span>
          <img
            src={logo}
            alt="AI Logo"
            className="h-10 w-auto -ml-5 mt-1"
            style={{ mixBlendMode: "lighten", filter: "brightness(1.2)" }}
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <Button variant="default" size="sm" asChild>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
            >
              Request Demo
            </a>
          </Button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a1628]/90 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    scrollToSection(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="default" size="sm" asChild>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    scrollToSection("#contact");
                  }}
                >
                  Request Demo
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
