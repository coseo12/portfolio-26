# 디자인 시스템

포트폴리오 사이트를 위한 디자인 시스템입니다. **shadcn/ui**를 기반으로 하며, **Cosmic Abstract Design** 컬러 토큰에 따른 다크 전용 테마 + 3D 파티클 네트워크 배경 + 글래스모피즘 UI를 조합한 몰입감 있는 무드를 지향합니다.

---

## 컬러 시스템: Cosmic Abstract Design

### 컬러 토큰

| Category | Token | Value | 용도 |
| :--- | :--- | :--- | :--- |
| **Background** | `void-black` | `#0A0A0C` | 기본 배경 (가장 어두운 영역) |
| | `void-deep` | `#121217` | 카드 배경, 드롭다운 |
| | `void-surface` | `#1E1E26` | 버튼 호버, 입력창 배경 |
| **Glow** | `star-white` | `#FFFFFF` | 강조 포인트 |
| | `star-silver` | `#E0E0E6` | 보조 텍스트, 아이콘 |
| | `star-glow` | `rgba(255,255,255,0.4)` | 글로우 효과, 글래스 경계선 |
| **Accents** | `nebula-cyan` | `#4DEEEA` | Primary — 링크, 활성 상태 |
| | `nebula-violet` | `#764BA2` | Accent — 인터랙티브 요소 |
| | `nebula-amber` | `#FFB86C` | Destructive — 경고, 에너지 |
| **Text** | `text-high` | `#F8F9FA` | 제목, 본문 (90%+ 대비) |
| | `text-mid` | `#ADB5BD` | 설명문, 메타데이터 |
| | `text-low` | `#6C757D` | 비활성화, 푸터 |

### CSS 변수 매핑 (`globals.css`)

