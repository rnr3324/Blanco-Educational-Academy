import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import api from "../../utils/api";

const StatCard = ({ icon, label, value, color, link }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(6,39,91,0.14)" }}
    style={{
      background: "#fff", borderRadius: "18px",
      padding: "26px", border: "1px solid #E2EAF4",
      boxShadow: "0 8px 28px rgba(6,39,91,0.07)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: color, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "22px",
      }}>{icon}</div>
      <Link to={link} style={{ color: "#06275B", fontSize: "11px", fontWeight: "700", textDecoration: "none" }}>
        View →
      </Link>
    </div>
    <div style={{ color: "#06275B", fontSize: "28px", fontWeight: "900", marginBottom: "4px" }}>
      {value ?? "—"}
    </div>
    <div style={{ color: "#8A9BB0", fontSize: "13px" }}>{label}</div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentVolunteers, setRecentVolunteers] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [prog, camp, evt, vol, cont, don, app] = await Promise.all([
          api.get("/api/programs/all"),
          api.get("/api/campaigns/all"),
          api.get("/api/events/all"),
          api.get("/api/volunteers"),
          api.get("/api/contacts"),
          api.get("/api/donations/stats"),
          api.get("/api/applications"),
        ]);
        setStats({
          programs: prog.data.count,
          campaigns: camp.data.count,
          events: evt.data.count,
          volunteers: vol.data.count,
          contacts: cont.data.count,
          totalAmount: don.data.data?.totalAmount || 0,
          applications: app.data.count,
        });
        setRecentVolunteers(vol.data.data?.slice(0, 5) || []);
        setRecentContacts(cont.data.data?.slice(0, 5) || []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const statCards = [
    { icon: "📚", label: "Programs", value: stats.programs, color: "rgba(6,39,91,0.1)", link: "/admin/programs" },
    { icon: "🎒", label: "Campaigns", value: stats.campaigns, color: "rgba(46,125,50,0.1)", link: "/admin/campaigns" },
    { icon: "📅", label: "Events", value: stats.events, color: "rgba(218,165,50,0.15)", link: "/admin/events" },
    { icon: "🤝", label: "Volunteers", value: stats.volunteers, color: "rgba(99,102,241,0.1)", link: "/admin/volunteers" },
    { icon: "✉️", label: "Contacts", value: stats.contacts, color: "rgba(236,72,153,0.1)", link: "/admin/contacts" },
    {
      icon: "💰", label: "Total Donations",
      value: stats.totalAmount ? `₹${Number(stats.totalAmount).toLocaleString("en-IN")}` : "₹0",
      color: "rgba(16,185,129,0.1)", link: "/admin/donations"
    },
    { icon: "📝", label: "Applications", value: stats.applications, color: "rgba(239,68,68,0.1)", link: "/admin/applications" },
  ];

  const s = {
    heading: { margin: "0 0 6px", color: "#06275B", fontSize: "26px", fontWeight: "800" },
    sub: { margin: "0 0 32px", color: "#8A9BB0", fontSize: "14px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "18px", marginBottom: "36px" },
    panel: { background: "#fff", borderRadius: "18px", padding: "24px", border: "1px solid #E2EAF4", boxShadow: "0 8px 28px rgba(6,39,91,0.07)" },
    panelTitle: { margin: "0 0 18px", color: "#06275B", fontSize: "16px", fontWeight: "800" },
    row: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F0F4F9" },
    name: { color: "#1E3A5A", fontSize: "14px", fontWeight: "600" },
    badge: (status) => ({
      padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700",
      background: status === "pending" ? "rgba(234,179,8,0.15)" : status === "approved" ? "rgba(46,125,50,0.12)" : "rgba(239,68,68,0.12)",
      color: status === "pending" ? "#B45309" : status === "approved" ? "#2E7D32" : "#DC2626",
    }),
    two: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" },
  };

  return (
    <div>
      <h1 style={s.heading} className="admin-dashboard-heading">Dashboard</h1>
      <p style={s.sub}>Overview of your academy's activity</p>

      <div style={s.grid}>
        {statCards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      <div style={s.two} className="admin-dashboard-two-column">
        <div style={s.panel}>
          <h2 style={s.panelTitle}>Recent Volunteers</h2>
          {recentVolunteers.length === 0 && <p style={{ color: "#8A9BB0", fontSize: "13px" }}>No volunteers yet.</p>}
          {recentVolunteers.map((v) => (
            <div key={v._id} style={s.row}>
              <div>
                <div style={s.name}>{v.name}</div>
                <div style={{ color: "#8A9BB0", fontSize: "12px" }}>{v.email}</div>
              </div>
              <span style={s.badge(v.status)}>{v.status}</span>
            </div>
          ))}
        </div>

        <div style={s.panel}>
          <h2 style={s.panelTitle}>Recent Contacts</h2>
          {recentContacts.length === 0 && <p style={{ color: "#8A9BB0", fontSize: "13px" }}>No messages yet.</p>}
          {recentContacts.map((c) => (
            <div key={c._id} style={s.row}>
              <div>
                <div style={s.name}>{c.name}</div>
                <div style={{ color: "#8A9BB0", fontSize: "12px" }}>{c.subject || "No subject"}</div>
              </div>
              <span style={s.badge(c.status === "new" ? "pending" : "approved")}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
