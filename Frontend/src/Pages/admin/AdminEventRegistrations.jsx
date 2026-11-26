import { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminEventRegistrations = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/api/event-registrations");
      setItems(data.data);
      setError("");
    } catch (e) { setError(e.response?.data?.message || "Could not load event registrations."); }
  };

  // This effect starts an asynchronous request; state updates happen after the API responds.

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const update = async (item, status) => {
    try { await api.patch(`/api/event-registrations/${item._id}/status`, { status }); await load(); }
    catch (e) { setError(e.response?.data?.message || "Could not update registration."); }
  };

  const remove = async (item) => {
    if (!window.confirm(`Remove ${item.name}'s registration for ${item.eventTitle}?`)) return;
    try { await api.delete(`/api/event-registrations/${item._id}`); await load(); }
    catch (e) { setError(e.response?.data?.message || "Could not remove registration."); }
  };

  const th = { padding: 12, background: "#F4F7FC", textAlign: "left", fontSize: 12, color: "#5A6F88" };
  const td = { padding: 12, borderBottom: "1px solid #EDF1F6", fontSize: 13 };

  return <div style={{ overflowX: "auto" }}>
    <h1 style={{ color: "#06275B" }}>Event Registrations</h1>
    {error && <p role="alert" style={{ color: "#B91C1C" }}>{error}</p>}
    <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: 12, overflow: "hidden" }}>
      <thead><tr>{["Name", "Email", "Phone", "Role", "Event", "Status", "Submitted", "Actions"].map((label) => <th key={label} style={th}>{label}</th>)}</tr></thead>
      <tbody>{items.map((item) => <tr key={item._id}>
        <td style={td}>{item.name}</td><td style={td}>{item.email}</td><td style={td}>{item.phone}</td><td style={td}>{item.role}</td><td style={td}>{item.eventTitle}</td><td style={td}>{item.status}</td><td style={td}>{new Date(item.createdAt).toLocaleDateString()}</td>
        <td style={td}><select aria-label={`Status for ${item.name}`} value={item.status} onChange={(e) => update(item, e.target.value)}><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select> <button onClick={() => remove(item)} style={{ color: "#B91C1C" }}>Delete</button></td>
      </tr>)}{!items.length && <tr><td style={{ ...td, textAlign: "center" }} colSpan={8}>No registrations yet.</td></tr>}</tbody>
    </table>
  </div>;
};

export default AdminEventRegistrations;
