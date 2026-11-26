import { useState, useEffect } from "react";
import api from "../../utils/api";

const AdminDonations = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});

  const load = async () => {
    try {
      const [d, s] = await Promise.all([api.get("/api/donations"), api.get("/api/donations/stats")]);
      setItems(d.data.data);
      setStats(s.data.data);
    } catch (e) { console.error(e); }
  };

  // This effect starts an asynchronous request; state updates happen after the API responds.

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const updateStatus = async (item, status) => {
    try { await api.patch(`/api/donations/${item._id}/status`, { status }); await load(); }
    catch (error) { window.alert(error.response?.data?.message || "Could not update donation."); }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete the donation from ${item.donorName}?`)) return;
    try { await api.delete(`/api/donations/${item._id}`); await load(); }
    catch (error) { window.alert(error.response?.data?.message || "Could not delete donation."); }
  };

  const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

  const s = {
    title: { margin: "0 0 24px", color: "#06275B", fontSize: "22px", fontWeight: "800" },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px", marginBottom: "24px" },
    stat: { background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #E2EAF4", boxShadow: "0 6px 20px rgba(6,39,91,0.07)" },
    statVal: { color: "#06275B", fontSize: "26px", fontWeight: "900", marginBottom: "4px" },
    statLabel: { color: "#8A9BB0", fontSize: "13px" },
    table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 28px rgba(6,39,91,0.07)" },
    th: { padding: "14px 16px", background: "#F4F7FC", color: "#5A6F88", fontSize: "11px", fontWeight: "800", textAlign: "left", borderBottom: "1px solid #E4EBF4" },
    td: { padding: "13px 16px", borderBottom: "1px solid #F0F4F9", color: "#1E3A5A", fontSize: "13px" },
    badge: (st) => ({
      padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700",
      background: st === "completed" ? "rgba(46,125,50,0.12)" : st === "pending" ? "rgba(234,179,8,0.12)" : "rgba(239,68,68,0.1)",
      color: st === "completed" ? "#2E7D32" : st === "pending" ? "#B45309" : "#DC2626",
    }),
  };

  return (
    <div>
      <h1 style={s.title}>💰 Donations</h1>
      <div style={s.statsRow}>
        <div style={s.stat}><div style={s.statVal}>{stats.totalDonations || 0}</div><div style={s.statLabel}>Total Donations</div></div>
        <div style={s.stat}><div style={s.statVal}>{fmt(stats.totalAmount)}</div><div style={s.statLabel}>Total Raised</div></div>
        <div style={s.stat}><div style={s.statVal}>{fmt(stats.monthlyAmount)}</div><div style={s.statLabel}>This Month</div></div>
      </div>
      <table style={s.table}>
        <thead><tr>{["Donor", "Email", "Amount", "Campaign", "Method", "Status", "Date", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td style={s.td}><strong>{item.donorName}</strong></td>
              <td style={s.td}>{item.email}</td>
              <td style={{ ...s.td, color: "#2E7D32", fontWeight: "800" }}>{fmt(item.amount)}</td>
              <td style={s.td}>{item.campaignTitle || "General"}</td>
              <td style={s.td}>{item.method}</td>
              <td style={s.td}><span style={s.badge(item.status)}>{item.status}</span></td>
              <td style={s.td}>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td style={s.td}>
                {item.status !== "completed" && <button onClick={() => updateStatus(item, "completed")} style={{ marginRight: 6 }}>Confirm</button>}
                {item.status === "completed" && <button onClick={() => updateStatus(item, "pending")} style={{ marginRight: 6 }}>Mark pending</button>}
                <button onClick={() => remove(item)} style={{ color: "#B91C1C" }}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#8A9BB0", padding: "40px" }}>No donations yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDonations;
