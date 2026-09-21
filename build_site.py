#!/usr/bin/env python3
"""Assembles Dynasty of Hope Foundation pages from _fragments/*.body.html"""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))

PAGES = {
    "about":     ("About Us — Dynasty of Hope Foundation", "Who we are, our mission, vision and values — the story behind Dynasty of Hope Foundation, Kaduna Nigeria."),
    "volunteer": ("Volunteer — Dynasty of Hope Foundation", "Join 80+ volunteers serving communities in Kaduna. Sign up for health outreach, education, relief and event programmes."),
    "gallery":   ("Gallery — Dynasty of Hope Foundation", "Photos from our outreach programmes, community events and the Gonigora football championship."),
    "events":    ("Events — Dynasty of Hope Foundation", "Gonigora Community Development Football Championship (1-26 Dec 2026) and Charity Carnival Blast & Mega Raffle Draw (27 Dec 2026)."),
    "donate":    ("Donate — Dynasty of Hope Foundation", "Support community development in Kaduna. Bank donation details, pledges and sponsorship opportunities."),
    "register":  ("Event Registration — Dynasty of Hope Foundation", "Register your football team, book raffle tickets or join as a sponsor for our December 2026 events in Gonigora, Kaduna."),
    "admin":     ("Admin — Dynasty of Hope Foundation", "Administrator dashboard for Dynasty of Hope Foundation website submissions."),
    "proposal":  ("Sponsorship Proposal — Dynasty of Hope Foundation", "Official sponsorship proposal for the Gonigora Community Development Football Championship Tournament, Kaduna — December 2026."),
    "proposal-carnival": ("Carnival Sponsorship Proposal — Dynasty of Hope Foundation", "Official sponsorship proposal for the Charity Carnival Blast & Mega Raffle Draw, 27th December 2026, Goni Gora Government Primary School, U/Bijeh, Kaduna."),
}

def head(title, desc):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="assets/img/hero.jpg">
<link rel="icon" type="image/png" href="assets/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
"""

HEADER = """<div class="topbar">
  <div class="container">
    <div class="tb-group">
      <a href="mailto:Dynastyofhope2023@gmail.com"><svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>Dynastyofhope2023@gmail.com</a>
      <a href="tel:+2349036989696"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>0903 698 9696, 0703 382 8292</a>
    </div>
    <div class="tb-group social-mini">
      <a href="https://facebook.com/dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.5 1.6-1.5H16.8V2.2C16 2.1 14.6 2 13.4 2 10.6 2 9 3.7 9 6.9V10H6v4h3v8h4z"/></svg></a>
      <a href="https://instagram.com/dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4 1.2-.1 1.6-.1 4.8-.1zm0 4.8a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8.2a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.2zm6.4-8.4a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z"/></svg></a>
      <a href="https://x.com/dynastyofhope" target="_blank" rel="noopener" aria-label="X (Twitter)"><svg viewBox="0 0 24 24"><path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg></a>
      <a href="https://youtube.com/@dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.8-.4c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15.1V8.3l6.2 3.4-6.2 3.4z"/></svg></a>
      <a href="https://tiktok.com/@dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.4-3.7V2.5h-3.3v13.2a2.8 2.8 0 1 1-2-2.7V9.6a6.2 6.2 0 1 0 5.3 6.1V9.2a8 8 0 0 0 4.4 1.3V7.2s-.6 0-1-.5z"/></svg></a>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="container nav-wrap">
    <a class="brand" href="index.html">
      <img src="assets/img/logo.png" alt="Dynasty of Hope Foundation logo">
      <span class="brand-text"><strong>Dynasty of Hope</strong><span>Foundation</span></span>
    </a>
    <nav class="main-nav" id="main-nav">
      <a href="index.html"__HOME__>Home</a>
      <a href="about.html"__ABOUT__>About Us</a>
      <a href="volunteer.html"__VOLUNTEER__>Volunteer</a>
      <a href="events.html"__EVENTS__>Events</a>
      <a href="gallery.html"__GALLERY__>Gallery</a>
      <a href="admin.html"__ADMIN__>Admin</a>
      <a href="donate.html" class="btn btn-gold btn-sm nav-cta">Donate Now</a>
    </nav>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
