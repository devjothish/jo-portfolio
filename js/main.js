// ============================================
// MAIN.JS - Entry point, DOM rendering, navigation
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Render all sections (About removed: hero now covers bio + stats) ---
  // Render order matches DOM order: hero, certifications, projects, skills, experience, contact.
  renderHero();
  renderCertifications();
  renderProjects();
  renderSkills();
  renderExperience();
  renderContact();

  // --- Initialize Three.js and animations ---
  initThreeScene();
  initAnimations();
  initNavigation();
  initCursor();

  // --- Hide loader ---
  setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");
  }, 800);
});

// ============ RENDER FUNCTIONS ============

function renderHero() {
  document.getElementById("hero").innerHTML = `
    <div class="hero-frame">
      <!-- Top status strip -->
      <header class="hero-strip">
        <div class="hero-strip-rule"></div>
        <div class="hero-strip-items">
          <span class="hero-strip-now"><span class="hero-strip-dot"></span>Open to work</span>
          <span class="hero-strip-sep">·</span>
          <span class="hero-strip-role">AI Engineer · Tallahassee, FL · Open to Relocate</span>
        </div>
        <div class="hero-strip-rule"></div>
      </header>

      <!-- Editorial centerpiece -->
      <div class="hero-stage">
        <p class="hero-kicker">Portfolio · MMXXVI</p>

        <h1 class="hero-display">
          <span class="hero-line hero-line-1">I ship</span>
          <span class="hero-line hero-line-2"><em>agentic AI</em></span>
          <span class="hero-line hero-line-3">that survives contact</span>
          <span class="hero-line hero-line-4">with real users.</span>
        </h1>

        <div class="hero-sig">
          <span class="hero-sig-name">Jothiswaran Arumugam</span>
          <span class="hero-sig-divide"></span>
          <span class="hero-sig-role">Data &amp; AI Engineer · RevStar Consulting</span>
        </div>

        <p class="hero-body">
          Four years turning enterprise problems into working systems: healthcare claims pipelines, multimodal video at scale, agents that talk to databases. <span class="hero-body-gold">AWS Golden Jacket holder</span> with 13 active AWS certifications and 3 active Google Cloud Professional credentials.
        </p>

        <nav class="hero-actions">
          <a class="hero-action" href="#projects">
            <span class="hero-action-arrow">↓</span>
            <span class="hero-action-text">See the work</span>
            <span class="hero-action-rule"></span>
          </a>
          <a class="hero-action" href="#contact">
            <span class="hero-action-arrow">↗</span>
            <span class="hero-action-text">Write to me</span>
            <span class="hero-action-rule"></span>
          </a>
          <a class="hero-action hero-action-quiet" href="https://www.credly.com/users/jothiswaranarumugam" target="_blank" rel="noopener">
            <span class="hero-action-arrow">★</span>
            <span class="hero-action-text">View credentials</span>
            <span class="hero-action-rule"></span>
          </a>
        </nav>
      </div>

      <!-- Bottom proof strip -->
      <footer class="hero-proof">
        <div class="hero-proof-rule"></div>
        <ul class="hero-proof-list">
          <li><span class="hero-proof-num">35<i>+</i></span><span class="hero-proof-cap">Engagements</span></li>
          <li><span class="hero-proof-num">13<i>×</i></span><span class="hero-proof-cap">AWS · Golden Jacket</span></li>
          <li><span class="hero-proof-num">3<i>×</i></span><span class="hero-proof-cap">Google Cloud · Professional</span></li>
          <li><span class="hero-proof-num">93<i>%</i></span><span class="hero-proof-cap">Max cost reduction</span></li>
          <li><span class="hero-proof-num">4<i>+</i></span><span class="hero-proof-cap">Years shipping production AI</span></li>
        </ul>
      </footer>
    </div>
  `;
}

