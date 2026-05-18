// ============================================
// THREE-SCENE.JS - Neural Network 3D Visualization
// ============================================

class NeuralNetworkScene {
  constructor() {
    this.isMobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };
    this.scrollY = 0;
    this.nodes = [];
    this.edges = [];
    this.particles = [];
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouseVec = new THREE.Vector2();
    this.hoveredNode = null;

    this.init();
    this.createNetwork();
    this.createParticles();
    this.animate();
    this.addListeners();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050508, 0.035);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 30;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("three-canvas"),
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x050508, 1);
  }

  createNetwork() {
    const nodeCount = this.isMobile ? 40 : 80;
    const spread = this.isMobile ? 20 : 30;
    const nodeGeometry = new THREE.SphereGeometry(0.15, 12, 12);

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().lerpColors(
          new THREE.Color(0xd4af37),
          new THREE.Color(0x8a6f24),
          Math.random()
        ),
        transparent: true,
        opacity: 0.4 + Math.random() * 0.4,
      });

      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.6,
        (Math.random() - 0.5) * spread * 0.5
      );

      mesh.userData = {
        basePos: mesh.position.clone(),
        speed: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        baseOpacity: material.opacity,
        pulseSpeed: 0.5 + Math.random() * 2,
      };

      this.scene.add(mesh);
      this.nodes.push(mesh);
    }

    // Create edges between nearby nodes
    const maxDist = this.isMobile ? 6 : 5;
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.06,
    });

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dist = this.nodes[i].position.distanceTo(
          this.nodes[j].position
        );
        if (dist < maxDist) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            this.nodes[i].position,
            this.nodes[j].position,
          ]);
          const line = new THREE.Line(geometry, edgeMaterial.clone());
          line.userData = {
            nodeA: i,
            nodeB: j,
            baseDist: dist,
            maxDist: maxDist,
          };
          this.scene.add(line);
          this.edges.push(line);
        }
      }
    }
  }

  createParticles() {
    const count = this.isMobile ? 200 : 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      sizes[i] = Math.random() * 2;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.08,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();

    // Smooth mouse interpolation
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Camera movement based on mouse
    this.camera.position.x = this.mouse.x * 3;
    this.camera.position.y = -this.mouse.y * 2 - this.scrollY * 0.005;
    this.camera.lookAt(0, -this.scrollY * 0.003, 0);

    // Animate nodes
    for (const node of this.nodes) {
      const ud = node.userData;
      node.position.x =
        ud.basePos.x + Math.sin(time * ud.speed + ud.phase) * 0.5;
      node.position.y =
        ud.basePos.y + Math.cos(time * ud.speed * 0.7 + ud.phase) * 0.3;
      node.position.z =
        ud.basePos.z + Math.sin(time * ud.speed * 0.5 + ud.phase * 2) * 0.2;

      // Pulse opacity
      node.material.opacity =
        ud.baseOpacity *
        (0.7 + 0.3 * Math.sin(time * ud.pulseSpeed + ud.phase));
    }

    // Update edges
    for (const edge of this.edges) {
      const { nodeA, nodeB, maxDist } = edge.userData;
      const posA = this.nodes[nodeA].position;
      const posB = this.nodes[nodeB].position;
      const dist = posA.distanceTo(posB);

      // Update positions
      const positions = edge.geometry.attributes.position.array;
      positions[0] = posA.x;
      positions[1] = posA.y;
      positions[2] = posA.z;
      positions[3] = posB.x;
      positions[4] = posB.y;
      positions[5] = posB.z;
      edge.geometry.attributes.position.needsUpdate = true;

      // Fade based on distance
      edge.material.opacity = Math.max(0, 0.08 * (1 - dist / maxDist));
    }

    // Rotate particles
    if (this.particleSystem) {
      this.particleSystem.rotation.y = time * 0.02;
      this.particleSystem.rotation.x = time * 0.01;
    }

    // Mouse interaction - brighten nearby nodes
    if (!this.isMobile) {
      this.raycaster.setFromCamera(this.mouseVec, this.camera);
      for (const node of this.nodes) {
        const screenPos = node.position.clone().project(this.camera);
        const dx = screenPos.x - this.mouseVec.x;
        const dy = screenPos.y - this.mouseVec.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.3) {
          const factor = 1 - dist / 0.3;
          node.material.opacity = Math.min(
            1,
            node.userData.baseOpacity + factor * 0.6
          );
          node.scale.setScalar(1 + factor * 0.8);
        } else {
          node.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  addListeners() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("mousemove", (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      this.mouseVec.x = this.targetMouse.x;
      this.mouseVec.y = -this.targetMouse.y;
    });

    window.addEventListener("scroll", () => {
      this.scrollY = window.scrollY;
    });
  }

  dispose() {
    this.renderer.dispose();
    for (const node of this.nodes) {
      node.geometry.dispose();
      node.material.dispose();
    }
    for (const edge of this.edges) {
      edge.geometry.dispose();
      edge.material.dispose();
    }
    if (this.particleSystem) {
      this.particleSystem.geometry.dispose();
      this.particleSystem.material.dispose();
    }
  }
}

// Initialize on load
let neuralScene;
function initThreeScene() {
  neuralScene = new NeuralNetworkScene();
}
