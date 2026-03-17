# Portfolio

서창오의 개인 포트폴리오 웹사이트입니다.

## 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| 3D/WebGL | three.js (Floating Lines 배경) |
| Theme | next-themes (라이트/다크 모드) |
| Test | Vitest + Testing Library |
| Package Manager | pnpm |

## 프로젝트 구조

[Feature-Sliced Design (FSD)](https://feature-sliced.design/) 아키텍처를 기반으로 합니다.

```
src/
  app/        ← Next.js App Router (라우팅 전용)
  views/      ← 페이지 조합 (라우트별 진입점)
  widgets/    ← 독립적인 UI 블록
    header/   ← 고정 헤더 + 스크롤 감지 내비게이션
    hero/     ← Floating Lines 배경 + 개발자 소개
    about/    ← 프로필, 기술 스택, 경력/교육
    projects/ ← Featured + 일반 프로젝트 카드 그리드
    contact/  ← 연락처 정보 + 푸터
  shared/     ← 공용 UI, 유틸, 타입
    ui/       ← shadcn/ui 컴포넌트, FloatingLines
    lib/      ← cn() 등 유틸리티
    types/    ← 공통 타입 정의
```

## 섹션 구성

| 섹션 | 설명 |
|---|---|
| **Hero** | three.js WebGL 셰이더 배경 (Floating Lines) + 소개 + CTA 버튼 |
| **About Me** | 프로필 카드, 기술 스택 4분류 그리드, 경력/교육 타임라인 |
| **Projects** | Featured 프로젝트 (2컬럼) + 일반 프로젝트 카드 (3열 그리드), 호버 오버레이 |
| **Contact** | 이메일, 전화, 위치, GitHub 연락처 카드 |

각 섹션은 그라디언트 페이드로 자연스럽게 연결됩니다.

## 시작하기

```bash
pnpm install    # 의존성 설치
pnpm dev        # 개발 서버 (http://localhost:3000)
pnpm build      # 프로덕션 빌드
pnpm typecheck  # 타입 체크
pnpm test       # 테스트 실행
pnpm lint       # 린트
```

## 배포

GitHub Pages로 호스팅되며, `main` 브랜치에 푸시하면 자동 배포됩니다.

- **URL**: https://coseo12.github.io/portfolio-26/
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **빌드**: Next.js 정적 빌드 (`output: "export"`)

### 배포 흐름

```
main 푸시 → GitHub Actions 트리거
         → pnpm install → typecheck → build (정적 빌드)
         → out/ 디렉토리를 GitHub Pages에 배포
```

### basePath 처리

GitHub Pages는 서브 경로(`/portfolio-26/`)에 배포되므로, `GITHUB_PAGES` 환경변수로 `basePath`를 조건부 적용합니다. 로컬 개발에서는 basePath 없이 동작합니다.

```ts
// next.config.ts
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/portfolio-26" : "";
```

이미지 경로에는 `assetPath()` 유틸을 사용하여 basePath를 주입합니다.

---

## 디자인 시스템

- **테마**: Navy Blue 기반 커스텀 테마 (라이트/다크 모드)
- **컬러**: CSS 변수 기반 시맨틱 토큰 (`bg-primary`, `text-muted-foreground` 등)
- **타이포**: Inter + Pretendard (sans), JetBrains Mono (mono)
- **컴포넌트**: shadcn/ui (FSD `src/shared/ui/`에 배치)
