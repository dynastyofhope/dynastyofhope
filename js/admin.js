/* ============================================================
   Dynasty of Hope Foundation — Admin dashboard (client-side)
   Login gate + submission viewer + CSV export
   ============================================================ */

const DOH_Admin = {
  sessionKey: "doh_admin_session",

  getPass() {
    return localStorage.getItem(DOH_CONFIG.adminPassKey) || DOH_CONFIG.defaultAdminPass;
  },

  login(pass) {
    if (pass === this.getPass()) {
      sessionStorage.setItem(this.sessionKey, "1");
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem(this.sessionKey);
    location.reload();
  },

  isAuthed() {
    return sessionStorage.getItem(this.sessionKey) === "1";
  },

  changePass(oldP, newP) {
    if (oldP !== this.getPass()) return false;
    localStorage.setItem(DOH_CONFIG.adminPassKey, newP);
    return true;
  },

  /* ---- rendering ---- */
  render() {
    const all = DOH_Store.all();
    const vols = all.filter(r => r.type === "volunteer");
    const regs = all.filter(r => r.type === "register");
    const pledges = all.filter(r => r.type === "pledge");
    const total = pledges.reduce((s, r) => s + (parseFloat(r.data.amount) || 0), 0);

    document.getElementById("stat-vol").textContent = vols.length;
    document.getElementById("stat-reg").textContent = regs.length;
    document.getElementById("stat-pledge").textContent = pledges.length;
    document.getElementById("stat-total").textContent = "₦" + total.toLocaleString();

    this.renderTable("table-volunteer", vols, [
      ["name", "Name"], ["email", "Email"], ["phone", "Phone"],
      ["location", "Location"], ["interest", "Interest"], ["message", "Message"]
    ]);
    this.renderTable("table-register", regs, [
      ["fullname", "Name"], ["event", "Event"], ["category", "Category"],
      ["team", "Team / Org"], ["phone", "Phone"], ["email", "Email"], ["notes", "Notes"]
    ]);
    this.renderTable("table-pledge", pledges, [
      ["name", "Name"], ["email", "Email"], ["amount", "Amount (₦)"],
      ["method", "Method"], ["message", "Message"]
    ]);
  },

  renderTable(id, rows, cols) {
    const wrap = document.getElementById(id);
    if (!rows.length) {
      wrap.innerHTML = `<div class="empty-state">No records yet. Submissions from the website forms will appear here.</div>`;
      return;
    }
    let html = `<table class="admin-table"><thead><tr><th>ID</th><th>Date</th>`;
    cols.forEach(c => (html += `<th>${c[1]}</th>`));
    html += `<th></th></tr></thead><tbody>`;
    rows.forEach(r => {
      html += `<tr><td><code>${r.id}</code></td><td>${new Date(r.date).toLocaleString()}</td>`;
      cols.forEach(c => (html += `<td>${DOH_Admin.esc(r.data[c[0]] || "—")}</td>`));
      html += `<td><button class="del-btn" title="Delete" onclick="DOH_Admin.del('${r.id}')">✕</button></td></tr>`;
    });
    html += `</tbody></table>`;
    wrap.innerHTML = html;
  },

  esc(s) {
    const d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  },

  del(id) {
    if (confirm("Delete record " + id + "?")) { DOH_Store.remove(id); this.render(); }
  },

  exportCSV(type) {
    const rows = type === "all" ? DOH_Store.all() : DOH_Store.byType(type);
    if (!rows.length) { alert("No records to export."); return; }
    const keys = new Set(["id", "type", "date"]);
    rows.forEach(r => Object.keys(r.data).forEach(k => keys.add(k)));
    const cols = [...keys];
    const q = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
    let csv = cols.map(q).join(",") + "\n";
    rows.forEach(r => {
      csv += cols.map(c => q(c === "id" ? r.id : c === "type" ? r.type : c === "date" ? r.date : r.data[c])).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `doh-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  },

  clearAll() {
    if (confirm("This deletes ALL stored submissions on this browser. Continue?")) {
      DOH_Store.clear();
      this.render();
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById("admin-login");
  const dash = document.getElementById("admin-dash");
  if (!loginBox || !dash) return;

  if (DOH_Admin.isAuthed()) {
    loginBox.style.display = "none";
    dash.style.display = "block";
    DOH_Admin.render();
  }

  document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();
    const pass = document.getElementById("login-pass").value;
    if (DOH_Admin.login(pass)) {
      loginBox.style.display = "none";
      dash.style.display = "block";
      DOH_Admin.render();
    } else {
      document.getElementById("login-error").textContent = "Incorrect password. Try again.";
    }
  });

  /* tabs */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => (p.style.display = "none"));
      btn.classList.add("active");
      document.getElementById("panel-" + btn.dataset.tab).style.display = "block";
    });
  });

  /* change password */
  document.getElementById("pass-form").addEventListener("submit", e => {
    e.preventDefault();
    const o = document.getElementById("pass-old").value;
    const n = document.getElementById("pass-new").value;
    const msg = document.getElementById("pass-msg");
    if (n.length < 6) { msg.textContent = "New password must be at least 6 characters."; return; }
    if (DOH_Admin.changePass(o, n)) {
      msg.textContent = "Password updated successfully ✓";
      document.getElementById("pass-form").reset();
    } else {
      msg.textContent = "Current password is incorrect.";
    }
  });
});
