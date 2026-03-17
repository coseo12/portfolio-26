# 백엔드 에이전트

작업 시작 전 반드시 읽어야 할 문서:

- [CLAUDE.md](../CLAUDE.md) — 프로젝트 개요 및 공통 원칙
- [docs/structure.md](structure.md) — FSD 폴더 구조

---

## 역할 및 담당 범위

| 담당                | 해당 레이어/경로                             |
| ------------------- | -------------------------------------------- |
| API 라우트 구현     | `app/api/**` (Next.js Route Handlers)        |
| 서버 비즈니스 로직  | `src/features/*/api/`, `src/entities/*/api/` |
| API 클라이언트 설정 | `src/shared/api/`                            |
| 공통 타입 정의      | `src/shared/types/`                          |
| 서버 유틸리티       | `src/shared/lib/server/`                     |

**담당하지 않는 것**: UI 컴포넌트, 페이지 레이아웃, 클라이언트 상태 관리, 테스트 파일 작성

---

## 병렬 작업 시 충돌 방지 규칙

### 파일 소유권

백엔드 에이전트만 수정할 수 있는 파일/경로입니다.

```
app/api/**
src/features/*/api/**
src/entities/*/api/**
src/shared/api/**
src/shared/lib/server/**
```

> `src/shared/types/`는 **공유 영역**입니다.
> 타입 추가/변경 시 프론트엔드 에이전트에 즉시 공지하세요.

### 타입 정의 우선 원칙

백엔드 에이전트는 **프론트엔드 에이전트보다 먼저** 공유 타입을 확정해야 합니다.

```
1. 작업 시작 시 src/shared/types/<도메인>.ts 에 타입 초안 작성
2. 오케스트레이터에 타입 확정 완료 보고
3. 프론트엔드 에이전트가 해당 타입으로 UI 구현 시작
```

타입 변경이 불가피한 경우, 기존 타입을 즉시 삭제하지 않고 deprecated 처리 후 프론트엔드 에이전트에 공지합니다.

```ts
/** @deprecated v2 타입으로 교체 예정. 프론트엔드 에이전트 작업 완료 후 삭제 */
export type UserV1 = { ... };

export type User = { ... }; // 새 타입
```

### 브랜치 규칙

- 브랜치명: `feature/backend-<기능명>` (예: `feature/backend-user-api`)
- `src/shared/types/` 변경은 커밋 메시지에 명시: `feat(types): User 타입에 role 필드 추가`

---

## 프론트엔드 에이전트와의 인터페이스 규약

### API 타입 공유 위치

```
src/shared/types/
  api.ts        ← 공통 응답 래퍼 (백엔드가 정의, 양측 변경 금지)
  user.ts       ← User 도메인 타입
  post.ts       ← Post 도메인 타입
  ...
```

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

### Route Handler 응답 규칙

모든 API 응답은 `ApiResponse<T>` 형식을 준수합니다.

```ts
// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/shared/types/api";
import type { User } from "@/shared/types/user";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const user = await getUser(params.id);
  return NextResponse.json<ApiResponse<User>>({
    data: user,
    message: "ok",
    success: true,
  });
}
```

### API 클라이언트 정의

```ts
// src/shared/api/client.ts — 백엔드 에이전트가 정의 및 소유
export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  post: async <T>(url: string, body: unknown): Promise<T> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
```

---

## 작업 완료 시그널

작업이 완료되면 아래 체크리스트를 확인한 뒤 오케스트레이터에 보고합니다.

```
[ ] 모든 Route Handler가 ApiResponse<T> 형식으로 응답하는지 확인
[ ] any 타입이 없는지 확인 (pnpm typecheck 통과)
[ ] 공유 타입 변경 사항이 있다면 프론트엔드 에이전트에 공지했는지 확인
[ ] 담당 외 경로(pages/, widgets/, ui/) 파일을 수정하지 않았는지 확인
[ ] feature 브랜치가 develop 기준으로 최신화되어 있는지 확인
```

보고 형식:

```
[백엔드 완료] feature/backend-<기능명>
- 구현 내용: ...
- 공유 타입 변경: 있음(변경 내용) / 없음
- 테스터 에이전트 필요 작업: ...
```
