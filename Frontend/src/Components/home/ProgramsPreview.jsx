import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

const programs = [
  {
    title: "Quality Education",
    tag: "Learning",
    eyebrow: "OUR PROGRAM",
    description:
      "Academic learning support, books and educational resources for students from underserved communities.",
    href: "/programs#education",
    image:
      "https://www.smilefoundationindia.org/blog/wp-content/uploads/2024/10/6-1.jpg",
    icon: (
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5v-15ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5v-15Z" />
    ),
  },
  {
    title: "Digital Learning",
    tag: "Skills",
    eyebrow: "OUR PROGRAM",
    description:
      "Computer education, digital literacy, online safety and practical technology skills for students.",
    href: "/programs#digital",
    image:
      "https://res.cloudinary.com/yozeshlg/image/upload/v1793091626/WhatsApp_Image_2026-10-26_at_11.44.26_AM.jpg",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    title: "Student Scholarships",
    tag: "Support",
    eyebrow: "OUR PROGRAM",
    description:
      "Financial and academic support for deserving students who face challenges continuing their education.",
    href: "/programs#scholarships",
    image:
      "https://res.cloudinary.com/nemhlaod/image/upload/v1793690639/d3c591bb-7652-40ae-9ecd-258bd3ee1f58.png",
    icon: (
      <>
        <path d="m2 9 10-5 10 5-10 5L2 9Z" />
        <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
      </>
    ),
  },
  {
    title: "Career Guidance",
    tag: "Mentoring",
    eyebrow: "OUR PROGRAM",
    description:
      "Career mentoring, higher-education awareness and employability guidance for successful futures.",
    href: "/programs#careers",
    image:
      "https://res.cloudinary.com/nemhlaod/image/upload/v1793690065/d481bbeb-9871-48c4-99a5-ed5d7eb39d57.png",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
  },
];


const CARD_COUNT = 24; 
const STEP = 360 / CARD_COUNT;
const AUTO_SPEED = 6.5; 
const AUTO_SPEED_REDUCED = 2; 

const getConfig = () => {
  const w = window.innerWidth;
  if (w <= 480) return { radius: 560, cardW: 190, cardH: 310 };
  if (w <= 768) return { radius: 700, cardW: 210, cardH: 335 };
  return { radius: 920, cardW: 230, cardH: 365 };
};

const css = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap");

.pr,
.pr * {
  box-sizing: border-box;
}

.pr {
  --navy: #1f1b14;
  --gold: #f0cf83;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 32px 0 24px;
  color: #2a251c;
  background:
    radial-gradient(ellipse at 50% 22%, rgba(220, 190, 128, 0.22), transparent 46%),
    linear-gradient(180deg, #fcfaf5 0%, #f5f0e5 62%, #ece6d8 100%);
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  isolation: isolate;
}

.pr__inner {
  position: relative;
  z-index: 2;
  width: min(100% - 36px, 1240px);
  margin: 0 auto;
}

/* ---------- Heading ---------- */
.pr__lead {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 12px;
  color: #434447;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.9;
  letter-spacing: -0.2px;
  text-align: center;
}

/* ---------- 3D ring ---------- */
.pr__carousel {
  position: relative;
  width: 100%;
  height: 410px;
  margin: 0 auto;
  overflow: hidden;
  perspective: 1400px;
  perspective-origin: 50% 47%;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
}

.pr__ring {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  transform-style: preserve-3d;
}

.pr__card {
  position: absolute;
  top: 200px;
  left: 0;
  width: var(--card-w);
  height: var(--card-h);
  margin: calc(var(--card-h) / -2) 0 0 calc(var(--card-w) / -2);
  overflow: hidden;
  display: block;
  border: 1px solid rgba(225, 210, 180, 0.95);
  border-radius: 24px;
  background-color: #2b261e;
  background-image: var(--img);
  background-size: cover;
  background-position: center;
  color: #fff;
  text-decoration: none;
  box-shadow:
    0 20px 50px rgba(52, 45, 30, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  will-change: transform, opacity, filter;
}

.pr__card:focus-visible {
  outline: 3px solid #a57a35;
  outline-offset: 3px;
}

.pr__shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(16, 14, 8, 0.02) 15%,
    rgba(16, 14, 8, 0.06) 35%,
    rgba(14, 12, 8, 0.64) 68%,
    rgba(10, 8, 5, 0.95) 100%
  );
}

