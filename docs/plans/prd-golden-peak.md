# PRD: 개발자 포트폴리오 — "금봉(Golden Peak)" 테마

> **문서 버전**: v1.0
> **작성일**: 2026-03-28
> **상태**: 확정

---

## 1. Executive Summary

동양 산수화의 미학을 현대 웹 기술로 재해석한 프론트엔드 개발자 서창오의 포트폴리오.
금(Gold)과 묵(Ink Black)의 대비를 핵심 디자인 언어로 삼아, 11년차 개발자의 기술적 깊이와 예술적 감각을 동시에 전달한다.

---

## 2. 프로필 데이터 (docs/jd.md 기반)

### 2.1 기본 정보

| 항목 | 값 |
|------|---|
| 이름 | 서창오 |
| 직함 | 프론트엔드 개발자 |
| 경력 | 11년 5개월 |
| 이메일 | momo_12@naver.com |
| GitHub | https://github.com/coseo12 |
| 위치 | 서울 광진구 |

### 2.2 기술 스택

| 카테고리 | 기술 |
|----------|------|
| Frontend | React, Next.js, TypeScript, Vue.js (Vue3), Pinia.js, HTML5, CSS3, Canvas API, Electron, WebRTC |
| Backend & DB | Node.js, Spring, MySQL, PostgreSQL, MariaDB, MongoDB |
| DevOps & Tools | Turborepo, Docker, Git, Vite, RESTful API |
| AI & Specialized | LangChain, OpenAI API, OCR, Web Audio API |

### 2.3 경력 (타임라인 데이터)

| 기간 | 회사 | 직책 | 핵심 프로젝트 |
|------|------|------|-------------|
| 2025.06 – 2025.08 | 스페이스애드 | 프론트엔드 | - |
| 2023.09 – 2025.04 | 피플리 (PDM) | Frontend Developer | Qpicker App, 하리보 50주년 전시, 큐피커 티켓, AI 도슨트 |
| 2022.02 – 2023.02 | (주)로민 | 개발팀 연구원 | AI 문서인식 Textscope (Vue.js, Canvas API) |
| 2021.06 – 2022.01 | (주)쓰리아이 | SWE | Pivo 화상 스트리밍 (React, Electron, WebRTC) |
| 2020.01 – 2021.03 | 노스스타컨설팅 | 솔루션사업부 주임 | 선진 HMS 고도화 FE 리드 |
| 2018.08 – 2019.09 | (주)시너젠 | 전임연구원 | ESS 통합 모니터링 솔루션 |
| 2014.11 – 2016.11 | (주)에너젠 | 전기제어 대리 | 디젤비상발전기 시운전 QA/QC |
| 2010.07 – 2013.09 | LG디스플레이 | P8E 사원 | 생산 이력 관리, 패널 적재 장비 제어 |

### 2.4 프로젝트 (포트폴리오 카드 데이터)

| 프로젝트 | 설명 | 기술 스택 | 이미지 |
|---------|------|----------|--------|
| Qpicker Ticket | 문화전시 티켓팅 플랫폼, Turborepo + Docker 모노레포 구축 | Next.js, TypeScript, Turborepo, Docker | projects/qpicker-ticket.png |
| Textscope | AI 문서인식 서비스, Canvas 기반 문서 뷰어 | Vue.js, Vite, WebGL, Canvas API | projects/textscope.png |
| Pivo | 화상 스트리밍 앱, WebRTC 기반 실시간 통신 | React, Electron, WebRTC (Twilio) | projects/pivo.png |
| ESS 모니터링 | 에너지저장장치 통합 모니터링, 실시간 데이터 시각화 | React, Node.js, WebSocket | projects/ess.png |

### 2.5 학력 & 자격

| 항목 | 내용 |
|------|------|
| 학력 | 두원공과대학교 컴퓨터정보과 (3.37/4.0) |
| 자격증 | 전기산업기사, 전기기능사, 승강기기능사 |
| 교육 | 패스트캠퍼스 Vue.js, 한국소프트웨어인재개발원 웹모바일 양성과정 |
| 수상 | 프로젝트 금상 (태양광 자동차RC), 최우수상 (보고서 결재 ERP) |

---

## 3. Design Language — "금봉(Golden Peak)"

### 3.1 컬러 시스템

