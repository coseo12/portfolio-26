# 디자인 시스템

기업용 프론트엔드 앱을 위한 디자인 시스템입니다. **shadcn/ui**를 기반으로 하며, 전문적이고 신뢰감 있는 무드와 라이트/다크 모드를 모두 지원합니다.

---

## shadcn/ui 개요

shadcn/ui는 컴포넌트를 패키지로 설치하는 방식이 아니라 **소스 코드를 프로젝트에 직접 복사**해 사용합니다. 모든 컴포넌트는 `components/ui/` 폴더에 위치하며 자유롭게 수정 가능합니다.

컬러 시스템은 Tailwind의 hex 팔레트 대신 **CSS 변수 → semantic token** 구조를 사용합니다. `bg-primary`, `text-muted-foreground` 같은 시맨틱 토큰을 Tailwind 클래스로 그대로 사용하고, 실제 색상값은 `globals.css`의 CSS 변수에서 한 곳에서 관리합니다.

### 설치

```bash
# 초기 설정
pnpm dlx shadcn@latest init

# 컴포넌트 추가 (예시)
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input card badge
```

---

## 컬러 시스템

### 토큰 구조

shadcn/ui는 아래의 시맨틱 토큰을 CSS 변수로 정의합니다. 컴포넌트에서는 이 토큰을 Tailwind 클래스로 사용합니다(`bg-background`, `text-foreground` 등).

| CSS 변수                   | Tailwind 클래스               | 용도                  |
| -------------------------- | ----------------------------- | --------------------- |
| `--background`             | `bg-background`               | 페이지 배경           |
| `--foreground`             | `text-foreground`             | 기본 텍스트           |
| `--card`                   | `bg-card`                     | 카드 배경             |
| `--card-foreground`        | `text-card-foreground`        | 카드 텍스트           |
| `--primary`                | `bg-primary`                  | 주요 액션 (버튼 등)   |
| `--primary-foreground`     | `text-primary-foreground`     | primary 위 텍스트     |
| `--secondary`              | `bg-secondary`                | 보조 배경             |
| `--secondary-foreground`   | `text-secondary-foreground`   | 보조 텍스트           |
| `--muted`                  | `bg-muted`                    | 비활성 배경           |
| `--muted-foreground`       | `text-muted-foreground`       | 보조 설명 텍스트      |
| `--accent`                 | `bg-accent`                   | 강조 배경             |
| `--accent-foreground`      | `text-accent-foreground`      | 강조 텍스트           |
| `--destructive`            | `bg-destructive`              | 삭제/위험 액션        |
| `--destructive-foreground` | `text-destructive-foreground` | destructive 위 텍스트 |
| `--border`                 | `border-border`               | 기본 테두리           |
| `--input`                  | `border-input`                | 인풋 테두리           |
| `--ring`                   | `ring-ring`                   | 포커스 링             |

### globals.css — 커스텀 테마 (Navy Blue 기반)

