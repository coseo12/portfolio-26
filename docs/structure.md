# 폴더 구조

Feature-Sliced Design(FSD) 방법론을 기반으로 합니다. Next.js App Router의 `app/` 디렉토리는 라우팅 전용으로만 사용하고, 실제 로직과 UI는 FSD 레이어에 위치합니다.

---

## 레이어 개요

FSD는 6개의 레이어로 구성되며, **상위 레이어는 하위 레이어만 임포트할 수 있습니다.** 이 규칙이 FSD의 핵심입니다.

```
src/
  app/      ← (Next.js 전용) 라우팅, 레이아웃
  views/    ← 5 페이지 조합 (라우트별 진입점)
  widgets/  ← 4 독립적인 페이지 블록 (헤더, 사이드바)
  features/ ← 3 사용자 액션 단위 (로그인, 댓글 작성)
  entities/ ← 2 비즈니스 도메인 (User, Post, Order)
  shared/   ← 1 완전히 범용적인 코드 (ui, lib, api)
```

숫자가 높을수록 상위 레이어입니다. `widgets`는 `features`, `entities`, `shared`를 참조할 수 있지만, 반대 방향은 불가합니다.

---

## 디렉토리 레이아웃

```
├── src/
│   ├── app/                      # Next.js App Router (라우팅 전용)
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── page.tsx              # / → src/views/home
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx    # /login → src/views/login
│   │   │   └── register/page.tsx
│   │   └── dashboard/
│   │       └── page.tsx          # /dashboard → src/views/dashboard
│   │
│   ├── views/                    # 레이어 5: 페이지 진입점
│   │   ├── home/
│   │   │   └── index.tsx
│   │   ├── login/
│   │   │   └── index.tsx
│   │   └── dashboard/
│   │       └── index.tsx
│   │
│   ├── widgets/                  # 레이어 4: 독립적인 UI 블록
│   │   ├── header/
│   │   │   ├── ui/Header.tsx
│   │   │   └── index.ts
│   │   ├── sidebar/
│   │   │   ├── ui/Sidebar.tsx
│   │   │   └── index.ts
│   │   └── data-table/
│   │       ├── ui/DataTable.tsx
│   │       └── index.ts
│   │
│   ├── features/                 # 레이어 3: 사용자 액션
│   │   ├── auth/
│   │   │   ├── ui/LoginForm.tsx
│   │   │   ├── model/useLogin.ts
│   │   │   ├── api/login.ts
│   │   │   └── index.ts
│   │   └── user-settings/
│   │       ├── ui/SettingsForm.tsx
│   │       ├── model/useSettings.ts
│   │       └── index.ts
│   │
│   ├── entities/                 # 레이어 2: 비즈니스 도메인
│   │   ├── user/
│   │   │   ├── ui/UserCard.tsx
│   │   │   ├── model/user.ts     # 타입, 스키마
│   │   │   ├── api/getUser.ts
│   │   │   └── index.ts
│   │   └── post/
│   │       ├── ui/PostCard.tsx
│   │       ├── model/post.ts
│   │       ├── api/getPost.ts
│   │       └── index.ts
│   │
│   └── shared/                   # 레이어 1: 범용 코드
│       ├── ui/                   # shadcn/ui 컴포넌트
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   └── input.tsx
│       ├── api/                  # API 클라이언트, fetcher
│       ├── lib/                  # 유틸리티 (cn, formatDate 등)
│       ├── hooks/                # 범용 훅 (useDebounce 등)
│       ├── config/               # 환경 변수, 상수
│       └── types/                # 공통 타입 (ApiResponse 등)
│
│
├── public/                       # 정적 파일
└── docs/                         # 프로젝트 문서
```

---

## 슬라이스 내부 구조 (세그먼트)

각 레이어의 슬라이스(기능 단위 폴더)는 아래 세그먼트로 구성합니다. 필요한 것만 만들면 됩니다.

| 세그먼트   | 내용                                      |
| ---------- | ----------------------------------------- |
| `ui/`      | 컴포넌트 (.tsx)                           |
| `model/`   | 타입, 스키마, 훅, 상태                    |
| `api/`     | 서버 요청 함수                            |
| `lib/`     | 슬라이스 전용 유틸                        |
| `index.ts` | Public API — 외부에 공개할 것만 re-export |

```ts
// ✅ entities/user/index.ts — public API
export { UserCard } from "./ui/UserCard";
export type { User } from "./model/user";
export { getUser } from "./api/getUser";

// 내부 구현은 노출하지 않음
```

---

## 임포트 규칙

```ts
// ✅ 슬라이스는 반드시 index.ts(public API)를 통해 임포트
import { UserCard } from "@/entities/user";

// ❌ 슬라이스 내부를 직접 참조 금지
import { UserCard } from "@/entities/user/ui/UserCard";

// ✅ shared는 세그먼트까지 직접 참조 허용
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
```

**레이어 간 임포트 방향 (위 → 아래만 허용)**

```
views    → widgets, features, entities, shared  ✅
widgets  → features, entities, shared           ✅
features → entities, shared                     ✅
entities → shared                               ✅
shared   → (외부 라이브러리만)                  ✅

features → widgets                              ❌
entities → features                             ❌
shared   → entities                             ❌
같은 레이어 간 임포트                            ❌
```

---

## src/app/ ↔ src/views/ 연결 패턴

Next.js `src/app/` 디렉토리의 `page.tsx`는 라우팅 역할만 하고, 실제 UI는 `src/views/`에 위임합니다.

> **참고**: Next.js App Router가 `src/pages/`를 Pages Router로 인식하기 때문에, FSD의 pages 레이어를 `src/views/`로 사용합니다.

```tsx
// src/app/dashboard/page.tsx
import { DashboardPage } from "@/views/dashboard";

export default DashboardPage;
```

```tsx
// src/views/dashboard/index.tsx
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { UserStats } from "@/features/user-settings";

export function DashboardPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <UserStats />
    </div>
  );
}
```

---

## 파일 네이밍 규칙

| 종류              | 규칙                  | 예시                     |
| ----------------- | --------------------- | ------------------------ |
| 컴포넌트          | PascalCase.tsx        | `UserCard.tsx`           |
| 훅                | use로 시작, camelCase | `useLogin.ts`            |
| API 함수          | camelCase.ts          | `getUser.ts`             |
| 타입 / 모델       | camelCase.ts          | `user.ts`                |
| Public API        | index.ts 고정         | `index.ts`               |
| 테스트            | 원본파일명.test.ts(x) | `UserCard.test.tsx`      |
| Next.js 예약 파일 | 소문자 고정           | `page.tsx`, `layout.tsx` |

---

## 경로 별칭 (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```ts
// ✅ 레이어별 절대 경로
import { Button } from "@/shared/ui/button";
import { UserCard } from "@/entities/user";
import { LoginForm } from "@/features/auth";
import { Header } from "@/widgets/header";

// ❌ 상대 경로 금지
import { cn } from "../../../shared/lib/utils";
```
