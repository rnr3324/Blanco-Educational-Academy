import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import api from "../../utils/api";
import ImageField from "../../Components/admin/ImageField";

const emptyForm = {
  title: "", category: "", icon: "📚", description: "",
  ageGroup: "", duration: "", mode: "", schedule: "",
  seats: "", enrolled: "", image: "", imagePublicId: "", features: "",
  isActive: true,
};

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [programFilter, setProgramFilter] = useState("active");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/api/programs/all");
      setPrograms(data.data);
    } catch (e) { console.error(e); }
  };

  // This effect starts an asynchronous request; state updates happen after the API responds.

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const visiblePrograms = programFilter === "active"
    ? programs.filter((program) => program.isActive)
    : programs;

  const openCreate = () => { setForm(emptyForm); setEditItem(null); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ ...p, features: p.features?.join(", ") || "" });
    setEditItem(p);
    setShowModal(true);
  };
  const close = () => { setShowModal(false); setMsg(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        seats: Number(form.seats), enrolled: Number(form.enrolled || 0),
        features: form.features.split(",").map(f => f.trim()).filter(Boolean),
      };
      if (editItem) {
        await api.put(`/api/programs/${editItem._id}`, payload);
        setMsg("Program updated!");
      } else {
        await api.post("/api/programs", payload);
        setMsg("Program created!");
      }
      await load();
      setTimeout(close, 1000);
    } catch (e) { setMsg(e.response?.data?.message || "Error"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this program?")) return;
    await api.delete(`/api/programs/${id}`);
    load();
  };

  const s = {
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
    title: { margin: 0, color: "#06275B", fontSize: "22px", fontWeight: "800" },
    addBtn: {
      padding: "11px 20px", background: "linear-gradient(135deg, #06275B, #2E7D32)",
      color: "#fff", border: "none", borderRadius: "10px",
      fontWeight: "700", cursor: "pointer", fontSize: "13px",
    },
    filters: { display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", marginRight: "12px" },
    filterBtn: (selected) => ({
      padding: "9px 13px", border: `1px solid ${selected ? "#06275B" : "#DCE5F0"}`,
      borderRadius: "9px", color: selected ? "#fff" : "#38516F",
      background: selected ? "#06275B" : "#fff", fontWeight: "700", cursor: "pointer", fontSize: "12px",
    }),
    table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 28px rgba(6,39,91,0.07)" },
    th: { padding: "14px 16px", background: "#F4F7FC", color: "#5A6F88", fontSize: "11px", fontWeight: "800", textAlign: "left", borderBottom: "1px solid #E4EBF4" },
    td: { padding: "14px 16px", borderBottom: "1px solid #F0F4F9", color: "#1E3A5A", fontSize: "13px" },
    badge: (active) => ({
      padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700",
      background: active ? "rgba(46,125,50,0.12)" : "rgba(239,68,68,0.1)",
      color: active ? "#2E7D32" : "#DC2626",
    }),
    editBtn: { padding: "6px 12px", background: "#EEF3F9", border: "1px solid #DCE5F0", borderRadius: "7px", color: "#06275B", cursor: "pointer", fontWeight: "700", fontSize: "12px", marginRight: "6px" },
    delBtn: { padding: "6px 12px", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "7px", color: "#DC2626", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
    overlay: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,20,48,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    modal: { background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    modalTitle: { margin: 0, color: "#06275B", fontSize: "20px", fontWeight: "800" },
    closeBtn: { width: "34px", height: "34px", borderRadius: "50%", background: "#EEF3F9", border: "none", cursor: "pointer", fontSize: "16px", color: "#06275B" },
    field: { marginBottom: "14px" },
    label: { display: "block", marginBottom: "6px", color: "#17325B", fontSize: "12px", fontWeight: "700" },
    input: { width: "100%", padding: "12px 14px", background: "#F7F9FC", border: "1.5px solid #DCE4EF", borderRadius: "9px", color: "#17325B", fontSize: "13px", outline: "none", boxSizing: "border-box" },
    submitBtn: { width: "100%", padding: "14px", background: "linear-gradient(135deg, #06275B, #2E7D32)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer", fontSize: "14px" },
    success: { marginBottom: "12px", padding: "10px 14px", background: "rgba(46,125,50,0.1)", borderRadius: "8px", color: "#2E7D32", fontSize: "13px" },
  };

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.title}>📚 Programs</h1>
        <div style={s.filters} role="group" aria-label="Filter programs">
          <button type="button" style={s.filterBtn(programFilter === "active")} aria-pressed={programFilter === "active"} onClick={() => setProgramFilter("active")}>
            Active ({programs.filter((program) => program.isActive).length})
          </button>
          <button type="button" style={s.filterBtn(programFilter === "all")} aria-pressed={programFilter === "all"} onClick={() => setProgramFilter("all")}>
            All ({programs.length})
          </button>
        </div>
        <button style={s.addBtn} onClick={openCreate}>+ Add Program</button>
      </div>

      <table style={s.table}>
        <thead>
          <tr>
            {["Title", "Category", "Mode", "Seats", "Enrolled", "Status", "Actions"].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visiblePrograms.map((p) => (
            <tr key={p._id}>
              <td style={s.td}><strong>{p.icon} {p.title}</strong></td>
              <td style={s.td}>{p.category}</td>
              <td style={s.td}>{p.mode}</td>
              <td style={s.td}>{p.seats}</td>
              <td style={s.td}>{p.enrolled}</td>
              <td style={s.td}><span style={s.badge(p.isActive)}>{p.isActive ? "Active" : "Inactive"}</span></td>
              <td style={s.td}>
                <button style={s.editBtn} onClick={() => openEdit(p)}>Edit</button>
                <button style={s.delBtn} onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {visiblePrograms.length === 0 && (
            <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#8A9BB0", padding: "40px" }}>
              {programFilter === "active" && programs.length > 0 ? "No active programs. Switch to All to review inactive programs." : "No programs yet. Add your first one!"}
            </td></tr>
          )}
        </tbody>
      </table>

      <AnimatePresence>
        {showModal && (
          <motion.div style={s.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={s.modal} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <div style={s.modalHeader}>
                <h2 style={s.modalTitle}>{editItem ? "Edit Program" : "Add Program"}</h2>
                <button style={s.closeBtn} onClick={close}>✕</button>
              </div>
              {msg && <div style={s.success}>{msg}</div>}
              <form onSubmit={handleSubmit}>
                {[["Title", "title"], ["Category", "category"], ["Icon (emoji)", "icon"], ["Age Group", "ageGroup"], ["Duration", "duration"], ["Mode", "mode"], ["Schedule", "schedule"], ["Image URL", "image"]].map(([label, key]) => (
                  <div key={key} style={s.field}>
                    <label style={s.label}>{label}</label>
                    {key === "image" ? <ImageField value={form.image} onUploading={setUploadingImage} onChange={(image, imagePublicId) => setForm({ ...form, image, imagePublicId })} inputStyle={s.input} label={label} /> : <input style={s.input} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={["title","category","ageGroup","duration","mode","schedule"].includes(key)} />}
                  </div>
                ))}
                <div style={s.field}>
                  <label style={s.label}>Description</label>
                  <textarea style={{ ...s.input, height: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                </div>
                <div style={{ ...s.field, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={s.label}>Total Seats</label>
                    <input style={s.input} type="number" min="1" value={form.seats} onChange={e => setForm({ ...form, seats: e.target.value })} required />
                  </div>
                  <div>
                    <label style={s.label}>Enrolled</label>
                    <input style={s.input} type="number" min="0" value={form.enrolled} onChange={e => setForm({ ...form, enrolled: e.target.value })} />
                  </div>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Features (comma-separated)</label>
                  <input style={s.input} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2, Feature 3" />
                </div>
                <div style={s.field}>
                  <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px" }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                    Active (visible on public site)
                  </label>
                </div>
                <button style={s.submitBtn} type="submit" disabled={loading || uploadingImage}>
                  {uploadingImage ? "Uploading image…" : loading ? "Saving..." : editItem ? "Update Program" : "Create Program"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPrograms;
