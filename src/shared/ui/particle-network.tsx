"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const LINE_MAX_DISTANCE = 120;

// 모바일 여부에 따른 파티클 수
const MOBILE_BREAKPOINT = 768;
const MOBILE_PARTICLE_COUNT = 1200;
const DESKTOP_PARTICLE_COUNT = 2500;

// 배경 별(먼 거리) 파티클 수
const MOBILE_STAR_COUNT = 600;
const DESKTOP_STAR_COUNT = 1500;

// Cosmic Abstract 색상 팔레트
const SPACE_COLORS = [
  [0.30, 0.93, 0.92], // nebula-cyan (#4DEEEA)
  [0.46, 0.29, 0.64], // nebula-violet (#764BA2)
  [1.00, 0.72, 0.42], // nebula-amber (#FFB86C)
  [0.88, 0.88, 0.90], // star-silver (#E0E0E6)
  [0.97, 0.98, 0.98], // star-white (#F8F9FA)
  [0.40, 0.70, 1.00], // 블루 하이라이트
  [0.60, 0.40, 0.85], // 딥 퍼플
];

/** 별 모양 글로우 텍스처 생성 — Canvas로 원형 그라데이션 */
function createStarTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // 중심에서 바깥으로 퍼지는 원형 글로우
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.15, "rgba(255, 255, 255, 0.8)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * 3D 파티클 네트워크 배경 컴포넌트
 * Three.js를 사용하여 우주 공간의 별과 네트워크를 렌더링하고
 * 스크롤/마우스에 반응하는 인터랙션을 제공
 */
export function ParticleNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initThree = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // 이전 인스턴스 정리
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const particleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;

    // Scene 설정
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.0008); // void-black

    // Camera 설정 — 넓은 FOV로 화면 채움
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      5000,
    );
    camera.position.z = 500;

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 메인 파티클 — 화면 전체를 채우는 구형 분포
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // 구형 분포 — 화면 전체를 고르게 채움
      const radius = 200 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // 우주 색상 팔레트에서 랜덤 선택 + 밝기 변화
      const colorIdx = Math.floor(Math.random() * SPACE_COLORS.length);
      const [cr, cg, cb] = SPACE_COLORS[colorIdx];
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i * 3] = cr * brightness;
      colors[i * 3 + 1] = cg * brightness;
      colors[i * 3 + 2] = cb * brightness;

      // 크기 변화 — 가까운 별은 크게, 먼 별은 작게
      sizes[i] = 1.0 + Math.random() * 2.5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starTexture = createStarTexture();

    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 배경 별 레이어 — 작고 먼 별들로 밀도감 추가
    const starCount = isMobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // 더 넓은 범위에 분포
      starPositions[i * 3] = (Math.random() - 0.5) * 3000;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 3000;

      // 은은한 색상 — 화이트~블루 계열
      const tint = Math.random();
      starColors[i * 3] = 0.6 + tint * 0.4;
      starColors[i * 3 + 1] = 0.6 + tint * 0.3;
      starColors[i * 3 + 2] = 0.8 + tint * 0.2;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 라인 생성 — 근접한 파티클 연결 (성능 최적화로 샘플링)
    const linePositions: number[] = [];

    for (let i = 0; i < particleCount; i += 5) {
      for (let j = i + 1; j < particleCount; j += 10) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < LINE_MAX_DISTANCE) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4deeea, // nebula-cyan
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 마우스 인터랙션 상태
    let mouseX = 0;
    let currentScroll = window.scrollY;
    let animationId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // -1 ~ 1 범위로 정규화
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    };

    const handleScroll = () => {
      currentScroll = window.scrollY;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // 애니메이션 루프
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 회전 애니메이션 — 레이어별 다른 속도로 깊이감 부여
      particles.rotation.y += 0.0008;
      lines.rotation.y += 0.0008;
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      // 카메라: 스크롤 연동 — 파티클 범위(Y: -750~750) 내에서만 이동
      const maxScrollTravel = 400; // 카메라 Y축 최대 이동 범위
      const scrollNormalized = Math.min(currentScroll / (window.innerHeight * 1.5), 1);
      const targetY = -scrollNormalized * maxScrollTravel;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.x += (mouseX * 30 - camera.position.x) * 0.05;
      camera.position.z = 400 + Math.sin(scrollNormalized * Math.PI) * 40;
      camera.lookAt(0, camera.position.y * 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 정리 함수
    cleanupRef.current = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      starTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    initThree();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [initThree]);

  return (
    <div
      ref={containerRef}
      className="size-full"
      aria-hidden="true"
    />
  );
}