"""

FOOTER = """<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="assets/img/logo.png" alt="Dynasty of Hope Foundation logo">
          <strong>Dynasty of Hope Foundation</strong>
        </div>
        <p>A Nigerian non-governmental organisation empowering communities through health, education, relief and youth development. Registered and committed to transparent, impact-driven service.</p>
        <div class="social-row">
          <a href="https://facebook.com/dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.5 1.6-1.5H16.8V2.2C16 2.1 14.6 2 13.4 2 10.6 2 9 3.7 9 6.9V10H6v4h3v8h4z"/></svg></a>
          <a href="https://instagram.com/dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4 1.2-.1 1.6-.1 4.8-.1zm0 4.8a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8.2a3.2 3.2 0 1 1 3.2-3.2 3.2 3.2 0 0 1-3.2 3.2zm6.4-8.4a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z"/></svg></a>
          <a href="https://x.com/dynastyofhope" target="_blank" rel="noopener" aria-label="X (Twitter)"><svg viewBox="0 0 24 24"><path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg></a>
          <a href="https://youtube.com/@dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.6 12 3.6 12 3.6s-4.6 0-7.8.3c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.8-.4c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15.1V8.3l6.2 3.4-6.2 3.4z"/></svg></a>
          <a href="https://tiktok.com/@dynastyofhopefoundation" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.4-3.7V2.5h-3.3v13.2a2.8 2.8 0 1 1-2-2.7V9.6a6.2 6.2 0 1 0 5.3 6.1V9.2a8 8 0 0 0 4.4 1.3V7.2s-.6 0-1-.5z"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="volunteer.html">Volunteer</a></li>
          <li><a href="events.html">Events</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="donate.html">Donation</a></li>
          <li><a href="admin.html">Admin</a></li>
        </ul>
      </div>
      <div>
        <h4>Get Involved</h4>
        <ul>
          <li><a href="register.html?event=football">Register a Football Team</a></li>
          <li><a href="register.html?event=carnival">Get Raffle Tickets</a></li>
          <li><a href="proposal.html">Sponsorship Proposal</a></li>
          <li><a href="proposal-carnival.html">Carnival Sponsorship Proposal</a></li>
          <li><a href="volunteer.html">Join as Volunteer</a></li>
          <li><a href="donate.html">Make a Donation</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact Us</h4>
        <ul class="footer-contact">
          <li><svg viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"/></svg><span>Gonigora, Ungwan Bijeh,<br>Kaduna State, Nigeria</span></li>
          <li><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg><span><a href="tel:+2349036989696">0903 698 9696</a><br><a href="tel:+2347033828292">0703 382 8292</a></span></li>
          <li><svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg><span><a href="mailto:Dynastyofhope2023@gmail.com">Dynastyofhope2023@gmail.com</a></span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <span>© <span data-year>2026</span> Dynasty of Hope Foundation. All rights reserved.</span>
      <span>Bound together by hope · <a href="about.html">Our story</a></span>
    </div>
  </div>
</footer>
<a class="wa-float" data-wa="Hello Dynasty of Hope Foundation! I visited your website and would like to connect." aria-label="Chat with us on WhatsApp" href="#">
  <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.3-5.1-4.5-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.7.8 2 1 .3.2.5.2.6.4.1.2.1.8-.1 1.5z"/></svg>
</a>
"""

def build():
    for slug, (title, desc) in PAGES.items():
        frag_path = os.path.join(ROOT, "_fragments", slug + ".body.html")
        with open(frag_path, encoding="utf-8") as f:
            body = f.read()
        header = HEADER
        for key in ["HOME", "ABOUT", "VOLUNTEER", "EVENTS", "GALLERY", "ADMIN"]:
            header = header.replace(f"__{key}__", ' class="active"' if key.lower() == slug else "")
        scripts = '<script src="js/main.js"></script>'
        if slug == "admin":
            scripts += '\n<script src="js/admin.js"></script>'
        html = head(title, desc) + header + body + FOOTER + scripts + "\n</body>\n</html>\n"
        out = os.path.join(ROOT, slug + ".html")
        with open(out, "w", encoding="utf-8") as f:
            f.write(html)
        print("built", slug + ".html")

if __name__ == "__main__":
    build()
