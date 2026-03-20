# 스크롤 애니메이션 가이드

3D 파티클 네트워크 배경 위에 모든 섹션이 `position: fixed`로 쌓이고, 글로벌 `scrollY` 기반으로 **크로스페이드** 전환되는 풀페이지 몰입형 레이아웃입니다.

---

## 전체 구조

```
┌─────────────────────────────────────────────────────────┐
│  ParticleNetwork (fixed, z-0, 전체 화면)                 │
│                                                         │
│  ┌── Fixed Section Stack ──────────────────────────┐    │
│  │  Hero     (fixed, z-11, opacity = f(scrollY))   │    │
│  │  About    (fixed, z-12, opacity = f(scrollY))   │    │
│  │  Projects (fixed, z-13, opacity = f(scrollY))   │    │
│  │  Contact  (fixed, z-14, opacity = f(scrollY))   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌── Scroll Spacer (relative, z-0) ──────────────────┐  │
│  │  height: getSpacerHeightVh(4) ≈ 295vh             │  │
│  │  (실제 스크롤 영역 제공)                              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                         │
│  Nav Indicator (fixed, z-50, 우측 세로 / 모바일 하단)     │
└─────────────────────────────────────────────────────────┘
```

---

## 핵심 개념: Crossfade Fixed Sections

모든 섹션이 `position: fixed; inset: 0`으로 뷰포트에 겹쳐 쌓입니다. `scrollY` 값에 따라 각 섹션의 opacity/transform이 계산되어, 한 섹션이 페이드 아웃되는 동안 다음 섹션이 동시에 페이드 인됩니다.

### 스크롤 타임라인

```
scrollY(vh):  0     30    45    75    90    120   135   165
              |─────|─────|─────|─────|─────|─────|─────|
Hero:         |=hold=|fade |     |     |     |     |     |
About:              |fade |=====hold=====|fade |     |     |
Projects:                       |fade |=====hold=====|fade |
Contact:                                    |fade |=hold==>

hold = 30vh (완전히 보이는 구간)
fade = 15vh (크로스페이드 — 이전 fadeOut + 다음 fadeIn 동시)
```

### 상수 (useCrossfadeScroll.ts)

```ts
const FADE_RATIO = 0.15;   // 15vh — 크로스페이드 구간
const HOLD_RATIO = 0.30;   // 30vh — 완전 표시 구간
const STRIDE_RATIO = 0.45; // 45vh — 섹션 간 거리 (hold + fade)
```

---

## 구현: useCrossfadeScroll 훅

`src/shared/lib/hooks/useCrossfadeScroll.ts`

```ts
function useCrossfadeScroll(
  sectionIndex: number,
  totalSections: number,
): {
  style: React.CSSProperties;   // opacity, transform, pointerEvents
  progress: number;              // 스태거용 0~1
  isActive: boolean;             // 보이는지 여부
  scrollY: number;               // 현재 scrollY (Hero 인디케이터용)
}
```

- `scroll` 이벤트 + `passive: true` + `requestAnimationFrame` throttle
- 각 섹션의 fadeIn/hold/fadeOut 경계를 `sectionIndex * stride`로 계산
- 첫 번째 섹션: fadeIn 없음 (처음부터 표시)
- 마지막 섹션: fadeOut 없음 (계속 표시)

### 유틸 함수

```ts
getSpacerHeightVh(totalSections)    // 스크롤 스페이서 높이 (vh)
getSectionScrollTarget(sectionIndex) // 섹션 스크롤 위치 (px) — 네비게이션용
```

---

## HomePage 레이아웃 (`src/views/home/index.tsx`)

```tsx
"use client";

export function HomePage() {
  return (
    <>
      {/* 3D 배경 */}
      <div className="fixed inset-0 z-0"><ParticleNetwork /></div>

      {/* 네비게이션 인디케이터 */}
      <Header />

      {/* 모든 섹션 — fixed로 쌓임 */}
      <HeroSection />      {/* z-[11] */}
      <AboutSection />     {/* z-[12] */}
      <ProjectsSection />  {/* z-[13] */}
      <ContactSection />   {/* z-[14] */}

      {/* 스크롤 스페이서 */}
      <div style={{ height: `${getSpacerHeightVh(4)}vh` }} />
    </>
  );
}
```

---

## 섹션별 세부 동작

### 공통 패턴

```tsx
function SomeSection() {
  const { style, progress } = useCrossfadeScroll(INDEX, 4);

  return (
    <div id="section-id" className="fixed inset-0 z-[1X] flex items-center" style={style}>
      <div className="w-full will-change-[transform,opacity]">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-24">
          <div className="rounded-xl border border-[--glass-border] bg-[--glass-bg] p-4 sm:p-6 backdrop-blur-[var(--glass-blur)]"
               style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}>
            {/* 콘텐츠 */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Hero (index: 0)

- 초기에 이미 보이고, 스크롤 시 페이드 아웃
- 스크롤 인디케이터: `scrollY < 50` 시에만 표시
- 글래스 카드 없음 (배경 투명)

### About (index: 1)

- 프로필 인라인 (모바일: 세로, 데스크탑: 가로)
- 스킬 배지: Cosmic 컬러 카테고리별 (cyan/violet/amber/silver)
- 경력: 모바일 2행, 데스크탑 1행 테이블
- 스태거: progress 0.3/0.5/0.7/0.9

### Projects (index: 2)

- 가로형 카드 리스트 (이미지 좌 + 텍스트 우)
- 모바일: 이미지 100px, h-24 / 데스크탑: 140px, h-28
- 클릭/터치로 아코디언 토글 (상세 설명 펼침)
- 기술 배지: Cosmic 컬러 + 축약명
- 스태거: progress 0.04 간격

### Contact (index: 3)

- 마지막 섹션 — 페이드 아웃 없음
- 스태거: progress 0.3/0.5/0.7

---

## 네비게이션 인디케이터 (`src/widgets/header/ui/Header.tsx`)

상단 헤더가 아닌 **도트 인디케이터** 방식:

- **데스크탑**: 우측 중앙 세로 배치 (`fixed right-6 top-1/2`)
  - 도트만 기본 표시, 호버 시 좌측 tooltip (primary 컬러 pill)
- **모바일**: 하단 중앙 가로 배치 (`fixed bottom-4 left-1/2`)
  - 도트만 표시, 라벨 숨김

활성 섹션 감지: `scrollY` 기반 `STRIDE_RATIO` 계산

---

## 3D 배경 스크롤 연동 (`src/shared/ui/particle-network.tsx`)

카메라가 파티클 범위 내에서만 이동하도록 제한:

```ts
const maxScrollTravel = 400;
const scrollNormalized = Math.min(currentScroll / (vh * 1.5), 1);
camera.position.y = lerp(targetY, -scrollNormalized * maxScrollTravel);
camera.position.z = 500 + Math.sin(scrollNormalized * Math.PI) * 40;
```

파티클: 구형 분포 (반경 200~1000) + 배경 별 레이어 (반경 3000)
색상: Cosmic 팔레트 (nebula-cyan, violet, amber, star-silver, star-white)

---

## 성능 고려사항

- **스크롤 이벤트**: `passive: true` + `requestAnimationFrame` throttle
- **CSS transform/opacity**: GPU 가속, `will-change: transform, opacity`
- **fixed 레이어**: 비활성 섹션은 `pointerEvents: "none"`으로 이벤트 차단
- **3D 렌더링**: 탭 비활성화 시 자동 정지
- **모바일**: 파티클 수 감소 (1200 + 600), 배경 별 별도 레이어
