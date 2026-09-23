"use client";

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  BackSide,
  BoxGeometry,
  Color,
  CurvePath,
  Group,
  LineCurve3,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  QuadraticBezierCurve3,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
} from "three";

const RADIUS = 0.19;

function chevron(direction: 1 | -1) {
  const top = new Vector3(-direction * 0.55, 1.05, 0);
  const apex = new Vector3(direction * 0.55, 0, 0);
  const bottom = new Vector3(-direction * 0.55, -1.05, 0);
  const inA = apex.clone().lerp(top, 0.16);
  const inB = apex.clone().lerp(bottom, 0.16);
  const path = new CurvePath<Vector3>();
  path.add(new LineCurve3(top, inA));
  path.add(new QuadraticBezierCurve3(inA, apex, inB));
  path.add(new LineCurve3(inB, bottom));
  return { geometry: new TubeGeometry(path, 120, RADIUS, 28, false), ends: [top, bottom] };
}

function environment(renderer: WebGLRenderer) {
  const scene = new Scene();
  const sky = new ShaderMaterial({
    side: BackSide,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 top = vec3(1.0, 0.98, 1.0);
        vec3 mid = vec3(0.46, 0.38, 0.72);
        vec3 low = vec3(0.03, 0.02, 0.08);
        vec3 c = h > 0.0 ? mix(mid, top, smoothstep(0.05, 0.85, h)) : mix(mid, low, smoothstep(0.0, -0.55, h));
        c += vec3(1.4) * smoothstep(0.03, 0.0, abs(h - 0.16));
        gl_FragColor = vec4(c, 1.0);
      }
    `,
  });
  const sphere = new SphereGeometry(10, 48, 24);
  scene.add(new Mesh(sphere, sky));

  const panel = new BoxGeometry(1, 1, 1);
  const bright = new MeshBasicMaterial({ color: new Color(4, 3.8, 4.4) });
  const violet = new MeshBasicMaterial({ color: new Color(1.6, 0.7, 3.2) });
  const lights: [MeshBasicMaterial, number[], number[]][] = [
    [bright, [0, 5, -3], [7, 0.5, 0.5]],
    [bright, [-6, 1.5, 2], [0.4, 4, 3]],
    [violet, [6, -0.5, 1], [0.4, 3, 4]],
    [bright, [2, -4.5, 4], [5, 0.3, 0.3]],
  ];
  for (const [material, position, scale] of lights) {
    const mesh = new Mesh(panel, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.scale.set(scale[0], scale[1], scale[2]);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  }

  const pmrem = new PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.03);
  pmrem.dispose();
  sphere.dispose();
  sky.dispose();
  panel.dispose();
  bright.dispose();
  violet.dispose();
  return target;
}

export default function ChromeMark() {
  const holder = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = holder.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      if (fallbackRef.current) fallbackRef.current.hidden = false;
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const envTarget = environment(renderer);
    scene.environment = envTarget.texture;

    const chrome = new MeshPhysicalMaterial({
      color: 0xf4f1ff,
      metalness: 1,
      roughness: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
    });

    const geometries: BufferGeometry[] = [];
    const cap = new SphereGeometry(RADIUS, 28, 18);
    geometries.push(cap);
    const mark = new Group();

    const addPiece = (geometry: BufferGeometry, ends: Vector3[], x: number) => {
      geometries.push(geometry);
      const piece = new Group();
      piece.add(new Mesh(geometry, chrome));
      for (const end of ends) {
        const sphere = new Mesh(cap, chrome);
        sphere.position.copy(end);
        piece.add(sphere);
      }
      piece.position.x = x;
      mark.add(piece);
      return piece;
    };

    const left = chevron(-1);
    const right = chevron(1);
    const slashFrom = new Vector3(-0.42, -1.2, 0);
    const slashTo = new Vector3(0.42, 1.2, 0);
    const pieces = [
      addPiece(left.geometry, left.ends, -1.75),
      addPiece(new TubeGeometry(new LineCurve3(slashFrom, slashTo), 8, RADIUS, 28, false), [slashFrom, slashTo], 0),
      addPiece(right.geometry, right.ends, 1.75),
    ];
    scene.add(mark);

    const camera = new PerspectiveCamera(30, 1, 0.1, 100);
    const halfTan = Math.tan((15 * Math.PI) / 180);

    const resize = () => {
      const { clientWidth, clientHeight } = box;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      const aspect = clientWidth / clientHeight;
      camera.aspect = aspect;
      camera.position.set(0, 0, Math.max(1.8 / halfTan, 3.1 / (halfTan * aspect)));
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(box);
    resize();

    const pointer = new Vector2();
    const target = new Vector2();
    const onPointer = (event: PointerEvent) => {
      target.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(box);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = (performance.now() - start) / 1000;
      pointer.lerp(target, 0.05);
      mark.rotation.y = Math.sin(t * 0.45) * 0.42 + pointer.x * 0.3;
      mark.rotation.x = Math.sin(t * 0.32) * 0.07 + pointer.y * 0.18;
      mark.position.y = Math.sin(t * 0.8) * 0.08;
      pieces.forEach((piece, i) => {
        piece.position.z = Math.sin(t * 0.9 + i * 1.3) * 0.12;
      });
      renderer.render(scene, camera);
    };

    if (reduce) {
      mark.rotation.set(0.05, -0.28, 0);
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geometries.forEach((geometry) => geometry.dispose());
      chrome.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={holder} className="absolute inset-0">
      <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
      <span
        ref={fallbackRef}
        hidden
        aria-hidden
        className="absolute inset-0 grid place-items-center font-mono text-[7rem] font-semibold text-white/80"
      >
        &lt;/&gt;
      </span>
    </div>
  );
}
