# 개발 원칙 및 주의사항

## 핵심 원칙

### 1. Server First

가능하면 Server Component를 사용하고, 불필요한 `"use client"` 지양합니다.
클라이언트 번들 크기를 줄이고 성능을 높이기 위함입니다.

```tsx
// "use client"가 필요한 경우
// - useState, useEffect 등 React 훅 사용
// - 브라우저 전용 API (window, document 등)
// - 이벤트 핸들러가 복잡한 경우
```

### 2. 타입 안전성

런타임 오류보다 컴파일 타임에 오류를 잡습니다.
`any` 대신 명확한 타입 또는 `unknown`을 사용하고, 타입 단언(`as`)은 최소화합니다.

### 3. 작은 컴포넌트

하나의 컴포넌트는 하나의 역할만 합니다.
100줄이 넘는 컴포넌트는 분리를 검토합니다.

### 4. 명확한 네이밍

축약어보다 명확한 이름을 선호합니다.

```ts
// ❌ 피하기
const usr = await getUsr(id);
const btn = <Btn />;

// ✅ 선호
const user = await getUser(id);
const button = <Button />;
```

### 5. 테스트와 함께

새로운 유틸 함수나 커스텀 훅을 추가할 때는 테스트를 함께 작성합니다.

---

## Git 브랜치 전략 (Gitflow)

### 브랜치 구조

```
main          ← 프로덕션 배포본. 직접 커밋 금지
develop       ← 통합 브랜치. 모든 feature가 여기로 머지됨
│
├── feature/  ← 기능 개발
├── fix/      ← 버그 수정
├── hotfix/   ← main에서 직접 분기하는 긴급 수정
└── release/  ← 배포 준비 (버전 범프, 최종 QA)
```

### 브랜치 네이밍

| 유형      | 패턴                  | 예시                  |
| --------- | --------------------- | --------------------- |
| 기능 개발 | `feature/간단한-설명` | `feature/user-auth`   |
| 버그 수정 | `fix/간단한-설명`     | `fix/login-redirect`  |
| 긴급 수정 | `hotfix/간단한-설명`  | `hotfix/token-expiry` |
| 배포 준비 | `release/버전`        | `release/1.2.0`       |

### 작업 흐름

**일반 기능 개발**

```bash
git switch develop
git pull origin develop
git switch -c feature/my-feature

# ... 작업 ...

git switch develop
git merge --no-ff feature/my-feature
git push origin develop
git branch -d feature/my-feature
```

**긴급 수정 (hotfix)**

```bash
git switch main
git switch -c hotfix/critical-bug

# ... 수정 ...

git switch main && git merge --no-ff hotfix/critical-bug
git switch develop && git merge --no-ff hotfix/critical-bug
git branch -d hotfix/critical-bug
```

### 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

```
<type>(<scope>): <subject>

[body]
```

| type       | 사용 시점                       |
| ---------- | ------------------------------- |
| `feat`     | 새로운 기능                     |
| `fix`      | 버그 수정                       |
| `refactor` | 동작 변경 없는 코드 개선        |
| `style`    | 포매팅, 세미콜론 등 (로직 무관) |
| `test`     | 테스트 추가/수정                |
| `docs`     | 문서 수정                       |
| `chore`    | 빌드, 패키지 등 기타            |

```bash
# ✅ 올바른 예시
feat(auth): 소셜 로그인 버튼 추가
fix(dashboard): 날짜 필터 초기화 오류 수정
refactor(user): UserCard를 entities 레이어로 이동

# ❌ 피하기
수정함
fix bug
update
```

### 주의사항

- `main`, `develop` 브랜치에 직접 커밋 금지
- 머지 시 항상 `--no-ff` 옵션 사용 (히스토리 보존)
- feature 브랜치는 머지 후 즉시 삭제
- PR/MR 없이 `develop` 머지 금지 (팀 작업 시)

---

## 작업 시 주의사항

- `pnpm` 외 다른 패키지 매니저(`npm`, `yarn`) 명령어 사용 금지
- 새 의존성 추가 전 기존 라이브러리로 해결 가능한지 먼저 검토
- 빌드 오류나 타입 오류가 있는 상태로 커밋하지 않기
- 대규모 리팩토링 전 현재 동작하는 테스트가 있는지 확인
- `.env.local` 파일은 절대 git에 커밋하지 않기

---

## 새 문서 추가 기준

`docs/` 폴더에 새 문서가 필요한 경우:

1. 새 파일을 `docs/` 아래에 추가
2. `CLAUDE.md`의 **문서 목록** 테이블에 링크 추가
3. 문서명은 해당 내용을 명확히 표현하는 단어로 작성 (`kebab-case.md`)

예: API 연동 패턴이 추가된다면 → `docs/api.md`
