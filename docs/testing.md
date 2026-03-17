# 테스트 가이드 (Vitest)

## 기본 규칙

- 테스트 파일 위치: 소스 파일 옆 `__tests__/` 폴더 또는 루트 `tests/` 폴더
- 파일명 규칙: `*.test.ts` / `*.test.tsx`
- 유틸 함수와 커스텀 훅은 반드시 단위 테스트 작성
- UI 컴포넌트는 `@testing-library/react` 사용

## 실행 명령어

```bash
pnpm test              # 전체 테스트 실행
pnpm test:watch        # watch 모드
pnpm test:coverage     # 커버리지 리포트
pnpm test src/lib/utils.test.ts  # 단일 파일 테스트
```

## 유틸 함수 테스트 예시

```ts
// lib/__tests__/formatDate.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/formatDate";

describe("formatDate", () => {
  it("날짜를 올바른 형식으로 반환한다", () => {
    expect(formatDate(new Date("2024-01-15"))).toBe("2024년 1월 15일");
  });

  it("유효하지 않은 날짜는 빈 문자열을 반환한다", () => {
    expect(formatDate(null)).toBe("");
  });
});
```

## 컴포넌트 테스트 예시

```tsx
// components/__tests__/UserCard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserCard } from "@/components/UserCard";

describe("UserCard", () => {
  it("이름과 이메일을 렌더링한다", () => {
    render(<UserCard name="홍길동" email="hong@example.com" />);

    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("hong@example.com")).toBeInTheDocument();
  });
});
```

## 커스텀 훅 테스트 예시

```ts
// hooks/__tests__/useCounter.test.ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useCounter } from "@/hooks/useCounter";

describe("useCounter", () => {
  it("초기값이 0이다", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("increment 호출 시 1 증가한다", () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});
```
