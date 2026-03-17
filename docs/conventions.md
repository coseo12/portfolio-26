# 코드 컨벤션

## TypeScript

- `any` 타입 사용 금지 — 명확한 타입 또는 `unknown` 사용
- 컴포넌트 Props는 반드시 인터페이스로 정의
- 유틸리티 함수는 반환 타입을 명시

```ts
// ❌ 피하기
function getUser(id: any): any { ... }

// ✅ 선호
function getUser(id: string): Promise<User> { ... }
```

## 컴포넌트

- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- 컴포넌트당 하나의 파일 원칙
- Server Component를 기본으로, 클라이언트 상태가 필요할 때만 `"use client"` 추가

```tsx
// Props 인터페이스 정의
interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export function UserCard({ name, email, avatarUrl }: UserCardProps) {
  return <div>...</div>;
}
```

## 임포트 순서

1. React / Next.js
2. 외부 라이브러리
3. 내부 모듈 (`@/` 경로 별칭)
4. 타입 임포트

```ts
import { useState } from "react";
import Link from "next/link";

import { clsx } from "clsx";

import { UserCard } from "@/entities/user";
import { LoginForm } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import type { User } from "@/entities/user";
```

## 환경 변수

- 클라이언트에서 접근 가능한 변수: `NEXT_PUBLIC_` 접두사 필수
- `.env.local` 파일은 git에 커밋하지 않음
- `.env.example`에 필요한 변수 목록 유지

```bash
# .env.example
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=
```
