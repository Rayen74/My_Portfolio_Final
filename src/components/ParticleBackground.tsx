import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

interface ParticleBackgroundProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

const defaultColors = ['#00FFFF', '#FF00FF', '#00FFAA', '#A855F7'];

const hexToRgb = (hex: string): [number, number, number] => {
  let c = hex.replace(/^#/, '');
  if (c.length === 3) {
    c = c.split('').map((ch) => ch + ch).join('');
  }
  const int = parseInt(c, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if (uAlphaParticles < 0.5) {
      if (d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 180,
  particleSpread = 10,
  speed = 0.1,
  particleColors = defaultColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 0.7,
  alphaParticles = true,
  particleBaseSize = 110,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let renderer: any = null;
    let animationFrameId: number;

    try {
      renderer = new Renderer({ depth: false, alpha: true, powerPreference: 'high-performance' });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);

      const canvas = gl.canvas;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.style.pointerEvents = 'none';
      container.appendChild(canvas);

      const camera = new Camera(gl, { fov: 15 });
      camera.position.set(0, 0, cameraDistance);

      const resize = () => {
        if (!container) return;
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        renderer.setSize(width, height);
        camera.perspective({ aspect: canvas.width / canvas.height });
      };

      window.addEventListener('resize', resize, false);
      resize();

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseRef.current = { x, y };
      };

      if (moveParticlesOnHover) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      const count = particleCount;
      const positions = new Float32Array(count * 3);
      const randoms = new Float32Array(count * 4);
      const colors = new Float32Array(count * 3);
      const palette = particleColors.length > 0 ? particleColors : defaultColors;

      for (let i = 0; i < count; i++) {
        let x, y, z, len;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          z = Math.random() * 2 - 1;
          len = x * x + y * y + z * z;
        } while (len > 1 || len === 0);
        const r = Math.cbrt(Math.random());
        positions.set([x * r, y * r, z * r], i * 3);
        randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
        const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
        colors.set(col, i * 3);
      }

      const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 4, data: randoms },
        color: { size: 3, data: colors },
      });

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uSpread: { value: particleSpread },
          uBaseSize: { value: particleBaseSize },
          uSizeRandomness: { value: sizeRandomness },
          uAlphaParticles: { value: alphaParticles ? 1 : 0 },
        },
        transparent: true,
        depthTest: false,
      });

      const points = new Mesh(gl, { mode: gl.POINTS, geometry, program });

      let lastTime = performance.now();
      let elapsed = 0;

      const update = (t: number) => {
        animationFrameId = requestAnimationFrame(update);
        const delta = t - lastTime;
        lastTime = t;
        elapsed += delta * speed;
        program.uniforms.uTime.value = elapsed * 0.001;

        if (moveParticlesOnHover) {
          points.position.x = -mouseRef.current.x * particleHoverFactor;
          points.position.y = -mouseRef.current.y * particleHoverFactor;
        }

        if (!disableRotation) {
          points.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
          points.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
          points.rotation.z += 0.01 * speed;
        }

        renderer.render({ scene: points, camera });
      };

      animationFrameId = requestAnimationFrame(update);

      return () => {
        window.removeEventListener('resize', resize);
        if (moveParticlesOnHover) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
        cancelAnimationFrame(animationFrameId);
        if (canvas && canvas.parentNode === container) {
          container.removeChild(canvas);
        }
      };
    } catch (err) {
      console.warn('Particle WebGL init skipped:', err);
    }
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    particleColors
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none -z-20 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
