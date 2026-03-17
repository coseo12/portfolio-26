# 03. About Me 섹션 — 개발자 소개

## 목표

Hero 섹션과 시각적으로 자연스럽게 이어지면서, 개발자의 역량과 경험을 구조화된 카드 레이아웃으로 전달한다.

---

## 배경 연결 전략

Hero 섹션은 FloatingLines(검은 배경 위 Navy Blue 라인)을 사용한다.
About Me 섹션은 이 어두운 분위기에서 점진적으로 밝아지는 느낌을 준다.

```
Hero 섹션      → 검은 배경 + FloatingLines
─── 경계 ───   → 상단 그라디언트 페이드 (검은색 → bg-background)
About 섹션     → bg-background (테마 기본 배경)
```

| 요소 | 값 |
|---|---|
| 섹션 배경 | `bg-background` |
| 상단 페이드 | 섹션 최상단에 `absolute top-0` 그라디언트 오버레이 — `from-black to-transparent` (라이트) / `from-[hsl(222,25%,8%)] to-transparent` (다크) |
| 페이드 높이 | `h-32` (128px) |

> Hero의 FloatingLines 검은 배경 → 그라디언트 페이드 → About의 bg-background 로 자연스럽게 전환된다.

---

## 레이아웃 구조

```
┌─────────────────────────────────────────────────────┐
│  ▓▓▓ 상단 그라디언트 페이드 (Hero → About 전환) ▓▓▓ │
├─────────────────────────────────────────────────────┤
│                                                     │
│  섹션 레이블: "ABOUT ME"                             │
│  섹션 제목: "저를 소개합니다"                         │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │                  │  │  소개 텍스트               │ │
│  │  프로필 영역      │  │  2~3문단의 자기소개        │ │
│  │  (아바타 + 간단   │  │                          │ │
│  │   인적사항)       │  │                          │ │
│  │                  │  │                          │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ 기술스택 │ │ 기술스택 │ │ 기술스택 │ │ 기술스택 │  │
│  │ 카드 1   │ │ 카드 2   │ │ 카드 3   │ │ 카드 4   │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                     │
│  ┌─────────────────┐ ┌─────────────────┐           │
│  │  경력 타임라인    │ │  교육/자격증      │           │
│  └─────────────────┘ └─────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 구성 요소

### 1. 섹션 헤더

| 요소 | 스타일 | 텍스트 |
|---|---|---|
| 레이블 | `text-xs font-medium uppercase tracking-wide text-muted-foreground` | "ABOUT ME" |
| 제목 | `text-3xl font-medium text-foreground` | "저를 소개합니다" |

### 2. 프로필 + 소개 (상단 2컬럼)

데스크탑에서 좌측 프로필, 우측 소개 텍스트. 모바일에서 세로 스택.

**프로필 영역 (좌측)**

| 요소 | 스타일 |
|---|---|
| 컨테이너 | `bg-card rounded-lg border border-border p-6` |
| 아바타 | `size-24 rounded-full bg-muted` (임시 플레이스홀더) |
| 이름 | `text-lg font-medium text-foreground` |
| 역할 | `text-sm text-muted-foreground` |
| 위치 | `text-sm text-muted-foreground` — "Seoul, South Korea" |
| 상태 | Badge (`secondary`) — "구직 중" 또는 "재직 중" |

**소개 텍스트 (우측)**

```
3년차 프론트엔드 개발자로, React와 TypeScript 생태계에서
사용자 중심의 웹 애플리케이션을 만들고 있습니다.

복잡한 비즈니스 요구사항을 직관적인 인터페이스로 풀어내는 것을 좋아하며,
컴포넌트 설계와 상태 관리 패턴에 깊은 관심을 가지고 있습니다.

최근에는 Next.js App Router와 서버 컴포넌트를 활용한
풀스택 개발 경험을 쌓고 있습니다.
```

| 요소 | 스타일 |
|---|---|
| 본문 | `text-[15px] leading-relaxed text-muted-foreground` |
| 단락 간격 | `space-y-4` |

### 3. 기술 스택 카드 (4열 그리드)

4개의 카드로 기술 영역을 분류하여 표시.

| 스타일 | 값 |
|---|---|
| 그리드 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` |
| 카드 | `bg-card rounded-lg border border-border p-4` |
| 카테고리명 | `text-lg font-medium text-foreground` |
| 기술 항목 | `text-sm text-muted-foreground` |

**카드 데이터:**

