import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import FounderSection from "../home/FounderSection";


<FounderSection />
const directorPhotos = [
  "https://res.cloudinary.com/nemhlaod/image/upload/v1793688706/7edff8a2-ba19-4181-acda-f0854b89407e.png",
  "https://res.cloudinary.com/nemhlaod/image/upload/v1793688086/a738a4a7-902c-4a8a-a12e-3b2818da6299.png"
];



const Mission = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Automatic back-to-back photo flip timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % directorPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const values = [
    {
      icon: "⚖️",
      title: "Equal Opportunity",
      description:
        "Every student deserves access to education regardless of financial or social background.",
    },
    {
      icon: "🤝",
      title: "Compassion",
      description:
        "We serve students and communities with empathy, respect and responsibility.",
    },
    {
      icon: "🔍",
      title: "Transparency",
      description:
        "We maintain clarity and accountability in our programs, resources and impact.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We use practical, digital and creative approaches to make education engaging.",
    },
  ];

  const focusAreas = [
    "Institutional Development & Strategic Planning",
    "Educational Innovation & Digital Transformation",
    "Student Development & Academic Excellence",
    "School Growth & Community Engagement",
  ];

  const styles = {
    section: {
      padding: "105px 6%",
     background: "linear-gradient(180deg, #FFFFFF 0%, #F6F1E8 100%)",
    },

    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "auto",
    },

    storyGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
      alignItems: "start",
      gap: "65px",
      marginBottom: "100px",
    },

    imageWrapper: {
      position: "relative",
      padding: "12px",
      border: "3px solid #D6A12D",
      borderRadius: "26px",
      overflow: "hidden",
      backgroundColor: "#F7FAFE",
    },

    imageContainer: {
      position: "relative",
      width: "100%",
      height: "480px",
      borderRadius: "18px",
      overflow: "hidden",
    },

    image: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "18px",
    },

    dotsContainer: {
      position: "absolute",
      bottom: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
      zIndex: 5,
    },

    dot: (isActive) => ({
      width: isActive ? "24px" : "8px",
      height: "8px",
      borderRadius: "4px",
      backgroundColor: isActive ? "#D6A12D" : "rgba(255, 255, 255, 0.6)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }),

    /* Style for the card below flip image */
    directorCaptionCard: {
      marginTop: "20px",
      padding: "20px 24px",
      backgroundColor: "#06275B",
      borderRadius: "18px",
      color: "#FFFFFF",
      boxShadow: "0 12px 30px rgba(6,39,91,0.15)",
      borderLeft: "5px solid #D6A12D",
    },

    directorNameBelow: {
      margin: "0 0 4px",
      fontSize: "22px",
      fontWeight: "800",
      color: "#FFFFFF",
    },

    directorSubBelow: {
      margin: 0,
      fontSize: "14px",
      fontWeight: "600",
      color: "#F1C25B",
      lineHeight: "1.6",
    },

    directorLocBelow: {
      margin: "4px 0 0",
      fontSize: "13px",
      color: "#CCD8E7",
    },

    badge: {
      display: "inline-block",
      marginBottom: "12px",
      color: "#2E7D32",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "1.8px",
      textTransform: "uppercase",
    },

    title: {
      margin: "0 0 16px",
      color: "#06275B",
      fontSize: "clamp(32px, 5vw, 44px)",
      lineHeight: "1.17",
      fontWeight: "800",
    },

    paragraph: {
      margin: "0 0 16px",
      color: "#68778B",
      fontSize: "15.5px",
      lineHeight: "1.85",
    },

    quoteCard: {
      margin: "24px 0",
      padding: "20px 24px",
      backgroundColor: "#F7FAFE",
      borderLeft: "4px solid #D6A12D",
      borderRadius: "0 14px 14px 0",
    },

    quoteLabel: {
      margin: "0 0 6px",
      color: "#2E7D32",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "1px",
    },

    quoteText: {
      margin: 0,
      color: "#06275B",
      fontSize: "15px",
      fontStyle: "italic",
      lineHeight: "1.7",
    },

    focusTitle: {
      margin: "24px 0 12px",
      color: "#06275B",
      fontSize: "17px",
      fontWeight: "800",
    },

    focusList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "10px",
      marginBottom: "24px",
    },

    focusItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#68778B",
      fontSize: "14px",
      padding: "8px 12px",
      backgroundColor: "#F7FAFE",
      borderRadius: "8px",
      border: "1px solid #E1E9F2",
    },

    missionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
      marginBottom: "100px",
    },

    missionCard: {
      position: "relative",
      padding: "38px",
      overflow: "hidden",
      color: "#FFFFFF",
      background: "linear-gradient(145deg, #06275B, #031B42 65%, #123F2A)",
      borderRadius: "22px",
      boxShadow: "0 22px 55px rgba(6,39,91,0.20)",
    },

    missionIcon: {
      width: "65px",
      height: "65px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "23px",
      color: "#06275B",
      background: "linear-gradient(135deg, #F1C25B, #C98A13)",
      borderRadius: "18px",
      fontSize: "29px",
    },

    cardTitle: {
      margin: "0 0 14px",
      color: "#FFFFFF",
      fontSize: "26px",
      fontWeight: "800",
    },

    cardText: {
      margin: 0,
      color: "#CCD8E7",
      fontSize: "15px",
      lineHeight: "1.8",
    },

    headingArea: {
      marginBottom: "48px",
      textAlign: "center",
    },

    headingBadge: {
      margin: "0 0 11px",
      color: "#2E7D32",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "1.8px",
    },

    headingTitle: {
      margin: "0 0 14px",
      color: "#06275B",
      fontSize: "clamp(32px, 5vw, 47px)",
      fontWeight: "800",
    },

    headingText: {
      maxWidth: "680px",
      margin: "auto",
      color: "#68778B",
      lineHeight: "1.8",
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "23px",
    },

    valueCard: {
      padding: "31px 25px",
      textAlign: "center",
      background: "linear-gradient(145deg, #F7FAFE, #FFFFFF)",
      border: "1px solid #E1E9F2",
      borderRadius: "18px",
      boxShadow: "0 15px 40px rgba(6,39,91,0.08)",
    },

    valueIcon: {
      width: "63px",
      height: "63px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 19px",
      background: "linear-gradient(135deg, #EAF2FA, #E9F5E8)",
      borderRadius: "17px",
      fontSize: "28px",
    },

    valueTitle: {
      margin: "0 0 10px",
      color: "#06275B",
      fontSize: "18px",
      fontWeight: "700",
    },

    valueDescription: {
      margin: 0,
      color: "#68778B",
      fontSize: "14px",
      lineHeight: "1.7",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Director Profile & Our Story */}
        <div style={styles.storyGrid}>
          {/* Automatic Photo Flip Container + Director Info Below Image */}
          <motion.div
            initial={{ opacity: 0, x: -55 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={styles.imageWrapper}>
              <div style={styles.imageContainer}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhotoIndex}
                    src={directorPhotos[currentPhotoIndex]}
                    alt={`Mohammad Nayeem Photo ${currentPhotoIndex + 1}`}
                    style={styles.image}
                    initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Slider Indicator Dots */}
                <div style={styles.dotsContainer}>
                  {directorPhotos.map((_, idx) => (
                    <div
                      key={idx}
                      style={styles.dot(idx === currentPhotoIndex)}
                      onClick={() => setCurrentPhotoIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* DETAILS ADDED RIGHT BELOW THE FLIP IMAGE */}
            <motion.div
              style={styles.directorCaptionCard}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={styles.directorNameBelow}>Mohammad Nayeem</h3>
              <p style={styles.directorSubBelow}>
                B.Tech | Director, Blanco Educational Trust
              </p>
              <p style={styles.directorLocBelow}>📍 Kothapet, Hyderabad</p>
            </motion.div>
          </motion.div>

          {/* Director Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 55 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={styles.badge}>DIRECTOR'S PROFILE</span>

            <h2 style={styles.title}>About the Director</h2>

            <p style={styles.paragraph}>
              Mohammad Nayeem serves as Director, bringing a forward-thinking approach, strategic vision, and a strong commitment to educational excellence and trust growth.
            </p>

            <p style={styles.paragraph}>
              With an academic background in engineering (B.Tech), he brings an analytical mindset, innovative thinking, and a modern perspective to institutional leadership. He believes that education goes beyond academic achievement to develop character, discipline, leadership, and confidence.
            </p>

        

            {/* Focus Areas List */}
            <p style={styles.focusTitle}>Areas of Focus</p>
            <div style={styles.focusList}>
              {focusAreas.map((area, index) => (
                <div key={index} style={styles.focusItem}>
                  <span style={{ color: "#C58A16" }}>✦</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>

            {/* Director's Message */}
            <div style={{ ...styles.quoteCard, borderLeftColor: "#2E7D32" }}>
              <p style={{ ...styles.quoteLabel, color: "#C58A16" }}>DIRECTOR'S MESSAGE</p>
              <p style={styles.quoteText}>
                “Education is not merely about preparing students for examinations; it is about preparing them for life. My commitment is to contribute towards building an institution that nurtures knowledge, character, confidence, and ambition.”
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mission and Vision Cards */}
        <div style={styles.missionGrid}>
          <motion.article
            style={styles.missionCard}
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              style={styles.missionIcon}
              whileHover={{
                rotate: 8,
                scale: 1.1,
              }}
            >
              🎯
            </motion.div>

            <h3 style={styles.cardTitle}>Our Mission</h3>

            <p style={styles.cardText}>
              To provide accessible, inclusive and practical educational support that empowers underserved students with knowledge, confidence and skills for a better future.
            </p>
          </motion.article>

          <motion.article
            style={styles.missionCard}
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              style={styles.missionIcon}
              whileHover={{
                rotate: -8,
                scale: 1.1,
              }}
            >
              👁️
            </motion.div>

            <h3 style={styles.cardTitle}>Our Vision</h3>

            <p style={styles.cardText}>
              A society where every child and young person has an equal opportunity to learn, grow and build an independent and meaningful life.
            </p>
          </motion.article>
        </div>

        {/* Values */}
        <div style={styles.headingArea}>
          <p style={styles.headingBadge}>OUR CORE VALUES</p>

          <h2 style={styles.headingTitle}>Principles that guide our work</h2>

          <p style={styles.headingText}>
            Our values shape how we support students, work with communities and use the resources entrusted to us.
          </p>
        </div>

        <div style={styles.valuesGrid}>
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              style={styles.valueCard}
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.94,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
              }}
              whileHover={{
                y: -10,
                scale: 1.025,
              }}
            >
              <motion.div
                style={styles.valueIcon}
                whileHover={{
                  rotate: 8,
                  scale: 1.12,
                }}
              >
                {value.icon}
              </motion.div>

              <h3 style={styles.valueTitle}>{value.title}</h3>

              <p style={styles.valueDescription}>{value.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;