```
배경 계열 (묵색)
├── --ink-900: #0a0e17    // 가장 깊은 배경
├── --ink-800: #111827    // 카드/섹션 배경
├── --ink-700: #1f2937    // 보조 배경, 구분선
└── --ink-600: #374151    // 비활성 텍스트

강조 계열 (금색)
├── --gold-600: #b8860b   // 어두운 금색 (그라디언트 시작)
├── --gold-500: #d4a853   // 프라이머리 강조, CTA
├── --gold-400: #e8c874   // 호버/활성 상태
└── --gold-300: #f0dca0   // 밝은 텍스트 강조

유틸리티
├── --gold-gradient: linear-gradient(135deg, #b8860b, #d4a853, #f0dca0)
├── --mist: rgba(255, 248, 230, 0.06)   // 안개/글라스모피즘
├── --moon: #f5f0e0                      // 달빛, 본문 텍스트
└── --moon-glow: rgba(245, 240, 224, 0.15)  // 달빛 번짐
```

### 3.2 타이포그래피

| 요소 | 폰트 | 비고 |
|------|------|------|
| 한글 제목 | Noto Serif KR (700) | 붓글씨 느낌의 세리프 |
| 영문 제목 | Playfair Display (700) | 고급스러운 세리프 |
| 본문 | Pretendard (400/500) | 가독성 우선 산세리프 |
| 코드/기술 태그 | JetBrains Mono (400) | 기술적 맥락 |

### 3.3 시각 원칙

1. **여백의 미** — 동양화의 여백처럼 충분한 spacing, 정보 밀도를 낮게 유지
2. **금박 절제** — 금색은 강조에만 사용, 남용 시 품격 하락
3. **수묵 그라디언트** — 섹션 전환 시 묵색의 농담 변화로 깊이감
4. **보름달 모티프** — 원형 요소 반복 (프로필, 장식, CTA hover)
5. **유기적 곡선** — 직선보다 곡선 우선 (산 실루엣, 파티클 궤적)

---

## 4. 기술 결정 (교차검증 확정)

> Claude + Gemini 합의 결과

### 4.1 Hero 배경: 하이브리드 3-레이어

| 레이어 | 구현 | 역할 | 성능 |
|--------|------|------|------|
| L1 배경 | 참조 이미지 WebP 최적화 + `object-fit: cover` | 산수화 질감/분위기 | priority 로딩 |
| L2 광원 | CSS `radial-gradient` + `box-shadow` + `mix-blend-mode` | 보름달 + 달빛 번짐 | CSS only, 0KB |
| L3 인터랙션 | Canvas 2D API | 금빛 먼지/반딧불 파티클 | ~3KB JS |

- 패럴랙스: L1(느림) / L2(더 느림) / L3(빠름) — CSS `transform: translateY()` + scroll event
- 모바일: 파티클 수 감소 (데스크톱 80개 → 모바일 30개)
- `prefers-reduced-motion`: 패럴랙스 + 파티클 비활성화

### 4.2 three.js → 제거

| 항목 | 변경 전 | 변경 후 |
|------|--------|--------|
| 배경 효과 | FloatingLines (three.js WebGL) | Canvas 2D 금빛 파티클 |
| About 장식 | WireframeGlobe (three.js) | SVG 붓글씨 드로잉 |
| 번들 절감 | ~500KB (gzipped) | ~5KB |
| 모바일 성능 | GPU 부하 높음 | 최소 |

### 4.3 WireframeGlobe → SVG 붓글씨 드로잉

- 스크롤 시 금빛 선이 매화 가지 윤곽을 그리는 효과
- SVG `stroke-dashoffset` 애니메이션
- 개발자의 성장 메타포 + 동양화 테마 일치

---

## 5. 섹션별 기능 명세

### 5.1 Header / Navigation

| 항목 | 상세 |
|------|------|
| 위치 | 상단 고정, 스크롤 시 `backdrop-blur` + `--ink-900/80%` 배경 |
| 로고 | "CO" 이니셜 — 한자 도장(落款) 스타일, 금색 |
| 메뉴 | About · Skills · Projects · Contact (4개) |
| 활성 표시 | 현재 섹션 메뉴에 금색 underline + glow |
| 모바일 | 햄버거 → 전체화면 오버레이 (묵색 배경 + 금색 메뉴) |
| 스크롤 반응 | top에선 투명, 스크롤 시 배경 fade-in |

### 5.2 Hero Section — "달이 뜨는 산맥"

