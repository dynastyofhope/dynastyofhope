/* ============================================================
   Dynasty of Hope Foundation — shared site scripts
   ============================================================ */

/* ---- Site configuration: edit these values as needed ---- */
const DOH_CONFIG = {
  orgName: "Dynasty of Hope Foundation",
  siteUrl: "https://dynastyofhope.github.io/dynastyofhope/",
  registerUrl: "https://dynastyofhope.github.io/dynastyofhope/register.html",
  email: "Dynastyofhope2023@gmail.com",
  phones: ["09036989696", "07033828292"],
  whatsapp: "2349036989696", // international format, no "+"
  address: "Gonigora, Ungwan Bijeh, Kaduna State, Nigeria",
  social: {
    facebook: "https://facebook.com/dynastyofhopefoundation",
    instagram: "https://instagram.com/dynastyofhopefoundation",
    twitter: "https://x.com/dynastyofhope",
    youtube: "https://youtube.com/@dynastyofhopefoundation",
    tiktok: "https://tiktok.com/@dynastyofhopefoundation"
  },
  bank: { name: "United Bank for Africa (UBA)", account: "1027342537", acctName: "Dynasty of Hope Foundation" },
  storageKey: "doh_submissions",
  adminPassKey: "doh_admin_pass",
  defaultAdminPass: "hope2023" // CHANGE after first login (Admin > Settings)
};

/* ---- Email delivery: every submission is also sent to the foundation inbox ----
   Uses FormSubmit.co (free, no signup). ONE-TIME ACTIVATION: after the site is live,
   submit any form once, then open the activation email FormSubmit sends to the
   address below and click "Activate". From then on all submissions arrive by email. */
const DOH_FORM_ENDPOINT = "https://formsubmit.co/ajax/Dynastyofhope2023@gmail.com";
const DOH_TYPE_LABEL = {
  volunteer: "Volunteer Application",
  register: "Event Registration",
  pledge: "Donation Pledge"
};
function DOH_SendEmail(type, data, recId) {
  const payload = Object.assign({}, data, {
    _subject: "New " + (DOH_TYPE_LABEL[type] || "Submission") + " [" + recId + "] - Dynasty of Hope Foundation",
    _template: "table",
    _captcha: "false",
    reference: recId,
    form_type: type
  });
  return fetch(DOH_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.ok).catch(() => false);
}

/* ---- Submission store (localStorage) ---- */
const DOH_Store = {
  all() {
    try { return JSON.parse(localStorage.getItem(DOH_CONFIG.storageKey)) || []; }
    catch (e) { return []; }
  },
  add(type, data) {
    const list = this.all();
    const rec = {
      id: "DOH-" + Date.now().toString(36).toUpperCase(),
      type, data,
      date: new Date().toISOString()
    };
    list.unshift(rec);
    localStorage.setItem(DOH_CONFIG.storageKey, JSON.stringify(list));
    return rec;
  },
  remove(id) {
    localStorage.setItem(DOH_CONFIG.storageKey, JSON.stringify(this.all().filter(r => r.id !== id)));
  },
  clear() { localStorage.removeItem(DOH_CONFIG.storageKey); },
  byType(t) { return this.all().filter(r => r.type === t); }
};

/* ---- Helpers ---- */
function dohWhatsAppLink(message) {
  const text = encodeURIComponent(message || "Hello Dynasty of Hope Foundation! I would like to know more about your work.");
  return `https://wa.me/${DOH_CONFIG.whatsapp}?text=${text}`;
}

function dohCopy(text, btn) {
  const done = () => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = "Copied ✓";
    setTimeout(() => (btn.textContent = old), 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta); done();
  }
}

/* ---- Mobile nav ---- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  /* Fill any WhatsApp buttons/links marked data-wa */
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.href = dohWhatsAppLink(el.getAttribute("data-wa") || "");
    el.target = "_blank"; el.rel = "noopener";
  });

  /* Copy buttons */
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => dohCopy(btn.getAttribute("data-copy"), btn));
  });

  /* Generic form handler: <form data-store="volunteer|register|pledge"> */
  document.querySelectorAll("form[data-store]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = {};
      new FormData(form).forEach((v, k) => (data[k] = String(v).trim()));
      let rec;
      try { rec = DOH_Store.add(form.getAttribute("data-store"), data); }
      catch (e) { rec = { id: "DOH-" + Date.now().toString(36).toUpperCase() }; }
      DOH_SendEmail(form.getAttribute("data-store"), data, rec.id);
      const ok = form.querySelector(".form-success");
      if (ok) {
        ok.innerHTML = ok.innerHTML.replace("{{ID}}", rec.id);
        ok.classList.add("show");
      }
      form.reset();
      ok.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  /* Gallery lightbox */
  const lb = document.querySelector(".lightbox");
  if (lb) {
    const lbImg = lb.querySelector("img");
    const lbCap = lb.querySelector(".cap");
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        lbImg.src = item.querySelector("img").src;
        lbImg.alt = item.querySelector("img").alt || "";
        lbCap.textContent = item.querySelector(".cap") ? item.querySelector(".cap").textContent : "";
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    lb.querySelector(".close-lb").addEventListener("click", close);
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* Preselect event on register page via ?event=football|carnival */
  const evtSel = document.getElementById("event");
  if (evtSel) {
    const q = new URLSearchParams(location.search).get("event");
    if (q && [...evtSel.options].some(o => o.value === q)) evtSel.value = q;
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
});
