import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import api from "../../utils/api";
import ImageField from "../../Components/admin/ImageField";

const empty = { title: "", category: "", image: "", imagePublicId: "", caption: "", description: "", location: "", date: "", isActive: true };

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [galleryFilter, setGalleryFilter] = useState("active");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/api/gallery/all");
      setItems(data.data);
      setLoadError("");
    } catch (e) {
      console.error(e);
      setLoadError(e.response?.data?.message || "Could not load gallery items. Refresh and try again.");
    }
  };
  // This effect starts an asynchronous request; state updates happen after the API responds.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const activeItems = items.filter((item) => item.isActive !== false);
  const visibleItems = galleryFilter === "active" ? activeItems : items;

  const openCreate = () => { setForm(empty); setEditItem(null); setShowModal(true); };
  const openEdit = (item) => { setForm({ ...item, isActive: item.isActive !== false }); setEditItem(item); setShowModal(true); };
  const close = () => { setShowModal(false); setMsg(""); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editItem) { await api.put(`/api/gallery/${editItem._id}`, form); setMsg("Updated!"); }
      else { await api.post("/api/gallery", form); setMsg("Added!"); }
      await load(); setTimeout(close, 1000);
    } catch (e) { setMsg(e.response?.data?.message || "Error"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await api.delete(`/api/gallery/${id}`); load();
  };

  const s = {
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
    title: { margin: 0, color: "#06275B", fontSize: "22px", fontWeight: "800" },
    addBtn: { padding: "11px 20px", background: "linear-gradient(135deg, #06275B, #2E7D32)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "13px" },
    filters: { display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", marginRight: "12px" },
    filterBtn: (selected) => ({ padding: "9px 13px", border: `1px solid ${selected ? "#06275B" : "#DCE5F0"}`, borderRadius: "9px", color: selected ? "#fff" : "#38516F", background: selected ? "#06275B" : "#fff", fontWeight: "700", cursor: "pointer", fontSize: "12px" }),
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" },
    card: { background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2EAF4", boxShadow: "0 6px 20px rgba(6,39,91,0.07)" },
    img: { width: "100%", height: "150px", objectFit: "cover", display: "block" },
    cardBody: { padding: "14px" },
    cardTitle: { margin: "0 0 4px", color: "#06275B", fontSize: "14px", fontWeight: "700" },
    cardCat: { margin: "0 0 12px", color: "#8A9BB0", fontSize: "12px" },
    badge: (active) => ({ display: "inline-block", marginBottom: "10px", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", background: active ? "rgba(46,125,50,0.12)" : "rgba(239,68,68,0.1)", color: active ? "#2E7D32" : "#DC2626" }),
    actions: { display: "flex", gap: "8px" },
    editBtn: { flex: 1, padding: "6px", background: "#EEF3F9", border: "none", borderRadius: "7px", color: "#06275B", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
    delBtn: { flex: 1, padding: "6px", background: "#FEF2F2", border: "none", borderRadius: "7px", color: "#DC2626", cursor: "pointer", fontWeight: "700", fontSize: "12px" },
    overlay: { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(3,20,48,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    modal: { background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "480px", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    modalTitle: { margin: 0, color: "#06275B", fontSize: "20px", fontWeight: "800" },
    closeBtn: { width: "34px", height: "34px", borderRadius: "50%", background: "#EEF3F9", border: "none", cursor: "pointer", fontSize: "16px" },
    field: { marginBottom: "14px" },
    label: { display: "block", marginBottom: "6px", color: "#17325B", fontSize: "12px", fontWeight: "700" },
    input: { width: "100%", padding: "12px 14px", background: "#F7F9FC", border: "1.5px solid #DCE4EF", borderRadius: "9px", color: "#17325B", fontSize: "13px", outline: "none", boxSizing: "border-box" },
    submitBtn: { width: "100%", padding: "14px", background: "linear-gradient(135deg, #06275B, #2E7D32)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer", fontSize: "14px" },
    success: { marginBottom: "12px", padding: "10px 14px", background: "rgba(46,125,50,0.1)", borderRadius: "8px", color: "#2E7D32", fontSize: "13px" },
  };

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.title}>🖼️ Gallery</h1>
        <div style={s.filters} role="group" aria-label="Filter gallery items">
          <button type="button" style={s.filterBtn(galleryFilter === "active")} aria-pressed={galleryFilter === "active"} onClick={() => setGalleryFilter("active")}>
            Active ({activeItems.length})
          </button>
          <button type="button" style={s.filterBtn(galleryFilter === "all")} aria-pressed={galleryFilter === "all"} onClick={() => setGalleryFilter("all")}>
            All ({items.length})
          </button>
        </div>
        <button style={s.addBtn} onClick={openCreate}>+ Add Photo</button>
      </div>
      {loadError && <p role="alert" style={{ color: "#B91C1C", padding: "10px 12px", background: "#FEF2F2", borderRadius: 8 }}>{loadError}</p>}
      <div style={s.grid}>
        {visibleItems.map((item) => (
          <div key={item._id} style={s.card}>
            <img src={item.image} alt={item.title} style={s.img} onError={e => { e.target.src = "https://via.placeholder.com/400x200?text=No+Image"; }} />
            <div style={s.cardBody}>
              <p style={s.cardTitle}>{item.title}</p>
              <p style={s.cardCat}>{item.category}</p>
              <span style={s.badge(item.isActive !== false)}>{item.isActive === false ? "Inactive" : "Active"}</span>
              <div style={s.actions}>
                <button style={s.editBtn} onClick={() => openEdit(item)}>Edit</button>
                <button style={s.delBtn} onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {visibleItems.length === 0 && <div style={{ color: "#8A9BB0", gridColumn: "1/-1", padding: "40px", textAlign: "center" }}>{galleryFilter === "active" && items.length > 0 ? "No active gallery items. Switch to All to review inactive items." : "No gallery items yet."}</div>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div style={s.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={s.modal} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <div style={s.modalHeader}>
                <h2 style={s.modalTitle}>{editItem ? "Edit Photo" : "Add Photo"}</h2>
                <button style={s.closeBtn} onClick={close}>✕</button>
              </div>
              {msg && <div style={s.success}>{msg}</div>}
              <form onSubmit={handleSubmit}>
                {[["Title","title"],["Category","category"],["Image","image"],["Location","location"],["Date","date"],["Description","description"],["Caption","caption"]].map(([label, key]) => (
                  <div key={key} style={s.field}>
                    <label style={s.label}>{label}</label>
                    {key === "image" ? <ImageField value={form.image} onUploading={setUploadingImage} onChange={(image, imagePublicId) => setForm({ ...form, image, imagePublicId })} inputStyle={s.input} label={label} /> : <input style={s.input} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={["title","category","image"].includes(key)} />}
                  </div>
                ))}
                <div style={{ ...s.field, marginTop: 4 }}>
                  <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px" }}>
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                    Active (visible on public site)
                  </label>
                </div>
                <button style={s.submitBtn} type="submit" disabled={loading || uploadingImage}>{uploadingImage ? "Uploading image…" : loading ? "Saving..." : editItem ? "Update Photo" : "Add Photo"}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