```
┌─────────────────────────────────────────────┐
│  [L1: 산수화 배경 이미지]                      │
│                                             │
│           [L2: CSS 보름달 + Glow]             │
│                 ◯                           │
│          [L3: 금빛 파티클 ✦ ✧ ✦]              │
│                                             │
│         서 창 오                              │
│     Frontend Developer                      │
│                                             │
│  11년의 경험으로 사용자 경험을 설계합니다          │
│                                             │
│        [ 프로젝트 보기 ]                       │
│                                             │
│            ↓ scroll                         │
└─────────────────────────────────────────────┘
```

| 항목 | 상세 |
|------|------|
| 이름 | Noto Serif KR, 금색 그라디언트 텍스트 |
| 직함 | Playfair Display, `--moon` 컬러 |
| 소개 | Pretendard, `--moon` 컬러, 1줄 |
| CTA | 금색 border + hover 시 glow 확산 |
| 높이 | `100vh` |

### 5.3 About Section — "수묵 프로필"

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌──────┐                                  │
│   │ 프로필 │    서창오                         │
│   │ 사진  │    Frontend Developer             │
│   │ (원형) │    11년 5개월 경력                  │
│   └──────┘                                  │
│            금색 ring + subtle glow           │
│                                             │
│   ─── 소개 텍스트 ──────────────────          │
│   문제 해결 역량, 기술적 도전, 커뮤니케이션       │
│                                             │
│   ─── 경력 타임라인 (세로) ─────────          │
│   ● 2025  스페이스애드                        │
│   │                                         │
│   ● 2023  피플리 (PDM)                       │
│   │       Qpicker, 하리보 전시, AI 도슨트      │
│   ● 2022  (주)로민                           │
│   │       Textscope AI 문서인식               │
│   ● 2021  (주)쓰리아이                        │
│   │       Pivo 화상 스트리밍                   │
│   ...                                       │
│                                             │
│   [SVG 매화 가지 드로잉 — 스크롤 애니메이션]     │
│                                             │
└─────────────────────────────────────────────┘
```

| 항목 | 상세 |
|------|------|
| 프로필 사진 | `public/_.jpeg` 원형 마스크 + 금색 ring (3px) + `--moon-glow` |
| 소개 텍스트 | JD 자기소개 요약 3개 항목 (문제 해결, 기술 도전, 소통) |
| 타임라인 | 금색 점 + `--ink-700` 세로선, 최신순 정렬 |
| SVG 드로잉 | 매화 가지 금빛 선, `stroke-dashoffset` 스크롤 연동 |
| 레이아웃 | 데스크톱: 2열 (프로필 좌 / 소개 우), 모바일: 1열 스택 |

### 5.4 Skills Section — "기술의 봉우리"

```
┌─────────────────────────────────────────────┐
│                                             │
│          기술 스택                            │
│                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│   │Frontend │ │Backend  │ │DevOps   │      │
│   │         │ │& DB     │ │& Tools  │      │
│   │ React   │ │ Node.js │ │ Docker  │      │
│   │ Next.js │ │ Spring  │ │Turborepo│      │
│   │ TypeScript│ │ MySQL │ │ Git     │      │
│   │ Vue.js  │ │PostgreSQL│ │ Vite   │      │
│   │ Canvas  │ │ MongoDB │ │ REST   │      │
│   └─────────┘ └─────────┘ └─────────┘      │
│                                             │
│   ┌─────────┐                               │
│   │AI &     │                               │
│   │Special  │                               │
│   │LangChain│                               │
│   │OpenAI   │                               │
│   └─────────┘                               │
│                                             │
└─────────────────────────────────────────────┘
```

| 항목 | 상세 |
|------|------|
| 카테고리 | Frontend / Backend & DB / DevOps & Tools / AI & Specialized (4그룹) |
| 카드 | 글라스모피즘 (`--mist` 배경 + `backdrop-blur`) |
| 호버 | 금색 border 발광 (`--gold-500` box-shadow) |
| 아이콘 | 기술 로고 SVG (가능한 것만) + 텍스트 fallback |
| 레이아웃 | 데스크톱: 4열 → 태블릿: 2열 → 모바일: 1열 |

### 5.5 Projects Section — "작품 갤러리"

```
┌─────────────────────────────────────────────┐
│                                             │
│          프로젝트                             │
│                                             │
│   ┌─────────────────────────────────┐       │
│   │  [Featured] Qpicker Ticket      │       │
│   │  이미지 + 상세 설명               │       │
│   │  기술 태그: Next.js, TS, Docker   │       │
│   │  [GitHub] [Demo]                 │       │
│   └─────────────────────────────────┘       │
│                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│   │Textscope│ │  Pivo   │ │  ESS    │      │
│   │  Vue.js │ │ React   │ │ React   │      │
│   │ Canvas  │ │Electron │ │WebSocket│      │
│   └─────────┘ └─────────┘ └─────────┘      │
│                                             │
└─────────────────────────────────────────────┘
```

| 항목 | 상세 |
|------|------|
| Featured | 최신/대표 프로젝트 1개 대형 카드 (이미지 좌 + 설명 우) |
| 일반 | 나머지 3개, 3열 그리드 카드 |
| 카드 디자인 | `--ink-800` 배경 + 금색 `border-bottom` (2px) |
| 호버 | 이미지 위 반투명 `--ink-900/70%` 오버레이 + 상세 슬라이드업 |
| 기술 태그 | `--ink-700` 배경 + `--gold-400` 텍스트, 작은 pill 형태 |
| 링크 | GitHub / Demo 아이콘 버튼 (Lucide) |

### 5.6 Contact Section — "서신(書信)"

```
┌─────────────────────────────────────────────┐
│                                             │
│          연락처                               │
│                                             │
│   ┌──────────────────────────────┐          │
│   │  ✉ momo_12@naver.com        │          │
│   │  🔗 github.com/coseo12       │          │
│   │  📍 서울 광진구                │          │
│   └──────────────────────────────┘          │
│                                             │
│   ─────────────────────────────────         │
│   © 2026 서창오 · Crafted with ink and gold  │
│                                             │
└─────────────────────────────────────────────┘
```

| 항목 | 상세 |
|------|------|
| 정보 | 이메일, GitHub, 위치 (3개) |
| 아이콘 | Lucide 아이콘, `--gold-500` 컬러 |
| 이메일 | `mailto:` 링크 |
| GitHub | 외부 링크 (`target="_blank"`) |
| 푸터 | Copyright + 태그라인 |
| 배경 | 가장 깊은 `--ink-900` + 상단에 수묵 그라디언트 fade |

---

## 6. 인터랙션 & 모션 명세

| 효과 | 적용 위치 | 구현 | 조건 |
|------|----------|------|------|
| 패럴랙스 | Hero L1/L2/L3 | CSS `transform` + `scroll` event | `prefers-reduced-motion` 시 비활성 |
| 금빛 파티클 | Hero L3 | Canvas 2D, `requestAnimationFrame` | 모바일: 30개, 데스크톱: 80개 |
| Scroll Reveal | 모든 섹션 콘텐츠 | `IntersectionObserver` + CSS `opacity`/`translateY` | 한 번만 실행 |
| 달빛 Glow | Hero 보름달 | CSS `animation: pulse 4s ease-in-out infinite` | 항상 |
| 카드 호버 | Skills/Projects | CSS `transition: border-color 0.3s, box-shadow 0.3s` | 데스크톱만 |
| SVG 드로잉 | About 매화 가지 | SVG `stroke-dashoffset` + scroll 연동 | `prefers-reduced-motion` 시 즉시 표시 |
| 헤더 전환 | Header | CSS `transition: background 0.3s` | 스크롤 > 50px 시 |
| 섹션 전환 | 섹션 경계 | CSS `background` 묵색 농담 그라디언트 | 항상 |

---

## 7. 반응형 브레이크포인트

| Breakpoint | 레이아웃 변경 |
|-----------|-------------|
| `>=1200px` | 풀 레이아웃, 3-4열 그리드, 모든 효과 활성 |
| `768-1199px` | 2열, 패럴랙스 강도 50% 감소 |
| `480-767px` | 1열 스택, 햄버거 메뉴, 파티클 30개 |
| `<480px` | 최소 여백, 폰트 축소, 파티클 비활성화 |

---

## 8. 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| Framework | Next.js 16 (App Router, SSG) | 기존 유지 |
| Styling | Tailwind CSS v4 | 기존 유지 |
| UI Components | shadcn/ui | 기존 유지 |
| 파티클 | Canvas 2D API | three.js 대체 (경량) |
| SVG 애니메이션 | 네이티브 SVG + JS | 매화 가지 드로잉 |
| 폰트 | Google Fonts (Noto Serif KR, Playfair Display, Pretendard) | CDN |
| 아이콘 | Lucide React | 기존 유지 |
| 배포 | GitHub Pages (정적) | 기존 유지 |

### 제거 대상

| 패키지 | 사유 |
|--------|------|
| three | 테마 부적합 + 번들 ~500KB 절감 |
| (three 관련 타입) | three 제거에 따른 정리 |

---

## 9. 성능 목표

| 메트릭 | 목표 | 측정 |
|--------|------|------|
| LCP | < 2.5s | PageSpeed Insights |
| FID | < 100ms | PageSpeed Insights |
| CLS | < 0.1 | PageSpeed Insights |
| Lighthouse Performance | >= 90 | Lighthouse |
| Lighthouse Accessibility | >= 90 | Lighthouse |
| 번들 사이즈 (JS) | < 150KB (gzipped) | build output |
| Hero 이미지 | < 200KB (WebP) | 수동 |

---

## 10. Scope

### In-Scope (v1)

- [x] 디자인 시스템 (컬러 토큰, 타이포, 공통 스타일)
- [x] Header (네비게이션 + 스크롤 반응 + 모바일 메뉴)
- [x] Hero 섹션 (산수화 배경 + 보름달 + 금빛 파티클)
- [x] About 섹션 (프로필 + 소개 + 경력 타임라인 + SVG 매화)
- [x] Skills 섹션 (4카테고리 글라스 카드 그리드)
- [x] Projects 섹션 (Featured + 일반 그리드)
- [x] Contact 섹션 + 푸터
- [x] 반응형 (480px ~ 1200px+)
- [x] 접근성 (`prefers-reduced-motion`, semantic HTML, ARIA)
- [x] GitHub Pages 배포

### Out-of-Scope (v2+)

- 다크/라이트 모드 전환 (금봉 테마 자체가 다크)
- 블로그 섹션
- 프로젝트 필터/검색
- 다국어 (한/영)
- 방문자 분석 (GA)
- 컨택트 폼 (백엔드 필요)

---

## 11. 이슈 분해

| # | 이슈 제목 | 크기 | 우선순위 | 의존성 |
|---|----------|------|----------|--------|
| 1 | 디자인 시스템: 컬러 토큰, 타이포, globals.css | S | Critical | 없음 |
| 2 | Header: 네비게이션 + 스크롤 반응 + 모바일 | S | High | #1 |
| 3 | Hero: 산수화 배경 + 보름달 + Canvas 파티클 | L | Critical | #1 |
| 4 | About: 프로필 + 소개 + 타임라인 + SVG 매화 | M | High | #1 |
| 5 | Skills: 4카테고리 글라스 카드 그리드 | M | Medium | #1 |
| 6 | Projects: Featured + 일반 그리드 + 호버 | L | High | #1 |
| 7 | Contact + 푸터 | S | Medium | #1 |
| 8 | 반응형 + 접근성 QA | M | High | #2~#7 |
| 9 | 성능 최적화 + Lighthouse 검증 | S | Medium | #8 |
| 10 | three.js 제거 + 패키지 정리 | S | High | #3 |

### 구현 순서 (권장)

```
#1 디자인 시스템
  ↓
