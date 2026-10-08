# ASICC 웹사이트

쿠르브부아 한국어 국제섹션 학부모협회(ASICC) 웹사이트입니다.

- 공개 사이트: 한국어 `/ko/`, 프랑스어 `/fr/` (같은 구조, 페이지마다 언어 연결)
- 회원 영역: 이메일·비밀번호 가입 → 이메일 인증 → 학교급 대표 승인
- 임원 관리: 가입 승인, 권한 지정, 회원 콘텐츠 등록, 공개 양식 접수함
- 기술: [Astro](https://astro.build) 정적 사이트 + Firebase(인증, Firestore, Storage, Hosting)

Firebase 설정값이 비어 있으면 **데모 모드**로 동작합니다. 모든 데이터가 브라우저 안에만 저장되므로, 연결 전에 화면과 흐름을 시험할 수 있습니다.

| 데모 계정 | 비밀번호 | 상태 |
|---|---|---|
| admin@demo.asicc | demo1234 | 임원 |
| parent@demo.asicc | demo1234 | 승인된 학부모 |
| new@demo.asicc | demo1234 | 승인 대기 |

---

## 0. 준비 기간 설정 (검색엔진 차단)

정식 공개 전까지 검색엔진에 노출되지 않도록 설정되어 있습니다. 스위치는 `src/config.ts` 한 곳입니다.

```ts
export const SEARCH_INDEXING = false;   // 정식 공개 시 true 로 변경
```

`false`일 때 적용되는 내용:

- 모든 페이지에 `<meta name="robots" content="noindex, nofollow, noarchive">` 삽입 (가장 확실한 차단 수단)
- `robots.txt`에서 모든 검색엔진과 AI 수집 봇(GPTBot, ClaudeBot, CCBot 등) 차단
- 언어별 대체 주소(hreflang)와 대표 주소(canonical) 태그 생략
- Firebase Hosting으로 배포하면 응답 헤더에 `X-Robots-Tag: noindex` 추가 (`firebase.json`)

정식 공개할 때는 `SEARCH_INDEXING`을 `true`로 바꾸고, `firebase.json`의 `X-Robots-Tag` 항목을 지운 뒤 다시 배포합니다.

검색엔진 차단은 "검색 결과에 나오지 않게" 하는 장치일 뿐, 접속 자체를 막지는 않습니다. 주소를 아는 사람은 누구나 공개 페이지를 열 수 있고, 공개 저장소의 코드도 누구나 볼 수 있습니다. 그래서 저장소에는 실제 협회 내부 자료를 넣지 않고, 데모 데이터는 모두 `[예시]` 가상 내용으로 두었습니다. 회원 전용 자료는 Firebase 연결 후 임원 관리 화면에서 등록하며, 저장소에는 올라가지 않습니다.

## GitHub Pages로 배포

`.github/workflows/deploy.yml`이 들어 있어, `main` 브랜치에 올릴 때마다 자동으로 배포됩니다.

1. GitHub에 공개 저장소(예: `asicc-site`)를 만들고 파일을 올립니다.
2. 저장소 **Settings > Pages > Build and deployment > Source**를 **GitHub Actions**로 지정합니다.
3. **Actions** 탭에서 배포가 끝나면 `https://계정.github.io/asicc-site/`에서 사이트가 열립니다.

하위 경로(`/asicc-site/`)는 배포 설정이 자동으로 처리하므로 링크가 깨지지 않습니다. 나중에 자체 도메인을 연결하면 `deploy.yml`의 `SITE_URL`을 도메인 주소로, `BASE_PATH`를 `/`로 바꿉니다.

GitHub Pages 주소(`계정.github.io/asicc-site/`)에서는 `robots.txt`가 도메인 맨 앞이 아닌 하위 경로에 놓이므로 검색엔진이 읽지 않습니다. 이 경우에는 각 페이지의 noindex 태그가 차단을 담당하며, 그것만으로 충분합니다.

## 1. 내 컴퓨터에서 실행

Node.js 20 이상이 필요합니다.

```bash
npm install
npm run dev        # http://localhost:4321 에서 미리보기 (수정 즉시 반영)
npm run build      # dist/ 폴더에 배포용 파일 생성
```

## 2. 폴더 구조

```
src/
  pages/[lang]/          페이지 (한 파일이 /ko/, /fr/ 두 주소를 만듦)
    index.astro          홈
    about.astro          협회 소개 (인사말, 연혁, 운영진, 기관 구조, 정관)
    section/             국제섹션 안내, 학교생활 가이드
    admission.astro      입학 안내, 설명회 신청, FAQ
    news/                소식 목록(분류·검색)과 게시물
    events.astro         행사 일정
    join.astro           회원 가입 안내, 회비, 실무진, 협력, 소식지 구독
    contact.astro        문의 양식
    legal.astro          법적 고지, 개인정보 처리방침
    membres/             회원 영역 (로그인, 가입, 대시보드, 임원 관리)
  content/news/ko|fr/    소식 게시물 (마크다운)
  data/site.ts           운영진, 연혁, 행사, FAQ, 학년 대응표 등 사실 정보
  i18n/ui.ts             메뉴와 공통 문구 번역
  scripts/backend/       데이터 처리 (demo.ts = 데모, firebase.ts = 실제)
  scripts/members/       회원 영역 화면
  firebase-config.ts     Firebase 연결 설정
firestore.rules          데이터 접근 규칙 (보안의 핵심)
storage.rules            첨부 파일 접근 규칙
firebase.json            호스팅 설정
```

### 자주 하는 수정

- **소식 올리기**: `src/content/news/ko/날짜-주제.md`와 `src/content/news/fr/날짜-주제.md`를 같은 파일명으로 만듭니다. 프랑스어판이 없으면 그 글은 한국어로만 보이고, 언어 버튼은 소식 목록으로 연결됩니다.
- **행사, 운영진, FAQ 수정**: `src/data/site.ts`
- **메뉴 이름**: `src/i18n/ui.ts`
- `[대괄호]`로 표시된 곳은 확정 전 자리표시입니다. 화면에서 노란 배경으로 보입니다.

## 3. 권한 구조

| 권한 | 할 수 있는 일 |
|---|---|
| 방문자 | 공개 페이지 열람, 문의·설명회 신청·소식지 구독 제출 |
| 학부모 회원 (승인됨) | 공지 아카이브, 아이들 마당, 회의록, 대외협력 기록, 협회 운영 열람, 나눔 게시판 글쓰기, 내 정보 수정·탈퇴 |
| 학교급 대표 (rep) | 위 권한 + 자기 학교급 가입 신청 승인·거절, 회원 목록 열람 |
| 임원 (admin) | 모든 권한 + 권한 지정, 회원 콘텐츠 등록·삭제, 공개 양식 접수함, CSV 내보내기 |

권한은 화면이 아니라 `firestore.rules`가 서버에서 강제합니다. 화면 코드를 고쳐도 규칙을 우회할 수 없습니다.

## 4. Firebase 연결 (처음 한 번)

1. **프로젝트 만들기**: [Firebase 콘솔](https://console.firebase.google.com)에서 협회 구글 계정으로 새 프로젝트를 만듭니다. 계정은 개인 계정이 아닌 협회 공용 계정을 쓰고, 다른 임원 1명 이상을 소유자로 추가해 인수인계에 대비합니다.
2. **웹 앱 등록**: 프로젝트 설정 > 내 앱 > 웹(`</>`)을 누르고, 나오는 설정값을 `src/firebase-config.ts`에 붙여 넣습니다.
3. **Authentication**: 로그인 방법에서 "이메일/비밀번호"를 켭니다. 템플릿 메뉴에서 인증·비밀번호 재설정 메일의 언어와 발신자 이름(ASICC)을 정합니다.
4. **Firestore Database**: 데이터베이스를 만들고 위치는 유럽(예: `europe-west9` 파리)을 고릅니다. 위치는 나중에 바꿀 수 없습니다.
5. **Storage** (회의록 PDF, 아이들 마당 이미지): 새 프로젝트에서는 Storage 사용에 종량제(Blaze) 요금제 등록이 필요한 것으로 안내되어 있습니다(확인 필요). 이 규모의 사용량은 무료 한도 안에 들 가능성이 높지만, 카드 등록과 예산 알림 설정이 필요합니다. 등록을 원하지 않으면 회의록 파일은 협회 구글 드라이브에 두고 링크만 등록하는 방식으로 바꿀 수 있습니다.
6. **규칙과 배포**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add          # 만든 프로젝트 선택
   npm run deploy              # 빌드 + 호스팅·규칙 배포
   ```
   Storage 규칙이 Firestore를 조회하므로, 처음 배포할 때 권한 부여를 묻는 안내가 나오면 승인합니다.
7. **첫 임원 지정**: 사이트에서 직접 가입한 뒤, Firestore 콘솔의 `members/{내 uid}` 문서에서 `status`를 `approved`, `role`을 `admin`으로 바꿉니다. 그다음부터는 임원 관리 화면에서 다른 사람의 권한을 지정할 수 있습니다.

## 5. 도메인 연결

Firebase Hosting > 커스텀 도메인 추가에서 도메인을 입력하면 DNS 레코드(A, TXT)가 안내됩니다. 도메인을 관리하는 곳(구글에서 구매한 도메인은 현재 Squarespace Domains로 이전되었을 수 있음, 확인 필요)의 DNS 설정에 그 값을 넣습니다. 반영까지 최대 하루가 걸릴 수 있으며, HTTPS 인증서는 자동 발급됩니다.

도메인이 정해지면 배포 설정의 `SITE_URL` 값과 Authentication > 설정 > 승인된 도메인도 함께 바꿉니다.

## 6. 운영 체크리스트

- **9월 신학기**: 졸업·전학 가정 정리, 학교급 대표 권한 갱신, 연회비 안내
- **임원 교체 시**: Firebase 프로젝트 소유자, 협회 구글 계정, 도메인 관리 권한, HelloAsso 관리자를 함께 넘깁니다.
- **문의·신청 데이터**: 개인정보 처리방침에 적은 대로 1년이 지나면 삭제합니다 (접수함에서 삭제 가능).
- **아이들 마당**: 이미지 게시 동의(임원 관리 > 가입 승인에 표시) 가정의 아이만 올리고, 이름은 적지 않습니다.

## 7. 다음 단계로 고려할 것

- **공개 양식 스팸 방지**: Firebase App Check(reCAPTCHA) 연결
- **승인 알림 메일**: 가입 신청·승인 시 자동 메일 (Cloud Functions 필요)
- **행사 캘린더 연동**: 협회 구글 캘린더를 공개 일정 페이지에 표시
- **소식 작성 화면**: 지금은 공개 소식을 마크다운 파일로 올리고 다시 배포해야 합니다. 비개발자 임원이 직접 쓰려면 소식도 임원 관리 화면에서 등록하도록 옮기거나, Decap CMS 같은 편집 화면을 붙입니다.
- **법률 검토**: 법적 고지와 개인정보 처리방침은 초안입니다. 협회 정보(소재지, RNA 번호)를 채우고 검토를 받습니다.
