# Helpy - AI-first CS Platform

## 프로젝트 개요
Helpy는 AI를 활용한 고객 서비스(CS) 플랫폼입니다. 조직에서 프로젝트를 생성하고, 각 프로젝트별로 AI 기반 고객 지원 서비스를 제공합니다.

## 기술 스택
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **상태관리**: Zustand, React Query
- **폼**: React Hook Form + Zod
- **UI**: Tailwind CSS + class-variance-authority

---

## 페이지 구조

### 1. 인증 페이지 (Public)

#### 1.1 로그인 페이지 (`/login`)
- 이메일/비밀번호 입력 폼
- "회원가입" 링크
- 로그인 버튼

#### 1.2 회원가입 페이지 (`/signup`)
3단계 Funnel 형태:
1. **이메일 인증**: 이메일 입력 → 인증 코드 발송
2. **코드 확인**: 6자리 인증 코드 입력
3. **정보 입력**: 비밀번호, 이름, 조직명 입력 → 가입 완료

---

### 2. 대시보드 (Protected - 로그인 필요)

#### 2.1 조직 선택 페이지 (`/organizations`)
- 사용자가 속한 조직 목록 카드 형태로 표시
- 각 조직 카드 클릭 시 해당 조직의 프로젝트 목록으로 이동

#### 2.2 프로젝트 목록 페이지 (`/organizations/[orgId]/projects`)
- 해당 조직의 프로젝트 목록
- 프로젝트 카드: 프로젝트명, 생성일, 상태
- "새 프로젝트 생성" 버튼
- 프로젝트 클릭 시 프로젝트 상세로 이동

#### 2.3 프로젝트 상세 페이지 (`/projects/[projectId]`)
- 프로젝트 정보 (이름, API Key)
- 프로젝트 설정
- API Key 재발급 버튼
- 프로젝트 삭제 버튼

#### 2.4 프로젝트 생성 모달/페이지
- 프로젝트 이름 입력
- 조직 선택 (자동 선택됨)

---

### 3. 설정 페이지

#### 3.1 내 정보 페이지 (`/settings/profile`)
- 현재 이름 표시
- 이름 수정 폼
- 회원 탈퇴 버튼 (확인 모달 포함)

#### 3.2 조직 설정 페이지 (`/settings/organization/[orgId]`)
- 조직명 수정
- 멤버 관리 (추후)

---

## API 명세

### Auth API
| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| POST | `/auth/send-code` | 인증 코드 발송 | X |
| POST | `/auth/verify-code` | 인증 코드 확인 | X |
| POST | `/auth/signup` | 회원가입 | X |
| POST | `/auth/login` | 로그인 | X |
| POST | `/auth/refresh` | 토큰 갱신 | X |
| POST | `/auth/logout` | 로그아웃 | X |

### Users API
| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| GET | `/users/me` | 내 정보 조회 | O |
| PATCH | `/users/me` | 내 정보 수정 | O |
| DELETE | `/users/me` | 회원 탈퇴 | O |

### Organizations API
| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| GET | `/organizations/me` | 내 조직 목록 조회 | O |
| GET | `/organizations/:id` | 조직 상세 조회 | O |
| PATCH | `/organizations/:id` | 조직 정보 수정 | O |

### Projects API
| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| POST | `/projects` | 프로젝트 생성 | O |
| GET | `/projects?organizationId=` | 프로젝트 목록 조회 | O |
| GET | `/projects/:id` | 프로젝트 상세 조회 | O |
| PATCH | `/projects/:id` | 프로젝트 수정 | O |
| DELETE | `/projects/:id` | 프로젝트 삭제 | O |
| POST | `/projects/:id/regenerate-key` | API 키 재발급 | O |

---

## DTO 타입

```typescript
// Auth
interface SendCodeDto {
  email: string; // 이메일
}

interface VerifyCodeDto {
  email: string;
  code: string; // 6자리 인증 코드
}

interface SignupDto {
  token: string; // 이메일 인증 토큰
  password: string; // 비밀번호 (8자 이상)
  name: string; // 이름
  organizationName: string; // 조직명
}

interface LoginDto {
  email: string;
  password: string;
}

// User
interface UpdateMeDto {
  name: string;
}

// Organization
interface UpdateOrganizationDto {
  name: string;
}

// Project
interface CreateProjectDto {
  organizationId: string;
  name: string;
}

interface UpdateProjectDto {
  name?: string;
  settings?: Record<string, any>;
}
```

---

## 디자인 요구사항

### 전체 스타일
- 모던하고 깔끔한 SaaS 스타일
- 다크/라이트 모드 지원
- 반응형 디자인 (모바일, 태블릿, 데스크탑)

### 컬러 팔레트
- Primary: 브랜드 컬러 (제안 필요)
- Background: 화이트/다크 그레이
- Text: 블랙/화이트
- Accent: 성공(그린), 에러(레드), 경고(옐로우)

### 컴포넌트
- Button (Primary, Secondary, Danger, Ghost)
- Input (텍스트, 이메일, 비밀번호)
- Card (프로젝트 카드, 조직 카드)
- Modal (확인, 폼)
- Toast/Notification
- Sidebar Navigation
- Header with User Menu

### 레이아웃
```
┌─────────────────────────────────────────┐
│  Header (로고 + 사용자 메뉴)              │
├──────────┬──────────────────────────────┤
│          │                              │
│  Sidebar │      Main Content            │
│          │                              │
│  - 조직   │                              │
│  - 프로젝트│                              │
│  - 설정   │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

---

## 우선순위

### Phase 1 (MVP)
1. 로그인/회원가입 페이지
2. 조직 목록 페이지
3. 프로젝트 목록/상세 페이지

### Phase 2
1. 설정 페이지 (프로필, 조직)
2. 프로젝트 생성 모달

### Phase 3
1. 대시보드 통계
2. AI 설정 페이지
