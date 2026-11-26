import logo from "../assets/blanco-logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Campaigns", href: "/campaigns" },
];

const programLinks = [
  { label: "Quality Education", href: "/programs#education" },
  { label: "Digital Learning", href: "/programs#digital" },
  { label: "Student Scholarships", href: "/programs#scholarships" },
  { label: "Career Guidance", href: "/programs#careers" },
];

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
  },
];

const icons = {
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </>
  ),
};

const css = `
.ft {
  --gold: #e4ad37;
  --text: #ced8e7;
  padding: 56px 6% 18px;
  background: #031c43;
  color: #ffffff;
}

.ft__grid {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
  gap: 40px;
  align-items: start;
}

/* ---------- Brand ---------- */
.ft__logo {
  display: block;
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
  object-fit: contain;
  background: #ffffff;
  border: 2px solid rgba(228, 173, 55, 0.7);
  border-radius: 50%;
}

.ft__about {
  max-width: 300px;
  margin: 0 0 22px;
  color: var(--text);
  font-size: 14px;
  line-height: 1.7;
}

.ft__social {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.ft__social a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 50%;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.ft__social a:hover {
  background: var(--gold);
  color: #031c43;
  transform: translateY(-3px);
}

.ft svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ---------- Columns ---------- */
.ft__title {
  margin: 0 0 18px;
  color: var(--gold);
  font-size: 17px;
  font-weight: 800;
}

.ft__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 11px;
}

.ft__list a {
  color: var(--text);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.25s ease, padding-left 0.25s ease;
}

.ft__list a:hover {
  color: var(--gold);
  padding-left: 4px;
}

/* ---------- Contact ---------- */
.ft__row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
  color: var(--text);
  font-size: 14px;
  line-height: 1.5;
}

.ft__row svg {
  flex: none;
  margin-top: 2px;
  color: var(--gold);
}

.ft__row a {
  color: var(--text);
  text-decoration: none;
  word-break: break-word;
  transition: color 0.25s ease;
}

.ft__row a:hover {
  color: var(--gold);
}

.ft__map {
  display: block;
  width: 100%;
  height: 130px;
  margin-top: 6px;
  border: 0;
  border-radius: 12px;
}

/* ---------- Bottom bar ---------- */
.ft__bottom {
  max-width: 1200px;
  margin: 40px auto 0;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 20px;
  color: #aab8cb;
  font-size: 13px;
  line-height: 1.5;
}

.ft__bottom a {
  color: var(--gold);
  font-weight: 700;
  text-decoration: none;
  transition: color 0.25s ease;
}

.ft__bottom a:hover {
  color: #ffffff;
}

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .ft__grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px 28px;
  }
}

@media (max-width: 560px) {
  .ft {
    padding: 44px 6% 16px;
  }

  .ft__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
`;

const Footer = () => (
  <footer className="ft">
    <style>{css}</style>

    <div className="ft__grid">
      <div>
        <img className="ft__logo" src={logo} alt="Blanco Educational Academy" />
        <p className="ft__about">
          Educating, empowering and elevating students for a brighter and more
          independent future.
        </p>
        <div className="ft__social">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      <nav aria-label="Quick links">
        <h3 className="ft__title">Quick Links</h3>
        <ul className="ft__list">
          {quickLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Our programs">
        <h3 className="ft__title">Our Programs</h3>
        <ul className="ft__list">
          {programLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h3 className="ft__title">Contact Us</h3>

        <div className="ft__row">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons.pin}
          </svg>
          <span>St. George's School, Hyderabad, Telangana</span>
        </div>

        <div className="ft__row">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons.phone}
          </svg>
          <a href="tel:+917989191692">+91 79891 91692</a>
        </div>

        <div className="ft__row">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons.mail}
          </svg>
          <a href="mailto:blancoeducationalacademy@gmail.com">
            blancoeducationalacademy@gmail.com
          </a>
        </div>

        <iframe
          className="ft__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.771002382384!2d78.5474816749344!3d17.374748783510253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98db4234b68f%3A0x96e167f037081150!2sSt.%20George's%20School!5e0!3m2!1sen!2sin!4v1793007990861!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="St. George's School Location"
        />
      </div>
    </div>

    <div className="ft__bottom">
      <span>© 2026 Blanco Educational Academy NGO. All rights reserved.</span>
      <span>
        Developed by{" "}
        <a href="https://jbninnotech.com/" target="_blank" rel="noreferrer">
           JBN Innotech Pvt Ltd
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;