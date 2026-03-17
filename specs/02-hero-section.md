# 02. Hero 섹션 — Floating Lines 배경 + 개발자 소개

## 목표

포트폴리오의 첫인상을 결정하는 Hero 섹션을 구현한다.
reactbits.dev의 **Floating Lines** 컴포넌트를 배경으로 사용하여 시각적 임팩트를 주고,
그 위에 개발자 소개 콘텐츠를 오버레이한다.

---

## 의존성

```bash
pnpm add three
pnpm add -D @types/three
```

- **three.js**: Floating Lines 컴포넌트가 WebGL 셰이더 기반으로 동작

---

## 레이아웃 구조

```
┌─────────────────────────────────────────────┐
│  [Floating Lines 배경 — 전체 영역]           │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │         오버레이 콘텐츠              │    │
│  │                                     │    │
│  │   인사말 (작은 텍스트)               │    │
│  │   "안녕하세요, 저는"                 │    │
│  │                                     │    │
│  │   이름 (큰 텍스트, 강조)             │    │
│  │   "서코딩"                          │    │
│  │                                     │    │
│  │   역할 (중간 텍스트)                 │    │
│  │   "Frontend Developer"              │    │
│  │                                     │    │
│  │   한줄 소개 (본문 텍스트)            │    │
│  │   "사용자 경험을 고민하는 ..."       │    │
│  │                                     │    │
│  │   [CTA 버튼들]                      │    │
│  │   [프로젝트 보기]  [연락하기]        │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│         ↓ 스크롤 인디케이터                  │
└─────────────────────────────────────────────┘
```

---

## 구성 요소

### 1. Floating Lines 배경

reactbits.dev의 FloatingLines 컴포넌트를 `src/shared/ui/`에 배치한다.

**컴포넌트 원본**: [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/Backgrounds/FloatingLines/FloatingLines.tsx)

| 속성 | 값 |
|---|---|
| 위치 | `absolute inset-0`, 섹션 전체 커버 |
| z-index | `z-0` |
| mixBlendMode | `"normal"` |

**Props 설정:**

```tsx
<FloatingLines
  linesGradient={["#3D6FC2", "#3490C5", "#5B8ED9"]}
  enabledWaves={["top", "middle", "bottom"]}
  lineCount={[4, 6, 4]}
  lineDistance={[6, 4, 6]}
  animationSpeed={0.8}
  interactive={true}
  bendRadius={5.0}
  bendStrength={-0.5}
  parallax={true}
  parallaxStrength={0.15}
/>
```

- `linesGradient`: 프로젝트 Navy Blue 테마 색상 계열 사용
- `animationSpeed`: 0.8 (기본보다 살짝 느리게, 차분한 느낌)
- `interactive`: true (마우스 따라 라인 휘어짐)
- `parallax`: true (마우스 따라 미세한 시차 효과)

### 2. 오버레이 콘텐츠

배경 위에 겹치는 텍스트 영역.

| 속성 | 값 |
|---|---|
| 위치 | `relative z-10` |
| 레이아웃 | 수직 중앙 정렬, 좌측 정렬 (`items-start`) |
| 좌우 여백 | `px-6 md:px-12 lg:px-24` |
| 최대 너비 | `max-w-2xl` |

**텍스트 구성:**

| 요소 | 스타일 | 예시 텍스트 |
|---|---|---|
| 인사말 | `text-sm text-muted-foreground uppercase tracking-wide` | "안녕하세요, 저는" |
| 이름 | `text-4xl md:text-5xl font-medium text-foreground` | "서코딩" |
| 역할 | `text-2xl md:text-3xl font-medium text-primary` | "Frontend Developer" |
| 한줄 소개 | `text-[15px] text-muted-foreground max-w-md` | "사용자 경험을 고민하고, 클린 코드를 추구하는 프론트엔드 개발자입니다." |

### 3. CTA 버튼

shadcn/ui Button 컴포넌트 사용.

```tsx
<div className="flex gap-3">
  <Button>프로젝트 보기</Button>
  <Button variant="outline">연락하기</Button>
</div>
```

| 버튼 | variant | 동작 |
|---|---|---|
| 프로젝트 보기 | `default` (primary) | `#projects` 섹션으로 smooth scroll |
| 연락하기 | `outline` | 추후 연락 섹션 또는 mailto 연결 |

### 4. 스크롤 인디케이터

하단 중앙에 아래 방향 화살표 애니메이션.

| 속성 | 값 |
|---|---|
| 위치 | 섹션 하단 중앙, `absolute bottom-8` |
| 스타일 | `text-muted-foreground animate-bounce` |
| 아이콘 | 아래 화살표 (lucide-react `ChevronDown`) |

---

## FSD 파일 구조

```
src/
├── shared/
│   └── ui/
│       └── floating-lines.tsx      ← Floating Lines 배경 컴포넌트
│
├── widgets/
│   └── hero/
│       ├── ui/HeroSection.tsx      ← Hero 섹션 전체 조합
│       └── index.ts                ← public API
│
└── views/
    └── home/
        └── index.tsx               ← HeroSection 사용 (기존 임시 섹션 교체)
```

---

## 반응형

| 뷰포트 | 변경 사항 |
|---|---|
| 모바일 (`< md`) | 이름 `text-4xl`, 역할 `text-2xl`, 좌우 패딩 `px-6` |
| 태블릿 (`md`) | 이름 `text-5xl`, 역할 `text-3xl`, 좌우 패딩 `px-12` |
| 데스크탑 (`lg`) | 좌우 패딩 `px-24` |

---

## 접근성

- Floating Lines 배경에 `aria-hidden="true"` 적용 (장식 요소)
- CTA 버튼에 명확한 텍스트 레이블 유지
- 배경 위 텍스트의 색상 대비 충분히 확보 (어두운 배경 위 밝은 텍스트)

---

## 다크모드 대응

| 요소 | 라이트 | 다크 |
|---|---|---|
| 배경 라인 색상 | Navy Blue 계열 (`#3D6FC2`) | 더 밝은 블루 계열 (`#6B9AE8`) |
| 텍스트 | `text-foreground` (자동 전환) | `text-foreground` (자동 전환) |
| CTA 버튼 | shadcn 기본 테마 따름 | shadcn 기본 테마 따름 |

> Floating Lines의 `linesGradient` prop을 다크모드에 따라 동적으로 변경하거나,
> 기본 어두운 배경(`#000`) 위에서 라인 색상이 충분히 밝게 보이도록 설정한다.

---

## 구현 순서

1. `pnpm add three && pnpm add -D @types/three`
2. `src/shared/ui/floating-lines.tsx` — FloatingLines 컴포넌트 배치
3. `src/widgets/hero/ui/HeroSection.tsx` — Hero 섹션 조합
4. `src/widgets/hero/index.ts` — public API
5. `src/views/home/index.tsx` — 기존 Hero 임시 섹션을 HeroSection으로 교체

---

## 완료 조건

- [ ] Floating Lines 배경이 Hero 섹션 전체에 렌더링된다
- [ ] 마우스 인터랙션(라인 휘어짐, 시차)이 동작한다
- [ ] 개발자 소개 텍스트가 배경 위에 가독성 있게 표시된다
- [ ] CTA 버튼 클릭 시 해당 섹션으로 smooth scroll 된다
- [ ] 스크롤 인디케이터 애니메이션이 표시된다
- [ ] 반응형 레이아웃이 모바일/태블릿/데스크탑에서 정상 동작한다
- [ ] 다크모드에서 라인 색상과 텍스트가 적절히 표시된다
- [ ] `pnpm build` 타입 에러 없이 통과한다