function renderAbout() {
  const d = PORTFOLIO_DATA.personal;
  const container = document.querySelector("#about .section-inner");
  container.innerHTML = `
    <div class="section-label">About</div>
    <div class="section-title">Who I am and <span class="gradient-text">what I do</span></div>
    <div class="about-grid">
      <div class="about-text">
        <p>${d.bio}</p>
        <p class="cta-highlight" style="color: var(--blue); border-left: 3px solid var(--blue); padding-left: 1rem; margin-top: 1.5rem; font-weight: 500;">${d.cta}</p>
      </div>
      <div class="about-stats">
        <div class="stat-card">
          <div class="stat-number" data-value="35" data-suffix="+">0</div>
          <div class="stat-label">Production AI Systems</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-value="16" data-suffix="">0</div>
          <div class="stat-label">Active Cloud Certifications</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-value="93" data-suffix="%">0</div>
          <div class="stat-label">Max Cost Reduction</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-value="4" data-suffix="+">0</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>
    </div>
  `;
}

function renderProjects() {
  const projects = PORTFOLIO_DATA.projects;
  const container = document.querySelector("#projects .section-inner");

  const studiesHtml = projects
    .map((p, i) => `
      <article class="study" style="--study-delay:${i * 80}ms">
        <div class="study-rail">
          <div class="study-num">${String(i + 1).padStart(2, "0")}</div>
          <div class="study-rail-line"></div>
          <div class="study-rail-tag">CASE</div>
        </div>
        <div class="study-body">
          <h3 class="study-name">${p.name}</h3>
          <p class="study-desc">${p.description}</p>
          <div class="study-meta">
            <div class="study-meta-row">
              <span class="study-meta-key">Stack</span>
              <span class="study-meta-val">${p.tech.join(" · ")}</span>
            </div>
            <div class="study-meta-row study-meta-row-metrics">
              <span class="study-meta-key">Impact</span>
              <span class="study-meta-val">
                ${p.metrics.map(m => `<span class="study-metric"><i class="study-metric-num">${m.value}${m.suffix}</i> <i class="study-metric-cap">${m.label}</i></span>`).join('<span class="study-metric-sep">·</span>')}
              </span>
            </div>
          </div>
        </div>
      </article>
    `)
    .join("");

  container.innerHTML = `
    <header class="ed-section-head">
      <div class="ed-eyebrow">
        <span class="ed-eyebrow-line"></span>
        <span class="ed-eyebrow-text">Selected work · ${projects.length} case studies</span>
      </div>
      <h2 class="ed-headline">
        Things I <em>actually</em><br>shipped to production.
      </h2>
    </header>
    <div class="studies">${studiesHtml}</div>
  `;
}

