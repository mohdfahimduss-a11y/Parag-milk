import { useState, useMemo } from "react";

const GSTIN = "09AAAAM5648K1Z7";

const PROFIT_CENTERS = [
  "17000801-Tata Motors - Rudrapur FS",
  "17000802-Tata Motors - Pune FS",
  "17000803-Tata Motors - Chennai FS",
];

const initialInvoices = [
  { id: 464, date: "25-Apr-2026", poNo: "Pur5270019", profitCenter: PROFIT_CENTERS[0], netAmt: 44407, grossAmt: 44407, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 463, date: "24-Apr-2026", poNo: "Pur5270021", profitCenter: PROFIT_CENTERS[0], netAmt: 36480, grossAmt: 36480, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 462, date: "23-Apr-2026", poNo: "Pur5270319", profitCenter: PROFIT_CENTERS[0], netAmt: 36792, grossAmt: 36792, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 461, date: "22-Apr-2026", poNo: "Pur5270320", profitCenter: PROFIT_CENTERS[0], netAmt: 35952, grossAmt: 35952, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 460, date: "21-Apr-2026", poNo: "Pur5270323", profitCenter: PROFIT_CENTERS[0], netAmt: 41376, grossAmt: 41376, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 459, date: "20-Apr-2026", poNo: "Pur5246836", profitCenter: PROFIT_CENTERS[0], netAmt: 11208, grossAmt: 11208, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 458, date: "19-Apr-2026", poNo: "Pur5227774", profitCenter: PROFIT_CENTERS[0], netAmt: 49800, grossAmt: 49800, submissionDate: "26-04-2026", status: "Hold" },
  { id: 457, date: "18-Apr-2026", poNo: "Pur5227775", profitCenter: PROFIT_CENTERS[0], netAmt: 44338.84, grossAmt: 44338.84, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 456, date: "17-Apr-2026", poNo: "Pur5227779", profitCenter: PROFIT_CENTERS[0], netAmt: 41304, grossAmt: 41304, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 455, date: "16-Apr-2026", poNo: "Pur5246840", profitCenter: PROFIT_CENTERS[0], netAmt: 15198, grossAmt: 15198, submissionDate: "26-04-2026", status: "Submitted" },
  { id: 454, date: "16-Apr-2026", poNo: "Pur5246839", profitCenter: PROFIT_CENTERS[0], netAmt: 22890, grossAmt: 22890, submissionDate: "26-04-2026", status: "Hold" },
  { id: 453, date: "16-Apr-2026", poNo: "Pur5246838", profitCenter: PROFIT_CENTERS[0], netAmt: 12750, grossAmt: 12750, submissionDate: "16-04-2026", status: "Submitted" },
  { id: 452, date: "15-Apr-2026", poNo: "Pur5246837", profitCenter: PROFIT_CENTERS[0], netAmt: 130260, grossAmt: 130260, submissionDate: "16-04-2026", status: "Submitted" },
  { id: 451, date: "15-Apr-2026", poNo: "Pur5246835", profitCenter: PROFIT_CENTERS[0], netAmt: 12750, grossAmt: 12750, submissionDate: "15-04-2026", status: "Submitted" },
  { id: 450, date: "14-Apr-2026", poNo: "Pur5246834", profitCenter: PROFIT_CENTERS[0], netAmt: 44556.84, grossAmt: 44556.84, submissionDate: "15-04-2026", status: "Submitted" },
  { id: 449, date: "13-Apr-2026", poNo: "Pur5227773", profitCenter: PROFIT_CENTERS[0], netAmt: 36720, grossAmt: 36720, submissionDate: "15-04-2026", status: "Submitted" },
  { id: 448, date: "12-Apr-2026", poNo: "Pur5236294", profitCenter: PROFIT_CENTERS[0], netAmt: 33000, grossAmt: 33000, submissionDate: "15-04-2026", status: "Submitted" },
  { id: 447, date: "12-Apr-2026", poNo: "Pur5227778", profitCenter: PROFIT_CENTERS[0], netAmt: 9180, grossAmt: 9180, submissionDate: "15-04-2026", status: "Submitted" },
  { id: 439, date: "7-Apr-2026", poNo: "Pur5227771", profitCenter: PROFIT_CENTERS[0], netAmt: 36720, grossAmt: 36720, submissionDate: "08-04-2026", status: "Paid" },
  { id: 440, date: "7-Apr-2026", poNo: "pur5236301", profitCenter: PROFIT_CENTERS[0], netAmt: 75900, grossAmt: 75900, submissionDate: "08-04-2026", status: "Paid" },
  { id: 441, date: "8-Apr-2026", poNo: "pur5227772", profitCenter: PROFIT_CENTERS[0], netAmt: 45106.84, grossAmt: 45106.84, submissionDate: "08-04-2026", status: "Paid" },
  { id: 438, date: "6-Apr-2026", poNo: "pur5227770", profitCenter: PROFIT_CENTERS[0], netAmt: 38250, grossAmt: 38250, submissionDate: "08-04-2026", status: "Paid" },
  { id: 437, date: "4-Apr-2026", poNo: "pur5213266", profitCenter: PROFIT_CENTERS[0], netAmt: 7560, grossAmt: 7560, submissionDate: "08-04-2026", status: "Paid" },
  { id: 436, date: "4-Apr-2026", poNo: "pur5213264", profitCenter: PROFIT_CENTERS[0], netAmt: 38250, grossAmt: 38250, submissionDate: "08-04-2026", status: "Paid" },
  { id: 435, date: "2-Apr-2026", poNo: "pur5213265", profitCenter: PROFIT_CENTERS[0], netAmt: 72600, grossAmt: 72600, submissionDate: "08-04-2026", status: "Paid" },
  { id: 434, date: "2-Apr-2026", poNo: "pur5213263", profitCenter: PROFIT_CENTERS[0], netAmt: 36720, grossAmt: 36720, submissionDate: "08-04-2026", status: "Paid" },
  { id: 433, date: "1-Apr-2026", poNo: "pur5213262", profitCenter: PROFIT_CENTERS[0], netAmt: 44856.84, grossAmt: 44856.84, submissionDate: "08-04-2026", status: "Paid" },
  { id: 432, date: "31-Mar-2026", poNo: "Pur5213261", profitCenter: PROFIT_CENTERS[0], netAmt: 42600, grossAmt: 42600, submissionDate: "01-04-2026", status: "Paid" },
  { id: 431, date: "30-Mar-2026", poNo: "Pur5182164", profitCenter: PROFIT_CENTERS[0], netAmt: 9792, grossAmt: 9792, submissionDate: "01-04-2026", status: "Paid" },
  { id: 430, date: "30-Mar-2026", poNo: "Pur5213260", profitCenter: PROFIT_CENTERS[0], netAmt: 45120, grossAmt: 45120, submissionDate: "01-04-2026", status: "Paid" },
];

