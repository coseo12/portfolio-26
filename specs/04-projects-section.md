# 04. Projects 섹션 — 프로젝트 쇼케이스

## 목표

개발자의 주요 프로젝트를 카드 형태로 전시한다.
About 섹션과 시각적으로 자연스럽게 이어지면서, 미묘한 배경 변화로 섹션 전환을 인지시킨다.

---

## 배경 연결 전략

About 섹션은 `bg-background`를 사용한다.
Projects 섹션은 한 단계 어두운 톤(`bg-muted`)으로 전환하여 시각적 구분을 주되,
경계에 그라디언트 페이드를 넣어 부드럽게 연결한다.

```
About 섹션     → bg-background
─── 경계 ───   → 상단 그라디언트 페이드 (bg-background → bg-muted)
Projects 섹션  → bg-muted
```

| 요소 | 값 |
|---|---|
| 섹션 배경 | `bg-muted` |
| 상단 페이드 | 섹션 최상단에 `absolute top-0` 그라디언트 오버레이 — `from-background to-transparent` |
| 페이드 높이 | `h-24` (96px) |

---

## 레이아웃 구조

```
┌──────────────────────────────────────────────────────┐
│  ▓▓▓ 상단 그라디언트 페이드 (About → Projects) ▓▓▓   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  섹션 레이블: "PROJECTS"                              │
│  섹션 제목: "프로젝트"                                │
│  섹션 설명: "직접 설계하고 구현한 ..."                 │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Featured 프로젝트 카드 (넓은 레이아웃)          │  │
│  │  [이미지 영역]           [텍스트 영역]           │  │
│  │  (임시 플레이스홀더)      제목 / 설명 / 기술스택  │  │
│  │                          [GitHub] [Live Demo]   │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ 프로젝트 카드  │  │ 프로젝트 카드  │  │ 프로젝트   │ │
│  │  2            │  │  3            │  │  카드 4     │ │
│  │ [이미지]      │  │ [이미지]      │  │ [이미지]   │ │
│  │ 제목          │  │ 제목          │  │ 제목       │ │
│  │ 설명          │  │ 설명          │  │ 설명       │ │
│  │ 기술스택      │  │ 기술스택      │  │ 기술스택   │ │
│  │ [링크들]      │  │ [링크들]      │  │ [링크들]   │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 구성 요소

### 1. 섹션 헤더

| 요소 | 스타일 | 텍스트 |
|---|---|---|
| 레이블 | `text-xs font-medium uppercase tracking-wide text-muted-foreground` | "PROJECTS" |
| 제목 | `text-3xl font-medium text-foreground` | "프로젝트" |
| 설명 | `mt-2 text-[15px] text-muted-foreground max-w-lg` | "직접 설계하고 구현한 프로젝트들입니다. 각 프로젝트에서 어떤 문제를 해결했는지에 초점을 맞추었습니다." |

### 2. Featured 프로젝트 카드 (첫 번째 프로젝트)

첫 번째 프로젝트를 강조하여 넓은 2컬럼 레이아웃으로 표시.

| 스타일 | 값 |
|---|---|
| 컨테이너 | `bg-card rounded-lg border border-border overflow-hidden` |
| 레이아웃 | `grid grid-cols-1 lg:grid-cols-2` |
| 이미지 영역 | `aspect-video bg-secondary` (임시 플레이스홀더) |
| 텍스트 영역 | `p-6 flex flex-col justify-between` |

### 3. 일반 프로젝트 카드 (나머지)

3열 그리드로 나머지 프로젝트 표시.

| 스타일 | 값 |
|---|---|
| 그리드 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` |
| 카드 | `bg-card rounded-lg border border-border overflow-hidden flex flex-col` |
| 이미지 | `aspect-video bg-secondary` (임시 플레이스홀더) |
| 콘텐츠 | `p-4 flex flex-col flex-1 gap-3` |

### 4. 카드 공통 내부 구조

