import { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";

const PAGE_SIZE = 25;
const AdminApiLogs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ search: "", method: "", status: "" });
  const [draft, setDraft] = useState(filters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/admin/logs", { params: { ...filters, page, limit: PAGE_SIZE } });
      setLogs(data.data);
      setTotal(data.total);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not load API activity. Check the backend connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  // This effect starts an asynchronous request; state updates happen after the API responds.

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const submitFilters = (event) => {
    event.preventDefault();
    setPage(1);
    setFilters(draft);
  };

  const s = {
    title: { margin: "0 0 6px", color: "#06275B", fontSize: 24, fontWeight: 800 },
    subtitle: { margin: "0 0 22px", color: "#71839a", fontSize: 13 },
    panel: { padding: 18, background: "#fff", border: "1px solid #E2EAF4", borderRadius: 16, boxShadow: "0 8px 28px rgba(6,39,91,0.06)" },
    form: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 },
    input: { minWidth: 150, padding: "10px 12px", border: "1px solid #DCE4EF", borderRadius: 9, color: "#17325B", background: "#fff" },
    button: { padding: "10px 16px", border: 0, borderRadius: 9, background: "#06275B", color: "#fff", fontWeight: 700, cursor: "pointer" },
    tableWrap: { overflowX: "auto" },
    table: { width: "100%", minWidth: 760, borderCollapse: "collapse" },
    th: { padding: "12px 10px", background: "#F4F7FC", color: "#5A6F88", fontSize: 11, textAlign: "left", whiteSpace: "nowrap" },
    td: { padding: "12px 10px", borderBottom: "1px solid #F0F4F9", color: "#1E3A5A", fontSize: 12, verticalAlign: "top" },
  };

  return <section>
    <h1 style={s.title}>API Activity</h1>
    <p style={s.subtitle}>Recent backend requests, response codes, and response times.</p>
    <div style={s.panel}>
      <form style={s.form} onSubmit={submitFilters}>
        <input style={s.input} aria-label="Search API paths" placeholder="Search API path" value={draft.search} onChange={(e) => setDraft({ ...draft, search: e.target.value })} />
        <select style={s.input} aria-label="Filter by method" value={draft.method} onChange={(e) => setDraft({ ...draft, method: e.target.value })}>
          <option value="">All methods</option>{["GET", "POST", "PUT", "PATCH", "DELETE"].map((method) => <option key={method}>{method}</option>)}
        </select>
        <select style={s.input} aria-label="Filter by result" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
          <option value="">All results</option><option value="success">Success</option><option value="error">Errors (4xx/5xx)</option>
        </select>
        <button style={s.button} type="submit">Apply filters</button>
        <button style={{ ...s.button, background: "#EEF3F9", color: "#17325B" }} type="button" onClick={load}>Refresh</button>
      </form>
      {error && <p role="alert" style={{ color: "#B91C1C", padding: "10px 12px", background: "#FEF2F2", borderRadius: 8 }}>{error}</p>}
      <div style={s.tableWrap}><table style={s.table}>
        <thead><tr>{["Time", "Method", "Path", "Status", "Duration", "Admin", "Request ID"].map((label) => <th key={label} style={s.th}>{label}</th>)}</tr></thead>
        <tbody>
          {logs.map((log) => <tr key={log._id}>
            <td style={s.td}>{new Date(log.createdAt).toLocaleString()}</td><td style={s.td}><strong>{log.method}</strong></td><td style={{ ...s.td, wordBreak: "break-all" }}>{log.path}</td>
            <td style={{ ...s.td, color: log.statusCode >= 400 ? "#B91C1C" : "#2E7D32", fontWeight: 700 }}>{log.statusCode}</td><td style={s.td}>{log.durationMs} ms</td><td style={s.td}>{log.adminEmail || "—"}</td><td style={{ ...s.td, fontFamily: "monospace" }}>{log.requestId.slice(0, 8)}</td>
          </tr>)}
          {!loading && !logs.length && <tr><td style={{ ...s.td, textAlign: "center", padding: 30 }} colSpan={7}>No API requests found for these filters.</td></tr>}
          {loading && <tr><td style={{ ...s.td, textAlign: "center", padding: 30 }} colSpan={7}>Loading activity…</td></tr>}
        </tbody>
      </table></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 16, color: "#71839a", fontSize: 12 }}>
        <span>{total.toLocaleString()} requests · Page {page} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...s.button, background: "#EEF3F9", color: "#17325B" }} disabled={page <= 1 || loading} onClick={() => setPage(page - 1)}>Previous</button>
          <button style={s.button} disabled={page >= Math.ceil(total / PAGE_SIZE) || loading} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  </section>;
};

export default AdminApiLogs;