function renderSkills() {
  const skills = PORTFOLIO_DATA.skills;
  const container = document.querySelector("#skills .section-inner");

  const blocks = Object.entries(skills)
    .map(([category, items], i) => {
      const names = items.map(s => `<span class="stack-item">${s.name}</span>`).join('<span class="stack-sep">·</span>');
      return `
        <div class="stack-block" style="--stack-delay:${i * 100}ms">
          <div class="stack-head">
            <span class="stack-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="stack-title">${category}</span>
            <span class="stack-rule"></span>
            <span class="stack-count">${items.length}</span>
          </div>
          <div class="stack-list">${names}</div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `
    <header class="ed-section-head">
      <div class="ed-eyebrow">
        <span class="ed-eyebrow-line"></span>
        <span class="ed-eyebrow-text">The Stack · Production tools</span>
      </div>
      <h2 class="ed-headline">
        Tools I use to <em>actually</em><br>ship the work.
      </h2>
      <p class="ed-subhead">A working stack, not a wish list. Everything below has shipped to production at least once.</p>
    </header>
    <div class="stack">${blocks}</div>
  `;
}

function renderCertifications() {
  const certs = PORTFOLIO_DATA.certifications;
  const container = document.querySelector("#certifications .section-inner");
  const TIER_ORDER = ["professional", "specialty", "associate", "foundational"];
  const TIER_LABELS = {
    professional: "Professional",
    specialty: "Specialty",
    associate: "Associate",
    foundational: "Foundational",
  };

  // Group AWS certs by tier
  const awsByTier = {};
  certs.AWS.forEach((c) => {
    (awsByTier[c.tier] = awsByTier[c.tier] || []).push(c);
  });

  // ── Stamp medallion: large SVG centerpiece ───────────────────────
  const goldenJacketSvg = `
    <svg class="jacket-medal-svg" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="gjGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f9e088" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="#d4af37" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="gjRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f9e088"/>
          <stop offset="40%" stop-color="#d4af37"/>
          <stop offset="80%" stop-color="#8a6f24"/>
          <stop offset="100%" stop-color="#f9e088"/>
        </linearGradient>
        <linearGradient id="gjText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f9e088"/>
          <stop offset="100%" stop-color="#c9a233"/>
        </linearGradient>
        <radialGradient id="gjBody" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stop-color="#221a08"/>
          <stop offset="60%" stop-color="#0e0a04"/>
          <stop offset="100%" stop-color="#050402"/>
        </radialGradient>
        <linearGradient id="gjShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f9e088" stop-opacity="0"/>
          <stop offset="50%" stop-color="#fff5c2" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#f9e088" stop-opacity="0"/>
        </linearGradient>
        <path id="gjArcTop" d="M 80 210 A 130 130 0 0 1 340 210" fill="none"/>
        <path id="gjArcBottom" d="M 80 210 A 130 130 0 0 0 340 210" fill="none"/>
      </defs>

      <!-- Ambient glow -->
      <circle cx="210" cy="210" r="200" fill="url(#gjGlow)"/>

      <!-- Decorative outer rings -->
      <circle cx="210" cy="210" r="178" fill="none" stroke="url(#gjRing)" stroke-width="0.75" opacity="0.45"/>
      <circle cx="210" cy="210" r="170" fill="none" stroke="url(#gjRing)" stroke-width="1.5"/>
      <circle cx="210" cy="210" r="156" fill="none" stroke="url(#gjRing)" stroke-width="0.5" opacity="0.6"/>

      <!-- Twelve hairline star marks (one per AWS cert tier slot) -->
      <g class="jacket-stars" fill="url(#gjRing)">
        ${Array.from({ length: 13 }).map((_, i) => {
          const angle = (i / 13) * Math.PI * 2 - Math.PI / 2;
          const cx = 210 + Math.cos(angle) * 163;
          const cy = 210 + Math.sin(angle) * 163;
          return `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="1.6"/>`;
        }).join("")}
      </g>

      <!-- Inner medallion body -->
      <circle cx="210" cy="210" r="138" fill="url(#gjBody)"/>
      <circle cx="210" cy="210" r="138" fill="none" stroke="url(#gjRing)" stroke-width="1"/>

      <!-- Inner concentric line -->
      <circle cx="210" cy="210" r="118" fill="none" stroke="url(#gjRing)" stroke-width="0.5" opacity="0.55"/>

      <!-- Top arc text: AWS GOLDEN JACKET -->
      <text class="jacket-arc jacket-arc-top" fill="url(#gjText)">
        <textPath href="#gjArcTop" startOffset="50%" text-anchor="middle">★  AWS  GOLDEN  JACKET  ★</textPath>
      </text>

      <!-- Center Roman numeral -->
      <text x="210" y="232" text-anchor="middle" class="jacket-numeral" fill="url(#gjText)">XIII</text>

      <!-- Subtext under numeral -->
      <text x="210" y="262" text-anchor="middle" class="jacket-numeral-cap" fill="url(#gjText)">CERTIFICATIONS</text>

      <!-- Bottom arc text: All Active · 2026 -->
      <text class="jacket-arc jacket-arc-bottom" fill="url(#gjText)">
        <textPath href="#gjArcBottom" startOffset="50%" text-anchor="middle">A L L · A C T I V E · M M X X V I</textPath>
      </text>

      <!-- Shimmer sweep -->
      <circle cx="210" cy="210" r="170" fill="none" stroke="url(#gjShimmer)" stroke-width="2" class="jacket-shimmer"/>
    </svg>
  `;

  // ── Tier wall rendering ──────────────────────────────────────────
  const awsTierBlocks = TIER_ORDER.filter(t => awsByTier[t]).map((tier) => {
    const items = awsByTier[tier];
    const tierBadges = items
      .map((c, idx) => `
        <a class="trophy-badge trophy-badge--${tier}"
           href="${certs.credlyProfile}"
           target="_blank"
           rel="noopener"
           style="--badge-delay:${idx * 60}ms">
          <div class="trophy-badge-shell">
            <img class="trophy-badge-img" src="${c.image}" alt="AWS Certified ${c.name} ${c.suffix}" loading="lazy" decoding="async"/>
          </div>
          <div class="trophy-badge-meta">
            <div class="trophy-badge-name">${c.name}</div>
            <div class="trophy-badge-tier">${c.suffix}</div>
          </div>
        </a>
      `).join("");

    return `
      <div class="tier-block tier-block--${tier}">
        <div class="tier-rule">
          <div class="tier-rule-label">${TIER_LABELS[tier]}</div>
          <div class="tier-rule-line"></div>
          <div class="tier-rule-count">${String(items.length).padStart(2, "0")}</div>
        </div>
        <div class="trophy-grid trophy-grid--${tier}">
          ${tierBadges}
        </div>
      </div>
    `;
  }).join("");

  // ── GCP cert chips (active vs archived) ──────────────────────────
  const gcpChips = certs.GCP.map((c, idx) => `
    <div class="gcp-chip gcp-chip--${c.tier} ${c.active ? "gcp-chip--active" : "gcp-chip--archived"}" style="--chip-delay:${idx * 50}ms">
      <span class="gcp-chip-dot"></span>
      <span class="gcp-chip-name">${c.name}</span>
      <span class="gcp-chip-tier">${c.active ? c.suffix : "Archived · Expired"}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="trophy-eyebrow">
      <span class="trophy-eyebrow-line"></span>
      <span class="trophy-eyebrow-text">Proof of work · ${certs.summary.totalCount} active credentials · verified on Credly</span>
    </div>

    <h2 class="trophy-headline">
      Thirteen <span class="trophy-gold">AWS</span> certifications.<br>
      Seven Google Cloud.<br>
      <em class="trophy-em">All active.</em> All earned.
    </h2>

    <!-- ─── Golden Jacket centerpiece ──────────────────────────── -->
    <div class="jacket-block">
      <div class="jacket-medal" aria-hidden="false">
        ${goldenJacketSvg}
        <div class="jacket-medal-grain"></div>
      </div>

      <div class="jacket-context">
        <div class="jacket-eyebrow">A Rare Achievement</div>
        <h3 class="jacket-title">${certs.goldenJacket.title}</h3>
        <p class="jacket-body">${certs.goldenJacket.caption}</p>

        <dl class="jacket-meta">
          <div class="jacket-meta-row">
            <dt>AWS certifications</dt>
            <dd>${certs.summary.awsCount} active</dd>
          </div>
          <div class="jacket-meta-row">
            <dt>Google Cloud</dt>
            <dd>${certs.summary.gcpCount} active</dd>
          </div>
          <div class="jacket-meta-row">
            <dt>Earliest expiration</dt>
            <dd>${certs.summary.lastExpiration}</dd>
          </div>
          <div class="jacket-meta-row">
            <dt>Verified</dt>
            <dd>Credly · Continuous</dd>
          </div>
        </dl>

        <a class="jacket-verify" href="${certs.goldenJacket.verifyUrl}" target="_blank" rel="noopener">
          <span>Verify on Credly</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- ─── AWS Trophy Wall by tier ────────────────────────────── -->
    <div class="trophy-wall">
      <div class="trophy-wall-header">
        <div class="trophy-wall-logo">AWS</div>
        <div class="trophy-wall-divider"></div>
        <div class="trophy-wall-meta">
          <span class="trophy-wall-count">${certs.summary.awsCount}×</span>
          <span class="trophy-wall-suffix">Amazon Web Services</span>
        </div>
      </div>
      <div class="trophy-wall-body">
        ${awsTierBlocks}
      </div>
    </div>

    <!-- ─── GCP section ─────────────────────────────────────────── -->
    <div class="gcp-section">
      <div class="gcp-header">
        <div class="gcp-logo">G C P</div>
        <div class="gcp-divider"></div>
        <div class="gcp-meta">
          <span class="gcp-count">${certs.summary.gcpCount}×</span>
          <span class="gcp-suffix">Active Professional · ${certs.summary.gcpArchived} archived</span>
        </div>
      </div>
      <div class="gcp-grid">
        ${gcpChips}
      </div>
    </div>
  `;
}

function renderExperience() {
  const exp = PORTFOLIO_DATA.experience;
  const edu = PORTFOLIO_DATA.education;
  const container = document.querySelector("#experience .section-inner");

  const items = exp
    .map((e, i) => `
      <article class="ed-exp" style="--ed-exp-delay:${i * 80}ms">
        <aside class="ed-exp-aside">
          <div class="ed-exp-period">${e.period}</div>
          <div class="ed-exp-loc">${e.location}</div>
        </aside>
        <div class="ed-exp-body">
          <h3 class="ed-exp-role">${e.role}</h3>
          <div class="ed-exp-company">${e.company}</div>
          <ul class="ed-exp-highlights">
            ${e.highlights.map(h => `<li>${h}</li>`).join("")}
          </ul>
        </div>
      </article>
    `).join("");

  const eduHtml = edu ? `
    <article class="ed-exp ed-exp--edu" style="--ed-exp-delay:${exp.length * 80}ms">
      <aside class="ed-exp-aside">
        <div class="ed-exp-period">${edu.period || ""}</div>
        <div class="ed-exp-loc">${edu.location || ""}</div>
      </aside>
      <div class="ed-exp-body">
        <h3 class="ed-exp-role">${edu.degree || edu.name || "Education"}</h3>
        <div class="ed-exp-company">${edu.school || ""}${edu.gpa ? ` · GPA ${edu.gpa}` : ""}</div>
      </div>
    </article>
  ` : "";

  container.innerHTML = `
    <header class="ed-section-head">
      <div class="ed-eyebrow">
        <span class="ed-eyebrow-line"></span>
        <span class="ed-eyebrow-text">Career · ${exp.length} roles since 2021</span>
      </div>
      <h2 class="ed-headline">
        Where I've been <em>building</em><br>before now.
      </h2>
    </header>
    <div class="ed-exp-list">${items}${eduHtml}</div>
  `;
}

function renderContact() {
  const d = PORTFOLIO_DATA.personal;
  const container = document.querySelector("#contact .section-inner");
  container.innerHTML = `
    <div class="section-label">Connect</div>
    <div class="section-title">Let's <span class="gradient-text">talk</span></div>
    <div class="contact-container">
      <p style="color: var(--text-dim); line-height: 1.7; margin-top: 1rem;">
        ${d.cta}
      </p>
      <div class="contact-links">
        <a href="mailto:${d.email}" class="contact-link">
          <div class="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <div class="contact-label">Email</div>
            <div class="contact-value">${d.email}</div>
          </div>
        </a>
        <a href="${d.github}" target="_blank" class="contact-link">
          <div class="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </div>
          <div>
            <div class="contact-label">GitHub</div>
            <div class="contact-value">devjothish</div>
          </div>
        </a>
        <a href="${d.linkedin}" target="_blank" class="contact-link">
          <div class="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <div>
            <div class="contact-label">LinkedIn</div>
            <div class="contact-value">jothiswaran</div>
          </div>
        </a>
        <a href="tel:${d.phone}" class="contact-link">
          <div class="contact-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <div class="contact-label">Phone</div>
            <div class="contact-value">${d.phone}</div>
          </div>
        </a>
      </div>
    </div>
  `;
}

// ============ NAVIGATION ============

function initNavigation() {
  const nav = document.querySelector(".nav");
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  // Scroll state
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Active section highlighting
    const sections = document.querySelectorAll(".section");
    let current = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Mobile hamburger
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu on link click
  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

// ============ CUSTOM CURSOR ============

function initCursor() {
  if (window.innerWidth < 768) return;

  const cursor = document.querySelector(".cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  let cx = 0,
    cy = 0;
  let dx = 0,
    dy = 0;

  document.addEventListener("mousemove", (e) => {
    dx = e.clientX;
    dy = e.clientY;
    cursorDot.style.left = dx + "px";
    cursorDot.style.top = dy + "px";
  });

  function animateCursor() {
    cx += (dx - cx) * 0.15;
    cy += (dy - cy) * 0.15;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    "a, button, .btn, .project-card, .stat-card, .cert-badge, .contact-link"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () =>
      cursor.classList.remove("hovering")
    );
  });
}
