import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../context/useAuth";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #031B42 0%, #06275B 55%, #123F2A 100%)",
      padding: "20px",
    },
    glow1: {
      position: "fixed", top: "-200px", right: "-150px",
      width: "500px", height: "500px", borderRadius: "50%",
      background: "rgba(218,165,50,0.12)", filter: "blur(40px)", pointerEvents: "none",
    },
    glow2: {
      position: "fixed", bottom: "-200px", left: "-150px",
      width: "500px", height: "500px", borderRadius: "50%",
      background: "rgba(46,125,50,0.15)", filter: "blur(40px)", pointerEvents: "none",
    },
    card: {
      position: "relative", zIndex: 2,
      width: "100%", maxWidth: "440px",
      background: "rgba(255,255,255,0.97)",
      borderRadius: "24px",
      padding: "48px 44px",
      boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
    },
    logo: {
      textAlign: "center", marginBottom: "32px",
    },
    logoIcon: {
      width: "64px", height: "64px",
      borderRadius: "18px",
      background: "linear-gradient(135deg, #06275B, #2E7D32)",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 14px",
      fontSize: "28px",
    },
    logoTitle: { margin: "0 0 4px", color: "#06275B", fontSize: "22px", fontWeight: "800" },
    logoSub: { margin: 0, color: "#78899B", fontSize: "13px" },
    field: { marginBottom: "18px" },
    label: { display: "block", marginBottom: "8px", color: "#17325B", fontSize: "13px", fontWeight: "700" },
    input: {
      width: "100%", padding: "14px 15px",
      background: "#F7F9FC", border: "1.5px solid #DCE4EF",
      borderRadius: "10px", outline: "none",
      color: "#17325B", fontSize: "14px",
      boxSizing: "border-box",
    },
    error: {
      marginBottom: "16px", padding: "12px 16px",
      background: "#FEF2F2", border: "1px solid #FCA5A5",
      borderRadius: "10px", color: "#B91C1C", fontSize: "13px",
    },
    btn: {
      width: "100%", padding: "15px",
      background: "linear-gradient(135deg, #06275B, #2E7D32)",
      color: "#fff", border: "none",
      borderRadius: "10px", fontWeight: "800",
      fontSize: "15px", cursor: "pointer",
      marginTop: "6px",
    },
    hint: { textAlign: "center", marginTop: "20px", color: "#8A9BB0", fontSize: "12px" },
  };

  return (
    <div style={s.page}>
      <div style={s.glow1} />
      <div style={s.glow2} />
      <motion.div
        style={s.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={s.logo}>
          <div style={s.logoIcon}>🎓</div>
          <h1 style={s.logoTitle}>Blanco Academy</h1>
          <p style={s.logoSub}>Admin Panel — Secure Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label} htmlFor="admin-email">Email Address</label>
            <input
              style={s.input}
              id="admin-email"
              type="email"
              name="email"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck="false"
              placeholder="admin@blanco.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="admin-password">Password</label>
            <input
              style={s.input}
              id="admin-password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {error && <div style={s.error}>⚠️ {error}</div>}

          <motion.button
            style={s.btn}
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Signing in..." : "Sign In to Admin Panel"}
          </motion.button>
        </form>

        <p style={s.hint}>Sign in with the administrator account configured for this academy.</p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
