# 스타일링 가이드 (Tailwind CSS)

## 기본 규칙

- 인라인 스타일(`style={{}}`) 사용 금지 — Tailwind 클래스로 대체 (단, 스크롤 기반 동적 스타일은 예외)
- 복잡한 클래스 조합은 `cn()` 헬퍼로 관리
- 커스텀 색상은 `globals.css` CSS 변수에 정의 (Cosmic Abstract 토큰)
- Tailwind 팔레트 클래스 직접 사용 금지 (`bg-blue-500` 등) — 시맨틱 토큰만 사용

## cn() 헬퍼 사용

조건부 클래스 적용 시 `clsx`와 `tailwind-merge`를 조합한 `cn()` 사용:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// 사용 예시 — 상태에 따라 클래스 토글
<div className={cn(
  "transition-all duration-300",
  open ? "z-10 border-primary/30" : "border-[--glass-border]"
)}>
```

## 반응형 디자인

모바일 퍼스트 원칙으로 작성:

```tsx
// ❌ 피하기 (데스크탑 퍼스트)
<div className="text-lg md:text-base sm:text-sm">

// ✅ 선호 (모바일 퍼스트)
<div className="text-xs sm:text-sm md:text-base">
```

## 배경 스타일링

3D 파티클 네트워크가 `position: fixed`로 전체 배경에 고정됩니다. 모든 섹션도 `position: fixed`로 쌓이며, 콘텐츠는 글래스 카드 안에 배치합니다.

```tsx
// ❌ 불투명 배경으로 3D 배경을 가림
<section className="bg-background">

// ✅ fixed 섹션 + 글래스 카드
<div className="fixed inset-0 z-[12] flex items-center" style={style}>
  <div className="mx-auto max-w-5xl px-6">
    <div className="rounded-xl border border-[--glass-border] bg-[--glass-bg] backdrop-blur-[var(--glass-blur)]"
         style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}>
      {/* 콘텐츠 */}
    </div>
  </div>
</div>
```

### 글래스 카드

콘텐츠가 많은 영역은 글래스 카드로 감싸서 가독성을 확보합니다.

```tsx
<div
  className="rounded-xl border border-[--glass-border] bg-[--glass-bg] p-4 sm:p-6 backdrop-blur-[var(--glass-blur)]"
  style={{ boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}
>
  {/* 콘텐츠 */}
</div>
```

### 섹션 간 전환

Crossfade Fixed Section 패턴을 사용합니다. 모든 섹션이 fixed로 쌓이고, `useCrossfadeScroll` 훅이 scrollY 기반으로 opacity/transform을 계산합니다. 한 섹션이 페이드 아웃되면서 다음 섹션이 동시에 페이드 인됩니다.

```tsx
// useCrossfadeScroll 훅으로 스타일 계산
const { style, progress } = useCrossfadeScroll(sectionIndex, 4);

<div className="fixed inset-0 z-[1X] flex items-center" style={style}>
  {/* 콘텐츠 */}
</div>
```

상세 가이드는 `docs/scroll-animation.md`를 참조하세요.

## 스크롤 기반 인라인 스타일 예외

`useCrossfadeScroll` 훅이 반환하는 `style` 객체는 `style` prop으로 전달합니다.

```tsx
const { style } = useCrossfadeScroll(0, 4);

<div style={style} className="will-change-[transform,opacity]">
```

`will-change-[transform,opacity]` 클래스를 함께 적용하여 GPU 가속을 활용합니다.

## 기술 배지 컬러

기술 스택별 Cosmic 컬러를 직접 매핑합니다. `bg-secondary`가 아닌 카테고리별 반투명 컬러를 사용합니다.

```tsx
// ❌ 단일 색상 배지
<span className="bg-secondary text-secondary-foreground">React</span>

// ✅ Cosmic 카테고리별 컬러
<span className="rounded-full bg-[#4DEEEA]/15 text-[#4DEEEA] px-2 py-px text-[9px] font-medium">
  React
</span>
```

| 카테고리 | 색상 | 대상 |
| --- | --- | --- |
| Cyan | `bg-[#4DEEEA]/15 text-[#4DEEEA]` | 프레임워크 |
| Violet | `bg-[#764BA2]/20 text-[#c49eea]` | 언어/AI |
| Amber | `bg-[#FFB86C]/15 text-[#FFB86C]` | 인프라 |
| Silver | `bg-[#E0E0E6]/10 text-[#E0E0E6]` | 백엔드/DB |

## 프로젝트 카드 인터랙션

프로젝트 카드는 CSS hover가 아닌 `useState` 기반 클릭/터치 토글로 구현합니다.

```tsx
const [open, setOpen] = useState(false);

// 아코디언: grid-rows 트릭으로 높이 애니메이션
<div className={cn(
  "grid transition-[grid-template-rows] duration-300",
  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
)}>
  <div className="overflow-hidden">
    {/* 상세 콘텐츠 */}
  </div>
</div>
```

- 모바일/데스크탑 모두 클릭으로 토글
- 링크 클릭 시 `stopPropagation`으로 카드 토글 방지
- 열린 상태: `border-primary/30` 글로우 + 이미지 `scale-110` + chevron 회전