| 카테고리 | 아이콘 (lucide) | 기술 목록 |
|---|---|---|
| Frontend | `Monitor` | React, Next.js, TypeScript, Tailwind CSS |
| State & Data | `Database` | Zustand, TanStack Query, React Hook Form |
| Tools | `Wrench` | Git, GitHub Actions, Figma, Storybook |
| Infra | `Cloud` | Vercel, AWS (S3, CloudFront), Docker |

각 카드 내부:

```tsx
<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Monitor className="size-5 text-primary" />
    <h3 className="text-lg font-medium text-foreground">Frontend</h3>
  </div>
  <ul className="space-y-1">
    <li className="text-sm text-muted-foreground">React</li>
    <li className="text-sm text-muted-foreground">Next.js</li>
    ...
  </ul>
</div>
```

### 4. 경력 & 교육 (하단 2컬럼)

데스크탑에서 좌측 경력, 우측 교육. 모바일에서 세로 스택.

**경력 타임라인 (좌측 카드)**

| 스타일 | 값 |
|---|---|
| 컨테이너 | `bg-card rounded-lg border border-border p-6` |
| 제목 | `text-lg font-medium text-foreground` — "경력" |
| 항목 구분 | 좌측 세로 라인 (`border-l-2 border-border pl-4`) |

```
경력

│ Frontend Developer
│ ABC 테크 · 2022.03 – 현재
│ React, TypeScript 기반 어드민 대시보드 개발
│
│ Web Publisher
│ XYZ 에이전시 · 2020.06 – 2022.02
│ 반응형 웹사이트 퍼블리싱 및 유지보수
```

**교육/자격증 (우측 카드)**

```
교육

│ 컴퓨터공학 학사
│ OO대학교 · 2016 – 2020
│
│ 정보처리기사
│ 한국산업인력공단 · 2020
```

---

## FSD 파일 구조

```
src/
├── widgets/
│   └── about/
│       ├── ui/
│       │   ├── AboutSection.tsx    ← 섹션 전체 조합
│       │   ├── ProfileCard.tsx     ← 프로필 카드
│       │   ├── SkillGrid.tsx       ← 기술 스택 그리드
│       │   └── TimelineCard.tsx    ← 경력/교육 타임라인 카드
│       └── index.ts                ← public API
│
└── views/
    └── home/
        └── index.tsx               ← AboutSection 사용 (임시 섹션 교체)
```

---

## 반응형

| 뷰포트 | 변경 사항 |
|---|---|
| 모바일 (`< sm`) | 모든 그리드 1열, 프로필+소개 세로 스택 |
| 태블릿 (`sm`) | 기술 스택 2열, 경력/교육 세로 스택 |
| 데스크탑 (`lg`) | 기술 스택 4열, 프로필+소개 2열, 경력+교육 2열 |

---

## 다크모드 대응

- 모든 카드: `bg-card border-border` → 테마 자동 전환
- 텍스트: 시맨틱 토큰 사용으로 자동 대응
- 상단 그라디언트 페이드: 다크모드 시 `from-[hsl(222,25%,8%)]` (다크 배경색)

---

## 구현 순서

1. `src/widgets/about/ui/ProfileCard.tsx` — 프로필 카드
2. `src/widgets/about/ui/SkillGrid.tsx` — 기술 스택 그리드
3. `src/widgets/about/ui/TimelineCard.tsx` — 타임라인 카드 (경력/교육 공용)
4. `src/widgets/about/ui/AboutSection.tsx` — 섹션 조합 (페이드 + 헤더 + 콘텐츠)
5. `src/widgets/about/index.ts` — public API
6. `src/views/home/index.tsx` — 임시 About 섹션을 AboutSection으로 교체

---

## 완료 조건

- [ ] Hero → About 섹션 전환이 그라디언트 페이드로 자연스럽다
- [ ] 프로필 카드에 아바타, 이름, 역할, 위치, 상태 배지가 표시된다
- [ ] 소개 텍스트가 가독성 있게 렌더링된다
- [ ] 기술 스택이 4개 카테고리 카드로 분류되어 표시된다
- [ ] 경력/교육 타임라인이 좌측 라인과 함께 표시된다
- [ ] 반응형 레이아웃이 모바일/태블릿/데스크탑에서 정상 동작한다
- [ ] 다크모드에서 카드, 텍스트, 그라디언트 페이드가 적절히 표시된다
- [ ] `pnpm build` 타입 에러 없이 통과한다
