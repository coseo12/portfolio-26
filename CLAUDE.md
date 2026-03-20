# CLAUDE.md

이 파일은 Claude Code가 이 저장소에서 작업할 때 참조하는 프로젝트 가이드입니다.

---

## 프로젝트 개요

- **타입**: 프론트엔드 앱
- **프레임워크**: Next.js (App Router)
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **스타일링**: Tailwind CSS
- **테스트**: Vitest

---

## 빠른 시작

```bash
pnpm install   # 의존성 설치
pnpm dev       # 개발 서버
pnpm build     # 프로덕션 빌드
pnpm test      # 테스트 실행
pnpm lint      # 린트
pnpm typecheck # 타입 체크
```

---

## 서브 에이전트 구성

이 프로젝트는 3개의 서브 에이전트가 병렬로 작업합니다. 에이전트 정의 파일은 `.claude/agents/`에 위치하며, Claude Code가 작업 성격에 따라 자동으로 적절한 에이전트에 위임합니다.

```
.claude/agents/
  frontend.md   ← UI, 컴포넌트, 페이지, 클라이언트 상태
  backend.md    ← Route Handler, API 로직, 공유 타입 정의
  tester.md     ← 단위/통합 테스트, 목(mock) 관리
```

### 병렬 작업 흐름

```
오케스트레이터
├── [즉시 시작] backend  → src/shared/types/ 타입 먼저 확정
├── [타입 확정 후] frontend → UI 구현 (backend와 병렬 가능)
└── [양쪽 완료 후] tester → 테스트 작성
```

### 오케스트레이터 프롬프트 예시

```
로그인 기능을 구현해줘.
backend 에이전트로 API 타입과 Route Handler를 먼저 작성하고,
타입이 확정되면 frontend 에이전트와 병렬로 진행해.
각 에이전트 완료 후 tester 에이전트로 테스트를 작성해.
```

### 작업 라우팅 결정 기준

요청이 들어오면 아래 순서로 판단합니다.

```
1. 오케스트레이터가 직접 처리할 작업인가?  → 직접 처리
2. 단일 에이전트로 충분한가?               → 해당 에이전트에 위임
3. 여러 도메인에 걸쳐 있는가?              → 병렬 또는 순차 위임
```

**오케스트레이터가 직접 처리하는 작업**

에이전트를 거치지 않고 오케스트레이터가 직접 수행합니다.

| 작업 유형          | 예시                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| 문서 작성 및 수정  | `docs/**`, `CLAUDE.md`, `README.md`                                   |
| 설정 파일 변경     | `tsconfig.json`, `tailwind.config.ts`, `package.json`, `.env.example` |
| 프로젝트 초기 세팅 | 의존성 설치, 폴더 구조 생성, 스캐폴딩                                 |
| 코드 검색 및 분석  | 특정 패턴 탐색, 의존성 파악, 구조 파악                                |
| Git 작업           | 브랜치 생성, 커밋, 머지, 충돌 해결                                    |
| 에이전트 간 조율   | 완료 보고 수신, 다음 단계 결정, 버그 재할당                           |
| 빠른 단순 수정     | 오타 수정, 상수 값 변경, 주석 추가                                    |

**단일 에이전트 위임**

요청이 한 도메인에만 해당할 때:

```
"UserCard 컴포넌트 만들어줘"          → frontend 에이전트
"/api/users 엔드포인트 추가해줘"      → backend 에이전트
"useAuth 훅 테스트 작성해줘"          → tester 에이전트
```

**병렬 실행** — 아래 조건을 모두 충족할 때:

- 작업 도메인이 독립적 (프론트/백엔드/테스트)
- 공유 파일(`src/shared/types/`)에 경쟁 쓰기 없음
- 각 에이전트의 완료 조건이 명확

**순차 실행** — 아래 조건 중 하나라도 해당할 때:

- 타입 정의 미확정 상태에서 UI 구현 불필요
- 구현 미완료 코드의 테스트 작성
- 공유 경로(`src/shared/types/`)를 동시 수정하는 경우

---

## 문서 목록

세부 내용은 아래 문서를 참조하세요.

| 문서                                               | 내용                                       |
| -------------------------------------------------- | ------------------------------------------ |
| [docs/structure.md](docs/structure.md)             | 폴더 구조 및 파일 네이밍 규칙              |
| [docs/conventions.md](docs/conventions.md)         | 코드 컨벤션 (TypeScript, 컴포넌트, 임포트) |
| [docs/styling.md](docs/styling.md)                 | Tailwind CSS 사용 규칙                     |
| [docs/testing.md](docs/testing.md)                 | 테스트 작성 가이드 (Vitest)                |
| [docs/principles.md](docs/principles.md)           | 개발 원칙 및 주의사항                      |
| [docs/design-system.md](docs/design-system.md)     | 컬러, 타이포, 스페이싱, 컴포넌트 토큰      |
| [docs/scroll-animation.md](docs/scroll-animation.md) | 스크롤 애니메이션 및 3D 배경 가이드       |
| [docs/agents/frontend.md](docs/agents/frontend.md) | 프론트엔드 에이전트 가이드                 |
| [docs/agents/backend.md](docs/agents/backend.md)   | 백엔드 에이전트 가이드                     |
| [docs/agents/tester.md](docs/agents/tester.md)     | 테스터 에이전트 가이드                     |

---

## 핵심 원칙 (요약)

1. `pnpm` 외 다른 패키지 매니저 사용 금지
2. Server Component를 기본으로, 필요할 때만 `"use client"` 추가
3. `any` 타입 사용 금지
4. 빌드/타입 오류가 있는 상태로 커밋하지 않기
