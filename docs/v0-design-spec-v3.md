# Helpy - 추가 디자인 요청 (v3)

## 변경 배경

v2까지는 "조직 > 프로젝트" 계층 구조였으나, v3에서는 사용자 경험 단순화를 위해 **조직을 숨기고 워크스페이스(기존 프로젝트) 중심**으로 UI 변경.

---

## 핵심 변경 사항

### 1. 용어 변경

| 기존 (v2) | 변경 (v3) |
|-----------|-----------|
| Project | Workspace |
| 프로젝트 | 워크스페이스 |

### 2. 조직(Organization) 처리 방식

- **백엔드**: 조직은 그대로 유지 (멀티테넌시, 권한 관리용)
- **프론트엔드**: 조직을 사용자에게 노출하지 않음
  - 조직 목록 페이지 제거
  - 조직 스위처 UI 제거
  - URL에서 orgId 제거
- **기본 동작**: 사용자의 첫 번째(또는 기본) 조직이 자동 선택됨

### 3. URL 구조 변경

| 기존 URL | 새 URL |
|----------|--------|
| `/organizations` | **(삭제)** |
| `/organizations/[orgId]/projects` | **(삭제)** |
| `/projects/[projectId]` | `/workspaces/[workspaceId]` |
| `/projects/[projectId]/conversations` | `/workspaces/[workspaceId]/conversations` |
| `/projects/[projectId]/documents` | `/workspaces/[workspaceId]/documents` |
| `/projects/[projectId]/ai` | `/workspaces/[workspaceId]/ai` |
| `/projects/[projectId]/widget` | `/workspaces/[workspaceId]/widget` |
| `/projects/[projectId]/analytics` | `/workspaces/[workspaceId]/analytics` |
| `/settings/organization/[orgId]` | `/settings/workspace/[workspaceId]` (또는 제거) |

---

## 사이드바 네비게이션 (v3)

### 변경 전 (v2)
```
[Logo]
[조직 스위처 - 드롭다운] ← 제거
──────────────────────
[Search...]
──────────────────────
PROJECTS ← WORKSPACES로 변경
├─ Customer Portal
│  ├─ Conversations
│  ├─ Documents
│  └─ ...
├─ Internal Helpdesk
└─ + New Project
──────────────────────
[Settings] [Notifications]
[User Profile]
```

### 변경 후 (v3)
```
[Logo]
──────────────────────
[Search...]
──────────────────────
WORKSPACES
├─ Customer Portal
│  ├─ Conversations
│  ├─ Documents
│  ├─ AI Settings
│  ├─ Widget
│  ├─ Analytics
│  └─ Settings
├─ Internal Helpdesk
│  └─ ...
└─ + New Workspace
──────────────────────
[Settings] [Notifications]
[User Profile]
```

### 상세 변경

1. **조직 스위처 영역 제거**
   - 로고 아래 조직 스위처 UI 완전 삭제
   - 공간이 줄어들어 더 간결한 UI

2. **"Projects" → "Workspaces" 레이블 변경**
   - 사이드바 섹션 헤더 변경
   - "New Project" → "New Workspace" 버튼 텍스트 변경

3. **조직 관련 링크 제거**
   - "Manage organizations" 링크 제거
   - 사용자 드롭다운의 "Organization Settings" 제거 또는 변경

---

## 삭제 대상 페이지/컴포넌트

### 페이지
- `/organizations` - 조직 목록 페이지
- `/organizations/[orgId]/projects` - 조직별 프로젝트 목록
- 조직 생성 모달/페이지
- 조직 삭제 기능

### 사이드바 요소
- 조직 스위처 드롭다운
- "Manage organizations" 링크

### 헤더/드롭다운
- 사용자 드롭다운의 "Organization Settings" 링크 (또는 워크스페이스 설정으로 변경)

### 기능 삭제
- 조직 생성 UI/기능 (프론트엔드에서 제거)
- 조직 삭제 UI/기능 (프론트엔드에서 제거)
- 조직 이름 변경 UI (회원가입 시 자동 생성, 이후 수정 불가)

---

## 설정 페이지 변경

### 기존: 조직 설정 (`/settings/organization/[orgId]`)

이 페이지의 역할 재정의 필요:

**옵션 A: 워크스페이스 설정으로 대체**
- 각 워크스페이스별 설정 (`/workspaces/[id]/settings`)에 멤버 관리 포함
- 조직 설정 페이지 삭제

**옵션 B: 계정 설정으로 통합**
- `/settings/account`에 멤버 초대, 팀 관리 통합
- 조직 개념 없이 "내 팀" 관리

**권장**: 옵션 A - 각 워크스페이스에서 멤버/권한 관리

---

## 구현 가이드

### Phase 1: 용어 변경
1. 모든 "Project" → "Workspace" 텍스트 변경
2. 컴포넌트/파일명은 유지 (리팩토링 최소화)

### Phase 2: 사이드바 수정
1. 조직 스위처 컴포넌트 제거
2. "PROJECTS" 레이블 → "WORKSPACES"
3. 새 프로젝트 버튼 텍스트 변경

### Phase 3: URL 리다이렉트 설정
1. `/projects/*` → `/workspaces/*` 리다이렉트
2. `/organizations` → `/workspaces` (기본 워크스페이스) 리다이렉트

### Phase 4: 페이지 정리
1. `/organizations` 관련 페이지 삭제
2. 프로젝트 페이지를 워크스페이스 경로로 이동

---

## API 연동 참고

프론트엔드 API 호출 시:
- 조직 ID는 사용자의 기본 조직에서 자동 추출
- `useDefaultOrganization()` 훅 생성하여 암묵적으로 처리
- API 요청 시 orgId는 내부적으로 주입

```typescript
// 예시: 워크스페이스(프로젝트) 목록 조회
// 기존
const projects = await projectsApi.getProjects(orgId);

// v3
const { defaultOrgId } = useDefaultOrganization();
const workspaces = await projectsApi.getProjects(defaultOrgId);
// 또는 API 레이어에서 자동 주입
```

---

## 회원가입 변경

### 유지 사항
- 회원가입 시 **조직명 입력은 유지** (백엔드에서 조직 생성 필요)
- Step 1: 이메일 인증
- Step 2: 코드 확인
- Step 3: 정보 입력 (이름, 조직명, 비밀번호)

### 변경 사항
- 레이블만 변경 고려: "조직명" → "팀 이름" 또는 그대로 유지
- 가입 후에는 조직 관련 UI가 숨겨짐

---

## 마이그레이션 고려사항

- 기존 사용자 북마크 대응: `/projects/*` → `/workspaces/*` 리다이렉트 설정
- SEO: canonical URL 업데이트
- 백엔드 변경 없음 (프론트엔드 변경만)
