"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/** 글로우 파티클용 원형 그라데이션 텍스처 생성 */
function createGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

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
 * 와이어프레임 글로브 — Cosmic Abstract 테마에 맞는 3D 와이어프레임 구체
 * nebula-cyan 색상의 이코사헤드론을 와이어프레임으로 렌더링하고
 * 꼭짓점에 글로우 파티클을 배치하여 입체감을 부여
 */
export function WireframeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const initThree = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // 이전 인스턴스 정리
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    // Scene — fog 없이 글로브 단독 렌더링
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      1,
      1000,
    );
    camera.position.z = 350;

    // Renderer — 배경 투명
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 기하학 — 이코사헤드론 와이어프레임
    const icosahedron = new THREE.IcosahedronGeometry(150, 3);
    const wireframeGeo = new THREE.WireframeGeometry(icosahedron);

    // 와이어프레임 라인
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7ff5f3,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, lineMat);

    // 꼭짓점 파티클 — 글로우 텍스처 사용
    const glowTexture = createGlowTexture();
    const vertices = icosahedron.attributes.position;
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", vertices);

    const pointsMat = new THREE.PointsMaterial({
      size: 4,
      map: glowTexture,
      color: 0x9ff9f7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);

    // 엣지 추출 — 이동 파티클 경로용
    const edgePositions = wireframeGeo.attributes.position.array;
    const edgeCount = edgePositions.length / 6; // 각 엣지 = 2개 꼭짓점 × 3좌표
    const edges: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];
    for (let i = 0; i < edgeCount; i++) {
      const idx = i * 6;
      edges.push({
        start: new THREE.Vector3(edgePositions[idx], edgePositions[idx + 1], edgePositions[idx + 2]),
        end: new THREE.Vector3(edgePositions[idx + 3], edgePositions[idx + 4], edgePositions[idx + 5]),
      });
    }

    // 이동 파티클 — 엣지를 따라 움직이는 다양한 색상의 점들
    const TRAVELER_COUNT = 20;
    const TRAVELER_COLORS = [
      0x4DEEEA, // nebula-cyan
      0x764BA2, // nebula-violet
      0xFFB86C, // nebula-amber
      0xFF6B9D, // pink
      0x67F5C0, // mint
      0xA78BFA, // lavender
      0xFDE68A, // yellow
    ];

    const travelerPositions = new Float32Array(TRAVELER_COUNT * 3);
    const travelerColors = new Float32Array(TRAVELER_COUNT * 3);
    const travelerGeo = new THREE.BufferGeometry();
    travelerGeo.setAttribute("position", new THREE.BufferAttribute(travelerPositions, 3));
    travelerGeo.setAttribute("color", new THREE.BufferAttribute(travelerColors, 3));

    // 각 파티클에 랜덤 색상 할당
    for (let i = 0; i < TRAVELER_COUNT; i++) {
      const color = new THREE.Color(TRAVELER_COLORS[i % TRAVELER_COLORS.length]);
      travelerColors[i * 3] = color.r;
      travelerColors[i * 3 + 1] = color.g;
      travelerColors[i * 3 + 2] = color.b;
    }

    const travelerMat = new THREE.PointsMaterial({
      size: 18,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const travelers = new THREE.Points(travelerGeo, travelerMat);

    // 각 파티클의 상태: 현재 엣지 인덱스 + 진행도(0~1) + 속도
    const travelerStates = Array.from({ length: TRAVELER_COUNT }, () => ({
      edgeIdx: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
    }));

    // 그룹으로 묶어서 일괄 회전
    const group = new THREE.Group();
    group.add(wireframe);
    group.add(points);
    group.add(travelers);
    scene.add(group);

    let animationId = 0;

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // 애니메이션 루프
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // 자동 회전 — 느리게
      group.rotation.y += 0.0008;
      group.rotation.x += 0.0004;

      // 마우스 반응 비활성화

      // 이동 파티클 — 엣지를 따라 이동, 끝에 도달하면 랜덤 인접 엣지로 전환
      const tPos = travelerGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < TRAVELER_COUNT; i++) {
        const state = travelerStates[i];
        state.progress += state.speed;

        // 엣지 끝에 도달하면 다음 엣지로 이동
        if (state.progress >= 1) {
          state.progress = 0;
          // 현재 엣지의 끝점과 연결된 엣지 중 랜덤 선택
          const currentEnd = edges[state.edgeIdx].end;
          const connectedEdges: number[] = [];
          for (let j = 0; j < edges.length; j++) {
            if (j === state.edgeIdx) continue;
            if (edges[j].start.distanceTo(currentEnd) < 0.1 || edges[j].end.distanceTo(currentEnd) < 0.1) {
              connectedEdges.push(j);
            }
          }
          state.edgeIdx = connectedEdges.length > 0
            ? connectedEdges[Math.floor(Math.random() * connectedEdges.length)]
            : Math.floor(Math.random() * edges.length);
        }

        const edge = edges[state.edgeIdx];
        const t = state.progress;
        tPos[i * 3] = edge.start.x + (edge.end.x - edge.start.x) * t;
        tPos[i * 3 + 1] = edge.start.y + (edge.end.y - edge.start.y) * t;
        tPos[i * 3 + 2] = edge.start.z + (edge.end.z - edge.start.z) * t;
      }
      travelerGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 정리 함수 — 모든 리소스 해제
    cleanupRef.current = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      icosahedron.dispose();
      wireframeGeo.dispose();
      lineMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      travelerGeo.dispose();
      travelerMat.dispose();
      glowTexture.dispose();
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

  return <div ref={containerRef} className="size-full" aria-hidden="true" />;
}
