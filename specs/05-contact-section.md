# 05. Contact 섹션 — 연락처

## 목표

포트폴리오 하단에 연락처 정보를 표시하고, 방문자가 쉽게 연락할 수 있도록 한다.
Projects 섹션과 자연스럽게 이어지며, 페이지의 마무리 역할을 한다.

---

## 배경 연결 전략

Projects 섹션(`bg-muted`)에서 다시 `bg-background`로 돌아오며 마무리한다.

```
Projects 섹션  → bg-muted
─── 경계 ───   → 상단 그라디언트 페이드 (bg-muted → bg-background)
Contact 섹션   → bg-background
```

| 요소 | 값 |
|---|---|
| 섹션 배경 | `bg-background` |
| 상단 페이드 | `from-muted to-transparent`, `h-24` |

---

## 레이아웃 구조

```
┌──────────────────────────────────────────────────┐
│  ▓▓▓ 상단 그라디언트 페이드 (Projects → Contact) │
├──────────────────────────────────────────────────┤
│                                                  │
│  섹션 레이블: "CONTACT"                           │
│  섹션 제목: "연락하기"                            │
│  섹션 설명: "프로젝트 협업이나 ..."               │
│                                                  │
│  ┌────────────────┐  ┌────────────────────────┐  │
│  │  연락처 카드     │  │  메시지 폼 (간단)       │  │
│  │                │  │                        │  │
│  │  📧 이메일      │  │  이름                   │  │
│  │  📱 연락처      │  │  이메일                 │  │
│  │  📍 위치        │  │  메시지                 │  │
│  │                │  │  [보내기] 버튼           │  │
│  │  GitHub 링크    │  │                        │  │
│  │                │  │                        │  │
│  └────────────────┘  └────────────────────────┘  │
│                                                  │
│  ─────────── 하단 구분선 ───────────              │
│  © 2026 서창오. All rights reserved.              │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 구성 요소

### 1. 섹션 헤더

| 요소 | 스타일 | 텍스트 |
|---|---|---|
| 레이블 | `text-xs font-medium uppercase tracking-wide text-muted-foreground` | "CONTACT" |
| 제목 | `text-3xl font-medium text-foreground` | "연락하기" |
| 설명 | `mt-2 text-[15px] text-muted-foreground max-w-lg` | "프로젝트 협업이나 채용에 관심이 있으시다면 편하게 연락 주세요." |

### 2. 연락처 카드 (좌측)

| 스타일 | 값 |
|---|---|
| 컨테이너 | `bg-card rounded-lg border border-border p-6` |
| 항목 간격 | `space-y-4` |

**연락처 항목:**

| 아이콘 (lucide) | 레이블 | 값 | 동작 |
|---|---|---|---|
| `Mail` | 이메일 | momo_12@naver.com | `mailto:` 링크 |
| `Phone` | 연락처 | 010-7139-7568 | `tel:` 링크 |
| `MapPin` | 위치 | 서울 광진구 | 텍스트만 |
| `Github` | GitHub | github.com/coseo12 | 외부 링크 |

각 항목 구조:

```tsx
<div className="flex items-center gap-3">
  <Mail className="size-5 text-primary" />
  <div>
    <p className="text-xs text-muted-foreground">이메일</p>
    <a href="mailto:momo_12@naver.com"
       className="text-sm text-foreground hover:text-primary transition-colors">
      momo_12@naver.com
    </a>
  </div>
</div>
```

### 3. 메시지 폼 (우측)

> **참고**: 실제 전송 기능은 추후 구현. 현재는 UI만 구성하고 버튼 클릭 시 `mailto:` 링크로 대체한다.

| 스타일 | 값 |
|---|---|
| 컨테이너 | `bg-card rounded-lg border border-border p-6` |
| 필드 간격 | `space-y-4` |

**폼 필드:**

| 필드 | 타입 | placeholder |
|---|---|---|
| 이름 | `input` text | "이름을 입력하세요" |
| 이메일 | `input` email | "이메일을 입력하세요" |
| 메시지 | `textarea` | "메시지를 입력하세요" |

- Label: `text-sm font-medium text-foreground`
- Input/Textarea: shadcn/ui 컴포넌트 사용 (없으면 기본 스타일)
  - `rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring`
- Textarea: `min-h-[120px] resize-none`
- 보내기 버튼: shadcn Button (`default` variant), 전체 너비 `w-full`
  - 클릭 시 `mailto:momo_12@naver.com` 으로 이동 (임시)

### 4. 푸터

섹션 하단에 간단한 저작권 표시.

| 스타일 | 값 |
|---|---|
| 구분선 | `border-t border-border mt-16 pt-6` |
| 텍스트 | `text-sm text-muted-foreground text-center` |
| 내용 | "© 2026 서창오. All rights reserved." |

---

## FSD 파일 구조

```
src/
├── widgets/
│   └── contact/
│       ├── ui/
│       │   ├── ContactSection.tsx   ← 섹션 전체 조합
│       │   ├── ContactInfo.tsx      ← 연락처 카드
│       │   └── ContactForm.tsx      ← 메시지 폼
│       └── index.ts                 ← public API
│
└── views/
    └── home/
        └── index.tsx                ← ContactSection 추가
```

---

## 헤더 내비게이션 업데이트

Header의 NAV_ITEMS에 Contact 항목을 추가한다.

```ts
const NAV_ITEMS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
```

또한 Hero 섹션의 "연락하기" 버튼을 `#contact`로 스크롤하도록 연결한다.

---

## 반응형

| 뷰포트 | 변경 사항 |
|---|---|
| 모바일 (`< lg`) | 연락처 카드 + 폼 세로 스택 |
| 데스크탑 (`lg`) | 2컬럼 (연락처 좌 + 폼 우) |

---

## 다크모드 대응

- 카드: `bg-card border-border` → 테마 자동 전환
- Input/Textarea: `bg-background border-input` → 테마 자동 전환
- 그라디언트 페이드: `from-muted to-transparent` → 시맨틱 토큰으로 자동 전환

---

## 구현 순서

1. `src/widgets/contact/ui/ContactInfo.tsx` — 연락처 카드
2. `src/widgets/contact/ui/ContactForm.tsx` — 메시지 폼
3. `src/widgets/contact/ui/ContactSection.tsx` — 섹션 조합
4. `src/widgets/contact/index.ts` — public API
5. `src/views/home/index.tsx` — ContactSection 추가
6. `src/widgets/header/ui/Header.tsx` — NAV_ITEMS에 Contact 추가
7. `src/widgets/hero/ui/HeroSection.tsx` — "연락하기" 버튼 #contact 연결

---

## 완료 조건

- [ ] Projects → Contact 섹션 전환이 그라디언트 페이드로 자연스럽다
- [ ] 연락처 카드에 이메일, 연락처, 위치, GitHub이 표시된다
- [ ] 이메일/연락처 클릭 시 mailto:/tel: 링크가 동작한다
- [ ] 메시지 폼 UI가 표시된다 (전송 기능은 추후)
- [ ] 하단에 저작권 표시가 있다
- [ ] 헤더 내비게이션에 Contact 메뉴가 추가되어 스크롤 이동한다
- [ ] Hero 섹션 "연락하기" 버튼이 #contact로 스크롤된다
- [ ] 반응형 레이아웃이 모바일/데스크탑에서 정상 동작한다
- [ ] `pnpm build` 타입 에러 없이 통과한다