```tsx
{/* 이미지 영역 (임시) */}
<div className="aspect-video bg-secondary flex items-center justify-center">
  <span className="text-sm text-muted-foreground">프로젝트 이미지</span>
</div>

{/* 콘텐츠 */}
<div className="p-4 flex flex-col flex-1 gap-3">
  {/* 제목 */}
  <h3 className="text-lg font-medium text-foreground">프로젝트명</h3>

  {/* 설명 */}
  <p className="text-sm text-muted-foreground line-clamp-3">
    프로젝트 설명...
  </p>

  {/* 기술 스택 태그 */}
  <div className="flex flex-wrap gap-1.5 mt-auto">
    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
      React
    </span>
    ...
  </div>

  {/* 링크 */}
  <div className="flex gap-2 pt-2 border-t border-border">
    <a className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <Github className="size-4" /> GitHub
    </a>
    <a className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <ExternalLink className="size-4" /> Live
    </a>
  </div>
</div>
```

### 5. 프로젝트 데이터 (플레이스홀더)

```ts
const PROJECTS = [
  {
    title: "E-Commerce 대시보드",
    description: "실시간 매출 데이터 시각화와 주문 관리 기능을 제공하는 어드민 대시보드. 복잡한 필터링과 차트 인터랙션을 최적화했습니다.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Zustand"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "실시간 채팅 앱",
    description: "WebSocket 기반 실시간 메시징 애플리케이션. 읽음 확인, 타이핑 인디케이터, 파일 전송을 지원합니다.",
    techs: ["React", "Socket.io", "Express", "MongoDB"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "블로그 플랫폼",
    description: "마크다운 에디터와 SSG를 활용한 개인 블로그. SEO 최적화와 다크모드를 지원합니다.",
    techs: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    github: "#",
    live: null,
    featured: false,
  },
  {
    title: "할 일 관리 앱",
    description: "드래그 앤 드롭 기반 칸반 보드. 로컬 스토리지 영속화와 PWA를 지원합니다.",
    techs: ["React", "TypeScript", "dnd-kit", "Zustand"],
    github: "#",
    live: "#",
    featured: false,
  },
];
```

---

## FSD 파일 구조

```
src/
├── widgets/
│   └── projects/
│       ├── ui/
│       │   ├── ProjectsSection.tsx     ← 섹션 전체 조합
│       │   ├── FeaturedProjectCard.tsx  ← Featured 프로젝트 (넓은 레이아웃)
│       │   └── ProjectCard.tsx         ← 일반 프로젝트 카드
│       └── index.ts                    ← public API
│
└── views/
    └── home/
        └── index.tsx                   ← ProjectsSection 사용 (임시 섹션 교체)
```

---

## 반응형

| 뷰포트 | 변경 사항 |
|---|---|
| 모바일 (`< sm`) | Featured 1컬럼 (이미지 위 + 텍스트 아래), 일반 카드 1열 |
| 태블릿 (`sm`) | Featured 1컬럼, 일반 카드 2열 |
| 데스크탑 (`lg`) | Featured 2컬럼 (이미지 좌 + 텍스트 우), 일반 카드 3열 |

---

## 다크모드 대응

- 섹션 배경: `bg-muted` → 테마 자동 전환
- 카드: `bg-card border-border` → 테마 자동 전환
- 기술 스택 태그: `bg-secondary text-secondary-foreground` → 테마 자동 전환
- 이미지 플레이스홀더: `bg-secondary` → 테마 자동 전환
- 그라디언트 페이드: `from-background to-transparent` → 테마 자동 전환

---

## 구현 순서

1. `src/widgets/projects/ui/ProjectCard.tsx` — 일반 프로젝트 카드
2. `src/widgets/projects/ui/FeaturedProjectCard.tsx` — Featured 프로젝트 카드
3. `src/widgets/projects/ui/ProjectsSection.tsx` — 섹션 조합 (페이드 + 헤더 + 카드들)
4. `src/widgets/projects/index.ts` — public API
5. `src/views/home/index.tsx` — 임시 Projects 섹션을 ProjectsSection으로 교체

---

## 완료 조건

- [ ] About → Projects 섹션 전환이 그라디언트 페이드로 자연스럽다
- [ ] 배경색이 `bg-muted`로 About 섹션과 미묘하게 구분된다
- [ ] Featured 프로젝트가 넓은 2컬럼 레이아웃으로 강조된다
- [ ] 나머지 프로젝트가 3열 그리드로 표시된다
- [ ] 각 카드에 제목, 설명, 기술 스택 태그, 링크가 표시된다
- [ ] 반응형 레이아웃이 모바일/태블릿/데스크탑에서 정상 동작한다
- [ ] 다크모드에서 카드, 태그, 배경이 적절히 표시된다
- [ ] `pnpm build` 타입 에러 없이 통과한다