기본 shadcn/ui 테마를 전문적인 네이비 블루 계열로 오버라이드합니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 25% 12%;

    --card: 0 0% 100%;
    --card-foreground: 222 25% 12%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 25% 12%;

    /* Primary — Navy Blue */
    --primary: 221 52% 40%; /* #3D6FC2 */
    --primary-foreground: 0 0% 100%;

    /* Secondary — 연한 배경 */
    --secondary: 214 30% 95%; /* #EDF2FA */
    --secondary-foreground: 221 52% 25%;

    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;

    /* Accent — Steel Blue */
    --accent: 204 57% 48%; /* #3490C5 */
    --accent-foreground: 0 0% 100%;

    --destructive: 0 72% 58%; /* #E24B4A */
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 88%;
    --input: 220 13% 88%;
    --ring: 221 52% 40%; /* primary와 동일 */

    --radius: 0.5rem; /* 기본 border-radius = 8px */
  }

  .dark {
    --background: 222 25% 8%;
    --foreground: 210 20% 95%;

    --card: 222 25% 10%;
    --card-foreground: 210 20% 95%;

    --popover: 222 25% 10%;
    --popover-foreground: 210 20% 95%;

    --primary: 221 70% 65%; /* 다크에서 더 밝은 블루 */
    --primary-foreground: 222 25% 8%;

    --secondary: 221 25% 18%;
    --secondary-foreground: 210 20% 85%;

    --muted: 222 20% 16%;
    --muted-foreground: 220 10% 55%;

    --accent: 204 50% 55%;
    --accent-foreground: 222 25% 8%;

    --destructive: 0 60% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 222 20% 20%;
    --input: 222 20% 20%;
    --ring: 221 70% 65%;
  }
}
```

> **주의**: shadcn/ui의 CSS 변수는 HSL 값을 공백으로 구분한 형식(`H S% L%`)을 사용합니다. `hsl()` 없이 숫자만 씁니다.

### 컬러 사용 원칙

- **커스텀 Tailwind 팔레트 클래스 사용 금지** (`bg-blue-500`, `text-gray-700` 등) — 항상 시맨틱 토큰 사용
- 텍스트: `text-foreground` (기본) / `text-muted-foreground` (보조) / `text-primary` (강조)
- 배경: `bg-background` (페이지) / `bg-card` (카드) / `bg-muted` (비활성)
- 상태: `text-destructive` / `bg-destructive` 사용, 직접 red 팔레트 사용 금지

---

## 타이포그래피

### 스케일

| 이름      | 크기 | 굵기 | Tailwind                                      | 용도                  |
| --------- | ---- | ---- | --------------------------------------------- | --------------------- |
| Display   | 36px | 500  | `text-4xl font-medium`                        | 히어로, 랜딩 제목     |
| Heading 1 | 28px | 500  | `text-3xl font-medium`                        | 페이지 제목           |
| Heading 2 | 22px | 500  | `text-2xl font-medium`                        | 섹션 제목             |
| Heading 3 | 18px | 500  | `text-lg font-medium`                         | 서브섹션, 카드 제목   |
| Body      | 15px | 400  | `text-[15px]`                                 | 본문, 설명            |
| Small     | 13px | 400  | `text-sm text-muted-foreground`               | 보조 정보, 메타데이터 |
| Label     | 11px | 500  | `text-xs font-medium uppercase tracking-wide` | 섹션 레이블           |
| Code      | 13px | 400  | `font-mono text-sm`                           | 코드, 토큰            |

### 폰트 패밀리

```ts
// tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'Pretendard', '-apple-system', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
},
```

### 사용 원칙

- 굵기는 **400(기본)**, **500(강조)** 두 가지만 사용 — 600/700 금지
- 섹션 레이블: `uppercase tracking-wide text-muted-foreground`
- 본문 볼드 강조 최소화 — 중요도는 위계(크기, 색상)로 전달

---

## 스페이싱

4px 기본 단위의 8포인트 그리드 시스템 (Tailwind 기본값과 동일).

| Token | 값   | Tailwind    | 용도                    |
| ----- | ---- | ----------- | ----------------------- |
| 1     | 4px  | `p-1 gap-1` | 아이콘 여백, 미세 조정  |
| 2     | 8px  | `p-2 gap-2` | 컴포넌트 내부 작은 간격 |
| 3     | 12px | `p-3 gap-3` | 컴포넌트 내부 기본 간격 |
| 4     | 16px | `p-4 gap-4` | 카드 패딩, 섹션 내부    |
| 6     | 24px | `p-6 gap-6` | 카드 패딩 (넓은 버전)   |
| 8     | 32px | `p-8 gap-8` | 섹션 간 간격            |
| 12    | 48px | `p-12`      | 페이지 섹션 간격        |
| 16    | 64px | `p-16`      | 페이지 상하 여백        |

**레이아웃 기준선:**

- 컴포넌트 내부 패딩: `p-3` ~ `p-4`
- 컴포넌트 간 간격: `gap-3` ~ `gap-6`
- 섹션 간 간격: `gap-12` ~ `gap-16`
- 페이지 좌우 여백: `px-6` (모바일) / `px-12` (데스크탑)

---

## 테두리 반경

shadcn/ui는 `--radius` CSS 변수 하나를 기준으로 반경을 계산합니다.

`globals.css`에서 `--radius: 0.5rem` (8px)으로 설정되어 있으며, `tailwind.config.ts`에서 연동합니다.

```ts
// tailwind.config.ts
borderRadius: {
  lg: 'var(--radius)',           // 8px — 카드, 드롭다운
  md: 'calc(var(--radius) - 2px)', // 6px — 버튼, 인풋
  sm: 'calc(var(--radius) - 4px)', // 4px — 배지, 태그
},
```

| Token          | 값     | 용도                 |
| -------------- | ------ | -------------------- |
| `rounded-sm`   | 4px    | 배지, 소형 태그      |
| `rounded-md`   | 6px    | 버튼, 인풋           |
| `rounded-lg`   | 8px    | 카드, 드롭다운, 모달 |
| `rounded-full` | 9999px | 아바타, 필 배지      |

---

## 컴포넌트

shadcn/ui 컴포넌트는 `pnpm dlx shadcn@latest add <컴포넌트명>`으로 추가한 뒤 `components/ui/`에서 직접 수정합니다.

### Button

```tsx
import { Button } from "@/components/ui/button"