.pr__pill {
  position: absolute;
  top: 13px;
  left: 13px;
  z-index: 3;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 99px;
  background: rgba(255, 253, 246, 0.94);
  color: #2a251c;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
}

.pr__content {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  padding: 20px 17px 18px;
}

.pr__name {
  margin: 0 0 8px;
  color: #d0c49d;
  font-family: "Playfair Display", Georgia, serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 1.15;
}

.pr__more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  color: #efd18e;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.pr__glow {
  position: absolute;
  bottom: 12px;
  left: 50%;
  width: min(80%, 720px);
  height: 40px;
  border-radius: 50%;
  background: rgba(155, 122, 64, 0.14);
  filter: blur(28px);
  transform: translateX(-50%);
  pointer-events: none;
}

.pr__floor {
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: min(85%, 850px);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(180, 147, 85, 0.4), transparent);
  transform: translateX(-50%);
  pointer-events: none;
}

/* ---------- CTA ---------- */
.pr__cta-row {
  margin-top: 10px;
  text-align: center;
}

.pr__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 34px;
  border-radius: 999px;
  background: var(--navy);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 12px 26px rgba(31, 27, 20, 0.25);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.pr__cta:hover {
  background: #a57a35;
  transform: translateY(-2px);
}

.pr__cta:focus-visible {
  outline: 3px solid #a57a35;
  outline-offset: 3px;
}

/* ---------- Responsive ---------- */
/* Rule: carousel height = card height + 40, card top = carousel height / 2 */

@media (max-width: 1024px) {
  .pr__lead {
    font-size: 15.5px;
  }
}

