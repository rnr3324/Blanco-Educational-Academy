import { useEffect, useState } from "react";
import api from "../utils/api";

const ManagedSections = ({ page }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    api.get("/api/content", { params: { page } })
      .then(({ data }) => setSections(data.data.filter((section) => section.placement !== "hero")))
      .catch((error) => console.error(`Could not load ${page} content`, error));
  }, [page]);

  if (!sections.length) return null;

  return (
    <div>
      {sections.map((section, index) => (
        <section key={section._id} style={{ padding: "76px 6%", background: index % 2 ? "#F6F8FC" : "#fff" }}>
          <div style={{ maxWidth: 1180, margin: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "center", gap: 44 }}>
            <div style={{ order: index % 2 ? 2 : 1 }}>
              {section.eyebrow && <p style={{ color: "#2E7D32", fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>{section.eyebrow}</p>}
              <h2 style={{ color: "#06275B", fontSize: "clamp(28px, 4vw, 42px)", margin: "0 0 16px" }}>{section.title}</h2>
              <p style={{ color: "#68778B", fontSize: 16, lineHeight: 1.8, whiteSpace: "pre-line" }}>{section.body}</p>
              {section.buttonLabel && section.buttonUrl && <a href={section.buttonUrl} style={{ display: "inline-block", marginTop: 10, padding: "12px 20px", borderRadius: 9, textDecoration: "none", fontWeight: 800, color: "#fff", background: "linear-gradient(135deg, #06275B, #2E7D32)" }}>{section.buttonLabel}</a>}
            </div>
            {section.image && <img src={section.image} alt={section.title} style={{ order: index % 2 ? 1 : 2, width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 20, boxShadow: "0 20px 45px rgba(6,39,91,.14)" }} />}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ManagedSections;
