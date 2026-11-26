import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "./admin.css";

const navItems = [
  { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
  { path: "/admin/programs", icon: "📚", label: "Programs" },
  { path: "/admin/campaigns", icon: "🎒", label: "Campaigns" },
  { path: "/admin/events", icon: "📅", label: "Events" },
  { path: "/admin/event-registrations", icon: "👥", label: "Event Registrations" },
  { path: "/admin/gallery", icon: "🖼️", label: "Gallery" },
  { path: "/admin/volunteers", icon: "🤝", label: "Volunteers" },
  { path: "/admin/contacts", icon: "✉️", label: "Contacts" },
  { path: "/admin/donations", icon: "💰", label: "Donations" },
  { path: "/admin/applications", icon: "📝", label: "Applications" },
  { path: "/admin/content", icon: "🧩", label: "Website Sections" },
  { path: "/admin/security", icon: "🔐", label: "Account Security" },
  { path: "/admin/logs", icon: "📋", label: "API Activity" },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncViewport = () => {
      if (window.innerWidth <= 760) setCollapsed(false);
      else setMobileOpen(false);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);


  const pageTitle = navItems.find((item) => item.path === location.pathname)?.label || "Admin";

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const s = {
    shell: { display: "flex", minHeight: "100vh", background: "#F6F8FC" },
    sidebar: {
      position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
      width: collapsed ? "76px" : "256px",
      background: "linear-gradient(180deg, #031B42 0%, #06275B 60%, #0A3E20 100%)",
      display: "flex", flexDirection: "column",
      transition: "width 0.3s ease",
      overflow: "hidden",
    },
    sidebarTop: {
      padding: collapsed ? "24px 12px" : "28px 22px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    brand: {
      display: "flex", alignItems: "center", gap: "10px",
      overflow: "hidden", whiteSpace: "nowrap",
    },
    brandIcon: {
      width: "38px", height: "38px", flexShrink: 0,
      borderRadius: "10px",
      background: "linear-gradient(135deg, #E0AA34, #2E7D32)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "18px",
    },
    brandText: { color: "#fff", fontSize: "15px", fontWeight: "800", lineHeight: "1.2" },
    brandSub: { color: "rgba(255,255,255,0.5)", fontSize: "10px" },
    toggleBtn: {
      background: "rgba(255,255,255,0.08)", border: "none",
      borderRadius: "8px", color: "#fff", width: "28px", height: "28px",
      cursor: "pointer", flexShrink: 0, fontSize: "14px",
    },
    nav: { flex: 1, padding: "16px 10px", overflowY: "auto" },
    navLink: (isActive) => ({
      display: "flex", alignItems: "center",
      gap: "12px", padding: "11px 12px",
      borderRadius: "12px", marginBottom: "4px",
      textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden",
      color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
      background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
      fontWeight: isActive ? "700" : "500",
      fontSize: "13px",
      transition: "all 0.2s",
    }),
    navIcon: { fontSize: "18px", flexShrink: 0 },
    sidebarBottom: {
      padding: "18px 12px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },
    userInfo: {
      display: "flex", alignItems: "center", gap: "10px",
      marginBottom: "12px", overflow: "hidden",
    },
    avatar: {
      width: "36px", height: "36px", flexShrink: 0,
      borderRadius: "50%", background: "linear-gradient(135deg, #E0AA34, #C98A13)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: "800", fontSize: "15px",
    },
    userName: { color: "#fff", fontSize: "13px", fontWeight: "700", whiteSpace: "nowrap" },
    userRole: { color: "rgba(255,255,255,0.5)", fontSize: "10px" },
    logoutBtn: {
      width: "100%", padding: "10px",
      background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "10px", color: "#fff", cursor: "pointer",
      fontSize: "12px", fontWeight: "700", display: "flex",
      alignItems: "center", justifyContent: "center", gap: "8px",
    },
    main: {
      marginLeft: collapsed ? "76px" : "256px",
      flex: 1, display: "flex", flexDirection: "column",
      transition: "margin-left 0.3s ease",
      minWidth: 0,
    },
    topbar: {
      background: "#fff", borderBottom: "1px solid #E4EBF4",
      padding: "0 28px", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 50,
    },
    topbarTitle: { color: "#06275B", fontSize: "16px", fontWeight: "700" },
    content: { padding: "28px", flex: 1 },
  };

  return (
    <div style={s.shell} className={`admin-shell${mobileOpen ? " admin-mobile-open" : ""}`}>
      {mobileOpen && <button className="admin-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      {/* Sidebar */}
      <aside style={s.sidebar} className="admin-sidebar">
        <div style={s.sidebarTop}>
          <div style={s.brand}>
            <div style={s.brandIcon}>🎓</div>
            {!collapsed && (
              <div>
                <div style={s.brandText}>Blanco</div>
                <div style={s.brandSub}>Admin Panel</div>
              </div>
            )}
          </div>
          <button style={s.toggleBtn} className="admin-collapse-toggle" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav style={s.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => s.navLink(isActive)}
              title={collapsed ? item.label : undefined}
            >
              <span style={s.navIcon}>{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        <div style={s.sidebarBottom}>
          {!collapsed && (
            <div style={s.userInfo}>
              <div style={s.avatar}>
                {admin?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div>
                <div style={s.userName}>{admin?.name || "Admin"}</div>
                <div style={s.userRole}>Administrator</div>
              </div>
            </div>
          )}
          <button style={s.logoutBtn} onClick={handleLogout}>
            🚪 {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={s.main}>
        <div style={s.topbar}>
          <div className="admin-topbar-leading">
            <button className="admin-menu-toggle" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>☰</button>
            <div><span style={s.topbarTitle}>{pageTitle}</span><span className="admin-topbar-brand">Blanco Educational Academy</span></div>
          </div>
          <span style={{ color: "#8A9BB0", fontSize: "13px" }}>
            Welcome back, {admin?.name || "Admin"} 👋
          </span>
        </div>
        <div style={s.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
