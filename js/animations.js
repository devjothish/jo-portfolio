// ============================================
// ANIMATIONS.JS - GSAP Scroll Animations
// ============================================

function initAnimations() {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero Entrance ---
  const heroTl = gsap.timeline({ delay: 0.5 });
  heroTl
    .to(".hero-greeting", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .to(
      ".hero-name",
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    )
    .to(
      ".hero-title",
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .to(
      ".hero-tagline",
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .to(
      ".hero-cta",
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

  // --- Section Labels + Titles ---
  gsap.utils.toArray(".section-label").forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".section-title").forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    });
  });

  // --- About Section ---
  gsap.utils.toArray(".about-text p").forEach((p, i) => {
    gsap.to(p, {
      scrollTrigger: {
        trigger: p,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".stat-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: "back.out(1.2)",
    });
  });

  // --- Stat Counter Animation ---
  gsap.utils.toArray(".stat-number").forEach((num) => {
    const target = parseFloat(num.dataset.value);
    const suffix = num.dataset.suffix || "";
    ScrollTrigger.create({
      trigger: num,
      start: "top 90%",
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              num.textContent =
                (Number.isInteger(target)
                  ? Math.round(this.targets()[0].val)
                  : this.targets()[0].val.toFixed(1)) + suffix;
            },
          }
        );
      },
      once: true,
    });
  });

  // --- Project Cards ---
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
    });
  });

  // --- Project Metric Counters ---
  gsap.utils.toArray(".metric-value").forEach((el) => {
    const target = parseFloat(el.dataset.value);
    const suffix = el.dataset.suffix || "";
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: function () {
              const current = this.targets()[0].val;
              const display = target >= 100
                ? Math.round(current)
                : target >= 1
                ? Math.round(current * 10) / 10
                : current.toFixed(1);
              el.innerHTML =
                display +
                (suffix
                  ? '<span class="suffix">' + suffix + "</span>"
                  : "");
            },
          }
        );
      },
      once: true,
    });
  });

  // --- Skills ---
  gsap.utils.toArray(".skill-category").forEach((cat, i) => {
    gsap.to(cat, {
      scrollTrigger: {
        trigger: cat,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: "power3.out",
    });
  });

  // Skill bars
  gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
    ScrollTrigger.create({
      trigger: bar,
      start: "top 90%",
      onEnter: () => {
        gsap.to(bar, {
          width: bar.dataset.level + "%",
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2,
        });
      },
      once: true,
    });
  });

  // --- Certifications ---
  gsap.utils.toArray(".cert-badge").forEach((badge, i) => {
    gsap.to(badge, {
      scrollTrigger: {
        trigger: badge,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: i * 0.05,
      ease: "back.out(1.5)",
    });
  });

  // --- Timeline ---
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power3.out",
    });
  });

  // Education card
  gsap.to(".education-card", {
    scrollTrigger: {
      trigger: ".education-card",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  // --- Contact ---
  gsap.utils.toArray(".contact-link").forEach((link, i) => {
    gsap.to(link, {
      scrollTrigger: {
        trigger: link,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: "back.out(1.2)",
    });
  });
}
