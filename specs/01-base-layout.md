# 01. 기본 레이아웃 — 스크롤 페이징 구조

## 목표

풀스크린 스크롤 페이징 방식의 포트폴리오 기본 레이아웃을 구현한다.
상단 고정 헤더에 섹션 내비게이션이 존재하며, 각 섹션은 뷰포트 전체 높이를 차지한다.

---

## 페이지 구조

```
┌─────────────────────────────────┐
│  Header (fixed, 최상단)          │
│  [Logo]  [Hero] [About] [Projects]│
├─────────────────────────────────┤
│                                 │
│         Hero 섹션 (100vh)        │
│                                 │
├─────────────────────────────────┤
│                                 │
│       About Me 섹션 (100vh)      │
│                                 │
├─────────────────────────────────┤
│                                 │
│       Projects 섹션 (100vh)      │
│                                 │
└─────────────────────────────────┘
```

---

## 구성 요소

### 1. Header

| 속성 | 값 |
|---|---|
| 위치 | `fixed top-0`, 전체 너비 |
| 높이 | `h-16` (64px) |
| 배경 | `bg-background/80 backdrop-blur-sm` |
| z-index | `z-50` |
| 하단 테두리 | `border-b border-border` |

**내부 구성:**

```
[Logo(좌측)]                      [Hero] [About Me] [Projects(우측)]
```

- **Logo**: 텍스트 로고, `text-lg font-medium`
- **내비게이션 메뉴**: 각 섹션으로 스크롤 이동하는 앵커 링크
  - 클릭 시 `scroll-behavior: smooth`로 해당 섹션으로 이동
  - 현재 보이는 섹션에 해당하는 메뉴에 활성 상태 표시 (`text-primary font-medium`)
  - 비활성 메뉴: `text-muted-foreground hover:text-foreground`

### 2. 섹션 공통

| 속성 | 값 |
|---|---|
| 높이 | `min-h-screen` (최소 뷰포트 높이) |
| 패딩 상단 | `pt-16` (헤더 높이만큼 오프셋) |
| ID | 각 섹션에 `id` 부여 (`hero`, `about`, `projects`) |

### 3. 섹션별 임시 콘텐츠

구현 확인을 위해 각 섹션을 **랜덤 배경색 + 중앙 텍스트**로 채운다.

| 섹션 | 임시 배경색 | 텍스트 |
|---|---|---|
| Hero | `bg-rose-200 dark:bg-rose-900` | "Hero Section" |
| About Me | `bg-sky-200 dark:bg-sky-900` | "About Me Section" |
| Projects | `bg-amber-200 dark:bg-amber-900` | "Projects Section" |

각 섹션 내부:

```tsx
<section id="hero" className="min-h-screen pt-16 flex items-center justify-center bg-rose-200 dark:bg-rose-900">
  <h2 className="text-4xl font-medium text-foreground">Hero Section</h2>
</section>
```

---

## FSD 파일 구조

```
src/
├── app/
│   └── page.tsx                  ← HomePage를 렌더링
│
├── views/
│   └── home/
│       └── index.tsx             ← 섹션 조합 (Hero + About + Projects)
│
├── widgets/
│   └── header/
│       ├── ui/Header.tsx         ← 헤더 UI 컴포넌트
│       └── index.ts              ← public API
│
└── shared/
    └── ui/                       ← 공통 UI (필요 시)
```

---

## 동작 명세

### 스크롤 내비게이션

1. 헤더 메뉴 클릭 → 해당 `id`의 섹션으로 부드럽게 스크롤
2. 스크롤 위치에 따라 현재 섹션을 감지하여 헤더 메뉴 활성 상태 갱신
3. `IntersectionObserver`를 사용하여 현재 뷰포트에 보이는 섹션을 추적

### 반응형

| 뷰포트 | 동작 |
|---|---|
| 데스크탑 (`md` 이상) | 헤더 메뉴 가로 나열 |
| 모바일 (`md` 미만) | 헤더 메뉴 가로 나열 유지 (항목 3개로 적음) |

---

## 구현 순서

1. `src/widgets/header/` — Header 컴포넌트 생성
2. `src/views/home/` — HomePage에 3개 섹션 배치
3. `src/app/page.tsx` — HomePage 연결
4. 스크롤 감지 로직 추가 (IntersectionObserver)

---

## 완료 조건

- [ ] 헤더가 상단에 고정되어 스크롤 시에도 유지된다
- [ ] 메뉴 클릭 시 해당 섹션으로 부드럽게 스크롤된다
- [ ] 3개 섹션이 각각 뷰포트 전체 높이를 차지한다
- [ ] 각 섹션이 서로 다른 배경색으로 시각적으로 구분된다
- [ ] 현재 보이는 섹션에 해당하는 메뉴가 활성 상태로 표시된다
- [ ] `pnpm build` 타입 에러 없이 통과한다
