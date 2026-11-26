import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import api from "../../utils/api";
import ImageField from "../../Components/admin/ImageField";

const empty = { title: "", category: "", icon: "🎒", description: "", target: "", raised: "", donors: "", students: "", daysLeft: "30", image: "", imagePublicId: "", isActive: true, isArchived: false, scheduledAt: "", endsAt: "" };

const toLocalDateTime = (value) => value ? new Date(value).toLocaleString("sv-SE").replace(" ", "T").slice(0, 16) : "";

const AdminCampaigns = () => {
  const [items, setItems] = useState([]);
  const [campaignFilter, setCampaignFilter] = useState("active");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/api/campaigns/all");
      setItems(data.data);
      setLoadError("");
    } catch (e) {
      console.error(e);
      setLoadError(e.response?.data?.message || "Could not load campaigns. Refresh and try again.");
    }
  };
  // This effect starts an asynchronous request; state updates happen after the API responds.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditItem(null); setShowModal(true); };
  const openEdit = (item) => { setForm({ ...item, scheduledAt: toLocalDateTime(item.scheduledAt), endsAt: toLocalDateTime(item.endsAt), isArchived: Boolean(item.isArchived) }); setEditItem(item); setShowModal(true); };
  const close = () => { setShowModal(false); setMsg(""); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...form, target: Number(form.target), raised: Number(form.raised || 0), donors: Number(form.donors || 0), students: Number(form.students || 0), daysLeft: Number(form.daysLeft || 30), scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null, endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : null };
      if (editItem) { await api.put(`/api/campaigns/${editItem._id}`, payload); setMsg("Updated!"); }
      else { await api.post("/api/campaigns", payload); setMsg("Created!"); }
      await load(); setTimeout(close, 1000);
    } catch (e) { setMsg(e.response?.data?.message || "Error"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    await api.delete(`/api/campaigns/${id}`); load();
  };

  const s = {
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
    title: { margin: 0, color: "#06275B", fontSize: "22px", fontWeight: "800" },
    addBtn: { padding: "11px 20px", background: "linear-gradient(135deg, #06275B, #2E7D32)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
    filters: { display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", marginRight: "12px" },
    filterBtn: (selected) => ({ padding: "9px 13px", border: `1px solid ${selected ? "#06275B" : "#DCE5F0"}`, borderRadius: "9px", color: selected ? "#fff" : "#38516F", background: selected ? "#06275B" : "#fff", fontWeight: "700", cursor: "pointer", fontSize: "12px" }),
    table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 28px rgba(6,39,91,0.07)" },
    th: { padding: "14px 16px", background: "#F4F7FC", color: "#5A6F88", fontSize: "11px", fontWeight: "800", textAlign: "left", borderBottom: "1px solid #E4EBF4" },
    td: { padding: "14px 16px", borderBottom: "1px solid #F0F4F9", color: "#1E3A5A", fontSize: "13px" },
    badge: (active) => ({ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", background: active ? "rgba(46,125,50,0.12)" : "rgba(239,68,68,0.1)", color: active ? "#2E7D32" : "#DC2626" }),
    editBtn: { padding: "6px 12px", background: "#EEF3F9", border: "1px solid #DCE5F0", borderRadius: "7px", color: "#06275B", cursor: "pointer", fontWeight: "700", fontSize: "12px", marginRight: "6px" },
    delBtn: { padding: "6px 12px", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "7px", color: "#DC2626", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
    overlay: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,20,48,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    modal: { background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    modalTitle: { margin: 0, color: "#06275B", fontSize: "20px", fontWeight: "800" },
    closeBtn: { width: "34px", height: "34px", borderRadius: "50%", background: "#EEF3F9", border: "none", cursor: "pointer", fontSize: "16px" },
    field: { marginBottom: "14px" },
    label: { display: "block", marginBottom: "6px", color: "#17325B", fontSize: "12px", fontWeight: "700" },
    input: { width: "100%", padding: "12px 14px", background: "#F7F9FC", border: "1.5px solid #DCE4EF", borderRadius: "9px", color: "#17325B", fontSize: "13px", outline: "none", boxSizing: "border-box" },
    submitBtn: { width: "100%", padding: "14px", background: "linear-gradient(135deg, #06275B, #2E7D32)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer", fontSize: "14px" },
    success: { marginBottom: "12px", padding: "10px 14px", background: "rgba(46,125,50,0.1)", borderRadius: "8px", color: "#2E7D32", fontSize: "13px" },
  };

  const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
  const campaignStatus = (item) => {
    if (item.isArchived) return "Past · archived";
    if (!item.isActive) return "Hidden";
    if (item.scheduledAt && new Date(item.scheduledAt) > new Date()) return "Scheduled";
    if (item.endsAt && new Date(item.endsAt) < new Date()) return "Past · ended";
    return "Active";
  };
  const activeItems = items.filter((item) => campaignStatus(item) === "Active");
  const visibleItems = campaignFilter === "active" ? activeItems : items;

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.title}>🎒 Campaigns</h1>
        <div style={s.filters} role="group" aria-label="Filter campaigns">
          <button type="button" style={s.filterBtn(campaignFilter === "active")} aria-pressed={campaignFilter === "active"} onClick={() => setCampaignFilter("active")}>
            Active ({activeItems.length})
          </button>
          <button type="button" style={s.filterBtn(campaignFilter === "all")} aria-pressed={campaignFilter === "all"} onClick={() => setCampaignFilter("all")}>
            All ({items.length})
          </button>
        </div>
        <button style={s.addBtn} onClick={openCreate}>+ Add Campaign</button>
      </div>
      {loadError && <p role="alert" style={{ color: "#B91C1C", padding: "10px 12px", background: "#FEF2F2", borderRadius: 8 }}>{loadError}</p>}
      <table style={s.table}>
        <thead><tr>{["Title", "Category", "Target", "Raised", "Days Left", "Status", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {visibleItems.map((item) => (
            <tr key={item._id}>
              <td style={s.td}><strong>{item.icon} {item.title}</strong></td>
              <td style={s.td}>{item.category}</td>
              <td style={s.td}>{fmt(item.target)}</td>
              <td style={s.td}>{fmt(item.raised)}</td>
              <td style={s.td}>{item.daysLeft}d</td>
              <td style={s.td}><span style={s.badge(campaignStatus(item) === "Active" || campaignStatus(item) === "Scheduled")}>{campaignStatus(item)}</span></td>
              <td style={s.td}>
                <button style={s.editBtn} onClick={() => openEdit(item)}>Edit</button>
                <button style={s.delBtn} onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {visibleItems.length === 0 && <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#8A9BB0", padding: "40px" }}>{campaignFilter === "active" && items.length > 0 ? "No active campaigns. Switch to All to review other campaigns." : "No campaigns yet."}</td></tr>}
        </tbody>
      </table>

      <AnimatePresence>
        {showModal && (
          <motion.div style={s.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={s.modal} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div style={s.modalHeader}>
                <h2 style={s.modalTitle}>{editItem ? "Edit Campaign" : "Add Campaign"}</h2>
                <button style={s.closeBtn} onClick={close}>✕</button>
              </div>
              {msg && <div style={s.success}>{msg}</div>}
              <form onSubmit={handleSubmit}>
                {[["Title", "title"], ["Category", "category"], ["Icon (emoji)", "icon"], ["Image URL", "image"]].map(([label, key]) => (
                  <div key={key} style={s.field}>
                    <label style={s.label}>{label}</label>
                    {key === "image" ? <ImageField value={form.image} onUploading={setUploadingImage} onChange={(image, imagePublicId) => setForm({ ...form, image, imagePublicId })} inputStyle={s.input} label={label} /> : <input style={s.input} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={["title","category"].includes(key)} />}
                  </div>
                ))}
                <div style={s.field}>
                  <label style={s.label}>Description</label>
                  <textarea style={{ ...s.input, height: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[["Schedule campaign start", "scheduledAt"], ["Campaign end date", "endsAt"]].map(([label, key]) => <div key={key} style={s.field}>
                    <label style={s.label}>{label}</label>
                    <input style={s.input} type="datetime-local" value={form[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                  </div>)}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {[["Target (₹)", "target"], ["Raised (₹)", "raised"], ["Donors", "donors"], ["Students", "students"], ["Days Left", "daysLeft"]].map(([label, key]) => (
                    <div key={key} style={s.field}>
                      <label style={s.label}>{label}</label>
                      <input style={s.input} type="number" min="0" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={key === "target"} />
                    </div>
                  ))}
                </div>
                <div style={s.field}>
                  <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px" }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                    Active (visible on public site)
                  </label>
                  <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px", marginTop: 10 }}>
                    <input type="checkbox" checked={form.isArchived} onChange={e => setForm({ ...form, isArchived: e.target.checked })} />
                    Move to campaign history (keeps it editable here)
                  </label>
                </div>
                <button style={s.submitBtn} type="submit" disabled={loading || uploadingImage}>{uploadingImage ? "Uploading image…" : loading ? "Saving..." : editItem ? "Update Campaign" : "Create Campaign"}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCampaigns;
