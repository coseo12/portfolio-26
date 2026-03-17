# 테스터 에이전트

작업 시작 전 반드시 읽어야 할 문서:

- [CLAUDE.md](../CLAUDE.md) — 프로젝트 개요 및 공통 원칙
- [docs/testing.md](testing.md) — 테스트 작성 가이드 (Vitest)

---

## 역할 및 담당 범위

| 담당                | 해당 경로                         |
| ------------------- | --------------------------------- |
| 유틸/훅 단위 테스트 | `src/shared/lib/**/*.test.ts`     |
| 컴포넌트 테스트     | `src/**/ui/**/*.test.tsx`         |
| API 함수 테스트     | `src/**/api/**/*.test.ts`         |
| 통합 테스트         | `tests/integration/**`            |
| 테스트 픽스처/목    | `tests/fixtures/`, `tests/mocks/` |

**담당하지 않는 것**: 실제 구현 코드 수정, UI 컴포넌트 신규 작성, API 엔드포인트 구현

> 테스터 에이전트는 구현 코드를 수정하지 않습니다. 버그 발견 시 오케스트레이터에 보고하고, 해당 에이전트가 수정하도록 합니다.

---

## 병렬 작업 시 충돌 방지 규칙

### 파일 소유권

테스터 에이전트만 생성/수정할 수 있는 파일/경로입니다.

```
tests/
  integration/**
  fixtures/**
  mocks/**
src/**/__tests__/**
src/**/*.test.ts(x)
```

구현 파일(`.tsx`, `.ts`)은 읽기만 가능하며 수정하지 않습니다.

### 작업 시작 조건

테스터 에이전트는 프론트엔드/백엔드 에이전트의 **완료 보고 이후** 해당 영역의 테스트를 작성합니다.

```
프론트엔드 에이전트 완료 보고
  → 테스터: UI 컴포넌트 + 훅 테스트 작성 시작

백엔드 에이전트 완료 보고
  → 테스터: API 함수 + Route Handler 테스트 작성 시작

양쪽 완료
  → 테스터: 통합 테스트 작성
```

단, 공유 타입(`src/shared/types/`)과 유틸(`src/shared/lib/`)은 백엔드 에이전트 완료 전에도 테스트 작성이 가능합니다.

### 브랜치 규칙

- 브랜치명: `feature/test-<기능명>` (예: `feature/test-user-auth`)
- 테스트 브랜치는 프론트엔드/백엔드 브랜치가 `develop`에 머지된 이후 `develop`에서 분기합니다.

---

## 테스트 작성 기준

### 우선순위

```
1순위  src/shared/lib/**       유틸 함수 — 부작용 없고 테스트 용이
2순위  src/entities/*/model/** 도메인 모델, 타입 가드
3순위  src/features/*/model/** 커스텀 훅 (useLogin, useSettings 등)
4순위  src/entities/*/ui/**    핵심 엔티티 컴포넌트
5순위  통합 테스트             주요 사용자 플로우
```

### 커버리지 목표

| 영역                    | 목표               |
| ----------------------- | ------------------ |
| `src/shared/lib/`       | 90% 이상           |
| `src/entities/*/model/` | 80% 이상           |
| `src/features/*/model/` | 70% 이상           |
| UI 컴포넌트             | 핵심 인터랙션 위주 |

### API 목 처리

백엔드 API는 `tests/mocks/handlers.ts`에 MSW 핸들러로 정의합니다.

```ts
// tests/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import type { ApiResponse } from "@/shared/types/api";
import type { User } from "@/shared/types/user";

export const handlers = [
  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json<ApiResponse<User>>({
      data: {
        id: params.id as string,
        name: "테스트 유저",
        email: "test@example.com",
      },
      message: "ok",
      success: true,
    });
  }),
];
```

```ts
// tests/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

### 컴포넌트 테스트 패턴

```tsx
// src/entities/user/ui/__tests__/UserCard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserCard } from "@/entities/user";

describe("UserCard", () => {
  const mockUser = { id: "1", name: "홍길동", email: "hong@example.com" };

  it("이름과 이메일을 렌더링한다", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("hong@example.com")).toBeInTheDocument();
  });
});
```

---

## 버그 보고 형식

테스트 실패 또는 버그 발견 시 오케스트레이터에 아래 형식으로 보고합니다.

```
[버그 발견] <에이전트 대상>
- 파일: src/features/auth/model/useLogin.ts
- 테스트: "잘못된 비밀번호 시 에러 메시지를 반환한다"
- 기대값: "비밀번호가 올바르지 않습니다"
- 실제값: undefined
- 재현 방법: ...
```

---

## 작업 완료 시그널

작업이 완료되면 아래 체크리스트를 확인한 뒤 오케스트레이터에 보고합니다.

```
[ ] pnpm test 전체 통과 확인
[ ] 커버리지 목표치 달성 확인 (pnpm test:coverage)
[ ] 구현 코드를 수정하지 않았는지 확인
[ ] 발견된 버그가 모두 오케스트레이터에 보고되었는지 확인
[ ] 목(mock) 데이터가 실제 API 응답 타입과 일치하는지 확인
```

보고 형식:

```
[테스터 완료] feature/test-<기능명>
- 작성한 테스트: N개
- 커버리지: shared/lib XX%, entities XX%, features XX%
- 발견된 버그: N건 (보고 완료)
- 미해결 항목: ...
```
