import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RotateCw, Grid, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export type AssistantMood = 'cyan' | 'mint' | 'gold' | 'violet';
export type AssistantState = 'idle' | 'opened' | 'submitted' | 'thinking' | 'completed';

interface AIAssistant3DProps {
  onOpenChat?: () => void;
  activeSection?: string;
  isChatOpen?: boolean;
  assistantState?: AssistantState;
}

export const AIAssistant3D: React.FC<AIAssistant3DProps> = ({
  onOpenChat,
  activeSection = 'home',
  isChatOpen = false,
  assistantState = 'idle'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [currentMood, setCurrentMood] = useState<AssistantMood>('cyan');
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  // Mutable refs to prevent unnecessary React re-renders and memory leaks
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const leftEyeRef = useRef<THREE.Group | null>(null);
  const rightEyeRef = useRef<THREE.Group | null>(null);
  const mouthGroupRef = useRef<THREE.Group | null>(null);
  const blushGroupRef = useRef<THREE.Group | null>(null);
  const haloMeshRef = useRef<THREE.Mesh | null>(null);
  const earLeftRef = useRef<THREE.Group | null>(null);
  const earRightRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
    rim: THREE.DirectionalLight;
    particles: THREE.Points;
  } | null>(null);
  const materialsRef = useRef<Record<string, THREE.Material>>({});

  // Keep latest props in refs for animation loop
  const stateRef = useRef<AssistantState>(assistantState);
  stateRef.current = assistantState;

  const isChatOpenRef = useRef<boolean>(isChatOpen);
  isChatOpenRef.current = isChatOpen;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software rendering (SwiftShader, llvmpipe, softpipe, etc.)
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    renderer.setClearColor(0x04060f, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const isMobileDevice = window.innerWidth < 768;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : isMobileDevice ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 360 Inspection Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enabled = false;
    controls.maxPolarAngle = Math.PI * 0.65;
    controls.minPolarAngle = Math.PI * 0.35;
    controlsRef.current = controls;

    // 2. 3-Point Studio Lighting Rig with Soft Studio Tones
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

    // 3. Cute Cybernetic Iris Texture with Concentric Rings & Sparkle Dot
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(256, 256, 12, 256, 256, 256);
    grad.addColorStop(0, '#03081a');
    grad.addColorStop(0.2, '#0c4a6e');
    grad.addColorStop(0.55, '#0284c7');
    grad.addColorStop(0.85, '#38bdf8');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(angle) * 35, 256 + Math.sin(angle) * 35);
      ctx.lineTo(256 + Math.cos(angle) * 230, 256 + Math.sin(angle) * 230);
      ctx.stroke();
    }
    [65, 120, 180].forEach((r) => {
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    // Deep center pupil
    ctx.fillStyle = '#010309';
    ctx.beginPath();
    ctx.arc(256, 256, 42, 0, Math.PI * 2);
    ctx.fill();

    // Cute specular reflection highlight sparkle in eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(205, 195, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(310, 310, 14, 0, Math.PI * 2);
    ctx.fill();

    const irisTexture = new THREE.CanvasTexture(canvas);
    irisTexture.colorSpace = THREE.SRGBColorSpace;

    // 4. Character Materials
    const materials = {
      faceCeramic: new THREE.MeshPhysicalMaterial({
        color: 0xe0e9f5,
        roughness: 0.32,
        metalness: 0.1,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2
      }),
      brushedTitanium: new THREE.MeshStandardMaterial({
        color: 0x8a9bb8,
        roughness: 0.22,
        metalness: 0.85
      }),
      darkCarbon: new THREE.MeshStandardMaterial({
        color: 0x121724,
        roughness: 0.45,
        metalness: 0.75
      }),
      emissiveCyan: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.6,
        roughness: 0.2
      }),
      emissiveMint: new THREE.MeshStandardMaterial({
        color: 0x00ffaa,
        emissive: 0x00ffaa,
        emissiveIntensity: 1.6,
        roughness: 0.2
      }),
      emissiveBlush: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity: 0.85
      }),
      irisMat: new THREE.MeshStandardMaterial({
        map: irisTexture,
        roughness: 0.18,
        metalness: 0.15
      }),
      corneaGlass: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.04,
        transmission: 0.88,
        transparent: true,
        opacity: 0.92,
        ior: 1.48,
        clearcoat: 1.0
      })
    };
    materialsRef.current = materials;

    // 5. Construct Smaller, Cuter 3D AI Companion
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    const headGroup = new THREE.Group();
    characterGroup.add(headGroup);
    headGroupRef.current = headGroup;

    // Cranium: Smoothed, compact proportions
    const craniumGeo = new THREE.SphereGeometry(0.92, 32, 28, 0, Math.PI * 2, 0, Math.PI * 0.65);
    const craniumMesh = new THREE.Mesh(craniumGeo, materials.faceCeramic);
    craniumMesh.position.set(0, 0.42, 0);
    craniumMesh.scale.set(0.94, 1.02, 1.0);
    headGroup.add(craniumMesh);

    // Cheekbones & Mid-Face: Soft, friendly curvature
    const midFaceGeo = new THREE.CylinderGeometry(0.76, 0.62, 0.68, 28);
    const midFaceMesh = new THREE.Mesh(midFaceGeo, materials.faceCeramic);
    midFaceMesh.position.set(0, 0.05, 0.16);
    midFaceMesh.scale.set(1.0, 1.0, 0.86);
    headGroup.add(midFaceMesh);

    // Rounded, Cute Jawline & Chin
    const jawShape = new THREE.Shape();
    jawShape.moveTo(-0.58, 0.18);
    jawShape.quadraticCurveTo(-0.50, -0.22, -0.32, -0.48);
    jawShape.quadraticCurveTo(-0.16, -0.58, 0, -0.60);
    jawShape.quadraticCurveTo(0.16, -0.58, 0.32, -0.48);
    jawShape.quadraticCurveTo(0.50, -0.22, 0.58, 0.18);
    jawShape.closePath();

    const jawGeo = new THREE.ExtrudeGeometry(jawShape, {
      depth: 0.40,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.07,
      bevelThickness: 0.07
    });
    jawGeo.center();
    const jawMesh = new THREE.Mesh(jawGeo, materials.brushedTitanium);
    jawMesh.position.set(0, -0.38, 0.24);
    jawMesh.scale.set(0.95, 0.9, 0.8);
    headGroup.add(jawMesh);

    // Subtle Cute Companion Nose
    const noseGeo = new THREE.ConeGeometry(0.065, 0.22, 12);
    const noseMesh = new THREE.Mesh(noseGeo, materials.faceCeramic);
    noseMesh.rotation.x = Math.PI * 0.85;
    noseMesh.position.set(0, 0.10, 0.78);
    headGroup.add(noseMesh);

    // Dynamic Expressive Mouth (Curved LED Smile Arc)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.26, 0.74);
    headGroup.add(mouthGroup);
    mouthGroupRef.current = mouthGroup;

    const smileCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.16, 0.015, 0),
      new THREE.Vector3(0, -0.045, 0.015),
      new THREE.Vector3(0.16, 0.015, 0)
    );
    const mouthGeo = new THREE.TubeGeometry(smileCurve, 16, 0.02, 8, false);
    const mouthMesh = new THREE.Mesh(mouthGeo, materials.emissiveCyan);
    mouthGroup.add(mouthMesh);

    // Cute Cyber-Blush Inlays (Soft holographic cheek glow)
    const blushGroup = new THREE.Group();
    headGroup.add(blushGroup);
    blushGroupRef.current = blushGroup;

    [-1, 1].forEach((side) => {
      const blushGeo = new THREE.CapsuleGeometry(0.035, 0.09, 8, 12);
      blushGeo.rotateZ(side * 0.35);
      const blushMesh = new THREE.Mesh(blushGeo, materials.emissiveBlush);
      blushMesh.position.set(side * 0.44, -0.06, 0.58);
      blushGroup.add(blushMesh);
    });

    // Cute, Expressive Eyes with Sparkle
    function createEye(side: number) {
      const eyeUnit = new THREE.Group();
      eyeUnit.position.set(side * 0.29, 0.19, 0.66);

      const scleraGeo = new THREE.SphereGeometry(0.15, 20, 20);
      const scleraMesh = new THREE.Mesh(
        scleraGeo,
        new THREE.MeshStandardMaterial({ color: 0x09101d, roughness: 0.2 })
      );
      eyeUnit.add(scleraMesh);

      const irisGeo = new THREE.CircleGeometry(0.10, 24);
      const irisMesh = new THREE.Mesh(irisGeo, materials.irisMat);
      irisMesh.position.set(0, 0, 0.147);
      eyeUnit.add(irisMesh);

      const corneaGeo = new THREE.SphereGeometry(0.155, 20, 20);
      const corneaMesh = new THREE.Mesh(corneaGeo, materials.corneaGlass);
      eyeUnit.add(corneaMesh);

      // Upper Eyelid Torus
      const lidGeo = new THREE.TorusGeometry(0.155, 0.018, 8, 24, Math.PI);
      const lidMesh = new THREE.Mesh(lidGeo, materials.brushedTitanium);
      lidMesh.rotation.z = Math.PI;
      lidMesh.position.set(0, 0.03, 0.11);
      eyeUnit.add(lidMesh);

      return eyeUnit;
    }

    const leftEye = createEye(-1);
    const rightEye = createEye(1);
    headGroup.add(leftEye);
    headGroup.add(rightEye);
    leftEyeRef.current = leftEye;
    rightEyeRef.current = rightEye;

    // Cute Audio-Pod Ears / Antennae (Tilts when curious or listening)
    const earLeft = new THREE.Group();
    const earRight = new THREE.Group();
    earLeft.position.set(-0.84, 0.16, 0.04);
    earRight.position.set(0.84, 0.16, 0.04);

    [-1, 1].forEach((side) => {
      const targetGroup = side === -1 ? earLeft : earRight;
      const earPlateGeo = new THREE.CylinderGeometry(0.20, 0.22, 0.10, 16);
      earPlateGeo.rotateZ(Math.PI / 2);
      const earPlateMesh = new THREE.Mesh(earPlateGeo, materials.brushedTitanium);
      targetGroup.add(earPlateMesh);

      const earCoreGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);
      earCoreGeo.rotateZ(Math.PI / 2);
      const earCoreMesh = new THREE.Mesh(earCoreGeo, materials.emissiveCyan);
      targetGroup.add(earCoreMesh);

      // Cute ear fin / antenna
      const finGeo = new THREE.BoxGeometry(0.03, 0.28, 0.12);
      const finMesh = new THREE.Mesh(finGeo, materials.brushedTitanium);
      finMesh.position.set(side * 0.05, 0.16, -0.02);
      finMesh.rotation.z = side * -0.15;
      targetGroup.add(finMesh);

      // Temple cyber glow inlays
      const lineGeo = new THREE.BoxGeometry(0.014, 0.30, 0.45);
      const lineMesh = new THREE.Mesh(lineGeo, materials.emissiveMint);
      lineMesh.position.set(side * 0.80, 0.38, 0.12);
      lineMesh.rotation.z = side * 0.12;
      headGroup.add(lineMesh);
    });

    headGroup.add(earLeft);
    headGroup.add(earRight);
    earLeftRef.current = earLeft;
    earRightRef.current = earRight;

    // Compact Neck & Vertebrae
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, -0.75, 0);
    characterGroup.add(neckGroup);

    for (let i = 0; i < 3; i++) {
      const vertGeo = new THREE.CylinderGeometry(0.30 - i * 0.02, 0.32 - i * 0.02, 0.10, 18);
      const vertMesh = new THREE.Mesh(vertGeo, i % 2 === 0 ? materials.darkCarbon : materials.brushedTitanium);
      vertMesh.position.set(0, 0.14 - i * 0.12, 0);
      neckGroup.add(vertMesh);
    }

    [-1, 1].forEach((side) => {
      const strutGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.50, 12);
      const strutMesh = new THREE.Mesh(strutGeo, materials.brushedTitanium);
      strutMesh.position.set(side * 0.40, 0.04, 0.10);
      strutMesh.rotation.z = side * -0.20;
      neckGroup.add(strutMesh);
    });

    // Sleek Compact Collar & Torso Base
    const collarShape = new THREE.Shape();
    collarShape.moveTo(-1.1, -0.5);
    collarShape.lineTo(-0.65, 0.08);
    collarShape.lineTo(0.65, 0.08);
    collarShape.lineTo(1.1, -0.5);
    collarShape.lineTo(0, -0.70);
    collarShape.closePath();

    const collarGeo = new THREE.ExtrudeGeometry(collarShape, {
      depth: 0.52,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05
    });
    collarGeo.center();
    const collarMesh = new THREE.Mesh(collarGeo, materials.darkCarbon);
    collarMesh.position.set(0, -1.15, 0);
    characterGroup.add(collarMesh);

    // Torso Pulse Core
    const coreNodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const coreNodeMesh = new THREE.Mesh(coreNodeGeo, materials.emissiveCyan);
    coreNodeMesh.position.set(0, -1.02, 0.35);
    characterGroup.add(coreNodeMesh);

    // Floating Orbital Halo
    const haloGeo = new THREE.TorusGeometry(1.35, 0.012, 12, 64);
    const haloMesh = new THREE.Mesh(haloGeo, materials.emissiveCyan);
    haloMesh.rotation.x = Math.PI * 0.42;
    haloMesh.rotation.y = Math.PI * 0.10;
    haloMesh.position.set(0, 0.18, 0);
    characterGroup.add(haloMesh);
    haloMeshRef.current = haloMesh;

    // Atmospheric Dust Particles (reduced on mobile for high framerate)
    const pCount = isMobileDevice ? 40 : 80;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 7;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    scene.add(pPoints);

    lightsRef.current = {
      key: keyLight,
      fill: fillLight,
      rim: rimLight,
      particles: pPoints
    };

    // 6. Viewport Frustum & Responsive Sizing Calculations
    // Calculates visible world dimensions at camera distance (Z = 7.5)
    function getVisibleFrustum(w: number, h: number) {
      const vFovRad = THREE.MathUtils.degToRad(camera.fov / 2);
      const vHeight = 2 * Math.tan(vFovRad) * camera.position.z;
      const vWidth = vHeight * (w / h);
      return { vWidth, vHeight };
    }

    function smoothStep(t: number) {
      return t * t * (3 - 2 * t);
    }

    // Normalized Choreography Keyframes
    // Normalized by visible viewport width and height to prevent screen clipping
    const KEYFRAME_TARGETS = [
      { p: 0.00, xRatio: 0.28,  yRatio: 0.08,  z: 0.0,  rotY: -0.30, rotX: 0.03 }, // Hero
      { p: 0.18, xRatio: -0.28, yRatio: 0.04,  z: 0.1,  rotY: 0.32,  rotX: -0.02 }, // About
      { p: 0.36, xRatio: 0.29,  yRatio: 0.12,  z: -0.3, rotY: -0.34, rotX: 0.05 }, // Services
      { p: 0.65, xRatio: -0.31, yRatio: 0.06,  z: -0.2, rotY: 0.36,  rotX: 0.03 }, // Projects (safe at left border)
      { p: 0.85, xRatio: 0.29,  yRatio: 0.14,  z: -0.3, rotY: -0.34, rotX: 0.06 }, // Skills
      { p: 1.00, xRatio: 0.26,  yRatio: 0.04,  z: 0.0,  rotY: -0.20, rotX: 0.02 }  // Contact
    ];

    function calculateTargetTransform(progress: number, w: number, h: number) {
      const { vWidth, vHeight } = getVisibleFrustum(w, h);
      const isMobile = w < 768;
      const isSmallMobile = w < 440;
      const isTablet = w >= 768 && w < 1024;
      const isUltrawide = w > 1600;

      // Companion Size: Noticeably smaller & charming companion scale
      let baseScale = 0.66;
      if (isSmallMobile) {
        baseScale = 0.36;
      } else if (isMobile) {
        baseScale = 0.42;
      } else if (isTablet) {
        baseScale = 0.54;
      } else if (isUltrawide) {
        baseScale = 0.72;
      }

      const cp = Math.max(0, Math.min(1, progress));
      let idx = 0;
      for (let i = 0; i < KEYFRAME_TARGETS.length - 1; i++) {
        if (cp >= KEYFRAME_TARGETS[i].p && cp <= KEYFRAME_TARGETS[i + 1].p) {
          idx = i;
          break;
        }
      }
      const k1 = KEYFRAME_TARGETS[idx];
      const k2 = KEYFRAME_TARGETS[idx + 1];
      const t = (cp - k1.p) / (k2.p - k1.p);
      const easeT = smoothStep(t);

      const targetXRatio = THREE.MathUtils.lerp(k1.xRatio, k2.xRatio, easeT);
      const targetYRatio = THREE.MathUtils.lerp(k1.yRatio, k2.yRatio, easeT);
      const targetZ = THREE.MathUtils.lerp(k1.z, k2.z, easeT);
      const targetRotY = THREE.MathUtils.lerp(k1.rotY, k2.rotY, easeT);
      const targetRotX = THREE.MathUtils.lerp(k1.rotX, k2.rotX, easeT);

      let tx: number;
      let ty: number;

      if (isMobile) {
        // On mobile, keep the avatar in an unobtrusive top corner badge area to never block reading
        tx = vWidth * 0.26;
        ty = vHeight * 0.28;
      } else {
        tx = vWidth * targetXRatio;
        ty = vHeight * targetYRatio;
      }

      return {
        x: tx,
        y: ty,
        z: targetZ,
        scale: baseScale,
        rotY: targetRotY,
        rotX: targetRotX
      };
    }

    // 7. Pointer Movement Tracking
    let mouseX = 0;
    let mouseY = 0;
    let hasPointerMoved = false;

    const handlePointerMove = (e: PointerEvent) => {
      hasPointerMoved = true;
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 8. Animation & Real Assistant State Kinematics
    const clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;
    let blinkDuration = 0.15;
    let nodTimer = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Atmospheric rotation
      if (!prefersReducedMotion) {
        pPoints.rotation.y = time * 0.015;
      }

      // Read real assistant state
      const currentAssistantState = stateRef.current;
      const isChatActive = isChatOpenRef.current;

      // Halo spin modulation based on state
      let haloSpeed = 0.15;
      if (currentAssistantState === 'thinking') haloSpeed = 0.45;
      else if (currentAssistantState === 'completed' || currentAssistantState === 'opened') haloSpeed = 0.30;
      if (!prefersReducedMotion) {
        haloMesh.rotation.z = time * haloSpeed;
      }

      // Natural Eye Blinking & Micro-saccades
      blinkTimer += delta;
      if (blinkTimer > 3.8 + Math.sin(time * 0.7) * 1.5) {
        isBlinking = true;
        blinkTimer = 0;
      }

      // Blinking & Eye Scale Interpolation
      let targetEyeScaleY = 1.0;
      let targetEyeScaleX = 1.0;
      let targetEyeRotZ = 0;

      if (isBlinking) {
        targetEyeScaleY = 0.08;
        if (blinkTimer > blinkDuration) {
          isBlinking = false;
        }
      } else if (currentAssistantState === 'completed' || currentAssistantState === 'opened') {
        // Joyful, friendly crescent eyes
        targetEyeScaleY = 0.82;
        targetEyeScaleX = 1.08;
        targetEyeRotZ = 0.12;
      } else if (currentAssistantState === 'submitted' || currentAssistantState === 'thinking') {
        // Attentive wide eyes
        targetEyeScaleY = 1.10;
        targetEyeScaleX = 1.10;
      }

      leftEye.scale.y = THREE.MathUtils.damp(leftEye.scale.y, targetEyeScaleY, 18, delta);
      rightEye.scale.y = THREE.MathUtils.damp(rightEye.scale.y, targetEyeScaleY, 18, delta);
      leftEye.scale.x = THREE.MathUtils.damp(leftEye.scale.x, targetEyeScaleX, 12, delta);
      rightEye.scale.x = THREE.MathUtils.damp(rightEye.scale.x, targetEyeScaleX, 12, delta);

      leftEye.rotation.z = THREE.MathUtils.damp(leftEye.rotation.z, -targetEyeRotZ, 10, delta);
      rightEye.rotation.z = THREE.MathUtils.damp(rightEye.rotation.z, targetEyeRotZ, 10, delta);

      // Mouth Expression Kinematics (Smile Arc)
      let targetMouthScaleY = 1.0;
      let targetMouthScaleX = 1.0;
      let targetMouthPosY = -0.26;

      if (currentAssistantState === 'completed' || currentAssistantState === 'opened') {
        // Welcoming, cheerful broad smile
        targetMouthScaleY = 1.45;
        targetMouthScaleX = 1.20;
        targetMouthPosY = -0.24;
      } else if (currentAssistantState === 'thinking') {
        // Thoughtful, concentrated small curve
        targetMouthScaleY = 0.75;
        targetMouthScaleX = 0.70;
        targetMouthPosY = -0.28;
      } else if (currentAssistantState === 'submitted') {
        // Attentive listening
        targetMouthScaleY = 1.1;
        targetMouthScaleX = 1.0;
      }

      mouthGroup.scale.y = THREE.MathUtils.damp(mouthGroup.scale.y, targetMouthScaleY, 8, delta);
      mouthGroup.scale.x = THREE.MathUtils.damp(mouthGroup.scale.x, targetMouthScaleX, 8, delta);
      mouthGroup.position.y = THREE.MathUtils.damp(mouthGroup.position.y, targetMouthPosY, 8, delta);

      // Cute Ear / Antennae Perk
      let earPerk = 0;
      if (currentAssistantState === 'submitted' || currentAssistantState === 'thinking') {
        earPerk = 0.12;
      } else if (currentAssistantState === 'opened') {
        earPerk = 0.08;
      }
      earLeft.rotation.z = THREE.MathUtils.damp(earLeft.rotation.z, 0.05 + earPerk, 8, delta);
      earRight.rotation.z = THREE.MathUtils.damp(earRight.rotation.z, -0.05 - earPerk, 8, delta);

      // Blush Glow Warmth Modulation
      let targetBlushIntensity = 0.8;
      if (currentAssistantState === 'opened' || currentAssistantState === 'completed') {
        targetBlushIntensity = 2.0;
      } else if (currentAssistantState === 'thinking') {
        targetBlushIntensity = 1.2 + Math.sin(time * 4) * 0.4;
      }
      materials.emissiveBlush.emissiveIntensity = THREE.MathUtils.damp(
        materials.emissiveBlush.emissiveIntensity,
        targetBlushIntensity,
        6,
        delta
      );

      // 360 Orbit Mode or Scroll-Linked Movement
      if (controls.enabled) {
        controls.update();
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
        const target = calculateTargetTransform(scrollProgress, window.innerWidth, window.innerHeight);

        // Responsive position damping
        characterGroup.position.x = THREE.MathUtils.damp(characterGroup.position.x, target.x, 3.8, delta);
        characterGroup.position.y = THREE.MathUtils.damp(characterGroup.position.y, target.y, 3.8, delta);
        characterGroup.position.z = THREE.MathUtils.damp(characterGroup.position.z, target.z, 3.8, delta);

        // Smooth Scale Damping
        const currentScale = characterGroup.scale.x;
        const dampedScale = THREE.MathUtils.damp(currentScale, target.scale, 3.8, delta);
        characterGroup.scale.set(dampedScale, dampedScale, dampedScale);

        // Gentle floating bob
        const floatY = prefersReducedMotion ? 0 : Math.sin(time * 1.6) * 0.035;
        headGroup.position.y = floatY;

        // Curious Head Tilt based on pointer or state
        let targetTiltZ = prefersReducedMotion ? 0 : Math.cos(time * 1.1) * 0.015;
        if (currentAssistantState === 'thinking') {
          targetTiltZ = 0.12; // Cute thinking head tilt
        } else if (hasPointerMoved && !prefersReducedMotion) {
          targetTiltZ += mouseX * 0.04;
        }

        // Response completed nod
        if (currentAssistantState === 'completed') {
          nodTimer += delta;
          if (nodTimer < 2.0) {
            headGroup.position.y += Math.sin(nodTimer * 9) * 0.03;
          }
        } else {
          nodTimer = 0;
        }

        headGroup.rotation.z = THREE.MathUtils.damp(headGroup.rotation.z, targetTiltZ, 5.0, delta);

        // Responsive Gaze & Eye Tracking
        let gazeY = target.rotY;
        let gazeX = target.rotX;

        if (currentAssistantState === 'thinking') {
          // Looking up pensively
          gazeY += 0.15;
          gazeX += -0.12;
        } else if (hasPointerMoved) {
          gazeY += mouseX * 0.22;
          gazeX += -mouseY * 0.15;
        }

        headGroup.rotation.y = THREE.MathUtils.damp(headGroup.rotation.y, gazeY, 4.5, delta);
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, gazeX, 4.5, delta);

        // Eye Look Direction
        let eyeY = hasPointerMoved ? mouseX * 0.32 : 0;
        let eyeX = hasPointerMoved ? -mouseY * 0.22 : 0;
        if (currentAssistantState === 'thinking') {
          eyeY = 0.25;
          eyeX = -0.20;
        }

        leftEye.rotation.y = THREE.MathUtils.damp(leftEye.rotation.y, eyeY, 8.0, delta);
        leftEye.rotation.x = THREE.MathUtils.damp(leftEye.rotation.x, eyeX, 8.0, delta);
        rightEye.rotation.y = THREE.MathUtils.damp(rightEye.rotation.y, eyeY, 8.0, delta);
        rightEye.rotation.x = THREE.MathUtils.damp(rightEye.rotation.x, eyeX, 8.0, delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Responsive Resize & Orientation Change Handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      const isMobile = window.innerWidth < 768;
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2)
      );
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // 10. Comprehensive Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      cancelAnimationFrame(animationFrameId);

      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

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

  // Handle Mood Lighting
  const handleMoodSelect = (mood: AssistantMood) => {
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

  // Human-readable status label based on actual state
  const statusLabel = useMemo(() => {
    switch (assistantState) {
      case 'opened':
        return 'Welcoming';
      case 'submitted':
        return 'Listening';
      case 'thinking':
        return 'Thinking...';
      case 'completed':
        return 'Pleased';
      default:
        return 'Relaxed';
    }
  }, [assistantState]);

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none -z-10 w-screen h-screen overflow-hidden"
        aria-hidden="true"
      />

      {/* Floating Companion Control HUD Dock */}
      <aside
        className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 w-[min(94vw,720px)] pb-[env(safe-area-inset-bottom,0px)] ${
          isHudCollapsed ? 'translate-y-[calc(100%+16px)]' : 'translate-y-0'
        }`}
        aria-label="3D Assistant Companion Controls"
      >
        {/* Toggle Collapse Tab */}
        <button
          onClick={() => setIsHudCollapsed(!isHudCollapsed)}
          className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 px-3 py-1 text-[11px] sm:text-xs font-mono text-gray-400 bg-[#070c1b]/90 border border-white/10 border-b-0 rounded-t-lg backdrop-blur-md hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
          aria-label={isHudCollapsed ? 'Expand Assistant Controls' : 'Collapse Assistant Controls'}
        >
          {isHudCollapsed ? (
            <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          <span>3D AI Companion</span>
        </button>

        <div className="glass-card rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.6)] border border-cyan-500/25">
          {/* Identity & Real State Indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>AETHER-01</span>
            </div>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
              {statusLabel}
            </span>

            <div className="w-px h-3.5 bg-white/15 hidden sm:block" />

            {/* Lighting Mood Swatches */}
            <div className="flex items-center gap-1.5" title="Lighting Mood Presets">
              <button
                onClick={() => handleMoodSelect('cyan')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-cyan-400 border transition-transform ${
                  currentMood === 'cyan' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Cyan lighting"
              />
              <button
                onClick={() => handleMoodSelect('mint')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#00ffaa] border transition-transform ${
                  currentMood === 'mint' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Mint lighting"
              />
              <button
                onClick={() => handleMoodSelect('gold')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 border transition-transform ${
                  currentMood === 'gold' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Gold lighting"
              />
              <button
                onClick={() => handleMoodSelect('violet')}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-purple-500 border transition-transform ${
                  currentMood === 'violet' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label="Violet lighting"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleOrbitMode}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium border flex items-center gap-1 sm:gap-1.5 transition-all ${
                isOrbitMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.25)]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
              title="Inspect assistant with 360 degree rotation"
            >
              <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{isOrbitMode ? 'Exit' : '360°'}</span>
            </button>

            <button
              onClick={toggleWireframe}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium border flex items-center gap-1 sm:gap-1.5 transition-all ${
                wireframeMode
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400/60'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle holographic wireframe mesh"
            >
              <Grid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Grid</span>
            </button>

            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-semibold text-black bg-gradient-to-r from-cyan-400 to-[#00ffaa] hover:shadow-[0_0_16px_rgba(0,255,255,0.4)] flex items-center gap-1 sm:gap-1.5 transition-all"
                title="Chat with Rayen's AI Companion"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