#10 three.js 제거  ←─→  #3 Hero 섹션 (병렬 가능)
  ↓
#2 Header
  ↓
#4 About  ←─→  #5 Skills (병렬 가능)
  ↓
#6 Projects
  ↓
#7 Contact
  ↓
#8 반응형 QA
  ↓
#9 성능 최적화
```

---

## 12. Risks & Mitigations

| 리스크 | 영향 | 대응 |
|--------|------|------|
| 금색 과다 사용 → 촌스러움 | 높음 | 디자인 토큰으로 사용처 제한, Evaluator 단계에서 시각 검증 |
| Hero 이미지 LCP 저하 | 중간 | WebP < 200KB, `priority` 로딩, `fetchpriority="high"` |
| SVG 매화 드로잉 복잡도 | 중간 | 간단한 가지 형태로 시작, 복잡도 점진적 증가 |
| 세리프 폰트 한글 무거움 | 낮음 | Noto Serif KR 700만 로드, `font-display: swap` |
| Canvas 파티클 모바일 성능 | 낮음 | 파티클 수 동적 조절, 480px 이하 비활성화 |

---

## 13. 성공 기준

| 기준 | 측정 |
|------|------|
| Lighthouse 전 카테고리 90+ | PageSpeed Insights |
| 모바일 480px에서 모든 콘텐츠 접근 가능 | 브라우저 테스트 |
| Hero 로딩 3초 이내 첫 인상 전달 | 수동 검증 |
| 모든 프로젝트/경력 데이터 정확 표시 | QA 체크리스트 |
| `prefers-reduced-motion` 준수 | 접근성 검증 |
