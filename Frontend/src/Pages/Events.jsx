import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import api from "../utils/api";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registered, setRegistered] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/events")
      .then(({ data }) => setEvents(data.data.map((item) => ({ ...item, id: item._id, capacity: item.capacity ?? item.seats }))))
      .catch((error) => console.error("Could not load events", error));
  }, []);

  const visibleEvents = events.filter(
    (event) => event.type === activeTab
  );

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#F6F8FC",
    },

    hero: {
      position: "relative",
      minHeight: "480px",
      padding: "175px 6% 100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      textAlign: "center",
      background:
        "linear-gradient(135deg, #031B42 0%, #06275B 55%, #123F2A 100%)",
    },

    heroGlow: {
      position: "absolute",
      top: "-180px",
      right: "-100px",
      width: "450px",
      height: "450px",
      borderRadius: "50%",
      backgroundColor: "rgba(218,165,50,0.16)",
      filter: "blur(25px)",
    },

    heroGlowTwo: {
      position: "absolute",
      bottom: "-220px",
      left: "-150px",
      width: "470px",
      height: "470px",
      borderRadius: "50%",
      backgroundColor: "rgba(46,125,50,0.20)",
      filter: "blur(30px)",
    },

    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "800px",
    },

    badge: {
      display: "inline-block",
      marginBottom: "20px",
      padding: "9px 18px",
      color: "#F1C25B",
      backgroundColor: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(241,194,91,0.38)",
      borderRadius: "30px",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "1.8px",
    },

    heroTitle: {
      margin: "0 0 20px",
      color: "#FFFFFF",
      fontSize: "clamp(42px, 6vw, 68px)",
      lineHeight: "1.1",
    },

    goldText: {
      color: "#E0AA34",
    },

    heroText: {
      maxWidth: "700px",
      margin: "auto",
      color: "#CFDBEA",
      fontSize: "18px",
      lineHeight: "1.8",
    },

    section: {
      padding: "90px 6% 110px",
    },

    container: {
      width: "100%",
      maxWidth: "1250px",
      margin: "auto",
    },

    headingArea: {
      marginBottom: "45px",
      textAlign: "center",
    },

    smallTitle: {
      margin: "0 0 12px",
      color: "#2E7D32",
      fontSize: "13px",
      fontWeight: "800",
      letterSpacing: "1.8px",
    },

    title: {
      margin: "0 0 14px",
      color: "#06275B",
      fontSize: "clamp(32px, 5vw, 48px)",
    },

    description: {
      maxWidth: "680px",
      margin: "auto",
      color: "#68778B",
      fontSize: "16px",
      lineHeight: "1.8",
    },

    tabs: {
      width: "fit-content",
      maxWidth: "100%",
      margin: "35px auto 50px",
      padding: "6px",
      display: "flex",
      gap: "6px",
      backgroundColor: "#E9EEF6",
      border: "1px solid #DCE5F0",
      borderRadius: "14px",
    },

    tabButton: {
      padding: "13px 25px",
      color: "#52647B",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "800",
      cursor: "pointer",
    },

    activeTab: {
      color: "#FFFFFF",
      background:
        "linear-gradient(135deg, #06275B, #124E82)",
      boxShadow: "0 9px 20px rgba(6,39,91,0.20)",
    },

    eventGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(310px, 1fr))",
      gap: "28px",
    },

    eventCard: {
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
      border: "1px solid #E1E8F2",
      borderRadius: "22px",
      boxShadow: "0 17px 45px rgba(6,39,91,0.10)",
    },

    imageContainer: {
      position: "relative",
      height: "235px",
      overflow: "hidden",
    },

    eventImage: {
      width: "100%",
      height: "100%",
      display: "block",
      objectFit: "cover",
    },

    imageOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, transparent 45%, rgba(3,27,66,0.82) 100%)",
    },

    category: {
      position: "absolute",
      top: "17px",
      left: "17px",
      padding: "7px 13px",
      color: "#06275B",
      backgroundColor: "rgba(255,255,255,0.94)",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "800",
    },

    eventIcon: {
      position: "absolute",
      right: "18px",
      bottom: "16px",
      width: "48px",
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: "14px",
      fontSize: "23px",
      boxShadow: "0 9px 22px rgba(0,0,0,0.18)",
    },

    content: {
      padding: "27px",
    },

    eventTitle: {
      margin: "0 0 13px",
      color: "#06275B",
      fontSize: "21px",
      lineHeight: "1.35",
    },

    eventDescription: {
      minHeight: "82px",
      margin: "0 0 21px",
      color: "#68778B",
      fontSize: "14px",
      lineHeight: "1.75",
    },

    infoGrid: {
      display: "grid",
      gap: "10px",
      marginBottom: "23px",
      padding: "17px",
      backgroundColor: "#F7F9FC",
      borderRadius: "12px",
    },

    infoRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      color: "#465A73",
      fontSize: "13px",
      lineHeight: "1.5",
    },

    infoIcon: {
      width: "20px",
      flexShrink: 0,
    },

    progressArea: {
      marginBottom: "22px",
    },

    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
      marginBottom: "8px",
      color: "#66768A",
      fontSize: "12px",
      fontWeight: "700",
    },

    progressTrack: {
      height: "8px",
      overflow: "hidden",
      backgroundColor: "#E3E9F1",
      borderRadius: "10px",
    },

    progressBar: {
      height: "100%",
      background:
        "linear-gradient(90deg, #2E7D32, #D6A12D)",
      borderRadius: "10px",
    },

    registerButton: {
      width: "100%",
      padding: "14px 20px",
      color: "#FFFFFF",
      background:
        "linear-gradient(135deg, #06275B, #124E82)",
      border: "none",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "800",
      cursor: "pointer",
    },

    completedBadge: {
      display: "block",
      padding: "13px",
      color: "#226C31",
      backgroundColor: "#EAF6EC",
      border: "1px solid #C7E5CC",
      borderRadius: "10px",
      textAlign: "center",
      fontSize: "13px",
      fontWeight: "800",
    },

    cta: {
      position: "relative",
      maxWidth: "1200px",
      margin: "0 auto 100px",
      padding: "70px 7%",
      overflow: "hidden",
      textAlign: "center",
      background:
        "linear-gradient(135deg, #1F6A31, #06275B 75%)",
      borderRadius: "28px",
      boxShadow: "0 25px 65px rgba(6,39,91,0.20)",
    },

    ctaTitle: {
      margin: "0 0 15px",
      color: "#FFFFFF",
      fontSize: "clamp(30px, 5vw, 48px)",
    },

    ctaText: {
      maxWidth: "650px",
      margin: "0 auto 28px",
      color: "#D4DFEC",
      lineHeight: "1.8",
    },

    ctaButton: {
      display: "inline-block",
      padding: "14px 26px",
      color: "#06275B",
      background:
        "linear-gradient(135deg, #F1C25B, #C98A13)",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "800",
    },

    overlay: {
      position: "fixed",
      inset: 0,
      zIndex: 2000,
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(3,20,48,0.78)",
      backdropFilter: "blur(8px)",
    },

    modal: {
      width: "100%",
      maxWidth: "520px",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "35px",
      backgroundColor: "#FFFFFF",
      borderRadius: "22px",
      boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
    },

    modalHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "20px",
      marginBottom: "25px",
    },

    modalTitle: {
      margin: "0 0 6px",
      color: "#06275B",
      fontSize: "25px",
    },

    modalEvent: {
      margin: 0,
      color: "#C58A16",
      fontSize: "14px",
      fontWeight: "700",
    },

    closeButton: {
      width: "36px",
      height: "36px",
      flexShrink: 0,
      color: "#06275B",
      backgroundColor: "#EDF2F8",
      border: "none",
      borderRadius: "50%",
      fontSize: "18px",
      cursor: "pointer",
    },

    form: {
      display: "grid",
      gap: "18px",
    },

    field: {
      display: "grid",
      gap: "7px",
    },

    label: {
      color: "#17325B",
      fontSize: "13px",
      fontWeight: "800",
    },

    input: {
      width: "100%",
      padding: "14px 15px",
      color: "#17325B",
      backgroundColor: "#F7F9FC",
      border: "1px solid #DCE4EF",
      borderRadius: "9px",
      outline: "none",
      fontSize: "14px",
    },

    modalButton: {
      width: "100%",
      padding: "15px",
      color: "#FFFFFF",
      background:
        "linear-gradient(135deg, #D7A12D, #AD710B)",
      border: "none",
      borderRadius: "10px",
      fontWeight: "800",
      cursor: "pointer",
    },

    success: {
      padding: "30px 15px",
      textAlign: "center",
    },

    successIcon: {
      width: "70px",
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 18px",
      color: "#FFFFFF",
      backgroundColor: "#2E7D32",
      borderRadius: "50%",
      fontSize: "32px",
    },
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setRegistered(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/api/event-registrations", {
        ...formData,
        eventId: selectedEvent._id,
        eventTitle: selectedEvent.title,
      });
      setRegistered(true);
    } catch (error) {
      window.alert(error.response?.data?.message || "Could not register for this event. Please try again.");
    }
  };

  return (
    <main style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <motion.div
          style={styles.heroGlow}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -35, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          style={styles.heroGlowTwo}
          animate={{
            scale: [1, 1.18, 1],
            y: [0, -35, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          style={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={styles.badge}>EVENTS & WORKSHOPS</span>

          <h1 style={styles.heroTitle}>
            Learn, connect and{" "}
            <span style={styles.goldText}>
              create an impact.
            </span>
          </h1>

          <p style={styles.heroText}>
            Participate in educational workshops, community drives,
            mentoring sessions and volunteer programs that help
            students build brighter futures.
          </p>
        </motion.div>
      </section>

      {/* Events */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.headingArea}>
            <p style={styles.smallTitle}>JOIN OUR INITIATIVES</p>

            <h2 style={styles.title}>
              Events that inspire change
            </h2>

            <p style={styles.description}>
              Explore our upcoming activities or view the impact
              created through our completed events.
            </p>
          </div>

          <div style={styles.tabs}>
            {[
              {
                value: "upcoming",
                label: "Upcoming Events",
              },
              {
                value: "past",
                label: "Completed Events",
              },
            ].map((tab) => (
              <motion.button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                style={{
                  ...styles.tabButton,
                  ...(activeTab === tab.value
                    ? styles.activeTab
                    : {}),
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            style={styles.eventGrid}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visibleEvents.map((event, index) => {
              const percentage =
                event.type === "upcoming"
                  ? Math.min(
                      (event.registered / event.capacity) * 100,
                      100
                    )
                  : 100;

              return (
                <motion.article
                  key={event.id}
                  style={styles.eventCard}
                  initial={{ opacity: 0, y: 55 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -12,
                    boxShadow:
                      "0 28px 65px rgba(6,39,91,0.17)",
                  }}
                >
                  <div style={styles.imageContainer}>
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      style={styles.eventImage}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />

                    <div style={styles.imageOverlay} />

                    <span style={styles.category}>
                      {event.category}
                    </span>

                    <motion.div
                      style={styles.eventIcon}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  <div style={styles.content}>
                    <h3 style={styles.eventTitle}>
                      {event.title}
                    </h3>

                    <p style={styles.eventDescription}>
                      {event.description}
                    </p>

                    <div style={styles.infoGrid}>
                      <div style={styles.infoRow}>
                        <span style={styles.infoIcon}>📅</span>
                        <span>{event.date}</span>
                      </div>

                      <div style={styles.infoRow}>
                        <span style={styles.infoIcon}>🕐</span>
                        <span>{event.time}</span>
                      </div>

                      <div style={styles.infoRow}>
                        <span style={styles.infoIcon}>📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.type === "upcoming" ? (
                      <>
                        <div style={styles.progressArea}>
                          <div style={styles.progressHeader}>
                            <span>
                              {event.registered} registered
                            </span>

                            <span>
                              {event.capacity} seats
                            </span>
                          </div>

                          <div style={styles.progressTrack}>
                            <motion.div
                              style={{
                                ...styles.progressBar,
                                width: `${percentage}%`,
                              }}
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${percentage}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.2,
                                delay: 0.2,
                              }}
                            />
                          </div>
                        </div>

                        <motion.button
                          type="button"
                          style={styles.registerButton}
                          onClick={() => handleRegister(event)}
                          whileHover={{
                            y: -4,
                            scale: 1.01,
                            background:
                              "linear-gradient(135deg, #2E7D32, #174A26)",
                          }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Register for Event →
                        </motion.button>
                      </>
                    ) : (
                      <span style={styles.completedBadge}>
                        ✓ {event.beneficiaries} people impacted
                      </span>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 6%" }}>
        <motion.div
          style={styles.cta}
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={styles.ctaTitle}>
            Want to support our next event?
          </h2>

          <p style={styles.ctaText}>
            Become a volunteer, sponsor educational materials or
            help us organise meaningful programs for students.
          </p>

          <motion.a
            href="/volunteer"
            style={styles.ctaButton}
            whileHover={{ y: -5, scale: 1.04 }}
          >
            Join as a Volunteer →
          </motion.a>
        </motion.div>
      </section>

      {/* Registration modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            style={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              style={styles.modal}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
            >
              {!registered ? (
                <>
                  <div style={styles.modalHeader}>
                    <div>
                      <h2 style={styles.modalTitle}>
                        Event Registration
                      </h2>

                      <p style={styles.modalEvent}>
                        {selectedEvent.title}
                      </p>
                    </div>

                    <button
                      type="button"
                      style={styles.closeButton}
                      onClick={() => setSelectedEvent(null)}
                    >
                      ×
                    </button>
                  </div>

                  <form
                    style={styles.form}
                    onSubmit={handleSubmit}
                  >
                    <div style={styles.field}>
                      <label style={styles.label} htmlFor="event-name">
                        Full Name *
                      </label>

                      <input
                        id="event-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label} htmlFor="event-email">
                        Email Address *
                      </label>

                      <input
                        id="event-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label} htmlFor="event-phone">
                        Phone Number *
                      </label>

                      <input
                        id="event-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label} htmlFor="event-role">
                        Registering As *
                      </label>

                      <select
                        id="event-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="student">Student</option>
                        <option value="parent">Parent/Guardian</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="teacher">Teacher</option>
                        <option value="supporter">Supporter</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      style={styles.modalButton}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Confirm Registration
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  style={styles.success}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div style={styles.successIcon}>✓</div>

                  <h2 style={styles.modalTitle}>
                    Registration Successful!
                  </h2>

                  <p style={{ color: "#68778B", lineHeight: "1.7" }}>
                    Thank you for registering for{" "}
                    <strong>{selectedEvent.title}</strong>. This is a
                    demo confirmation.
                  </p>

                  <motion.button
                    type="button"
                    style={styles.modalButton}
                    onClick={() => setSelectedEvent(null)}
                    whileHover={{ y: -3 }}
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Events;
