# Git Flow 스킬

이 프로젝트의 브랜치 전략과 git 워크플로우를 관리합니다.

## 사용법

```
/git-flow <command> [options]
```

## 브랜치 전략

```
main            ← 프로덕션 배포 브랜치
  └─ develop    ← 통합 개발 브랜치
       ├─ feature/frontend-<기능명>   ← 프론트엔드 기능 브랜치
       ├─ feature/backend-<기능명>    ← 백엔드 기능 브랜치
       ├─ feature/<기능명>            ← 공통 기능 브랜치
       ├─ release/<버전>              ← 릴리스 준비 브랜치
       └─ hotfix/<이슈명>             ← 긴급 수정 브랜치
```

---

## 명령어

### 1. `start` — 기능 브랜치 생성

인자: `$ARGUMENTS` 형식으로 `<type> <name>` 전달

```
/git-flow start feature/frontend-login
/git-flow start feature/backend-auth
/git-flow start release/1.0.0
/git-flow start hotfix/critical-bug
```

**동작:**
1. `develop` 브랜치를 최신화 (`git pull origin develop`)
2. `develop`에서 새 브랜치 생성 (`git checkout -b <branch>`)
3. hotfix인 경우 `main`에서 분기

### 2. `finish` — 기능 브랜치 병합 준비

현재 브랜치의 작업을 마무리하고 병합 준비:

```
/git-flow finish
```

**동작:**
1. 변경 사항 확인 (`git status`)
2. `pnpm typecheck` 실행
3. `pnpm build` 실행
4. 모두 통과 시 `develop`으로 병합 가능 상태 보고
5. 실패 시 오류 내용과 수정 가이드 제공

### 3. `sync` — 브랜치 최신화

현재 브랜치를 `develop` 기준으로 최신화:

```
/git-flow sync
```

**동작:**
1. `develop` 최신화 (`git fetch origin develop`)
2. 현재 브랜치에 리베이스 (`git rebase origin/develop`)
3. 충돌 발생 시 충돌 파일 목록과 해결 가이드 제공

### 4. `status` — 브랜치 상태 확인

```
/git-flow status
```

**동작:**
1. 현재 브랜치명 및 `develop` 대비 커밋 차이 표시
2. 미커밋 변경 사항 표시
3. 원격 브랜치와의 동기화 상태 표시

---

## 브랜치 네이밍 규칙

| 에이전트    | 접두사                    | 예시                           |
| ----------- | ------------------------- | ------------------------------ |
| 프론트엔드  | `feature/frontend-`       | `feature/frontend-login`       |
| 백엔드      | `feature/backend-`        | `feature/backend-auth`         |
| 공통        | `feature/`                | `feature/user-profile`         |
| 릴리스      | `release/`                | `release/1.0.0`                |
| 긴급 수정   | `hotfix/`                 | `hotfix/token-expiry`          |

---

## 에이전트별 워크플로우

### 프론트엔드 에이전트

```bash
# 1. 기능 브랜치 생성
/git-flow start feature/frontend-<기능명>

# 2. 작업 수행 ...

# 3. 작업 중간에 develop 최신화 (필요 시)
/git-flow sync

# 4. 작업 완료 후 검증 및 병합 준비
/git-flow finish
```

### 백엔드 에이전트

```bash
# 1. 기능 브랜치 생성
/git-flow start feature/backend-<기능명>

# 2. 타입 정의 → Route Handler 구현 ...

# 3. 작업 완료 후 검증 및 병합 준비
/git-flow finish
```

---

## 주의사항

- **커밋 전 필수 검증**: `pnpm typecheck` + `pnpm build` 통과 필수
- **force push 금지**: `--force` 옵션은 사용하지 않음
- **develop 직접 커밋 금지**: 반드시 기능 브랜치에서 작업
- **main 직접 커밋 금지**: release 또는 hotfix 브랜치를 통해서만 병합
- **충돌 해결 시**: 자동 해결하지 않고 사용자에게 확인 요청

---

## 구현 지침

이 스킬이 호출되면 `$ARGUMENTS`를 파싱하여 위 명령어를 실행하세요.

인자가 없거나 `help`인 경우 위 명령어 목록을 안내하세요.

각 명령어 실행 시:
1. 먼저 `git status`로 현재 상태를 확인
2. 커밋되지 않은 변경이 있으면 경고 후 사용자에게 처리 방법 질문
3. 명령 실행 후 결과 요약 출력
