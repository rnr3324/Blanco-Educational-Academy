import { useEffect, useState } from "react";
import api from "../../utils/api";
import ImageField from "../../Components/admin/ImageField";

const empty = { page: "home", placement: "content", eyebrow: "", title: "", body: "", image: "", imagePublicId: "", buttonLabel: "", buttonUrl: "", order: 0, isActive: true };

const AdminContent = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get("/api/content/admin");
      setItems(data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not load page sections.");
    }
  };

  // This effect starts an asynchronous request; state updates happen after the API responds.

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item);
    setForm({ ...empty, ...item });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => { setEditing(null); setForm(empty); setMessage(""); };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = { ...form, order: Number(form.order || 0) };
      if (editing) await api.put(`/api/content/${editing._id}`, payload);
      else await api.post("/api/content", payload);
      await load();
      reset();
      setMessage(editing ? "Section updated." : "Section added to the website.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not save the section.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this section from the website?")) return;
    try {
      await api.delete(`/api/content/${id}`);
      if (editing?._id === id) reset();
      await load();
      setMessage("Section removed from the website.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not remove the section.");
    }
  };

  const input = { width: "100%", padding: 11, border: "1px solid #DCE4EF", borderRadius: 8, boxSizing: "border-box", marginTop: 5 };
  const button = { padding: "10px 16px", border: 0, borderRadius: 8, background: "#06275B", color: "white", fontWeight: 700, cursor: "pointer" };

  return (
    <div style={{ color: "#17325B" }}>
      <h1 style={{ color: "#06275B", marginBottom: 6 }}>Website Sections</h1>
      <p style={{ color: "#718096", marginTop: 0 }}>Add, edit, hide, or remove image and text sections on the Home and About pages.</p>
      {message && <p role="status" style={{ padding: 12, background: "#F0F6FF", borderRadius: 8 }}>{message}</p>}
      <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #E2EAF4", borderRadius: 14, padding: 22, maxWidth: 760, marginBottom: 28 }}>
        <h2 style={{ marginTop: 0 }}>{editing ? "Edit section" : "Add a section"}</h2>
        <label style={{ display: "block", marginBottom: 12 }}>Page<select style={input} value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })}><option value="home">Home</option><option value="about">About</option></select></label>
        <label style={{ display: "block", marginBottom: 12 }}>Placement<select style={input} value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })}><option value="content">Add a page section</option><option value="hero">Replace the page hero</option></select></label>
        <label style={{ display: "block", marginBottom: 12 }}>Small heading<input style={input} value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} /></label>
        <label style={{ display: "block", marginBottom: 12 }}>Title<input style={input} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label style={{ display: "block", marginBottom: 12 }}>Text<textarea style={{ ...input, minHeight: 120, resize: "vertical" }} required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></label>
        <label style={{ display: "block", marginBottom: 12 }}>Image<ImageField value={form.image} onUploading={setUploadingImage} onChange={(image, imagePublicId) => setForm({ ...form, image, imagePublicId })} inputStyle={input} /></label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>Button text<input style={input} value={form.buttonLabel} onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })} /></label>
          <label>Button link<input style={input} value={form.buttonUrl} onChange={(e) => setForm({ ...form, buttonUrl: e.target.value })} placeholder="/programs" /></label>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", margin: "16px 0" }}>
          <label>Order<input style={{ ...input, width: 90 }} type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></label>
          <label style={{ marginTop: 20 }}><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Visible</label>
        </div>
        <div style={{ display: "flex", gap: 10 }}><button style={button} disabled={saving || uploadingImage}>{uploadingImage ? "Uploading image…" : saving ? "Saving…" : editing ? "Save section" : "Add section"}</button>{editing && <button type="button" style={{ ...button, background: "#64748B" }} onClick={reset}>Cancel</button>}</div>
      </form>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {items.map((item) => <article key={item._id} style={{ background: "#fff", border: "1px solid #E2EAF4", borderRadius: 12, padding: 16 }}>
          {item.image && <img src={item.image} alt="" style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 8 }} />}
          <small>{item.page.toUpperCase()} · {item.placement === "hero" ? "Hero" : `Order ${item.order}`} · {item.isActive ? "Visible" : "Hidden"}</small>
          <h3>{item.title}</h3><p>{item.body}</p>
          <div style={{ display: "flex", gap: 8 }}><button style={button} onClick={() => startEdit(item)}>Edit</button><button style={{ ...button, background: "#B42318" }} onClick={() => remove(item._id)}>Remove</button></div>
        </article>)}
      </div>
    </div>
  );
};

export default AdminContent;