const STATUS_COLORS = {
  Submitted: { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7" },
  Paid: { bg: "#e3f2fd", text: "#1565c0", border: "#90caf9" },
  Hold: { bg: "#fff3e0", text: "#e65100", border: "#ffcc80" },
  Rejected: { bg: "#fce4ec", text: "#b71c1c", border: "#ef9a9a" },
};

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "📋", label: "Purchase Orders" },
  { icon: "📄", label: "Invoices", active: true },
  { icon: "💳", label: "Payment Advice" },
  { icon: "✅", label: "No Due Certificate" },
  { icon: "👷", label: "Manpower Vendor Document" },
  { icon: "🍽️", label: "Food Compliance Document" },
  { icon: "💬", label: "Complaints" },
  { icon: "🔄", label: "Change Request" },
  { icon: "📥", label: "Training Guide (Download)" },
  { icon: "🎬", label: "Training Video (Download)" },
];

function fmt(n) {
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtK(n) {
  if (n >= 1000000) return "₹" + (n / 1000000).toFixed(2) + "M";
  if (n >= 1000) return "₹" + (n / 1000).toFixed(2) + "K";
  return "₹" + n.toFixed(2);
}

const EMPTY_FORM = { date: "", poNo: "", profitCenter: PROFIT_CENTERS[0], netAmt: "", grossAmt: "", submissionDate: "", status: "Submitted" };

export default function VendorInvoicePortal() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [activeNav, setActiveNav] = useState("Invoices");

  const stats = useMemo(() => {
    const s = { Submitted: 0, Booked: 0, Hold: 0, Rejected: 0, Paid: 0 };
    const c = { Submitted: 0, Booked: 0, Hold: 0, Rejected: 0, Paid: 0 };
    invoices.forEach(inv => {
      s[inv.status] = (s[inv.status] || 0) + inv.grossAmt;
      c[inv.status] = (c[inv.status] || 0) + 1;
    });
    return { s, c };
  }, [invoices]);

  const filtered = useMemo(() => invoices.filter(inv => {
    const matchStatus = filterStatus === "All" || inv.status === filterStatus;
    const q = searchQ.toLowerCase();
    const matchQ = !q || String(inv.id).includes(q) || inv.poNo.toLowerCase().includes(q) || inv.profitCenter.toLowerCase().includes(q);
    return matchStatus && matchQ;
  }), [invoices, filterStatus, searchQ]);

  function addInvoice() {
    if (!form.date || !form.poNo || !form.netAmt) return alert("Date, PO No aur Net Amount zaroori hai!");
    const newId = Math.max(...invoices.map(i => i.id)) + 1;
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
    setInvoices([{ id: newId, ...form, netAmt: parseFloat(form.netAmt), grossAmt: parseFloat(form.grossAmt || form.netAmt), submissionDate: form.submissionDate || today }, ...invoices]);
    setShowModal(false);
    setForm(EMPTY_FORM);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f4f6f9", color: "#1a1a2e" }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? 240 : 52, background: "#fff", borderRight: "1px solid #e8eaf0", transition: "width 0.2s", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "2px 0 8px #0001" }}>
        <div style={{ padding: "14px 12px", borderBottom: "1px solid #e8eaf0", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, cursor: "pointer" }} onClick={() => setSidebarOpen(!sidebarOpen)}>☰</span>
          {sidebarOpen && <span style={{ fontWeight: 800, fontSize: 18, color: "#c0392b", letterSpacing: 1 }}>sodex<span style={{ color: "#e67e22" }}>o</span></span>}
        </div>
        <nav style={{ flex: 1, overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <div key={item.label} onClick={() => setActiveNav(item.label)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", background: activeNav === item.label ? "#fff3e0" : "transparent", borderLeft: activeNav === item.label ? "3px solid #e67e22" : "3px solid transparent", color: activeNav === item.label ? "#c0392b" : "#555", fontWeight: activeNav === item.label ? 600 : 400, fontSize: 13, whiteSpace: "nowrap", transition: "all 0.15s" }}>
              <span style={{ fontSize: 16, minWidth: 20, textAlign: "center" }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </div>
          ))}
        </nav>
        {sidebarOpen && (
          <div style={{ padding: "10px 14px", fontSize: 10, color: "#aaa", borderTop: "1px solid #eee" }}>
            GSTIN: {GSTIN}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: "#fff", padding: "12px 20px", borderBottom: "1px solid #e8eaf0", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px #0001" }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#1a1a2e" }}>Invoices</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="🔍 Search invoice, PO..." style={{ border: "1px solid #ddd", borderRadius: 6, padding: "6px 12px", fontSize: 13, outline: "none", width: 200 }} />
            <span style={{ fontSize: 12, color: "#888" }}>{GSTIN}</span>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#c0392b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>M</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {/* Summary Cards */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { label: "Submitted", key: "Submitted", color: "#2e7d32", dot: "#4caf50" },
              { label: "Booked", key: "Booked", color: "#6a1b9a", dot: "#ab47bc" },
              { label: "Hold", key: "Hold", color: "#e65100", dot: "#ff7043" },
              { label: "Rejected", key: "Rejected", color: "#b71c1c", dot: "#ef5350" },
              { label: "Paid", key: "Paid", color: "#1565c0", dot: "#42a5f5" },
            ].map(card => (
              <div key={card.key} onClick={() => setFilterStatus(filterStatus === card.key ? "All" : card.key)}
                style={{ background: "#fff", border: filterStatus === card.key ? `2px solid ${card.dot}` : "1px solid #e8eaf0", borderRadius: 10, padding: "12px 16px", minWidth: 130, flex: "1 1 120px", cursor: "pointer", boxShadow: "0 1px 4px #0001", transition: "all 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: card.dot }} />
                  <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{card.label}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: card.color }}>{fmtK(stats.s[card.key] || 0)}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Count: {stats.c[card.key] || 0}</div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px #0001", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Vendor Invoices</span>
                <span style={{ background: "#f0f0f0", borderRadius: 20, padding: "2px 10px", fontSize: 12, color: "#666" }}>{filtered.length}</span>
                {filterStatus !== "All" && (
                  <span onClick={() => setFilterStatus("All")} style={{ background: "#fff3e0", color: "#e65100", borderRadius: 20, padding: "2px 10px", fontSize: 11, cursor: "pointer", border: "1px solid #ffcc80" }}>
                    {filterStatus} ✕
                  </span>
                )}
              </div>
              <button onClick={() => setShowModal(true)}
                style={{ background: "#1565c0", color: "#fff", border: "none", borderRadius: 7, padding: "7px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                + Add Invoice
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #e8eaf0" }}>
                    {["Invoice", "PO No", "Profit Center", "Invoice Amt", "Submission Date", "Status"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: "#555", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inv, i) => (
                    <tr key={inv.id} style={{ borderBottom: "1px solid #f5f5f5", background: i % 2 === 0 ? "#fff" : "#fafbfc", transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f0f4ff"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfc"}>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontWeight: 600, color: "#1565c0" }}>#{inv.id}</div>
                        <div style={{ fontSize: 11, color: "#999" }}>Date: {inv.date}</div>
                      </td>
                      <td style={{ padding: "10px 14px", color: "#555", fontFamily: "monospace", fontSize: 12 }}>{inv.poNo}</td>
                      <td style={{ padding: "10px 14px", color: "#444", maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inv.profitCenter}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontSize: 12, color: "#333" }}>Net Amt: <b>{fmt(inv.netAmt)}</b></div>
                        <div style={{ fontSize: 11, color: "#888" }}>Gross Amt: {fmt(inv.grossAmt)}</div>
                      </td>
                      <td style={{ padding: "10px 14px", color: "#666", fontSize: 12 }}>{inv.submissionDate}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ background: STATUS_COLORS[inv.status]?.bg, color: STATUS_COLORS[inv.status]?.text, border: `1px solid ${STATUS_COLORS[inv.status]?.border}`, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600 }}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#aaa" }}>Koi invoice nahi mila 🔍</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "#0006", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, width: 460, maxWidth: "95vw", boxShadow: "0 8px 32px #0003" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontWeight: 700, fontSize: 17 }}>Add New Invoice</span>
              <span onClick={() => setShowModal(false)} style={{ cursor: "pointer", fontSize: 20, color: "#aaa" }}>✕</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Invoice Date *", key: "date", type: "date" },
                { label: "PO Number *", key: "poNo", type: "text", placeholder: "Pur5270001" },
                { label: "Net Amount (₹) *", key: "netAmt", type: "number", placeholder: "0.00" },
                { label: "Gross Amount (₹)", key: "grossAmt", type: "number", placeholder: "0.00" },
                { label: "Submission Date", key: "submissionDate", type: "date" },
              ].map(f => (
                <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>{f.label}</label>
                  <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ border: "1px solid #ddd", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none" }} />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{ border: "1px solid #ddd", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none", background: "#fff" }}>
                  {["Submitted", "Paid", "Hold", "Rejected"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>Profit Center</label>
              <select value={form.profitCenter} onChange={e => setForm({ ...form, profitCenter: e.target.value })}
                style={{ border: "1px solid #ddd", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none", background: "#fff", width: "100%" }}>
                {PROFIT_CENTERS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowModal(false)}
                style={{ flex: 1, border: "1px solid #ddd", background: "#fff", borderRadius: 7, padding: "9px", fontWeight: 600, fontSize: 13, cursor: "pointer", color: "#555" }}>
                Cancel
              </button>
              <button onClick={addInvoice}
                style={{ flex: 1, background: "#1565c0", color: "#fff", border: "none", borderRadius: 7, padding: "9px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                Save Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