```css
:root {
  /* Background — The Void */
  --background: #0A0A0C;       /* void-black */
  --foreground: #F8F9FA;       /* text-high */
  --card: #121217;             /* void-deep */
  --card-foreground: #F8F9FA;

  /* Primary — nebula-cyan */
  --primary: #4DEEEA;
  --primary-foreground: #0A0A0C;

  /* Secondary — void-surface */
  --secondary: #1E1E26;
  --secondary-foreground: #E0E0E6; /* star-silver */

  /* Muted */
  --muted: #1E1E26;
  --muted-foreground: #6C757D;     /* text-low */

  /* Accent — nebula-violet */
  --accent: #764BA2;
  --accent-foreground: #F8F9FA;

  /* Destructive — nebula-amber */
  --destructive: #FFB86C;

  /* Border / Ring */
  --border: rgba(255, 255, 255, 0.1);
  --ring: #4DEEEA;

  /* Glassmorphism */
  --glass-bg: rgba(30, 30, 38, 0.70);        /* void-surface 기반 */
  --glass-border: rgba(255, 255, 255, 0.15);  /* star-glow 근사 */
  --glass-blur: 20px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

### 컬러 사용 원칙

- **Tailwind 팔레트 클래스 사용 금지** (`bg-blue-500` 등) — 항상 시맨틱 토큰 사용
- 텍스트: `text-foreground` (text-high) / `text-muted-foreground` (text-low) / `text-primary` (nebula-cyan)
- 배경: `bg-background` (void-black) / `bg-card` (void-deep) / `bg-secondary` (void-surface)
- 기술 배지: Cosmic 컬러 카테고리별 직접 지정 (아래 참조)

### 기술 배지 컬러 카테고리

| 색상 | 배경/텍스트 | 대상 |
| --- | --- | --- |
| Cyan | `bg-[#4DEEEA]/15 text-[#4DEEEA]` | 프레임워크 (React, Next.js, Vue.js) |
| Violet | `bg-[#764BA2]/20 text-[#c49eea]` | 언어/AI (TypeScript, Claude API, LangChain) |
| Amber | `bg-[#FFB86C]/15 text-[#FFB86C]` | 인프라/API (Docker, WebRTC, Canvas) |
| Silver | `bg-[#E0E0E6]/10 text-[#E0E0E6]` | 백엔드/DB (Node.js, Spring, PostgreSQL) |

---

## 글래스모피즘 (Glassmorphism)

3D 파티클 배경 위에 콘텐츠를 배치하므로, 카드에 글래스모피즘 스타일을 적용합니다.

```tsx
// 글래스 카드 기본 패턴
<div
  className="rounded-xl border border-[--glass-border] bg-[--glass-bg] p-4 sm:p-6 backdrop-blur-[var(--glass-blur)]"
  style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}
>
  {/* 콘텐츠 */}
</div>
```

| 요소 | 스타일 | 설명 |
| --- | --- | --- |
| 글래스 카드 | `bg-[--glass-bg]` + `backdrop-blur` + `border` + `boxShadow` | void-surface 70% + 블러 + 테두리 + 그림자/하이라이트 |
| 내부 카드 | 동일 패턴, `rounded-lg` | 프로젝트 카드, 연락처 카드 |
| 호버 | `hover:border-primary/30` | nebula-cyan 글로우 테두리 |

---

## 다크 모드 (고정)

다크 모드만 사용합니다. 테마 토글은 제공하지 않습니다.

```tsx
// providers.tsx
<ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">

// layout.tsx
<html lang="ko" className="dark" suppressHydrationWarning>
```

---

## 타이포그래피

### 스케일

| 이름 | 크기 | Tailwind | 용도 |
| --- | --- | --- | --- |
| Display | 36-48px | `text-4xl md:text-5xl font-medium` | 히어로 이름 |
| Heading 1 | 24-28px | `text-2xl sm:text-3xl font-medium` | 섹션 제목 |
| Body | 12-15px | `text-xs sm:text-[15px]` | 본문 (모바일/데스크탑) |
| Small | 10-11px | `text-[10px] sm:text-xs` | 메타데이터, 경력 |
| Badge | 9-11px | `text-[9px] sm:text-[11px]` | 기술 배지 |
| Label | 10-12px | `text-xs font-medium uppercase tracking-wide` | 섹션 레이블 |

### 폰트 패밀리

```css
--font-sans: "Inter", "Pretendard", "-apple-system", sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

---

## 네비게이션 인디케이터

상단 헤더가 아닌 **도트 인디케이터** 방식입니다.

| | 데스크탑 (sm+) | 모바일 |
| --- | --- | --- |
| 위치 | 우측 중앙 세로 (`fixed right-6 top-1/2`) | 하단 중앙 가로 (`fixed bottom-4 left-1/2`) |
| 기본 | 도트만 표시 | 도트만 표시 |
| 호버 | 좌측 tooltip (primary 컬러 pill) | — |
| 활성 | 큰 도트 + cyan 글로우 | 큰 도트 + cyan 글로우 |

---

## 스페이싱

| Tailwind | 용도 |
| --- | --- |
| `p-4 sm:p-6` | 글래스 카드 패딩 |
| `gap-1.5 sm:gap-2` | 배지/요소 간격 |
| `mt-4 sm:mt-6` | 섹션 내부 블록 간격 |
| `px-6 md:px-12 lg:px-24` | 콘텐츠 좌우 여백 |
| `space-y-3` | 프로젝트 카드 리스트 간격 |

---

## 3D 파티클 배경

| 속성 | 값 |
| --- | --- |
| 메인 파티클 | 2500개 (모바일 1200), 구형 분포 (200~1000) |
| 배경 별 | 1500개 (모바일 600), 큐브 분포 (3000) |
| 색상 | Cosmic 팔레트 7색 |
| 텍스처 | Canvas 원형 글로우 (64x64, radial gradient) |
| 라인 | nebula-cyan, opacity 0.06, additive blending |
| FOV | 75°, far 5000 |
| Fog | `FogExp2(0x0a0a0c, 0.0008)` |
