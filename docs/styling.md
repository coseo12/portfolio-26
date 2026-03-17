# 스타일링 가이드 (Tailwind CSS)

## 기본 규칙

- 인라인 스타일(`style={{}}`) 사용 금지 — Tailwind 클래스로 대체
- 복잡한 클래스 조합은 `cn()` 헬퍼로 관리
- 커스텀 색상, 폰트, 간격은 `tailwind.config.ts`에 정의

## cn() 헬퍼 사용

조건부 클래스 적용 시 `clsx`와 `tailwind-merge`를 조합한 `cn()` 사용:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// 사용 예시
<div className={cn(
  "rounded-lg px-4 py-2",
  isActive && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
```

## 반응형 디자인

모바일 퍼스트 원칙으로 작성:

```tsx
// ❌ 피하기 (데스크탑 퍼스트)
<div className="text-lg md:text-base sm:text-sm">

// ✅ 선호 (모바일 퍼스트)
<div className="text-sm md:text-base lg:text-lg">
```

## 커스텀 테마

프로젝트 고유 색상/값은 반드시 `tailwind.config.ts`에 추가:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a5f",
        },
      },
    },
  },
};
```
