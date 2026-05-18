// ============================================
// THREE-SCENE.JS - Editorial gold-dust ambient drift
// Replaces the cyan/purple neural network with a quiet,
// drifting field of gold motes. Sets the mood without
// competing with the editorial typography.
// ============================================

class EditorialDustScene {
  constructor() {
    this.isMobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.clock = new THREE.Clock();
    this.init();
    this.createDust();
    this.createGlow();
    this.animate();
    this.addListeners();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050402, 0.018);
    this.camera = new THREE.PerspectiveCamera(
      55, window.innerWidth / window.innerHeight, 0.1, 120
    );
    this.camera.position.z = 35;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("three-canvas"),
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x050402, 0);
  }

  createDust() {
    this.layers = [];
    const LAYERS = this.isMobile ? 2 : 3;
    const PER_LAYER = this.isMobile ? 180 : 320;
    const gold = [
      new THREE.Color(0xf9e088),
      new THREE.Color(0xd4af37),
      new THREE.Color(0x8a6f24),
    ];
    for (let l = 0; l < LAYERS; l++) {
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(PER_LAYER * 3);
      const colors = new Float32Array(PER_LAYER * 3);
      const seeds = new Float32Array(PER_LAYER);
      const depth = -8 + l * 12;
      const spread = 70 + l * 8;
      for (let i = 0; i < PER_LAYER; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.85;
        positions[i * 3 + 2] = depth + (Math.random() - 0.5) * 6;
        const c = gold[Math.floor(Math.random() * gold.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        seeds[i] = Math.random() * Math.PI * 2;
      }
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      geom.setAttribute("seed",     new THREE.BufferAttribute(seeds, 1));
      const mat = new THREE.PointsMaterial({
        size: 0.18 + l * 0.05,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.55 - l * 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geom, mat);
      points.userData = { speed: 0.04 + l * 0.025, drift: 0.18 + l * 0.08 };
      this.scene.add(points);
      this.layers.push(points);
    }
  }

  createGlow() {
    const geom = new THREE.PlaneGeometry(180, 180);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x1a1408,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    this.glow = new THREE.Mesh(geom, mat);
    this.glow.position.z = -30;
    this.scene.add(this.glow);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const t = this.clock.getElapsedTime();
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;
    this.layers.forEach((layer, idx) => {
      const pos = layer.geometry.attributes.position;
      const seeds = layer.geometry.attributes.seed;
      const speed = layer.userData.speed;
      const drift = layer.userData.drift;
      for (let i = 0; i < pos.count; i++) {
        const seed = seeds.array[i];
        pos.array[i * 3 + 1] += speed * 0.012;
        pos.array[i * 3] += Math.sin(t * 0.4 + seed) * 0.0035 * drift;
        if (pos.array[i * 3 + 1] > 36) {
          pos.array[i * 3 + 1] = -36;
          pos.array[i * 3] = (Math.random() - 0.5) * (70 + idx * 8);
        }
      }
      pos.needsUpdate = true;
      layer.position.x = this.mouse.x * (0.6 + idx * 0.3);
      layer.position.y = -this.scrollY * 0.0008 * (1 + idx * 0.3);
    });
    this.camera.position.z = 35 + Math.sin(t * 0.18) * 0.6;
    this.renderer.render(this.scene, this.camera);
  }

  addListeners() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
    window.addEventListener("mousemove", (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 4;
      this.targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 4;
    });
    window.addEventListener("scroll", () => {
      this.scrollY = window.scrollY;
    }, { passive: true });
  }
}

function initThreeScene() {
  if (typeof THREE === "undefined") return;
  new EditorialDustScene();
}

// preserve old name in case anything still references it
const NeuralNetworkScene = EditorialDustScene;
