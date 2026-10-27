import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RotateCw, Grid, Sparkles, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

interface AIAssistant3DProps {
  onOpenChat?: () => void;
  activeSection?: string;
}

export const AIAssistant3D: React.FC<AIAssistant3DProps> = ({ onOpenChat, activeSection = 'home' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [currentMood, setCurrentMood] = useState<'cyan' | 'mint' | 'gold' | 'violet'>('cyan');
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  // Mutable refs for Three.js instances to avoid re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
    rim: THREE.DirectionalLight;
    particles: THREE.Points;
  } | null>(null);
  const materialsRef = useRef<Record<string, THREE.Material>>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software rendering
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060f, 0.08);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setClearColor(0x04060f, 0); // Transparent so particles behind show through
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enabled = false;
    controls.maxPolarAngle = Math.PI * 0.65;
    controls.minPolarAngle = Math.PI * 0.35;
    controlsRef.current = controls;

    // 2. Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x283854, 0x070c1b, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xdff8ff, 2.2);
    keyLight.position.set(4.5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 1.8);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    rimLight.position.set(1.5, 4.5, -4.5);
    scene.add(rimLight);

    // 3. Procedural Iris Texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
    grad.addColorStop(0, '#020510');
    grad.addColorStop(0.25, '#082f49');
    grad.addColorStop(0.65, '#0284c7');
    grad.addColorStop(0.95, '#38bdf8');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(angle) * 40, 256 + Math.sin(angle) * 40);
      ctx.lineTo(256 + Math.cos(angle) * 230, 256 + Math.sin(angle) * 230);
      ctx.stroke();
    }
    [70, 130, 190].forEach(r => {
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.fillStyle = '#010309';
    ctx.beginPath();
    ctx.arc(256, 256, 45, 0, Math.PI * 2);
    ctx.fill();

    const irisTexture = new THREE.CanvasTexture(canvas);
    irisTexture.colorSpace = THREE.SRGBColorSpace;

    // 4. Character Materials
    const materials = {
      faceCeramic: new THREE.MeshPhysicalMaterial({
        color: 0xd9e3f0,
        roughness: 0.35,
        metalness: 0.12,
        clearcoat: 0.55,
        clearcoatRoughness: 0.22,
      }),
      brushedTitanium: new THREE.MeshStandardMaterial({
        color: 0x8a99b3,
        roughness: 0.22,
        metalness: 0.85
      }),
      darkCarbon: new THREE.MeshStandardMaterial({
        color: 0x141a28,
        roughness: 0.5,
        metalness: 0.7
      }),
      emissiveCyan: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.5,
        roughness: 0.2
      }),
      emissiveMint: new THREE.MeshStandardMaterial({
        color: 0x00ffaa,
        emissive: 0x00ffaa,
        emissiveIntensity: 1.6,
        roughness: 0.2
      }),
      irisMat: new THREE.MeshStandardMaterial({
        map: irisTexture,
        roughness: 0.2,
        metalness: 0.1
      }),
      corneaGlass: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.04,
        transmission: 0.88,
        transparent: true,
        opacity: 0.9,
        ior: 1.48,
        clearcoat: 1.0
      })
    };
    materialsRef.current = materials;

    // 5. Construct 3D AI Assistant
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    const headGroup = new THREE.Group();
    characterGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // Cranium
    const craniumGeo = new THREE.SphereGeometry(1.05, 32, 28, 0, Math.PI * 2, 0, Math.PI * 0.62);
    const craniumMesh = new THREE.Mesh(craniumGeo, materials.faceCeramic);
    craniumMesh.position.set(0, 0.45, 0);
    craniumMesh.scale.set(0.92, 1.05, 1.02);
    headGroup.add(craniumMesh);

    // Cheekbones & Mid-Face
    const midFaceGeo = new THREE.CylinderGeometry(0.85, 0.68, 0.75, 24);
    const midFaceMesh = new THREE.Mesh(midFaceGeo, materials.faceCeramic);
    midFaceMesh.position.set(0, 0.05, 0.18);
    midFaceMesh.scale.set(1.0, 1.0, 0.85);
    headGroup.add(midFaceMesh);

    // Sharp Jawline & Chin
    const jawShape = new THREE.Shape();
    jawShape.moveTo(-0.68, 0.2);
    jawShape.lineTo(-0.55, -0.45);
    jawShape.lineTo(-0.25, -0.75);
    jawShape.lineTo(0.25, -0.75);
    jawShape.lineTo(0.55, -0.45);
    jawShape.lineTo(0.68, 0.2);
    jawShape.closePath();

    const jawGeo = new THREE.ExtrudeGeometry(jawShape, { depth: 0.45, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 });
    jawGeo.center();
    const jawMesh = new THREE.Mesh(jawGeo, materials.brushedTitanium);
    jawMesh.position.set(0, -0.45, 0.28);
    jawMesh.scale.set(0.95, 0.9, 0.8);
    headGroup.add(jawMesh);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.12, 0.45, 4);
    const noseMesh = new THREE.Mesh(noseGeo, materials.faceCeramic);
    noseMesh.rotation.x = Math.PI * 0.85;
    noseMesh.rotation.y = Math.PI * 0.25;
    noseMesh.position.set(0, 0.12, 0.88);
    headGroup.add(noseMesh);

    // Mouth
    const mouthGeo = new THREE.BoxGeometry(0.36, 0.035, 0.06);
    const mouthMesh = new THREE.Mesh(mouthGeo, materials.brushedTitanium);
    mouthMesh.position.set(0, -0.26, 0.82);
    headGroup.add(mouthMesh);

    // Eyes
    function createEye(side: number) {
      const eyeUnit = new THREE.Group();
      eyeUnit.position.set(side * 0.32, 0.22, 0.72);

      const scleraGeo = new THREE.SphereGeometry(0.14, 20, 20);
      const scleraMesh = new THREE.Mesh(scleraGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 }));
      eyeUnit.add(scleraMesh);

      const irisGeo = new THREE.CircleGeometry(0.085, 24);
      const irisMesh = new THREE.Mesh(irisGeo, materials.irisMat);
      irisMesh.position.set(0, 0, 0.138);
      eyeUnit.add(irisMesh);

      const corneaGeo = new THREE.SphereGeometry(0.145, 20, 20);
      const corneaMesh = new THREE.Mesh(corneaGeo, materials.corneaGlass);
      eyeUnit.add(corneaMesh);

      const lidGeo = new THREE.TorusGeometry(0.15, 0.015, 8, 24, Math.PI);
      const lidMesh = new THREE.Mesh(lidGeo, materials.brushedTitanium);
      lidMesh.rotation.z = Math.PI;
      lidMesh.position.set(0, 0.03, 0.1);
      eyeUnit.add(lidMesh);

      return eyeUnit;
    }

    const leftEye = createEye(-1);
    const rightEye = createEye(1);
    headGroup.add(leftEye);
    headGroup.add(rightEye);

    // Ears / Temporal Units
    [-1, 1].forEach(side => {
      const earGroup = new THREE.Group();
      earGroup.position.set(side * 0.95, 0.18, 0.05);

      const earPlateGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.12, 16);
      earPlateGeo.rotateZ(Math.PI / 2);
      const earPlateMesh = new THREE.Mesh(earPlateGeo, materials.brushedTitanium);
      earGroup.add(earPlateMesh);

      const earCoreGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.14, 16);
      earCoreGeo.rotateZ(Math.PI / 2);
      const earCoreMesh = new THREE.Mesh(earCoreGeo, materials.emissiveCyan);
      earGroup.add(earCoreMesh);

      headGroup.add(earGroup);

      // Temple cyber inlay
      const lineGeo = new THREE.BoxGeometry(0.015, 0.35, 0.55);
      const lineMesh = new THREE.Mesh(lineGeo, materials.emissiveMint);
      lineMesh.position.set(side * 0.92, 0.45, 0.15);
      lineMesh.rotation.z = side * 0.12;
      headGroup.add(lineMesh);
    });

    // Neck & Spine
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, -0.9, 0);
    characterGroup.add(neckGroup);

    for (let i = 0; i < 4; i++) {
      const vertGeo = new THREE.CylinderGeometry(0.36 - i * 0.02, 0.38 - i * 0.02, 0.12, 18);
      const vertMesh = new THREE.Mesh(vertGeo, i % 2 === 0 ? materials.darkCarbon : materials.brushedTitanium);
      vertMesh.position.set(0, 0.2 - i * 0.16, 0);
      neckGroup.add(vertMesh);
    }

    [-1, 1].forEach(side => {
      const strutGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.65, 12);
      const strutMesh = new THREE.Mesh(strutGeo, materials.brushedTitanium);
      strutMesh.position.set(side * 0.48, 0.05, 0.12);
      strutMesh.rotation.z = side * -0.22;
      neckGroup.add(strutMesh);
    });

    // Clavicle & Collar
    const collarShape = new THREE.Shape();
    collarShape.moveTo(-1.4, -0.6);
    collarShape.lineTo(-0.8, 0.1);
    collarShape.lineTo(0.8, 0.1);
    collarShape.lineTo(1.4, -0.6);
    collarShape.lineTo(0, -0.85);
    collarShape.closePath();

    const collarGeo = new THREE.ExtrudeGeometry(collarShape, { depth: 0.65, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06 });
    collarGeo.center();
    const collarMesh = new THREE.Mesh(collarGeo, materials.darkCarbon);
    collarMesh.position.set(0, -1.35, 0);
    characterGroup.add(collarMesh);

    // Torso power core
    const coreNodeGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const coreNodeMesh = new THREE.Mesh(coreNodeGeo, materials.emissiveCyan);
    coreNodeMesh.position.set(0, -1.18, 0.42);
    characterGroup.add(coreNodeMesh);

    // Halo Orbital Ring
    const haloGeo = new THREE.TorusGeometry(1.65, 0.015, 12, 64);
    const haloMesh = new THREE.Mesh(haloGeo, materials.emissiveCyan);
    haloMesh.rotation.x = Math.PI * 0.42;
    haloMesh.rotation.y = Math.PI * 0.12;
    haloMesh.position.set(0, 0.2, 0);
    characterGroup.add(haloMesh);

    // Subtle Atmospheric Dust
    const pCount = 100;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    scene.add(pPoints);

    lightsRef.current = {
      key: keyLight,
      fill: fillLight,
      rim: rimLight,
      particles: pPoints,
    };

    // 6. Scroll Choreography Definition
    const keyframes = [
      { p: 0.00, x: 1.85, y: -0.15, z: 0.0, scale: 1.45, rotY: -0.32, rotX: 0.04 }, // #home (Hero)
      { p: 0.18, x: -1.95, y: -0.10, z: 0.1, scale: 1.35, rotY: 0.35, rotX: -0.02 }, // #about (About)
      { p: 0.36, x: 2.35,  y: 0.35,  z: -0.6, scale: 0.95, rotY: -0.38, rotX: 0.06 }, // #services (Services)
      { p: 0.65, x: -2.40, y: 0.05,  z: -0.2, scale: 1.10, rotY: 0.44, rotX: 0.03 },  // #projects (Projects - kept at left border)
      { p: 0.85, x: 2.40,  y: 0.45,  z: -0.6, scale: 0.95, rotY: -0.40, rotX: 0.08 },  // #skills (Skills)
      { p: 1.00, x: 1.65,  y: -0.20, z: 0.1, scale: 1.40, rotY: -0.18, rotX: 0.02 },  // #contact (Contact)
    ];

    function smoothStep(t: number) {
      return t * t * (3 - 2 * t);
    }

    function getKeyframeTarget(progress: number) {
      const cp = Math.max(0, Math.min(1, progress));
      let idx = 0;
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (cp >= keyframes[i].p && cp <= keyframes[i + 1].p) {
          idx = i;
          break;
        }
      }
      const k1 = keyframes[idx];
      const k2 = keyframes[idx + 1];
      const t = (cp - k1.p) / (k2.p - k1.p);
      const easeT = smoothStep(t);

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      let tx = THREE.MathUtils.lerp(k1.x, k2.x, easeT);
      let ty = THREE.MathUtils.lerp(k1.y, k2.y, easeT);
      let tz = THREE.MathUtils.lerp(k1.z, k2.z, easeT);
      let tScale = THREE.MathUtils.lerp(k1.scale, k2.scale, easeT);
      let tRotY = THREE.MathUtils.lerp(k1.rotY, k2.rotY, easeT);
      let tRotX = THREE.MathUtils.lerp(k1.rotX, k2.rotX, easeT);

      if (isMobile) {
        tx = tx * 0.2;
        ty = ty + 0.35;
        tScale = tScale * 0.65;
      } else if (isTablet) {
        tx = tx * 0.65;
        tScale = tScale * 0.85;
      }

      return { x: tx, y: ty, z: tz, scale: tScale, rotY: tRotY, rotX: tRotX };
    }

    // 7. Mouse Pointer Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Atmospheric elements
      pPoints.rotation.y = time * 0.02;
      haloMesh.rotation.z = time * 0.15;

      // Natural blink
      blinkTimer += delta;
      if (blinkTimer > 4.5 + Math.sin(time) * 1.5) {
        isBlinking = true;
        blinkTimer = 0;
      }
      if (isBlinking) {
        leftEye.scale.y = THREE.MathUtils.damp(leftEye.scale.y, 0.1, 20, delta);
        rightEye.scale.y = THREE.MathUtils.damp(rightEye.scale.y, 0.1, 20, delta);
        if (leftEye.scale.y < 0.15) isBlinking = false;
      } else {
        leftEye.scale.y = THREE.MathUtils.damp(leftEye.scale.y, 1.0, 15, delta);
        rightEye.scale.y = THREE.MathUtils.damp(rightEye.scale.y, 1.0, 15, delta);
      }

      if (controls.enabled) {
        controls.update();
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        const target = getKeyframeTarget(progress);

        characterGroup.position.x = THREE.MathUtils.damp(characterGroup.position.x, target.x, 3.8, delta);
        characterGroup.position.y = THREE.MathUtils.damp(characterGroup.position.y, target.y, 3.8, delta);
        characterGroup.position.z = THREE.MathUtils.damp(characterGroup.position.z, target.z, 3.8, delta);

        const currentScale = characterGroup.scale.x;
        const dampedScale = THREE.MathUtils.damp(currentScale, target.scale, 3.8, delta);
        characterGroup.scale.set(dampedScale, dampedScale, dampedScale);

        characterGroup.rotation.y = THREE.MathUtils.damp(characterGroup.rotation.y, target.rotY, 3.8, delta);
        characterGroup.rotation.x = THREE.MathUtils.damp(characterGroup.rotation.x, target.rotX, 3.8, delta);

        // Breathing idle & gaze
        headGroup.position.y = Math.sin(time * 1.6) * 0.04;
        headGroup.rotation.z = Math.cos(time * 1.2) * 0.015;

        const gazeY = mouseX * 0.22;
        const gazeX = -mouseY * 0.15;
        headGroup.rotation.y = THREE.MathUtils.damp(headGroup.rotation.y, gazeY, 4.5, delta);
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, gazeX, 4.5, delta);

        // Eye tracking
        const eyeY = mouseX * 0.35;
        const eyeX = -mouseY * 0.25;
        leftEye.rotation.y = THREE.MathUtils.damp(leftEye.rotation.y, eyeY, 8.0, delta);
        leftEye.rotation.x = THREE.MathUtils.damp(leftEye.rotation.x, eyeX, 8.0, delta);
        rightEye.rotation.y = THREE.MathUtils.damp(rightEye.rotation.y, eyeY, 8.0, delta);
        rightEye.rotation.x = THREE.MathUtils.damp(rightEye.rotation.x, eyeX, 8.0, delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries & Materials
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      irisTexture.dispose();
    };
  }, []);

  // Handle Mood Changes
  const handleMoodSelect = (mood: 'cyan' | 'mint' | 'gold' | 'violet') => {
    setCurrentMood(mood);
    const lights = lightsRef.current;
    if (!lights) return;

    const palettes = {
      cyan: { key: 0xdff8ff, fill: 0x0284c7, rim: 0x38bdf8, p: 0x38bdf8 },
      mint: { key: 0xfff7ea, fill: 0x059669, rim: 0x00ffaa, p: 0x00ffaa },
      gold: { key: 0xffedd5, fill: 0xd97706, rim: 0xfacc15, p: 0xfacc15 },
      violet: { key: 0xfae8ff, fill: 0x7c3aed, rim: 0xc084fc, p: 0xc084fc }
    };
    const p = palettes[mood];
    lights.key.color.setHex(p.key);
    lights.fill.color.setHex(p.fill);
    lights.rim.color.setHex(p.rim);
    (lights.particles.material as THREE.PointsMaterial).color.setHex(p.p);
  };

  // Toggle 360 Orbit Mode
  const toggleOrbitMode = () => {
    const nextState = !isOrbitMode;
    setIsOrbitMode(nextState);
    if (controlsRef.current) {
      controlsRef.current.enabled = nextState;
    }
    const container = mountRef.current;
    if (container) {
      container.style.pointerEvents = nextState ? 'auto' : 'none';
      container.style.cursor = nextState ? 'grab' : 'default';
    }
  };

  // Toggle Wireframe
  const toggleWireframe = () => {
    const nextState = !wireframeMode;
    setWireframeMode(nextState);
    Object.values(materialsRef.current).forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as any).wireframe = nextState;
      }
    });
  };

  return (
    <>
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none -z-10 w-screen h-screen overflow-hidden"
        aria-hidden="true"
      />

      {/* Floating Companion Control HUD Dock */}
      <aside
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 w-[min(92vw,780px)] ${
          isHudCollapsed ? 'translate-y-[calc(100%+16px)]' : 'translate-y-0'
        }`}
        aria-label="3D Assistant Controls"
      >
        {/* Toggle Collapse Tab */}
        <button
          onClick={() => setIsHudCollapsed(!isHudCollapsed)}
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-mono text-gray-400 bg-[#070c1b]/85 border border-white/10 border-b-0 rounded-t-lg backdrop-blur-md hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
          aria-label={isHudCollapsed ? 'Expand Assistant Controls' : 'Collapse Assistant Controls'}
        >
          {isHudCollapsed ? <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>3D AI Companion</span>
        </button>

        <div className="glass-card rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.6)] border border-cyan-500/25">
          {/* Identity & Mood */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AETHER-01</span>
            </div>

            <div className="w-px h-4 bg-white/15" />

            {/* Lighting Mood Swatches */}
            <div className="flex items-center gap-1.5" title="Lighting Mood Presets">
              <button
                onClick={() => handleMoodSelect('cyan')}
                className={`w-4 h-4 rounded-full bg-cyan-400 border transition-transform ${
                  currentMood === 'cyan' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Cyan lighting"
              />
              <button
                onClick={() => handleMoodSelect('mint')}
                className={`w-4 h-4 rounded-full bg-[#00ffaa] border transition-transform ${
                  currentMood === 'mint' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Mint lighting"
              />
              <button
                onClick={() => handleMoodSelect('gold')}
                className={`w-4 h-4 rounded-full bg-amber-400 border transition-transform ${
                  currentMood === 'gold' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Gold lighting"
              />
              <button
                onClick={() => handleMoodSelect('violet')}
                className={`w-4 h-4 rounded-full bg-purple-500 border transition-transform ${
                  currentMood === 'violet' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Violet lighting"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleOrbitMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                isOrbitMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.25)]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
              title="Inspect assistant with 360 degree rotation"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isOrbitMode ? 'Exit Orbit' : '360° View'}</span>
            </button>

            <button
              onClick={toggleWireframe}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                wireframeMode
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400/60'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle holographic wireframe mesh"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Holo Grid</span>
            </button>

            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-black bg-gradient-to-r from-cyan-400 to-[#00ffaa] hover:shadow-[0_0_16px_rgba(0,255,255,0.4)] flex items-center gap-1.5 transition-all"
                title="Chat with Rayen's AI Companion"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AIAssistant3D;
