import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../context/useAuth";

const AdminSecurity = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", email: admin?.email || "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.newPassword !== form.confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }
    if (form.newPassword.length < 12) {
      setError("Use at least 12 characters for the new password.");
      return;
    }

    setSaving(true);
    try {
      await api.patch("/api/admin/credentials", {
        currentPassword: form.currentPassword,
        email: form.email,
        newPassword: form.newPassword,
      });
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not change the password.");
    } finally {
      setSaving(false);
    }
  };

  const input = { display: "block", width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid #DCE4EF", borderRadius: 8, marginTop: 6 };

  return <main style={{ maxWidth: 560, background: "#fff", padding: 26, borderRadius: 14, border: "1px solid #E2EAF4" }}>
    <h1 style={{ marginTop: 0, color: "#06275B" }}>Account Security</h1>
    <p style={{ color: "#64748B" }}>Update your administrator email and password. You will need to sign in again after saving.</p>
    <form onSubmit={submit}>
      <label style={{ display: "block", marginBottom: 16 }}>Current password<input style={input} type="password" autoComplete="current-password" value={form.currentPassword} required onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} /></label>
      <label style={{ display: "block", marginBottom: 16 }}>New login email<input style={input} type="email" autoComplete="username" value={form.email} required onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label style={{ display: "block", marginBottom: 16 }}>New password<input style={input} type="password" autoComplete="new-password" minLength={12} maxLength={128} value={form.newPassword} required onChange={(e) => setForm({ ...form, newPassword: e.target.value })} /></label>
      <label style={{ display: "block", marginBottom: 16 }}>Confirm new password<input style={input} type="password" autoComplete="new-password" minLength={12} maxLength={128} value={form.confirmPassword} required onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} /></label>
      {error && <p role="alert" style={{ color: "#B91C1C" }}>{error}</p>}
      <button disabled={saving} style={{ border: 0, borderRadius: 8, background: "#06275B", color: "white", fontWeight: 700, padding: "12px 18px", cursor: "pointer" }}>{saving ? "Saving…" : "Update password"}</button>
    </form>
  </main>;
};

export default AdminSecurity;
