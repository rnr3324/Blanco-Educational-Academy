import { useState, useEffect } from "react";
import api from "../../utils/api";

const statusColors = {
  pending: { bg: "rgba(234,179,8,0.12)", color: "#B45309" },
  approved: { bg: "rgba(46,125,50,0.12)", color: "#2E7D32" },
  rejected: { bg: "rgba(239,68,68,0.1)", color: "#DC2626" },
};

const AdminApplications = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try { const { data } = await api.get("/api/applications"); setItems(data.data); } catch (e) { console.error(e); }
  };
  // This effect starts an asynchronous request; state updates happen after the API responds.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/api/applications/${id}/status`, { status }); load();
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete application?")) return;
    await api.delete(`/api/applications/${id}`); load(); if (selected?._id === id) setSelected(null);
  };

  const s = {
    header: { marginBottom: "24px" },
    title: { margin: 0, color: "#06275B", fontSize: "22px", fontWeight: "800" },
    layout: { display: "grid", gridTemplateColumns: selected ? "1fr 360px" : "1fr", gap: "18px" },
    table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 28px rgba(6,39,91,0.07)" },
    th: { padding: "14px 16px", background: "#F4F7FC", color: "#5A6F88", fontSize: "11px", fontWeight: "800", textAlign: "left", borderBottom: "1px solid #E4EBF4" },
    td: { padding: "13px 16px", borderBottom: "1px solid #F0F4F9", color: "#1E3A5A", fontSize: "13px", cursor: "pointer" },
    badge: (st) => ({ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", background: statusColors[st]?.bg, color: statusColors[st]?.color }),
    detail: { background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #E2EAF4", boxShadow: "0 8px 28px rgba(6,39,91,0.07)", position: "relative" },
    closeBtn: { position: "absolute", top: "12px", right: "12px", width: "28px", height: "28px", background: "#EEF3F9", border: "none", borderRadius: "50%", cursor: "pointer", fontSize: "13px" },
    detailTitle: { margin: "0 0 6px", color: "#06275B", fontSize: "17px", fontWeight: "800" },
    infoRow: { display: "flex", gap: "8px", marginBottom: "10px", fontSize: "13px" },
    infoLabel: { color: "#8A9BB0", minWidth: "80px", fontWeight: "700" },
    infoVal: { color: "#1E3A5A" },
    btnRow: { display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" },
    approveBtn: { flex: 1, padding: "9px", background: "rgba(46,125,50,0.08)", border: "1px solid rgba(46,125,50,0.2)", borderRadius: "8px", color: "#2E7D32", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
    rejectBtn: { flex: 1, padding: "9px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", color: "#DC2626", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
    deleteBtn: { flex: 1, padding: "9px", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", color: "#DC2626", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
  };

  return (
    <div>
      <div style={s.header}><h1 style={s.title}>📝 Program Applications</h1></div>
      <div style={s.layout}>
        <div>
          <table style={s.table}>
            <thead><tr>{["Student", "Email", "Age", "Program", "Status", "Date"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} onClick={() => setSelected(item)} style={{ background: selected?._id === item._id ? "#F0F6FF" : "transparent" }}>
                  <td style={s.td}><strong>{item.studentName}</strong></td>
                  <td style={s.td}>{item.email}</td>
                  <td style={s.td}>{item.age}</td>
                  <td style={s.td}>{item.programTitle || "—"}</td>
                  <td style={s.td}><span style={s.badge(item.status)}>{item.status}</span></td>
                  <td style={s.td}>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#8A9BB0", padding: "40px" }}>No applications yet.</td></tr>}
            </tbody>
          </table>
        </div>

        {selected && (
          <div style={s.detail}>
            <button style={s.closeBtn} onClick={() => setSelected(null)}>✕</button>
            <h2 style={s.detailTitle}>{selected.studentName}</h2>
            {[["Email", "email"], ["Phone", "phone"], ["Age", "age"], ["Location", "location"], ["Program", "programTitle"]].map(([l, k]) => selected[k] ? (
              <div key={k} style={s.infoRow}><span style={s.infoLabel}>{l}</span><span style={s.infoVal}>{selected[k]}</span></div>
            ) : null)}
            <div style={s.btnRow}>
              <button style={s.approveBtn} onClick={() => updateStatus(selected._id, "approved")}>✓ Approve</button>
              <button style={s.rejectBtn} onClick={() => updateStatus(selected._id, "rejected")}>✗ Reject</button>
              <button style={s.deleteBtn} onClick={() => handleDelete(selected._id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
