import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import logo from "../assets/blanco-logo.png";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  // { name: "Programs", path: "/programs" },
  { name: "Campaigns", path: "/campaigns" },
  // { name: "Events", path: "/events" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const css = `
.nv {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  padding: 0 3%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.nv--scrolled,
.nv--open {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 10px 35px rgba(6, 39, 91, 0.12);
}

.nv__bar {
  width: 100%;
  max-width: 1800px;
  min-height: 92px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  transition: min-height 0.4s ease;
}

.nv--scrolled .nv__bar {
  min-height: 74px;
}

/* ---------- Brand ---------- */
.nv__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-shrink: 1;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease;
}

.nv__brand:hover {
  transform: scale(1.02);
}

.nv__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 62px;
  height: 62px;
  overflow: hidden;
  background: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.17);
  transition: width 0.4s ease, height 0.4s ease;
}

.nv--scrolled .nv__logo,
.nv--open .nv__logo {
  border-color: #e2e8f0;
  box-shadow: 0 5px 15px rgba(6, 39, 91, 0.12);
}

.nv--scrolled .nv__logo {
  width: 52px;
  height: 52px;
}

.nv__logo img {
  display: block;
  width: 100%;
  height: 100%;
  padding: 1px;
  object-fit: contain;
}

.nv__name {
  min-width: 0;
  overflow: hidden;
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: color 0.4s ease, font-size 0.4s ease;
}

.nv--scrolled .nv__name,
.nv--open .nv__name {
  color: #10213b;
  text-shadow: none;
}

.nv--scrolled .nv__name {
  font-size: 20px;
}

/* ---------- Hamburger ---------- */
.nv__toggle {
  display: none;
  position: relative;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  padding: 0;
  color: #ffffff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 12px;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.nv--scrolled .nv__toggle,
.nv--open .nv__toggle {
  color: #10213b;
  border-color: #d8e0ec;
}

.nv__toggle:focus-visible {
  outline: 3px solid #06499b;
  outline-offset: 2px;
}

.nv__toggle span {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.2s ease, top 0.3s ease;
}

.nv__toggle span:nth-child(1) {
  top: 15px;
}

.nv__toggle span:nth-child(2) {
  top: 22px;
}

.nv__toggle span:nth-child(3) {
  top: 29px;
}

.nv--open .nv__toggle span:nth-child(1) {
  top: 22px;
  transform: rotate(45deg);
}

.nv--open .nv__toggle span:nth-child(2) {
  opacity: 0;
}

.nv--open .nv__toggle span:nth-child(3) {
  top: 22px;
  transform: rotate(-45deg);
}

/* ---------- Links ---------- */
.nv__links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}

.nv__item {
  position: relative;
  display: inline-flex;
  transition: transform 0.25s ease;
}

.nv__item:hover {
  transform: translateY(-2px);
}

.nv__link {
  min-height: 52px;
  padding: 9px 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f7faff;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: color 0.3s ease;
}

.nv__link:hover {
  color: #ffd16b;
}

.nv__link--active {
  color: #ffffff;
  font-weight: 800;
}

.nv__link:focus-visible,
.nv__donate:focus-visible {
  outline: 3px solid #06499b;
  outline-offset: 2px;
}

.nv--scrolled .nv__link {
  min-height: 46px;
  color: #374151;
  text-shadow: none;
}

.nv--scrolled .nv__link:hover,
.nv--scrolled .nv__link--active {
  color: #06499b;
}

.nv__line {
  position: absolute;
  right: 11px;
  bottom: 3px;
  left: 11px;
  height: 3px;
  background: #ffffff;
  border-radius: 10px;
}

.nv--scrolled .nv__line {
  bottom: 1px;
  background: #06499b;
}

