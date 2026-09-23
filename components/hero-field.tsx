"use client";

import { useEffect, useRef } from "react";
import { Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";
import { hexToRgb01, theme } from "@/lib/theme";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uHigh;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.035;

    vec2 warp = vec2(fbm(p * 1.4 + vec2(t, -t * 0.7)), fbm(p * 1.4 - vec2(t * 0.8, t)));
    float n = fbm(p * 1.8 + warp * 1.6);

    vec3 deep = uDeep;
    vec3 mid = uMid;
    vec3 high = uHigh;

    vec3 col = mix(deep, mid, smoothstep(0.15, 0.95, uv.y * 0.55 + n * 0.75));
    col = mix(col, high, smoothstep(0.62, 0.95, n) * 0.35);

    float corner = smoothstep(1.25, 0.0, length((uv - vec2(0.0, 1.0)) * vec2(aspect * 0.8, 1.0)));
    col += vec3(0.22, 0.06, 0.38) * corner;

    float horizon = exp(-pow((uv.y - 0.0) * 3.4, 2.0)) * smoothstep(1.1, 0.0, abs(p.x) * 0.9);
    col += vec3(0.78, 0.6, 1.0) * horizon * 0.55;

    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    float light = exp(-dot(p - m, p - m) * 2.6);
    col += high * light * 0.16;

    col += (hash(uv * uRes + uTime) - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new Vector2(1, 1) },
      uMouse: { value: new Vector2(0.72, 0.42) },
      uDeep: { value: new Color(...hexToRgb01(theme.fieldDeep)) },
      uMid: { value: new Color(...hexToRgb01(theme.fieldMid)) },
      uHigh: { value: new Color(...hexToRgb01(theme.fieldHigh)) },
    };
    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false });
    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    const target = new Vector2(0.72, 0.42);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      uniforms.uRes.value.set(clientWidth, clientHeight);
      if (reduce) renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      uniforms.uTime.value = (performance.now() - start) / 1000;
      uniforms.uMouse.value.lerp(target, 0.04);
      renderer.render(scene, camera);
    };

    if (reduce) {
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