@media (max-width: 768px) {
  .pr {
    padding: 28px 0 20px;
  }

  .pr__inner {
    width: min(100% - 28px, 1240px);
  }

  .pr__lead {
    font-size: 15px;
    line-height: 1.8;
  }

  .pr__carousel {
    height: 380px;
  }

  .pr__card {
    top: 190px;
    border-radius: 20px;
  }

  .pr__name {
    font-size: 22px;
  }

  .pr__cta {
    padding: 15px 30px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .pr {
    padding: 24px 0 18px;
  }

  .pr__lead {
    padding: 0 6px;
    font-size: 14px;
    line-height: 1.7;
  }

  /* smaller cards so neighbours don't overlap on phones */
  .pr__carousel {
    height: 270px;
  }

  .pr__card {
    --card-w: 140px;
    --card-h: 230px;
    top: 135px;
    border-radius: 18px;
  }

  .pr__pill {
    top: 10px;
    left: 10px;
    padding: 6px 10px;
    font-size: 10px;
  }

  .pr__content {
    padding: 14px 12px 12px;
  }

  .pr__name {
    margin-bottom: 6px;
    font-size: 17px;
  }

  .pr__more {
    margin-top: 10px;
    padding-top: 10px;
    font-size: 8.5px;
  }

  .pr__cta-row {
    margin-top: 6px;
  }

  .pr__cta {
    width: min(100%, 320px);
    justify-content: center;
    padding: 14px 24px;
    font-size: 15px;
  }
}

@media (max-width: 360px) {
  .pr__name {
    font-size: 15px;
  }
}
`;

const ProgramsPreview = () => {
  const reduce = useReducedMotion();
  const reduceRef = useRef(false);
  useEffect(() => {
    reduceRef.current = !!reduce;
  }, [reduce]);

  const carouselRef = useRef(null);
  const ringRef = useRef(null);

  const phase = useRef(0);
  const velocity = useRef(0);
  const pending = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const suppressClick = useRef(false);

  useEffect(() => {
    const ring = ringRef.current;
    const box = carouselRef.current;
    if (!ring || !box) return;

    const cards = Array.from(ring.querySelectorAll(".pr__card"));
    let visible = true;
    let raf;
    let last = performance.now();

    const render = () => {
      const { radius, cardW, cardH } = getConfig();
      box.style.setProperty("--card-w", `${cardW}px`);
      box.style.setProperty("--card-h", `${cardH}px`);

      cards.forEach((card, i) => {
        const angle = ((i * STEP + phase.current + 540) % 360) - 180;
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const depth = Math.max(0, (cos + 1) / 2);
        const off = Math.abs(angle) > 82;

        card.style.transform = `translate3d(${(-radius * sin).toFixed(2)}px, ${(
          (1 - cos) *
          20
        ).toFixed(2)}px, ${(radius * (cos - 1)).toFixed(
          2
        )}px) rotateY(${-angle}deg)`;
        card.style.opacity = off ? "0" : String(0.38 + depth * 0.62);
        card.style.zIndex = String(Math.round((cos + 1) * 100));
        card.style.filter = `brightness(${0.68 + depth * 0.32})`;
        card.style.pointerEvents = Math.abs(angle) < 65 ? "auto" : "none";
        card.style.visibility = off ? "hidden" : "visible";
      });
    };

    const tick = (now) => {
      const delta = Math.min((now - last) / 1000, 0.04);
      last = now;

      if (visible) {
        if (!dragging.current) {
          if (Math.abs(velocity.current) > 0.08) {
            // coast after a flick
            phase.current += velocity.current * delta * 60;
            velocity.current *= Math.pow(0.94, delta * 60);
          } else {
            // endless automatic rotation
            phase.current -=
              (reduceRef.current ? AUTO_SPEED_REDUCED : AUTO_SPEED) * delta;
          }
        }
        phase.current = ((phase.current % 360) + 360) % 360;
        render();
      }
      raf = requestAnimationFrame(tick);
    };

    // stop doing work while the section is off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        last = performance.now();
      },
      { threshold: 0 }
    );
    io.observe(box);

    render();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", render);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", render);
    };
  }, []);

  /* ----- drag / swipe (capture only starts after a real drag, so clicks still work) ----- */
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pending.current = true;
    dragging.current = false;
    startX.current = lastX.current = e.clientX;
    lastT.current = performance.now();
  };

  const onPointerMove = (e) => {
    if (!pending.current) return;
    const box = carouselRef.current;

    if (!dragging.current && Math.abs(e.clientX - startX.current) > 6) {
      dragging.current = true;
      velocity.current = 0;
      box?.setPointerCapture?.(e.pointerId);
      if (box) box.style.cursor = "grabbing";
    }
    if (!dragging.current) return;

    const now = performance.now();
    const dx = e.clientX - lastX.current;
    const dt = Math.max(now - lastT.current, 1);
    lastX.current = e.clientX;
    lastT.current = now;

    phase.current += dx * 0.42;
    velocity.current = Math.max(-2.5, Math.min(2.5, (dx / dt) * 0.7));
  };

  const endDrag = () => {
    pending.current = false;
    if (dragging.current) {
      dragging.current = false;
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 60);
    }
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="pr" aria-labelledby="pr-title">
      <style>{css}</style>

      <div className="pr__inner">
        <p className="pr__lead">
          Our programs give every student knowledge, confidence and practical
          skills to move toward a brighter, more independent future.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div
            ref={carouselRef}
            className="pr__carousel"
            aria-roledescription="carousel"
            aria-label="Our programs"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
          >
            {/* <div className="pr__hint">
              <span className="pr__dot" />
              Learning for every child · Drag to explore
            </div> */}

            <div className="pr__glow" />

            <div ref={ringRef} className="pr__ring">
              {Array.from({ length: CARD_COUNT }, (_, i) => {
                const p = programs[i % programs.length];
                const dup = i >= programs.length;
                return (
                  <a
                    key={i}
                    className="pr__card"
                    href={p.href}
                    draggable={false}
                    tabIndex={dup ? -1 : 0}
                    aria-hidden={dup || undefined}
                    style={{ "--img": `url(${p.image})` }}
                  >
                    <span className="pr__shade" />
                    <span className="pr__pill">{p.tag}</span>
                    <span className="pr__content">
                      {/* <span className="pr__eyebrow">{p.eyebrow}</span> */}
                      <h3 className="pr__name">{p.title}</h3>
                      {/* <p className="pr__text">{p.description}</p> */}
                      <span className="pr__more">
                        LEARN MORE <span aria-hidden="true">↗</span>
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="pr__floor" />
          </div>
        </motion.div>

        <div className="pr__cta-row">
          <a className="pr__cta" href="/programs">
            View all programs <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