/* ---------- Donate ---------- */
.nv__donate {
  min-height: 52px;
  margin-left: 5px;
  padding: 12px 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  background: transparent;
  border: 2px solid #ffffff;
  border-radius: 28px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: min-height 0.4s ease, padding 0.4s ease, background 0.4s ease,
    color 0.4s ease, border 0.4s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.nv--scrolled .nv__donate {
  min-height: 47px;
  padding: 11px 22px;
  color: #10213b;
  background: linear-gradient(135deg, #ffa816 0%, #f58200 100%);
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(245, 130, 0, 0.24);
}

.nv__donate:hover {
  transform: translateY(-4px) scale(1.04);
}

.nv--scrolled .nv__donate:hover {
  box-shadow: 0 15px 34px rgba(245, 130, 0, 0.44);
}

.nv__heart {
  font-size: 19px;
  line-height: 1;
}

.nv__backdrop {
  display: none;
}

/* ---------- Laptop: tighten spacing ---------- */
@media (max-width: 1200px) {
  .nv__name {
    font-size: 19px;
  }

  .nv--scrolled .nv__name {
    font-size: 18px;
  }

  .nv__link {
    padding: 9px 8px;
  }

  .nv__line {
    right: 8px;
    left: 8px;
  }

  .nv__donate {
    padding: 11px 20px;
  }
}

/* ---------- Tablet and mobile: hamburger menu ---------- */
@media (max-width: 1024px) {
  .nv__bar {
    min-height: 76px;
  }

  .nv--scrolled .nv__bar {
    min-height: 68px;
  }

  .nv__toggle {
    display: block;
  }

  .nv__links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
    max-height: calc(100vh - 76px);
    max-height: calc(100dvh - 76px);
    padding: 6px 5% 22px;
    overflow-y: auto;
    background: #ffffff;
    border-top: 1px solid #e8edf4;
    box-shadow: 0 24px 40px rgba(6, 39, 91, 0.16);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-10px);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
  }

  .nv--open .nv__links {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none;
  }

  .nv__item {
    display: block;
  }

  .nv__item:hover {
    transform: none;
  }

  .nv__link,
  .nv--scrolled .nv__link {
    width: 100%;
    min-height: 54px;
    padding: 14px 6px;
    justify-content: flex-start;
    color: #10213b;
    font-size: 16px;
    text-shadow: none;
    border-bottom: 1px solid #eef2f7;
  }

  .nv__link:hover,
  .nv__link--active,
  .nv--scrolled .nv__link:hover,
  .nv--scrolled .nv__link--active {
    color: #06499b;
  }

  .nv__line {
    display: none;
  }

  .nv__donate,
  .nv--scrolled .nv__donate {
    width: 100%;
    min-height: 52px;
    margin: 18px 0 0;
    padding: 12px 22px;
    color: #10213b;
    background: linear-gradient(135deg, #ffa816 0%, #f58200 100%);
    border-color: transparent;
    box-shadow: 0 8px 20px rgba(245, 130, 0, 0.24);
  }

  .nv__donate:hover {
    transform: none;
  }

  .nv__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(6, 39, 91, 0.4);
  }
}

/* ---------- Small phones ---------- */
@media (max-width: 480px) {
  .nv {
    padding: 0 4%;
  }

  .nv__bar {
    min-height: 68px;
    gap: 12px;
  }

  .nv--scrolled .nv__bar {
    min-height: 62px;
  }

  .nv__brand {
    gap: 9px;
  }

  .nv__logo,
  .nv--scrolled .nv__logo {
    width: 46px;
    height: 46px;
  }

  .nv__name,
  .nv--scrolled .nv__name {
    font-size: 15px;
  }

  .nv__toggle {
    width: 42px;
    height: 42px;
  }

  .nv__toggle span {
    left: 11px;
    right: 11px;
  }

  .nv__toggle span:nth-child(1) {
    top: 13px;
  }

  .nv__toggle span:nth-child(2),
  .nv--open .nv__toggle span:nth-child(1),
  .nv--open .nv__toggle span:nth-child(3) {
    top: 20px;
  }

  .nv__toggle span:nth-child(3) {
    top: 27px;
  }

  .nv__links {
    max-height: calc(100vh - 68px);
    max-height: calc(100dvh - 68px);
  }
}

@media (max-width: 360px) {
  .nv__name,
  .nv--scrolled .nv__name {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nv,
  .nv * {
    transition: none !important;
  }
}
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#about") {
      setTimeout(() => {
        const aboutSection = document.getElementById("about");

        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [location.pathname, location.hash]);

  
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1025px)");
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const handleNavigation = (event, path) => {
    event.preventDefault();
    setOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLinkActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        className={`nv${isScrolled ? " nv--scrolled" : ""}${
          open ? " nv--open" : ""
        }`}
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <style>{css}</style>

        <div className="nv__bar">
       
          <a
            href="/"
            className="nv__brand"
            onClick={(event) => handleNavigation(event, "/")}
          >
            <span className="nv__logo">
              <img src={logo} alt="Blanco Educational Academy" />
            </span>
            <span className="nv__name">Blanco Educational Academy</span>
          </a>

       
          <button
            type="button"
            className="nv__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nv-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

         
          <div id="nv-menu" className="nv__links">
            {navigationLinks.map((link) => {
              const active = isLinkActive(link.path);

              return (
                <div key={link.name} className="nv__item">
                  <a
                    href={link.path}
                    className={`nv__link${active ? " nv__link--active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={(event) => handleNavigation(event, link.path)}
                  >
                    {link.name}
                  </a>

                  {active && (
                    <motion.span
                      layoutId="active-navbar-line"
                      className="nv__line"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}

            <a
              href="/donate"
              className="nv__donate"
              onClick={(event) => handleNavigation(event, "/donate")}
            >
              <span className="nv__heart" aria-hidden="true">
                ♡
              </span>
              Donate Now
            </a>
          </div>
        </div>
      </motion.nav>

     
      {open && (
        <div
          className="nv__backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;