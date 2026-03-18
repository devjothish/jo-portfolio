// ============================================
// MAIN.JS - Entry point, DOM rendering, navigation
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Render all sections ---
  renderHero();
  renderAbout();
  renderProjects();
  renderSkills();
  renderCertifications();
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
  const d = PORTFOLIO_DATA.personal;
  document.getElementById("hero").innerHTML = `
    <div class="hero-content">
      <p class="hero-greeting">Hello, I'm</p>
      <h1 class="hero-name">${d.name}</h1>
      <p class="hero-title">${d.title}</p>
      <p class="hero-tagline">${d.tagline}</p>
      <div class="hero-cta">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="#contact" class="btn btn-outline">Get in Touch</a>
      </div>
    </div>
    <div class="hero-scroll-indicator">
      <div class="scroll-line"></div>
      <span class="scroll-text">Scroll</span>
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
          <div class="stat-number" data-value="30" data-suffix="+">0</div>
          <div class="stat-label">Production AI Systems</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-value="13" data-suffix="">0</div>
          <div class="stat-label">Cloud Certifications</div>
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

  const projectIcons = {
    mesh: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/><line x1="5" y1="19" x2="19" y2="19"/></svg>',
    video: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    transaction: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    sql: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    data: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    voice: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  };

  const cardsHtml = projects
    .map(
      (p) => `
    <div class="project-card" style="--project-color: ${p.color}">
      <div class="project-header">
        <div class="project-icon" style="color: ${p.color}">${projectIcons[p.icon] || ""}</div>
        <div class="project-impact">Impact ${p.impact}/100</div>
      </div>
      <h3 class="project-name">${p.name}</h3>
      <p class="project-desc">${p.description}</p>
      <div class="project-tech">
        ${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
      <div class="project-metrics">
        ${p.metrics
          .map(
            (m) => `
          <div class="metric">
            <div class="metric-value" data-value="${m.value}" data-suffix="${m.suffix}">0</div>
            <div class="metric-label">${m.label}</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");

  container.innerHTML = `
    <div class="section-label">Work</div>
    <div class="section-title">Things I've <span class="gradient-text">built and shipped</span></div>
    <div class="projects-grid">${cardsHtml}</div>
  `;
}

function renderSkills() {
  const skills = PORTFOLIO_DATA.skills;
  const container = document.querySelector("#skills .section-inner");

  const categoryIcons = {
    "AI / ML": '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    Cloud: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    Backend: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    Frontend: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  };

  const categoriesHtml = Object.entries(skills)
    .map(
      ([category, items]) => `
    <div class="skill-category">
      <div class="category-header">
        <div class="category-icon">${categoryIcons[category] || ""}</div>
        <div class="category-name">${category}</div>
      </div>
      <div class="skill-list">
        ${items
          .map(
            (s) => `
          <div class="skill-item">
            <span class="skill-name">${s.name}</span>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${s.level}"></div>
            </div>
            <span class="skill-percent">${s.level}%</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");

  container.innerHTML = `
    <div class="section-label">Skills</div>
    <div class="section-title">Technology <span class="gradient-text">Stack</span></div>
    <div class="skills-container">${categoriesHtml}</div>
  `;
}

function renderCertifications() {
  const certs = PORTFOLIO_DATA.certifications;
  const container = document.querySelector("#certifications .section-inner");

  function renderCloud(provider, data, count) {
    const isAws = provider === "AWS";
    return `
      <div class="cert-cloud">
        <div class="cert-cloud-header">
          <div class="cert-cloud-logo ${isAws ? "aws" : "gcp"}">${provider}</div>
          <div class="cert-cloud-title">Certifications</div>
          <div class="cert-cloud-count">${count}x Certified</div>
        </div>
        <div class="certs-grid">
          ${data
            .map(
              (c) => `
            <div class="cert-badge ${isAws ? "aws" : "gcp"}">
              <div class="cert-tier ${c.tier}">${c.tier}</div>
              <div class="cert-name">${c.name}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="section-label">Credentials</div>
    <div class="section-title"><span class="gradient-text">13</span> Cloud Certifications</div>
    <div class="certs-wrapper">
      ${renderCloud("AWS", certs.AWS, 6)}
      ${renderCloud("GCP", certs.GCP, 7)}
    </div>
  `;
}

function renderExperience() {
  const exp = PORTFOLIO_DATA.experience;
  const edu = PORTFOLIO_DATA.education;
  const container = document.querySelector("#experience .section-inner");

  const timelineHtml = exp
    .map(
      (e) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-header">
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <div class="timeline-meta">
          <span>${e.period}</span>
          <span>${e.location}</span>
        </div>
      </div>
      <ul class="timeline-highlights">
        ${e.highlights.map((h) => `<li>${h}</li>`).join("")}
      </ul>
    </div>
  `
    )
    .join("");

  container.innerHTML = `
    <div class="section-label">Journey</div>
    <div class="section-title">Experience & <span class="gradient-text">Education</span></div>
    <div class="timeline">${timelineHtml}</div>
    <div class="education-card">
      <div class="education-degree">${edu.degree}</div>
      <div class="education-school">${edu.school}</div>
      <div class="education-meta">${edu.period} &middot; ${edu.location} &middot; GPA: ${edu.gpa}</div>
    </div>
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