// variant: default | secondary | outline | ghost | destructive | link
// size: default | sm | lg | icon

<Button>저장</Button>
<Button variant="secondary">취소</Button>
<Button variant="outline">내보내기</Button>
<Button variant="destructive">삭제</Button>
<Button variant="ghost" size="icon"><Icon /></Button>
```

| Variant       | 사용 시점                    |
| ------------- | ---------------------------- |
| `default`     | 페이지당 1개, 핵심 CTA       |
| `secondary`   | 보조 액션                    |
| `outline`     | 3순위 액션, 필터 버튼        |
| `ghost`       | 툴바 아이콘, 내비게이션      |
| `destructive` | 삭제 등 되돌리기 어려운 액션 |

### Input

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-1.5">
  <Label htmlFor="email">이메일</Label>
  <Input id="email" type="email" placeholder="user@example.com" />
</div>;

{
  /* 에러 상태 — aria-invalid 사용 */
}
<Input
  aria-invalid="true"
  className="border-destructive focus-visible:ring-destructive"
/>;
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>월간 리포트</CardTitle>
    <CardDescription>2025년 3월 기준 데이터</CardDescription>
  </CardHeader>
  <CardContent>{/* 콘텐츠 */}</CardContent>
  <CardFooter>
    <Button>다운로드</Button>
  </CardFooter>
</Card>;
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

// variant: default | secondary | outline | destructive
<Badge>Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="outline">Pending</Badge>
```

> 시맨틱 상태(Success, Warning)는 shadcn/ui 기본 Badge에 없으므로 `className`으로 직접 오버라이드하거나 `components/ui/badge.tsx`에 variant를 추가해 사용합니다.

```tsx
{
  /* Success 예시 — globals.css에 색상 변수 추가 후 사용 */
}
<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
  Completed
</Badge>;
```

### 자주 쓰는 조합

```tsx
// 폼 필드
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// 테이블
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

// 다이얼로그
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 드롭다운
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
```

---

## 다크 모드

`next-themes`와 함께 shadcn/ui의 `class` 전략을 사용합니다.

```bash
pnpm add next-themes
```

```tsx
// app/providers.tsx
"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// 테마 토글 컴포넌트
"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Sun/Moon 아이콘 */}
    </Button>
  );
}
```

---

## tailwind.config.ts 전체 예시

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "Pretendard", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```
