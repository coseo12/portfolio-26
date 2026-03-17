# 프론트엔드 에이전트

작업 시작 전 반드시 읽어야 할 문서:

- [CLAUDE.md](../CLAUDE.md) — 프로젝트 개요 및 공통 원칙
- [docs/structure.md](structure.md) — FSD 폴더 구조
- [docs/conventions.md](conventions.md) — 코드 컨벤션
- [docs/design-system.md](design-system.md) — shadcn/ui 기반 디자인 시스템

---

## 역할 및 담당 범위

| 담당             | 해당 레이어/경로                                           |
| ---------------- | ---------------------------------------------------------- |
| UI 컴포넌트 구현 | `src/widgets/`, `src/features/*/ui/`, `src/entities/*/ui/` |
| 페이지 조합      | `src/pages/`, `app/`                                       |
| 공통 UI 컴포넌트 | `src/shared/ui/` (shadcn/ui 기반)                          |
| 스타일링         | Tailwind CSS + 디자인 시스템 토큰                          |
| 클라이언트 상태  | `src/features/*/model/`, `src/entities/*/model/`           |

**담당하지 않는 것**: API 엔드포인트 구현, DB 스키마, 서버 비즈니스 로직, 테스트 파일 작성

---

## 병렬 작업 시 충돌 방지 규칙

### 파일 소유권

프론트엔드 에이전트만 수정할 수 있는 파일/경로입니다.

```
src/pages/**
src/widgets/**
src/features/*/ui/**
src/features/*/model/**
src/entities/*/ui/**
src/shared/ui/**
app/**
```

> `src/shared/types/`와 `src/shared/api/`는 **공유 영역**입니다.
> 수정 전 백엔드 에이전트와 인터페이스를 먼저 합의하세요.

### 작업 순서 원칙

1. 백엔드 에이전트가 `src/shared/types/`에 API 타입을 먼저 정의
2. 프론트엔드 에이전트는 해당 타입을 import해 UI 구현
3. 타입이 확정되기 전에는 `TODO: 타입 연동 필요` 주석으로 임시 처리

```ts
// TODO: 타입 연동 필요 — backend 에이전트 작업 완료 후 교체
type TempUser = { id: string; name: string };
```

### 브랜치 규칙

- 브랜치명: `feature/frontend-<기능명>` (예: `feature/frontend-user-profile`)
- `src/shared/types/` 수정 시 별도 브랜치 불가 — 반드시 백엔드 에이전트와 동일 브랜치에서 협의 후 처리

---

## 백엔드 에이전트와의 인터페이스 규약

### API 타입 공유 위치

```
src/shared/types/
  api.ts        ← 공통 응답 래퍼 (ApiResponse, PaginatedResponse)
  user.ts       ← User 도메인 타입
  post.ts       ← Post 도메인 타입
  ...
```

모든 API 요청/응답 타입은 `src/shared/types/`에 정의되며, 프론트엔드와 백엔드 에이전트가 공동으로 소유합니다.

### 공통 응답 타입 (변경 금지)

```ts
// src/shared/types/api.ts
export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}>;
```

### API 클라이언트 사용

```ts
// src/shared/api/client.ts — 백엔드 에이전트가 정의
// 프론트엔드 에이전트는 이를 import해서만 사용, 직접 수정 금지
import { apiClient } from "@/shared/api/client";

const user = await apiClient.get<ApiResponse<User>>("/users/me");
```

---

## 작업 완료 시그널

작업이 완료되면 아래 체크리스트를 확인한 뒤 오케스트레이터에 보고합니다.

```
[ ] 구현한 컴포넌트가 디자인 시스템 토큰만 사용하는지 확인
[ ] "use client" 사용이 최소화되었는지 확인
[ ] any 타입이 없는지 확인 (pnpm typecheck 통과)
[ ] 공유 타입(src/shared/types/)이 백엔드 에이전트와 합의된 버전인지 확인
[ ] 담당 외 경로(api/, server/) 파일을 수정하지 않았는지 확인
[ ] feature 브랜치가 develop 기준으로 최신화되어 있는지 확인
```

보고 형식:

```
[프론트엔드 완료] feature/frontend-<기능명>
- 구현 내용: ...
- 공유 타입 변경: 있음 / 없음
- 테스터 에이전트 필요 작업: ...
```
